
import React from "react";
import classnames from "classnames";
import "./Card.css";

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    if (!isFlipped && !isDisabled) {
      onClick(index);
    }
  };

  return (
    <div
      className={classnames("card", { "is-flipped": isFlipped, "is-inactive": isInactive })}
      onClick={handleClick}
    >
      <div className="card-inner">
        {/* Front face of the card */}
        <div className="card-face card-front-face">
          <img src={require("./Assets/Imgs/Fruits.jpg")} alt="fruit card front" />
        </div>

        {/* Back face of the card */}
        <div className="card-face card-back-face">
          <img src={card.image} alt={card.type} />
        </div>
      </div>
    </div>
  );
};

export default Card;
  