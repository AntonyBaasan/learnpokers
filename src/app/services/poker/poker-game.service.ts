import { PlayerMove, PokerGameInfo, PokerPlayer, Raise } from '../../models/PokerGameInfo';
import { v4 as uuidv4 } from 'uuid';
import { CardUtilsService } from '../card-game/card-utils.service';
import { Injectable } from '@angular/core';
import { IPokerState } from './states/IPokerState';
import { StartState } from './states/StartState';
import { CardGameService } from './card-game.service';
import { Dealer } from '../../models/cards/dealer';
import { Deck } from '../../models/cards/deck';
import { Actor } from '../../models/cards/actor';
import { Card } from '../../models/cards';

@Injectable()
export class PokerGameService extends CardGameService {
  override getPlayers(): PokerPlayer[] {
    return this.gameInfo.players;
  }
  override playerWithTurn(): PokerPlayer {
    throw new Error('Method not implemented.');
  }
  override isPlayerFolded(playerId: string): boolean {
    throw new Error('Method not implemented.');
  }
  override isPlayerTurn(playerId: string): boolean {
    throw new Error('Method not implemented.');
  }
  override resetRound(): void {
    // clear player hands
    this.gameInfo.players.forEach(p => {
      p.hand = [];
      p.folded = false;
    });
    // clear community
    this.gameInfo.commnunity = [];
    // dealer shuffle the deck
    this.gameInfo.dealer.shuffle();
  }
  override getVisualState() {
    return this.gameInfo;
  }
  override dealerDeal(cardAmount: number): void {
    this.currentState.dealerMove(cardAmount);
  }
  override playerMove(playerId: string, move: PlayerMove): void {
    this.currentState.playerMove(playerId, move);
  }
  override whosTurn(): Actor {
    return this.currentState.whosTurn();
  }

  private gameInfo: PokerGameInfo = {} as PokerGameInfo;
  private currentState: IPokerState;

  constructor(private cardUtilsService: CardUtilsService) {
    super();

    // this is placeholder that never used.
    this.currentState = new StartState(this);
  }

  start(): void {
    this.gameInfo = {
      id: uuidv4(),
      createdAt: new Date().toUTCString(),
      createdBy: 'anonymous',
      dealer: this.createDealer(),
      commnunity: [],
      ante: 0,
      // start from no raise.
      raise: { playerIndex: -1, raisedAmount: 0 },
      players: this.generateRandomPlayers(5),
    };

    this.setState(new StartState(this));
  }

  public setState(state: IPokerState) {
    this.currentState = state;
  }

  public getCommunityCards() {
    return this.gameInfo.commnunity;
  }
  public addToCommunity(card: Card) {
    this.gameInfo.commnunity = [...this.gameInfo.commnunity, card];
  }

  // gives cards to players
  public dealToPlayer(playerId: string) {
    let player = this.getPlayerById(playerId);
    let dealtCard = this.gameInfo.dealer.dealCard();
    player.hand = [...player.hand, dealtCard];
  }

  public getPlayerById(playerId: string): PokerPlayer {
    let found = this.gameInfo.players.find(p => p.id === playerId);
    if (found) {
      return found;
    }
    throw Error("Can't find player with id: " + playerId);
  }

  public fold(playerId: string) {
    let player = this.getPlayerById(playerId);
    player.folded = true;
  }

  public raise(playerIndex: number, amount: number) {
    this.gameInfo.raise = {
      playerIndex: playerIndex,
      raisedAmount: amount,
    }
  }

  public getDealer(): Dealer {
    return this.gameInfo.dealer;
  }

  private createDealer() {
    const cards = this.cardUtilsService.generateCards();
    const deck = new Deck(cards);
    return new Dealer(deck);
  }

  private generateRandomPlayers(count: number): PokerPlayer[] {
    let players: PokerPlayer[] = [];
    for (let i = 1; i <= count; i++) {
      players.push(new PokerPlayer(
        i.toString(),
        "Player" + (i),
        1000,
        [],
        false
      ));
    }
    return players;
  }
}
