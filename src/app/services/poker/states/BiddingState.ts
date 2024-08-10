import { Actor } from '../../../models/cards/actor';
import { PlayerMove, PokerPlayer } from '../../../models/PokerGameInfo';
import { PokerGameService } from '../poker-game.service';
import { IPokerState } from './IPokerState';

export class BiddingState implements IPokerState {
  private antl = 0;
  private currentPlayerIndex = 0;
  private players: PokerPlayer[] = [];
  private playerBids: { playerId: string, amount: number }[] = []

  constructor(private gameService: PokerGameService) {
    this.players = gameService.getPlayers();
  }

  description(): string {
    return "Bidding";
  }
  dealerMove(cardAmount: number): void {
    console.log('During bidding only player can move!')
  }
  playerMove(playerId: string, move: PlayerMove): void {
    if (this.whosTurn().getId() !== playerId) {
      console.log(`It is not player ${playerId} turn!`);
      return;
    }
    if (move === 'fold') {
      this.gameService.fold(playerId);
    } else if (move === 'call' || move === 'check') {

    } else if (move === 'raise') {

    } else {
      throw new Error('Unknown player move!');
    }

    this.moveToNextPlayer();
  }
  whosTurn(): Actor {
    return this.players[this.currentPlayerIndex];
  }
  private moveToNextPlayer() {
    let prev = this.currentPlayerIndex;
    if (prev + 1 == this.players.length) {
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex = prev + 1;
    }
  }
  private maxBid(): number {


  }

}
