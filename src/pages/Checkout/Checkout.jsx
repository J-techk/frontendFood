import React, { useContext, useState } from "react";
import "./Checkout.css";
import stripe from "../../assets/stripe_logo.png";
import CartTotal from "../../components/CartTotal/CartTotal";
import { FoodContext } from "../../context/FoodContext";
// import { product } from "../../assets/assets";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";

const Checkout = () => {
  const [method, setMethod] = useState("cod");

  const {
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    token,
    navigate,
    products,
  } = useContext(FoodContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    state: "",
    phone: "",
    country: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;

    const value = event.target.value;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log("🔥 PLACE ORDER BUTTON CLICKED");

    try {
      let orderItems = [];

      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          const itemInfo = products.find((product) => product._id === item);

          if (itemInfo) {
            orderItems.push({
              ...itemInfo,
              quantity: cartItems[item],
            });
          }
        }
      }

      console.log("ORDER ITEMS:", orderItems);

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      console.log("ORDER DATA:", orderData);

      if (method === "cod") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          {
            headers: { token },
          },
        );

        console.log("ORDER RESPONSE:", JSON.stringify(response.data, null, 2));

        if (response.data.success) {
          toast.success("Order placed successfully");

          setCartItems({});

          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      } else if (method === "stripe") {
        const responseStripe = await axios.post(
          backendUrl + "/api/order/stripe",
          orderData,
          { headers: { token } },
        );

        if (responseStripe.data.success) {
          const { session_url } = responseStripe.data;
          window.location.replace(session_url);
        } else {
          toast.error(responseStripe.data.message);
        }
      }
    } catch (error) {
      console.log("PLACE ORDER ERROR:", error);

      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div>
      <form className="form-container" onSubmit={onSubmitHandler}>
        <div className="form-left">
          <fieldset className="payment-method">
            <legend>Payment Options</legend>
            <div className="payment-options">
              <div
                onClick={() => setMethod("stripe")}
                className={`payment-option ${method === "stripe" ? "selected" : ""}`}
              >
                <img src={stripe} alt="" className="payment-logo" />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className={`payment-option ${method === "cod" ? "selected" : ""}`}
              >
                <span className="payment-text">CASH ON DELIVERY</span>
              </div>
            </div>
          </fieldset>

          <div className="form-title">
            <h2>Shipping Address</h2>
          </div>

          <div className="form-row">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              type="text"
              className="form-input"
              placeholder="First Name"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              type="text"
              className="form-input"
              placeholder="Last Name"
            />
          </div>

          <input
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            type="email"
            className="form-input"
            placeholder="Email Address"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            type="text"
            className="form-input"
            placeholder="Phone Number"
          />
          <input
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            type="text"
            className="form-input"
            placeholder="Street Address"
          />
          <div className="form-row">
            <input
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              type="text"
              className="form-input"
              placeholder="City"
            />
            <input
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              type="text"
              className="form-input"
              placeholder="State"
            />
          </div>

          <div className="form-row">
            <input
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              type="text"
              className="form-input"
              placeholder="Zipcode"
            />
            <input
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              type="text"
              className="form-input"
              placeholder="Country"
            />
          </div>
        </div>

        <div className="form-right">
          <CartTotal />
          <div className="form-submit">
            <button type="submit" className="submit-button">
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
