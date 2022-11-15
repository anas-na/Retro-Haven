import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { apiURL } from "../util/apiURL.js";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import ItemsCard from "./ItemsCard.js";
import ItemsList from "./ItemsList.js";
import Carousel from "react-elastic-carousel";
import {
  MDBTypography
} from "mdb-react-ui-kit";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

const API = apiURL();

const GamingItems = () => {
  const [gamingItems, setGamingItems] = useState([]);

  const fetchGamingItems = async () => {
    try {
      const res = await axios.get(`${API}/categories/1/items`);
      setGamingItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGamingItems();
  }, []);

  // console.log(gamingItems)
  return (
    <div className="Carousel">
          
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints} className="carousel " >
          {gamingItems.map(gamingItem => {
            {/* console.log(gamingItem) */}
            return (
              <ItemsCard key={gamingItem.id} itemPhoto={gamingItem.photo} itemName= {gamingItem.name} itemsId={gamingItem.id} />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default GamingItems;
