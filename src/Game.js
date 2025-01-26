import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle
} from "@material-ui/core";
import Cards from "./Cards";

const uniqueCardsArray = [
    {
      type: "Apple",
      image: require(`./Assets/Imgs/Apple.jpg`)
    },
    {
      type: "Kiwi",
      image: require(`./Assets/Imgs/Kiwi.png`)
    },
    {
      type: "Orange",
      image: require(`./Assets/Imgs/orange.png`)
    },
    {
      type: "Banana",
      image: require(`./Assets/Imgs/Banana.jpg`)
    },
    {
      type: "Pineapple",
      image: require(`./Assets/Imgs/Pineapple.jpg`)
    },
    {
      type: "Pomogranade",
      image: require(`./Assets/Imgs/Pomogranade.png`)
    },
    {
        type: "Strawberry",
        image: require(`./Assets/Imgs/Strawberry.jpg`)
    },
    {
        type: "Mango",
        image: require(`./Assets/Imgs/Mango.jpg`)
    }  
  ];

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const Game = () => {
  const [cards, setCards] = useState(() =>
    shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
  const timeout = useRef(null);

  const disable = () => setShouldDisableAllCards(true);
  const enable = () => setShouldDisableAllCards(false);

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    timeout.current = setTimeout(() => setOpenCards([]), 500);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => clearTimeout(timeout);
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  };

  return (
    <div className="App">
      <header>
        <h3>Play the Flip Card Game</h3>
        <div>Select two cards with the same content consecutively to make them vanish.</div>
      </header>
      <Cards
        cards={cards}
        openCards={openCards}
        clearedCards={clearedCards}
        onCardClick={handleCardClick}
        isDisabled={shouldDisableAllCards}
      />
      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>
          {localStorage.getItem("bestScore") && (
            <div className="high-score">
              <span className="bold">Best Score:</span> {bestScore}
            </div>
          )}
        </div>
        <div className="restart">
          <Button onClick={handleRestart} color="primary" variant="contained">
            Restart
          </Button>
        </div>
      </footer>
      <Dialog open={showModal} disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>Hurray!!! You completed the challenge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You completed the game in {moves} moves. Your best score is {bestScore} moves.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Game;