import React from "react";
import Card from "./Card";
import "./Cards.css";

const Cards = ({ cards, openCards, clearedCards, onCardClick, isDisabled }) => {
  const checkIsFlipped = (index) => openCards.includes(index);
  const checkIsInactive = (card) => Boolean(clearedCards[card.type]);

  return (
    <div className="container">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          index={index}
          isFlipped={checkIsFlipped(index)}
          isInactive={checkIsInactive(card)}
          isDisabled={isDisabled}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default Cards;