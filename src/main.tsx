import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import store from "./store";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage.tsx";
import PrivateUserRoute from "./components/PrivateUserRoute.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import OrderListPage from "./pages/admin/OrderListPage.tsx";
import UserListPage from "./pages/admin/UserListPage.tsx";
import ProductListPage from "./pages/admin/ProductListPage.tsx";
import ProductEditPage from "./pages/admin/ProductEditPage.tsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      {/* Protected user routes */}
      <Route path="" element={<PrivateUserRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListPage />} />
        <Route path="/admin/userlist" element={<UserListPage />} />
        <Route path="/admin/productlist" element={<ProductListPage />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
