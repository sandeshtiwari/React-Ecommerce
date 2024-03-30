import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { useAppSelector } from "../hooks";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { ICartItems } from "../types";
import { toast } from "react-toastify";

const PlaceOrderPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);

  if (!userInfo) {
    return (
      <Message>
        Please login! <Link to="/login?redirect=placeorder">Login</Link>
      </Message>
    );
  }

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const getOrderItems = (cartItems: ICartItems[]) => {
    const items = cartItems.map((item) => {
      return { productId: Number(item.product.productId), quantity: item.qty };
    });
    return items;
  };

  const createOrderHandler = async () => {
    try {
      const response = await createOrder({
        username: userInfo.username,
        items: getOrderItems(cart.cartItems),
        paymentMethod: cart.paymentMethod,
        shippingAddress: {
          address: cart.shippingAddress.address,
          city: cart.shippingAddress.city,
          postalCode: cart.shippingAddress.postalCode,
          country: cart.shippingAddress.country,
        },
      }).unwrap();
      console.log(response);
    } catch (err) {
      toast.error("Failed!");
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <div className="flex flex-wrap -mx-4 md:px-32">
        <div className="w-full lg:w-2/3 px-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
              <h2 className="text-xl mb-2">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl mb-2">Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </div>

            <div>
              <h2 className="text-xl mb-2">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div>
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex mb-4">
                      <div className="flex-none w-20">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-auto rounded"
                        />
                      </div>
                      <div className="flex flex-grow pl-4 items-center">
                        <Link
                          to={`/product/${item.id}`}
                          className="text-gray-800 hover:underline hover:decoration-gray-800"
                        >
                          {item.product.name}
                        </Link>
                      </div>
                      <div className="flex items-center">
                        {item.qty} x ${item.price} = $
                        {(item.qty * item.product.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 px-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl mb-4">Order Summary</h2>

            <div className="mb-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>${(cart.itemsTotalPrice! as number).toFixed(2)}</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>${(cart.shippingTotalPrice! as number).toFixed(2)}</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between">
                <div>Tax</div>
                <div>${(cart.totalFinalPrice! as number).toFixed(2)}</div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between">
                <div>Total</div>
                <div>${(cart.totalFinalPrice! as number).toFixed(2)}</div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                type="button"
                className={`bg-gray-700 text-white p-3 w-[50%] text-center hover:bg-gray-600 border border-solid rounded-lg md:min-w-[95%] ${
                  cart.cartItems.length === 0 && "opacity-50 cursor-not-allowed"
                }`}
                disabled={cart.cartItems.length === 0}
                onClick={createOrderHandler}
              >
                Continue To Payment
              </button>
              {/* isLoading && <Loader /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
