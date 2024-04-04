import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Admin from "./pages/admin/admin.js";
import CreateAccount from "./pages/create-account.js";
import Error from "./pages/error.js";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import Settings from "./pages/settings.js";
import AddUser from "./pages/admin/user/add-user.js";
import EditUser from "./pages/admin/user/edit-user.js";
import ViewUsers from "./pages/admin/user/view-users.js";
import ViewItems from "./pages/admin/item/view-items.js";
import AddItem from "./pages/admin/item/add-item.js";
import EditItem from "./pages/admin/item/edit-item.js";
import ViewDiscountCodes from "./pages/admin/discount-code/view-discount-codes.js";
import AddDiscountCode from "./pages/admin/discount-code/add-discount-code.js";
import EditDiscountCode from "./pages/admin/discount-code/edit-discount-code.js";
import "./index.css";
import ViewImages from "./pages/admin/image/view-images.js";
import AddImage from "./pages/admin/image/add-image.js";
import ShoppingCart from "./pages/shopping-cart.js";
import Order from "./pages/order.js";
import ViewOrders from "./pages/admin/order/view-orders.js";
import OrderConfirmed from "./pages/order-confirmed.js";
import UserOrders from "./pages/orders.js";
import ViewPayments from "./pages/admin/payment/view-payments.js";
import EditPayment from "./pages/admin/payment/edit-payment.js";
import AddPayment from "./pages/admin/payment/add-payment.js";
import Animals from "./pages/shopping/animals.js";
import PageFooter from "./components/PageFooter.js";

const instance = axios.create({
  baseURL: "https://localhost:8080",
});

instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
instance.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET, POST, PUT, DELETE";
instance.defaults.headers.common["Access-Control-Allow-Headers"] = "*";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  function NotAuthed({ children }) {
    return user ? <>{children}</> : <Navigate to="/" />;
  }
  function NotAdmin({ children }) {
    return user && user.admin ? <>{children}</> : <Navigate to="/home" />;
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes className="content">
          <Route index element={<Login />} />
          <Route
            path="/home"
            element={
              <NotAuthed>
                <Home />
              </NotAuthed>
            }
          />
          <Route
            path="/orders"
            element={
              <NotAuthed>
                <UserOrders />
              </NotAuthed>
            }
          />

          <Route path="/create-account" element={<CreateAccount />} />
          <Route
            path="/settings"
            element={
              <NotAuthed>
                <Settings />
              </NotAuthed>
            }
          />
          <Route
            path="/admin"
            element={
              <NotAdmin>
                <Admin />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/view-users"
            element={
              <NotAdmin>
                <ViewUsers />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/add-user"
            element={
              <NotAdmin>
                <AddUser />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/edit-user/:id"
            element={
              <NotAdmin>
                <EditUser />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/view-items"
            element={
              <NotAdmin>
                <ViewItems />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/add-item"
            element={
              <NotAdmin>
                <AddItem />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/edit-item/:id"
            element={
              <NotAdmin>
                <EditItem />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/view-discount-codes"
            element={
              <NotAdmin>
                <ViewDiscountCodes />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/view-images"
            element={
              <NotAdmin>
                <ViewImages />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/add-image"
            element={
              <NotAdmin>
                <AddImage />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/add-discount-code"
            element={
              <NotAdmin>
                <AddDiscountCode />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/edit-discount-code/:id"
            element={
              <NotAdmin>
                <EditDiscountCode />
              </NotAdmin>
            }
          />
          <Route
            path="/shop/:animal"
            element={
              <NotAuthed>
                <Animals />
              </NotAuthed>
            }
          />
          <Route
            path="/shopping-cart"
            element={
              <NotAuthed>
                <ShoppingCart />
              </NotAuthed>
            }
          />
          <Route
            path="/order"
            element={
              <NotAuthed>
                <Order />
              </NotAuthed>
            }
          />
          <Route
            path="/order/:id"
            element={
              <NotAuthed>
                <OrderConfirmed />
              </NotAuthed>
            }
          />
          <Route
            path="/admin/view-orders"
            element={
              <NotAdmin>
                <ViewOrders />
              </NotAdmin>
            }
          />

          <Route
            path="/admin/view-payments"
            element={
              <NotAdmin>
                <ViewPayments />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/edit-payment/:id"
            element={
              <NotAdmin>
                <EditPayment />
              </NotAdmin>
            }
          />
          <Route
            path="/admin/add-payment"
            element={
              <NotAdmin>
                <AddPayment />
              </NotAdmin>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <PageFooter />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
