import { useEffect, useState } from "react";
import "./App.css";

import CardList from "./components/CardList";

function App() {
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,KS,QS,JS,0S,9S,AD,KD,QD,JD,0D,9D"
      );
      const data = await res.json();

      setDeck(data);
      setLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    async function fetchCards() {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=12`
      );
      const data = await res.json();
      const cards = data.cards;

      // Give the cards id
      for (let i = 0; i < cards.length; i++) {
        cards[i].active = true;
        cards[i].id = i;
        cards[i].src = "card-back.png";
        cards[i].clicked = false;
        // console.log(cards[i])
      }
      setCards(cards);
    }

    deck.deck_id && fetchCards();
  }, [deck]);

  if (loading) return <div className="App-header">Loading.....</div>;

  if (!deck) return <div>Error!!!</div>;

  return <div>{cards && <CardList list={cards} />}</div>;
}

export default App;
