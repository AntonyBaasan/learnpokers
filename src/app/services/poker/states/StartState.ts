import { Actor } from '../../../models/cards/actor';
import { PlayerMove } from '../../../models/PokerGameInfo';
import { PokerGameService } from '../poker-game.service';
import { BiddingState } from './BiddingState';
import { IPokerState } from './IPokerState';

export class StartState implements IPokerState {
  private maxStateCard = 3;
  constructor(private gameService: PokerGameService) {

  }
  description(): string {
    return "Starting";
  }
  dealerMove(cardAmount: number): void {
    let dealtCard = this.gameService.getDealer().dealCard();
    this.gameService.addToCommunity(dealtCard);

    if(this.gameService.getCommunityCards().length === this.maxStateCard) {
      this.gameService.setState(new BiddingState(this.gameService));
    }
  }
  playerMove(playerId: string, move: PlayerMove): void {
    console.log("Only dealer can move during 'StartState'!");
  }
  whosTurn(): Actor {
    return this.gameService.getDealer();
  }
}


