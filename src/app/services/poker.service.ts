import { PokerPlayer, PokerTable, PokerTableState } from '../models/PokerTable';
import { v4 as uuidv4 } from 'uuid';
import { Deck } from './card-game/deck';
import { Dealer } from './card-game/dealer';
import { CardUtilsService } from './card-game/card-utils.service';
import { Injectable } from '@angular/core';
import { Card } from '../models/cards';

@Injectable()
export class PokerService {
  private pokerTable: PokerTable = {} as PokerTable;

  constructor(private cardUtilsService: CardUtilsService) {
  }

  init(): void {
    this.pokerTable = {
      id: uuidv4(),
      createdAt: new Date().toUTCString(),
      createdBy: 'Anonymous',
      state: {
        dealer: this.createDealer(),
        commnunity: [],
        players: this.generateRandomPlayers(),
      } as PokerTableState,
    };
  }

  getGameState(): PokerTable {
    return this.pokerTable;
  }

  getPlayers(): PokerPlayer[] {
    return this.pokerTable.state.players ?? [];
  }

  getCommunity(): Card[] {
    return this.pokerTable.state.commnunity;
  }

  reset(): void {
    // clear player hands
    this.pokerTable.state.players.forEach(p => p.hand = []);
    // clear community
    this.pokerTable.state.commnunity = [];
    // dealer shuffle the deck
    this.pokerTable.state.dealer.shuffle();
  }

  public dealToCommunity() {
    let dealtCard = this.pokerTable.state.dealer.dealCard();
    this.pokerTable.state.commnunity = [...this.pokerTable.state.commnunity, dealtCard];
  }

  // gives cards to players
  public dealToPlayer(playerId: string) {
    let player = this.getPlayerById(playerId);
    let dealtCard = this.pokerTable.state.dealer.dealCard();
    player.hand = [...player.hand, dealtCard];
  }

  public getPlayerById(playerId: string): PokerPlayer {
    let found = this.pokerTable.state.players.find(p => p.id === playerId);
    if (found) {
      return found;
    }
    throw Error("Can't find player with id: " + playerId);
  }

  private createDealer() {
    const cards = this.cardUtilsService.generateCards();
    const deck = new Deck(cards);
    return new Dealer(deck);
  }

  private generateRandomPlayers(): PokerPlayer[] {
    let players: PokerPlayer[] = [];
    for (let i = 1; i <= 5; i++) {
      players.push({
        id: i.toString(),
        name: "Player" + (i),
        cash: 1000,
        hand: []
      } as PokerPlayer);
    }
    return players;
  }
}
