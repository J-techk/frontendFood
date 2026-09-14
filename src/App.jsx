import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Order from "./pages/Order/Order";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const backendUrl = "https://backend-foods-eight.vercel.app";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Order />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
