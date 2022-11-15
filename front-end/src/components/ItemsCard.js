import React from "react";
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

const ItemsCard = ({itemPhoto,itemName,itemsId }) => {
  console.log(itemName, itemsId)
    // console.log(gamingItem)
  return (
    <div className="CarouselCards">
    <img  className="carouselPicture" src={itemPhoto}/>
    <p>{itemName}</p>
    <a href={`/items/${itemsId}`} className="text-reset">
    <div className="carouselButton">
                <p >View Item</p>
                </div>
              </a>
      {/* <div className="carousel-wrapper"> */}
        
    </div>
  );
};

export default ItemsCard;
