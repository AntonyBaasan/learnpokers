import { Actor } from '../../models/cards/actor';
import { PlayerMove, PokerPlayer } from '../../models/PokerGameInfo';
import { IPokerState } from './states/IPokerState';

export abstract class CardGameService {
  abstract setState(state: IPokerState): void;
  abstract getVisualState(): any;
  abstract start(): void;
  abstract dealerDeal(cardAmount: number): void;
  abstract playerMove(playerId: string, move: PlayerMove): void;
  abstract getPlayers(): PokerPlayer[];
  abstract whosTurn(): Actor;
  abstract playerWithTurn(): PokerPlayer;
  abstract resetRound(): void;
  abstract isPlayerFolded(playerId: string): boolean;
  abstract isPlayerTurn(playerId: string): boolean;
}
