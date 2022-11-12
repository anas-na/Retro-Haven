import React from "react";
// import Carousel from "react-elastic-carousel";
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

const ItemsCard = ({itemPhoto,itemName }) => {
    // console.log(gamingItem)
  return (
    <div className="card h-10 m-3">
      {/* <div className="carousel-wrapper"> */}
        {/* <Carousel breakPoints={breakPoints}> */}
        <MDBCard className=''>
          <MDBCardImage
          className="cardImage"
            src={itemPhoto}
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>{itemName}</MDBCardTitle>
            {/* <MDBCardText>
              This is a longer card with supporting text below as a natural lead-in to additional content.
              This content is a little bit longer.
            </MDBCardText> */}
          </MDBCardBody>
        </MDBCard>
        {/* </Carousel> */}
      {/* </div> */}
    </div>
  );
};

export default ItemsCard;
