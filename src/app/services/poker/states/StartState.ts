import { Actor } from '../../../models/cards/actor';
import { PokerGameService } from '../poker-game.service';
import { IPokerState } from './IPokerState';

export class StartState implements IPokerState {
  constructor(private gameService: PokerGameService) {

  }
  dealerMove(cardAmount: number): void {
    let dealtCard = this.gameService.getDealer().dealCard();
    this.gameService.addToCommunity(dealtCard);

    if(this.gameService.getCommunityCards().length === 3) {
      this.gameService.setState(new )
    }
  }
  playerMove(playerId: string, move: string): void {
    console.log("Only dealer can move during 'StartState'!");
  }
  whosTurn(): Actor {
    return this.gameService.getDealer();
  }
}


