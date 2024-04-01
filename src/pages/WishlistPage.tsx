import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart } from "../slices/cartSlice";
import { PLACEHOLDER_IMAGE } from "../constants";
import { useGetWishlistQuery } from "../slices/wishlistSlice";
import { ICartItems, IProduct } from "../types";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.auth);
  const {
    data: wishlistItems,
    isLoading,
    isError,
    refetch,
  } = useGetWishlistQuery(userInfo?.username || "");
  const { cartItems } = useAppSelector((state) => state.cart);
  console.log("WishList " + wishlistItems);
  console.log("CartItems " + cartItems);

  const addToCartHandler = (product: IProduct) => {
    console.log(product);
    if (product) {
      const existItem = cartItems.find(
        (x) => x.id === parseInt(product.productId)
      );
      console.log(existItem?.qty + " -- " + product.countInStock);
      if (
        product.countInStock === 0 ||
        (existItem && existItem.qty >= product.countInStock)
      ) {
        toast.error("No more stock available to add to your cart!");
        return;
      }

      const newCartItem: ICartItems = {
        id: parseInt(product.productId),
        product,
        price: product.price,
        qty: existItem ? existItem.qty + 1 : 1,
        itemsPrice: product.price * 1,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: product.price * 1,
      };
      dispatch(addToCart(newCartItem));
      toast.success("Item added to cart successfully!");
    } else {
      toast.error("Failed to add to cart.");
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <Message>There was an error</Message>;

  return (
    <div className="py-3 px-10">
      {!wishlistItems || wishlistItems.length === 0 ? (
        <Message>
          Your wishlist is empty{" "}
          <Link className="underline" to="/">
            Go Back
          </Link>
        </Message>
      ) : (
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
          {wishlistItems.map((item) => (
            <div
              key={item.productId}
              className="grid grid-cols-3 items-center justify-between border-b pb-4 mb-4 gap-4"
            >
              <div className="flex items-center col-span-2">
                <img
                  src={item.image || PLACEHOLDER_IMAGE}
                  alt={item.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="min-w-0">
                  <Link
                    to={`/product/${item.productId}`}
                    className="text-lg font-semibold truncate"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm truncate">{item.description}</p>
                </div>
              </div>
              <div className="text-lg flex justify-between items-center gap-4">
                <div>${item.price}</div>
                <button
                  onClick={() => addToCartHandler(item)}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded whitespace-nowrap"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
