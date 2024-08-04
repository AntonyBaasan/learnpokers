import { PokerTable } from '../models/PokerTable';
import { v4 as uuidv4 } from 'uuid';

export class PokerService {
  private pokerTable: PokerTable = {} as PokerTable;

  getGameState(): PokerTable {
    return this.pokerTable;
  }

  init(): void {
    this.pokerTable = {
      id: uuidv4(),
      createdAt: new Date().toUTCString(),
      createdBy: 'Anonymous',
      state: {}
    };
  }
}
