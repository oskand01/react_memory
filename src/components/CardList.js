import Card from "./Card";
import { useState } from "react";
import { useEffect } from "react";

function CardList(props) {
  const [cardList, setCardList] = useState(props.list);
  const [selectedCards, setSelectedCards] = useState([]);
  let cards;

  console.log("RENDER CARDLIST");
  setCardsToRender(cardList);

  function setCardsToRender(list) {
    cards = [];
    for (let i = 0; i < list.length; i++) {
      cards.push(
        <Card
          key={i}
          index={i}
          imageAlt={list[i].src}
          imageSrc={list[i].image}
          selectCard={selectCard}
          isClicked={list[i].clicked}
          active={list[i].active}
        />
      );
    }
  }

  useEffect(() => {
    function compareCards() {
      const one = selectedCards[0];
      const two = selectedCards[1];
      setSelectedCards([]);

      const timer = setTimeout(() => {
        if (one.value.toString() === two.value.toString()) {
          for (let i = 0; i < cardList.length; i++) {
            if (one.id === cardList[i].id) {
              cardList[i].active = false;
            } else if (two.id === cardList[i].id) {
              cardList[i].active = false;
            }
          }
        } else {
          for (let i = 0; i < cardList.length; i++) {
            if (cardList[i].active === true) {
              cardList[i].clicked = false;
            }
          }
          console.log("FAILURE");
        }

        let list = [...cardList];
        setCardList(list);
      }, 300);

      return () => clearTimeout(timer);
    }

    selectedCards.length === 2 && compareCards();
  }, [selectedCards, cardList]);

  function selectCard(i) {
    if (!cardList[i].clicked) {
      cardList[i].clicked = true;
      setSelectedCards([cardList[i], ...selectedCards]);
    } else if (cardList[i].clicked) {
      cardList[i].clicked = false;
      let cards = selectedCards.filter((card) => card.clicked === true);
      setSelectedCards(cards);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {cards}
    </div>
  );
}

export default CardList;
