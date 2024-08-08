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

export interface PokerPlayer {
  id: string;
  name: string;
  cash: number;
  hand: Card[];
  folded: boolean
}

export interface Raise {
  playerIndex: number;
  raisedAmount: number;
}
