export class Card {
  constructor(public suit: Suit, public symbol: Symbol ) {
  }

  public get value(): number {
    return this.symbol;
  }
}

export enum Suit {
  Hearts,
  Diamonds,
  Spades,
  Clubs,
}

export enum Symbol {
    Deuce = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13,
    Ace = 14
}
