import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../hooks";
import { useGetUserOrdersQuery } from "../slices/orderApiSlice";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function OrderListPage() {
  const { username: profileUsername } = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    error,
  } = useGetUserOrdersQuery(userInfo?.username || "");

  useEffect(() => {
    if (!userInfo || !profileUsername || profileUsername === "") {
      navigate("/");
    }
  }, [userInfo, profileUsername, navigate]);

  if (isLoading) return <Loader />;

  if (error) return <Message variant="danger">Error fetching orders.</Message>;

  if (!userInfo)
    return (
      <Message variant="info">
        Please{" "}
        <Link className="underline" to={`/login?redirect=${profileUsername}`}>
          Login
        </Link>{" "}
        to view your profile.
      </Message>
    );

  return (
    <div className="flex h-full">
      <Sidebar username={profileUsername || ""} />
      <div className="flex-1 p-4">
        <div className="items-center mx-auto max-w-screen-lg">
          {orders && orders.length > 0 ? (
            <table className="table-auto w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Order Date</th>
                  <th className="px-4 py-2">Total Price</th>
                  <th className="px-4 py-2">Is Paid</th>
                  <th className="px-4 py-2">Paid Date</th>
                  <th className="px-4 py-2">Shipping Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  if (!order.paidAt) {
                    return;
                  }
                  return (
                    <tr key={order.orderId} className="border-b">
                      <td className="px-4 py-2">{order.orderId}</td>
                      <td className="px-4 py-2 text-center">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-center">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {order.paidAt ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {new Date(order.paidAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {order.deliveredAt ? "Delivered" : "In Progress"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
