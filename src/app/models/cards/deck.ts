import { Card } from '../../models/cards';

export class Deck {

  private cardsOut: Card[] = [];

  constructor(private cards: Card[]) {
  }

  public reset(): void {
    this.cardsOut = [];
  }

  public numberOfCardsLeft(): number {
    return this.cards.length - this.cardsOut.length;
  }

  public getFromRemaining(position: number): Card {
    let card = this.cardsLeft()[position];
    this.cardsOut.push(card)
    return card;
  }

  public getCard(card: Card): Card {
    if(this.cards.indexOf(card) == -1) {
      throw Error('The card not not part of deck!');
    }
    if(this.cardsOut.indexOf(card) !== -1) {
      throw Error('The card is already been dealt!')
    }

    this.cardsOut.push(card);
    return card;
  }

  // returns cards that are not out
  private cardsLeft(): Card[] {
    return this.cards.filter(c => this.cardsOut.indexOf(c) == -1);
  }
}
