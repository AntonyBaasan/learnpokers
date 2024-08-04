import { Injectable } from '@angular/core';
import { Card, CARD_DECK, Suit, Symbol } from '../../models/cards';

@Injectable({ providedIn: 'root' })
export class CardUtilsService {

  public cartToShortString(card: Card) {
    return CARD_DECK[this.toHash(card)];
  }

  public toHash(card: Card) {
    return card.suit * 13 + card.value - 2;
  }

  public ToSuit(hash: number): Suit {
    return hash / 13;
  }

  public ToValue(hash: number): Symbol {
    return hash % 13 + 2;
  }

  public toCardFromString(cardExpression: string): Card {
    if (cardExpression.length != 2) {
      throw Error(`${cardExpression} is not valid card!`);
    }
    // example expressions: "2h", "3h"
    let suit: Suit = this.toSuit(cardExpression[1]);
    let symbol: Symbol = this.toSymbol(cardExpression[0]);
    return new Card(suit, symbol);
  }

  public generateCards(): Card[] {
    return CARD_DECK.map(cardAsString => this.toCardFromString(cardAsString));
  }

  public toSuit(char: string): Suit {
    switch (char) {
      case 'h':
        return Suit.Hearts;
      case 'd':
        return Suit.Diamonds;
      case 'c':
        return Suit.Clubs;
      case 's':
        return Suit.Spades;
      default:
        throw new Error(`${char} is not a valid suit character!`);
    }
  }
  // example cards:
  // "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "Th", "Jh", "Qh", "Kh", "Ah",
  public toSymbol(char: string): Symbol {
    switch (char) {
      case '2':
        return Symbol.Deuce;
      case '3':
        return Symbol.Three;
      case '4':
        return Symbol.Four;
      case '5':
        return Symbol.Five;
      case '6':
        return Symbol.Six;
      case '7':
        return Symbol.Seven;
      case '8':
        return Symbol.Eight;
      case '9':
        return Symbol.Nine;
      case 'T':
        return Symbol.Ten;
      case 'J':
        return Symbol.Jack;
      case 'Q':
        return Symbol.Queen;
      case 'K':
        return Symbol.King;
      case 'A':
        return Symbol.Ace;
      default:
        throw new Error(`${char} is not a valid symbol character!`);
    }
  }
}

