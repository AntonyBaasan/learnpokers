export interface Actor {
  getId(): string;
  getRole(): 'dealer' | 'player';
}
