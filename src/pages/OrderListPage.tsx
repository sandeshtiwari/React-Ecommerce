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

  const fetchUsername =
    userInfo?.role === "ADMIN" ? profileUsername : userInfo?.username;

  const {
    data: orders,
    isLoading,
    error,
  } = useGetUserOrdersQuery(fetchUsername || "");

  useEffect(() => {
    if (!userInfo || !profileUsername || profileUsername === "") {
      navigate("/");
    }
  }, [userInfo, profileUsername, navigate]);

  if (isLoading) return <Loader />;

  console.log(userInfo?.username + " ---- " + userInfo?.role);
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
        <div className="overflow-x-auto">
          {orders && orders.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Is Paid
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paid Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shipping Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  if (!order.paidAt) {
                    return;
                  }
                  return (
                    <tr key={order.orderId} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {order.paidAt ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {new Date(order.paidAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
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
