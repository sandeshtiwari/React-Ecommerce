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
import PrivateUserRoute from "./components/PrivateUserRoute.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import UserListPage from "./pages/admin/UserListPage.tsx";
import ProductListPage from "./pages/admin/ProductListPage.tsx";
import ProductEditPage from "./pages/admin/ProductEditPage.tsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.tsx";
import PaymentSuccess from "./pages/PaymentSuccess.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import UserOrdersListPage from "./pages/admin/UserOrdersListPage.tsx";
import OrderListPage from "./pages/OrderListPage.tsx";
import EditMyUserProfile from "./pages/EditMyUserProfilePage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import WishlistPage from "./pages/WishlistPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LandingPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/categories/:category" element={<CategoryPage />} />
      {/* Protected user routes */}
      <Route path="" element={<PrivateUserRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/payment" element={<PaymentSuccess />} />
        <Route path="/profile/:username" element={<UserProfilePage />} />
        <Route path="/orders/:username" element={<OrderListPage />} />
        <Route path="/profile/:username/edit" element={<EditMyUserProfile />} />
        <Route path="/profile/:username/wishlist" element={<WishlistPage />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<UserOrdersListPage />} />
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
