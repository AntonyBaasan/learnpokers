import { PokerPlayer, PokerTable, PokerTableState } from '../models/PokerTable';
import { v4 as uuidv4 } from 'uuid';
import { Deck } from './card-game/deck';
import { Dealer } from './card-game/dealer';
import { CardUtilsService } from './card-game/card-utils.service';
import { Injectable } from '@angular/core';

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
        players: this.generateRandomPlayers(),
      } as PokerTableState,
    };
  }

  private createDealer() {
    const cards = this.cardUtilsService.generateCards();
    const deck = new Deck(cards);
    return new Dealer(deck);
  }

  getGameState(): PokerTable {
    return this.pokerTable;
  }

  private generateRandomPlayers(): PokerPlayer[] {
    let players: PokerPlayer[] = [];
    for (let i = 1; i <= 5; i++) {
      players.push({
        name: "Player" + (i),
        cash: 1000,
        hand: []
      } as PokerPlayer);
    }
    return players;
  }
}
