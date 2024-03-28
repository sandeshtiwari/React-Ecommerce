import { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart } from "../slices/cartSlice";
import { ICartItems } from "../types";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PLACEHOLDER_IMAGE } from "../constants";

const ProductPage = () => {
  const { id: productId } = useParams();

  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector((state) => state.cart);

  // const product = products.find((p) => p.id === productId);
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId ?? "");

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
        product, // add product to display product info in cart?
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
    <div className="flex flex-col">
      <Link
        to="/"
        className="p-2 bg-gray-300 hover:bg-gray-400 hover:text-white border border-solid rounded-sm w-20 h-[2.7rem] text-center"
      >
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error || !product ? (
        <Message variant="danger">Error</Message>
      ) : (
        <div className="mt-2 flex flex-col space-y-5 justify-center items-center md:flex-row md:space-x-5 md:items-start">
          <img
            src={product.image || PLACEHOLDER_IMAGE}
            alt={product.name}
            style={{ maxWidth: "500px", maxHeight: "500px" }}
          />
          <div className="flex flex-col px-3 divide-y-2 space-y-3 justify-between text-gray-500 w-full md:max-w-96">
            <h3>{product.name}</h3>
            <div className="pt-2">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
            <p className="pt-5">Price: ${product.price}</p>
            <p className="pt-5">Description: {product.description}</p>
          </div>
          <div className="flex flex-col items-center w-full md:w-48">
            <div className="flex justify-between w-full border border-solid rounded-sm p-4">
              <p>Price:</p>
              <strong>${product.price}</strong>
            </div>
            <div className="flex justify-between w-full border border-solid rounded-sm p-4">
              <p>Status:</p>
              <strong>
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </strong>
            </div>
            {product.countInStock > 0 && allowedQty > 0 && (
              <div className="flex justify-between w-full border border-solid rounded-sm p-4">
                <p>Qty</p>
                <div>
                  <select
                    name=""
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="block px-2 w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring"
                  >
                    {[...Array(allowedQty).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {allowedQty < 1 && product.countInStock !== 0 && (
              <p className="w-full border border-solid rounded-sm p-4 text-center">
                Everything in cart
              </p>
            )}
            {allowedQty < 1 && product.countInStock === 0 && (
              <p className="w-full border border-solid rounded-sm p-4 text-center">
                Product Out of Stock
              </p>
            )}
            <div className="w-full border border-solid rounded-sm p-4 text-center">
              <button
                className={`bg-gray-700 text-white p-3 w-[50%] hover:bg-gray-600 border border-solid rounded-lg md:w-full ${
                  (product.countInStock === 0 || allowedQty < 1) &&
                  "opacity-85 pointer-events-none bg-slate-300"
                }`}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
