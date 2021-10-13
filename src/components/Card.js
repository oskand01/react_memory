import { useEffect, useState } from "react";

function Card({ index, imageSrc, imageAlt, selectCard, isClicked, active }) {
  const [cardClicked, setCardClicked] = useState();
  let clicked = isClicked
  
  useEffect(() => {
    setCardClicked(clicked)
  },[clicked])
  
  function toggleClicked() {
    if (!cardClicked) {
      clicked = true
      setCardClicked(clicked);
      selectCard(index);
    } else {
      clicked = false
      setCardClicked(clicked);

      selectCard(index);
    }

    //console.log("clicked ", code)
  }

  if(cardClicked && !active) {
    return (
      <div style={{ padding: ".5rem", opacity: "0.5" }}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
    );
  } /* else if (!cardClicked && !active) {
    return (
      <div  style={{ padding: ".5rem" }}>
        <img src={imageAlt} alt={imageAlt} />
      </div>
    );
  } */
  else if (cardClicked && active ) {
    return (
      <div className="" onClick={toggleClicked} style={{ padding: ".5rem" }}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
    );
  } else if (!cardClicked && active){
    return (
      <div onClick={toggleClicked} style={{ padding: ".5rem" }}>
        <img src={imageAlt} alt={imageAlt} />
      </div>
    );
  }
}

export default Card;
