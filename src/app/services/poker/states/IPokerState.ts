import { Actor } from '../../../models/cards/actor';

export interface IPokerState {
  dealerMove(cardAmount: number): void;
  playerMove(playerId: string, move: string): void;
  whosTurn(): Actor;
}

