import { FaTrash } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { ICartItems } from "../types";
import { PLACEHOLDER_IMAGE } from "../constants";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cart);
  const { cartItems } = cart;

  const addtoCartHandler = async (product: ICartItems, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id: number) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="py-3 px-1">
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty{" "}
          <Link className="underline" to="/">
            Go Back
          </Link>
        </Message>
      ) : (
        <div className="mt-2 flex flex-col space-y-5 justify-center items-center md:items-center md:flex-row md:space-x-5 md:px-20">
          <div className="md:basis-8/12 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
            <div className="w-full md:px-10">
              {cartItems.map((item) => (
                <div
                  key={item.product.productId}
                  className="flex flex-col divide-y-2 md:flex-row md:items-center md:justify-center  md:divide-y-0 my-3 px-4 md:px-10 pb-4 space-y-4 border-b last:border-b-0"
                >
                  <div className="flex justify-center items-center bg-red-200">
                    <img
                      src={item.product.image || PLACEHOLDER_IMAGE}
                      alt={item.product.name}
                      // style={{ maxWidth: '75px', maxHeight: '75px' }}
                      className="md:max-w-[80px] md:max-h-[80px]"
                    />
                  </div>
                  <Link
                    to={`/product/${item.id}`}
                    className="p-2 flex flex-col justify-center text-left md:flex-row md:items-center md:min-w-[200px] md:justify-center md:min-h-[70px] w-full hover:underline hover:decoration-gray-500"
                  >
                    {item.product.name}
                  </Link>
                  <p className="p-2 text-left w-full">${item.price}</p>
                  <div className="flex justify-between items-center w-full p-4 space-x-3">
                    <button
                      className={`py-1 flex items-center justify-center border rounded-sm bg-gray-200 md:min-w-[30px] hover:bg-gray-300 ${
                        item.qty === 1 &&
                        "opacity-45 pointer-events-none bg-slate-300"
                      }`}
                      type="button"
                      onClick={() => addtoCartHandler(item, item.qty - 1)}
                    >
                      <FaMinus />
                    </button>
                    <p>{item.qty}</p>
                    <button
                      className={`py-1 flex items-center justify-center border rounded-sm bg-gray-200 md:min-w-[30px] hover:bg-gray-300 ${
                        item.qty >= item.product.countInStock &&
                        "opacity-45 pointer-events-none bg-slate-300"
                      }`}
                      type="button"
                      onClick={() => addtoCartHandler(item, item.qty + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button
                    className="py-2 flex items-center justify-center border rounded-sm bg-gray-200 md:min-w-[50px] hover:bg-gray-300"
                    type="button"
                    onClick={() => removeFromCartHandler(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="md:basis-1/3 flex flex-col md:space-y-5 items-center space-y-2 divide-y-2 md:divide-y-0 w-full px-4 md:border md:border-solid md:rounded-lg md:min-h-[200px] md:p-4">
            <h2 className="w-full text-center md:text-start text-2xl text-gray-600">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            <p className="text-gray-600 text-lg md:text-xl w-full">
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.product.price, 0)
                .toFixed(2)}
            </p>
            <button
              type="button"
              className={`bg-gray-700 text-white p-3 w-[50%] text-center hover:bg-gray-600 border border-solid rounded-lg md:min-w-[95%] ${
                cartItems.length === 0 &&
                "opacity-85 pointer-events-none bg-slate-300"
              }`}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
