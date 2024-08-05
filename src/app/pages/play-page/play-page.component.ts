import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { PokerService } from '../../services/poker.service';
import { PokerPlayer, PokerTable } from '../../models/PokerTable';
import { CommonModule } from '@angular/common';
import { CardUtilsService } from '../../services/card-game/card-utils.service';
import { Card } from '../../models/cards';

@Component({
  selector: 'app-play-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-page.component.html',
  styleUrl: './play-page.component.scss',
  providers: [PokerService]
})
export class PlayPageComponent implements OnInit {
  currentPlayerIndex = signal(0); // first player always starts
  communityCards: WritableSignal<Card[]> = signal([]);
  players: PokerPlayer[];

  constructor(private pokerService: PokerService, private cardUtilsService: CardUtilsService) {
    pokerService.init();
    this.players = pokerService.getPlayers();

    // debug
    let table = pokerService.getGameState();
    console.log('start state: ', table);
  }

  ngOnInit(): void {

  }

  onGiveToCommunity(): void {
    this.pokerService.dealToCommunity();
    this.communityCards.set(this.pokerService.getCommunity());
  }

  onGiveToPlayer(): void {
    this.pokerService.dealToPlayer(this.players[this.currentPlayerIndex()].id);
    this.movePlayerTurn();
  }

  getCardsAsString(cards: Card[]): string[] {
    return cards.map(c => this.cardUtilsService.cartToShortString(c));
  }

  onPlayerMove(move: 'fold' | 'call' | 'raise') {

  }

  isTurn(playerId: string): boolean {
    return this.getCurrentPlayer().id === playerId;
  }

  private getCurrentPlayer(): PokerPlayer {
    return this.players[this.currentPlayerIndex()];
  }

  private movePlayerTurn(): void {
    let prev = this.currentPlayerIndex();
    if (prev + 1 == this.players.length) {
      this.currentPlayerIndex.set(0);
    } else {
      this.currentPlayerIndex.set(prev + 1);
    }
  }
}
