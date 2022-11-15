import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { stripePaymentMethodHandler } from "./script";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { db } from "../services/Firebase";
import axios from "axios";
import { apiURL } from "../util/apiURL";


const API = apiURL();


export default function CheckoutForm(props) {
  const { item, totalPrice } = props;
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")
  // const [selectedItemDetails, setSelectedItemDetails] = useState(null);

  const user = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();

  const handleSelectedItem = async (id) => {

    let res = await axios.get(`${API}/items/${id}`);
    // setSelectedItemDetails(res.data);
    return res.data
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElem = elements.getElement(CardNumberElement)
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      let selectedItemDetails = await handleSelectedItem(props.item_id);
      addDoc(collection(db, "bookings"), {
        buyer_id: user.uid,
        item_details: selectedItemDetails,
        seller_id: selectedItemDetails.listedby_id,
        item_id: props.item_id,
        message: message,
        total_price: totalPrice,
      });
      // props.setPaymentCompleted(true);
    } catch (error) {
      console.log(error);
    }
    console.log(elements)
      const paymentMethodObj = {
        type: 'card',
        card: cardElem,
        billing_details: {
          name,
          email
        },
      };
      const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);
// // 
      stripePaymentMethodHandler({
        result: paymentMethodResult,
        price: item.price
      }, handleResponse);
  };
//     // callback method to handle the response
  const handleResponse = (response) => {
    setLoading(false);
    if (response.error) {
      setErrorMsg("error happening");
      return;
    }
    props.setPaymentCompleted(response.success ? true : false);
    const updateItem = async (id) => {
      console.log(id)
      try {
        await axios.put(`${API}/items/${id}`, {boughtby_id: user.uid, sold : true});
      } catch (err) {
        console.log(err);
      }
    };
    updateItem(props.item_id);

  };

  return (
   
      <section className="checkoutContainer">
        <h4 className="d-flex justify-content-between align-items-center mb-3"></h4>
        <h>Pay with card</h>
        <form onSubmit={handleSubmit}>
        <div className="paymentForm">
          <div className="row">
            <label htmlFor="cc-name">Name on card</label>
            <div className="col-md-6 mb-3 ">
              <input
                id="cc-name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <label htmlFor="cc-email">Email</label>
            <div className="col-md-6 mb-3">
              <input
                id="cc-email"
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
   
          <div className="row">
            <label htmlFor="cc-number">Card Number</label>
            {/* <div className=""> */}
              <CardNumberElement id="cc-number" className="form-control cardNumber" />
            {/* </div> */}
          

          <label htmlFor="expiry">Expiration Date</label>
          <div className="col-md-6 mb-3">
            <CardExpiryElement id="expiry" className="form-control" />

            <label htmlFor="cvc">CVC</label>
            <div className="col-md-6 mb-3 cardCvc" >
              <CardCvcElement id="cvc" className="form-control" />
            </div>
          </div>
          </div>
          <hr className="mb-4" />
          <button
            className="btn btn-dark w-20 button1 Button p-1"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></div>
            ) : (
              `$${totalPrice}`
            )}
          </button>
          {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
          </div>
        </form>
      </section>
   
  );
}
