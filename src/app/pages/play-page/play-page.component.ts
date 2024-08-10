import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { PokerGameService } from '../../services/poker/poker-game.service';
import { CardGameService } from '../../services/poker/card-game.service';
import { CommonModule } from '@angular/common';
import { CardUtilsService } from '../../services/card-game/card-utils.service';
import { Card } from '../../models/cards';
import { PokerGameInfo, PokerPlayer, Raise } from '../../models/PokerGameInfo';
import { Actor } from '../../models/cards/actor';

@Component({
  selector: 'app-play-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-page.component.html',
  styleUrl: './play-page.component.scss',
  providers: [{provide: CardGameService, useClass: PokerGameService}]
})
export class PlayPageComponent implements OnInit {
  communityCards: WritableSignal<Card[]> = signal([]);
  players: WritableSignal<PokerPlayer[]> = signal([]);
  ante: WritableSignal<number> = signal(0);
  raise: WritableSignal<Raise> = signal({ playerIndex: -1, raisedAmount: 0 });

  constructor(private gameService: CardGameService, private cardUtilsService: CardUtilsService) {
    gameService.start();

    this.updateView();

    // debug
    let table = gameService.getVisualState();
    console.log('start state: ', table);
  }

  ngOnInit(): void {

  }

  onDealerDeal(): void {
    this.gameService.dealerDeal(1);
    this.updateView();
  }

  getCardsAsString(cards: Card[]): string[] {
    return cards.map(c => this.cardUtilsService.cartToShortString(c));
  }

  onReset(): void {
    this.gameService.resetRound();
    this.updateView();
  }

  onPlayerMove(move: 'fold' | 'call' | 'check' | 'raise') {
    let personToMove: Actor = this.gameService.whosTurn();
    if(personToMove.getRole() === 'dealer') {
      return;
    }
    let player = this.gameService.playerWithTurn();
    
    this.gameService.playerMove(player.id, move);

    this.updateView();
  }

  isTurn(playerId: string): boolean {
    return this.gameService.isPlayerTurn(playerId);
  }

  isFolded(playerId: string): boolean {
    return this.gameService.isPlayerFolded(playerId);
  }

  private updateView() {
    let gameInfo = this.gameService.getVisualState() as PokerGameInfo;

    this.players.set(gameInfo.players);
    this.communityCards.set(gameInfo.commnunity);
    this.ante.set(gameInfo.ante);
    this.raise.set(gameInfo.raise);
  }
}
