import { useState } from "react";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetOrdersAdminQuery } from "../../slices/orderApiSlice";
import Sidebar from "../../components/Sidebar";

const UserOrderListPage = () => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(2);

  const {
    data: ordersData,
    isLoading,
    error,
  } = useGetOrdersAdminQuery({ pageNo, pageSize });

  const orders = ordersData?.orders || [];
  const totalNumberOfOrders = ordersData?.totalNumberOfOrders || 0;

  const totalPages = Math.ceil(totalNumberOfOrders / pageSize);
  const isNextPageDisabled = pageNo + 1 >= totalPages;

  const goToNextPage = () =>
    setPageNo((prev) => (isNextPageDisabled ? prev : prev + 1));
  const goToPreviousPage = () => setPageNo((prev) => (prev > 0 ? prev - 1 : 0));

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">Failed to fetch orders</Message>;

  const handleToggleDelivered = (orderId: string) => {
    console.log("Toggled Delivered for Order ID:", orderId);
  };

  return (
    <div className="flex">
      <Sidebar username="ADMIN" />
      <div className="flex-grow p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Is Paid
                </th>

                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                  Delivered Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell whitespace-nowrap text-center">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {order.paidAt ? "Yes" : "No"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={order.deliveredAt ? true : false}
                        onChange={() => handleToggleDelivered(order.orderId)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-around items-center mt-4 w-full">
          <button
            onClick={goToPreviousPage}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>
          {/* Add more pagination logic as needed */}
          <button
            onClick={goToNextPage}
            disabled={isNextPageDisabled}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrderListPage;
