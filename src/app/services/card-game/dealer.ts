import { range } from 'rxjs';
import { Card } from '../../models/cards';
import { Deck } from './deck';

export class Dealer {

  constructor(private deck: Deck) {
  }

  shuffle() {
    this.deck.reset();
  }

  dealCard(): Card {
    let cardsLeft: number = this.deck.numberOfCardsLeft();
    if (cardsLeft < 1) {
      throw Error('No cards left!');
    }
    let nextCardPosition = this.nextRandomNumber(cardsLeft);
    return this.deck.getFromRemaining(nextCardPosition);
  }

  dealCards(amount: number): Card[] {
    return Array(amount).fill(0).map((_, i) => this.dealCard());
  }

  nextRandomNumber(upperBound: number): number {
    return Math.floor(Math.random() * upperBound);
  }

}
