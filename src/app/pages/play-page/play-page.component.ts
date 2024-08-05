import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { PokerService } from '../../services/poker.service';
import { PokerPlayer, Raise } from '../../models/PokerTable';
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
  players: WritableSignal<PokerPlayer[]> = signal([]);
  ante: WritableSignal<number> = signal(0);
  raise: WritableSignal<Raise> = signal({ playerIndex: -1, raisedAmount: 0 });

  constructor(private pokerService: PokerService, private cardUtilsService: CardUtilsService) {
    pokerService.init();
    this.updateView();

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
    this.pokerService.dealToPlayer(this.players()[this.currentPlayerIndex()].id);
    this.movePlayerTurn();
  }

  getCardsAsString(cards: Card[]): string[] {
    return cards.map(c => this.cardUtilsService.cartToShortString(c));
  }

  onReset(): void {
    this.pokerService.reset();
    this.updateView();
  }

  onTurn(move: 'fold' | 'call' | 'check' | 'raise') {
    if (move == 'fold') {
      this.pokerService.fold(this.getCurrentPlayer().id);
    }
    this.movePlayerTurn();
  }

  isTurn(playerId: string): boolean {
    return this.getCurrentPlayer().id === playerId;
  }

  isFolded(playerId: string): boolean {
    return this.pokerService.getPlayerById(playerId).folded;
  }

  private getCurrentPlayer(): PokerPlayer {
    return this.players()[this.currentPlayerIndex()];
  }

  private updateView() {
    this.players.set(this.pokerService.getPlayers());
    this.communityCards.set(this.pokerService.getCommunity());
    this.ante.set(this.pokerService.getAnte());
    this.raise.set(this.pokerService.getCurrentRaise());
  }

  private movePlayerTurn(): void {
    let prev = this.currentPlayerIndex();
    if (prev + 1 == this.players().length) {
      this.currentPlayerIndex.set(0);
    } else {
      this.currentPlayerIndex.set(prev + 1);
    }
  }
}
