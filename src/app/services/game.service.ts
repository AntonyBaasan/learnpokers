import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

// TODO: refactor when many games are available in future.
// TODO: will move to the backend.
@Injectable({ providedIn: 'root' })
export class GameService {

  getGame(id: string) {
  }

  createGame(): void {
  }
}
