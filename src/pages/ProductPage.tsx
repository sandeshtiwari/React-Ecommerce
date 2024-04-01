import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart } from "../slices/cartSlice";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { ICartItems } from "../types";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PLACEHOLDER_IMAGE } from "../constants";
import {
  useAddWishListMutation,
  useCheckWishListQuery,
  useRemoveWishListMutation,
} from "../slices/wishlistSlice";
import { skipToken } from "@reduxjs/toolkit/query";

const ProductPage = () => {
  const { id: productId } = useParams();

  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);

  // const product = products.find((p) => p.id === productId);
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId ?? "");

  const [addWishList] = useAddWishListMutation();
  const [removeWishList] = useRemoveWishListMutation();

  const { data: wishList, refetch: refetchWishList } = useCheckWishListQuery(
    userInfo && productId
      ? { username: userInfo.username, productId }
      : skipToken
  );

  const handleAddToWishlist = async () => {
    if (!userInfo || !productId) {
      return;
    }
    try {
      await addWishList({ username: userInfo.username, productId });
      toast.success("Added to wishlist!");
      refetchWishList();
    } catch (error) {
      toast.error("Could not add to wishlist.");
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!userInfo || !productId) {
      return;
    }
    try {
      await removeWishList({ username: userInfo.username, productId });
      toast.success("Removed from wishlist!");
      refetchWishList();
    } catch (error) {
      toast.error("Could not remove from wishlist.");
    }
  };

  useEffect(() => {
    if (userInfo && productId) {
      refetchWishList();
    }
  }, [userInfo, productId, refetchWishList]);

  // const handleWishList = async () => {
  //   console.log("CLicked");
  //   if (wishList) {
  //     await removeWishList({
  //       username: userInfo?.username,
  //       productId: productId,
  //     });
  //   } else {
  //     await addWishList({ username: userInfo?.username, productId: productId });
  //   }
  //   refetchWishList();
  // };

  const [qty, setQty] = useState(1);
  const [allowedQty, setAllowedQty] = useState(0);
  useLayoutEffect(() => {
    if (product) {
      const existItem = cartItems.find(
        (x) => x.id === parseInt(product.productId)
      );
      if (existItem !== undefined) {
        setAllowedQty(product.countInStock - existItem.qty);
      } else {
        setAllowedQty(product.countInStock);
      }
    }
  }, [product, cartItems]);

  const addToCartHandler = () => {
    if (product) {
      const existItem = cartItems.find(
        (x) => x.id === parseInt(product.productId)
      );

      const newCartItem: ICartItems = {
        id: parseInt(product.productId),
        product,
        price: product.price,
        qty: existItem ? existItem.qty + qty : qty,
        itemsPrice: product.price * qty,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: product.price * qty,
      };
      setAllowedQty((currentQty) => currentQty - qty);
      dispatch(addToCart(newCartItem));
      toast.success("Item added to cart successfully!");
    } else {
      toast.error("Failed to add to cart.");
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-5">
        <Link to="/" className="text-gray-700 font-semibold hover:underline">
          Go Back
        </Link>
        {isLoading ? (
          <Loader />
        ) : error || !product ? (
          <Message variant="danger">Product not found</Message>
        ) : (
          <div className="grid md:grid-cols-2 gap-10 mt-5">
            {/* <div className="bg-white p-5 rounded-lg shadow"> */}
            <img
              src={product.image || PLACEHOLDER_IMAGE}
              alt={product.name}
              className="rounded-lg mx-auto"
            />
            {/* </div> */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <p className="text-xl font-semibold">Price: ${product.price}</p>
              <p className="text-gray-700">{product.description}</p>
              <div className="border-t border-gray-200 pt-3">
                {userInfo && (
                  <div
                    className="wishlist-icon"
                    onClick={
                      wishList ? handleRemoveFromWishlist : handleAddToWishlist
                    }
                  >
                    {wishList ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </div>
                )}

                <p className="text-gray-900">
                  Status:{" "}
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  {allowedQty < 1 && product.countInStock !== 0 && (
                    <p className="mt-5 mb-1">Everything in cart</p>
                  )}
                </p>
                {product.countInStock > 0 && allowedQty > 0 && (
                  <div className="mt-3">
                    <label
                      htmlFor="qty"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Qty
                    </label>
                    <select
                      id="qty"
                      name="qty"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="mt-1 block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                    >
                      {[...Array(allowedQty).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  // disabled={product.countInStock === 0 || allowedQty < 1}
                  className={`mt-5 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:bg-gray-300 ${
                    (product.countInStock === 0 || allowedQty < 1) &&
                    "opacity-85 pointer-events-none bg-slate-300"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
