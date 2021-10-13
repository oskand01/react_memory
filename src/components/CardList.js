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
      const timer = setTimeout(() => {
        console.log("COMPARE CARDS");
        const one = selectedCards[0].value.toString();
        const two = selectedCards[1].value.toString();

        if (one === two) {
          for (let i = 0; i < cardList.length; i++) {
            if (selectedCards[0].id === cardList[i].id) {
              cardList[i].active = false;
            } else if (selectedCards[1].id === cardList[i].id) {
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
        setSelectedCards([]);

        let list = [...cardList];
        setCardList(list);
      }, 500);

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
