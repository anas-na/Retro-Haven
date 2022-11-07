import axios from "axios";
import { useState, useEffect } from "react";
import { apiURL } from "../util/apiURL.js";
import ItemListItem from "./ItemListItem";
import LoadingScreen from "./LoadingScreen.js";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
const API = apiURL();

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const sortByAsc = () => {
    const sortedItems = [...items].sort((a, b) => a.price - b.price);
    setItems(sortedItems);
  };

  const sortByDesc = () => {
    setItems([...items].sort((a, b) => b.price - a.price));
  };
  
  const fetchItems = () => {
    setLoading(true);
    axios
      .get(`${API}/items/availableitems`)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);
  console.log(items)

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <section className="itemsContainer">
          <div className="searchContainer">
            <input
              type="text"
              placeholder="Search For Items..."
              className="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <h1>Items For Sale</h1>

          <label>Sort By</label>
		<button className="Button" onClick={sortByAsc}>$ - $$$</button>
		<button className="Button" onClick={sortByDesc}>$$$ - $</button>

          <div className="allItemsContainer">
          {/* <MDBContainer  className="my-5 text-center singleItem"> */}
      {/* <MDBRow>
        <MDBCol md="12" lg="4" className="mb-4"> */}
            {items
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item) => {
                return <ItemListItem key={item.id} item={item} />;
              })}
              {/* </MDBCol>
        </MDBRow> */}
      {/* </MDBContainer> */}
          </div>
        </section>
      )}
    </div>
    
  );
};

export default ItemsList;
