import { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import { clearCartItems } from "../slices/cartSlice";

const Header = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const toggleMobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const { cartItems } = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [logoutApiCall, { error }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      const res = await logoutApiCall().unwrap();
      console.log(res);
      dispatch(logout());
      dispatch(clearCartItems());
      toast.success(res.message);
    } catch (err) {
      toast.error("Failed to Logout " + error);
    }
  };

  return (
    <nav className="relative w-full px-5 py-5 mx-auto md:px-6 md:py-6 bg-gray-800 text-white ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {/* <img src={logo} alt="logo" /> */}
          <Link to="/">
            <h1 className="text-3xl font-bold text-white">ShopHub</h1>
          </Link>
        </div>
        <div className="hidden items-center space-x-4 font-bold md:flex text-gray-300">
          <Link className="flex items-center space-x-1" to="/cart">
            <FaShoppingCart />
            <div className="flex space-x-1 items-center">
              <p>Cart</p>
              {cartItems.length > 0 && (
                <div className="bg-green-700 rounded-full px-2 ml-1">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </div>
          </Link>
          {!userInfo ? (
            <Link className="flex w-full items-center space-x-2" to="/login">
              <FaUser />
              <div>Login</div>
            </Link>
          ) : (
            <>
              <Link to={`/profile/${userInfo.username}/wishlist`}>
                Wishlist
              </Link>
              <Link
                className="flex w-full items-center space-x-2"
                to={
                  userInfo.role === "ADMIN"
                    ? "/admin/productlist"
                    : `/profile/${userInfo.username}`
                }
              >
                <FaUser />
                {userInfo.role === "ADMIN" ? (
                  <div>Dashboard</div>
                ) : (
                  <div>{userInfo.username}</div>
                )}
              </Link>

              <div className="hover:cursor-pointer" onClick={logoutHandler}>
                Logout
              </div>
            </>
          )}
        </div>
        <button
          className={`${
            openMobileMenu && "open"
          } block hamburger md:hidden focus:outline-none`}
          onClick={toggleMobileMenuHandler}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
        <div
          className={`absolute ${
            !openMobileMenu ? "hidden" : "flex"
          }  p-6 rounded-lg bg-gray-800 left-0 right-0 top-20 z-100 md:hidden`}
        >
          <div className="flex flex-col items center justify-center w-full space-y-6 font-bold rounded-sm text-gray-300">
            <Link className="flex w-full items-center space-x-2" to="/cart">
              <FaShoppingCart />
              <div className="flex space-x-1 items-center">
                <p>Cart</p>
                {cartItems.length > 0 && (
                  <div className="bg-green-700 rounded-full px-2 ml-1">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </div>
                )}
              </div>
            </Link>
            {!userInfo ? (
              <Link className="flex w-full items-center space-x-2" to="/login">
                <FaUser />
                <div>Login</div>
              </Link>
            ) : (
              <>
                {userInfo && userInfo.role === "ADMIN" && (
                  <>
                    <Link
                      className="flex w-full items-center space-x-2"
                      to="/admin/productlist"
                    >
                      <div>Products</div>
                    </Link>
                    <Link
                      className="flex w-full items-center space-x-2"
                      to="/admin/orderlist"
                    >
                      <div>Orders</div>
                    </Link>
                    <Link
                      className="flex w-full items-center space-x-2"
                      to="/admin/userlist"
                    >
                      <div>Users</div>
                    </Link>
                  </>
                )}
                <Link
                  className="flex w-full items-center space-x-2"
                  to={`/profile/${userInfo.username}`}
                >
                  <FaUser />
                  <div>{userInfo.username}</div>
                </Link>

                <div className="hover:cursor-pointer" onClick={logoutHandler}>
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
