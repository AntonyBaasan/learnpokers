import { Actor } from '../../../models/cards/actor';
import { PlayerMove } from '../../../models/PokerGameInfo';

export interface IPokerState {
  description(): string;
  dealerMove(cardAmount: number): void;
  playerMove(playerId: string, move: PlayerMove): void;
  whosTurn(): Actor;
}

