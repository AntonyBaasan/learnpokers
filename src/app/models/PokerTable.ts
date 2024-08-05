import { Dealer } from '../services/card-game/dealer';
import { Card } from './cards/Card';

export interface PokerTable {
  id: string;
  createdAt: string;
  createdBy: string;
  state: PokerTableState;
}

export interface PokerTableState {
  dealer: Dealer,
  commnunity: Card[];
  players: PokerPlayer[];
}

export interface PokerPlayer {
  id: string;
  name: string;
  cash: number;
  hand: Card[];
}
