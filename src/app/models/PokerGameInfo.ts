import { Actor } from './cards/actor';
import { Card } from './cards/Card';
import { Dealer } from './cards/dealer';

export interface PokerGameInfo {
  id: string;
  createdAt: string;
  createdBy: string;
  // dealer hold a deck
  dealer: Dealer,
  ante: number,
  commnunity: Card[];
  players: PokerPlayer[];
  raise: Raise
}

export class PokerPlayer implements Actor {
  constructor(public id: string,
    public name: string,
    public cash: number,
    public hand: Card[],
    public folded: boolean) {
  }
  getId(): string {
    return this.id;
  }

  getRole(): 'dealer' | 'player' {
    return 'player';
  }
}

export type PlayerMove = 'fold' | 'call' | 'check' | 'raise';

export interface Raise {
  playerIndex: number;
  raisedAmount: number;
}
