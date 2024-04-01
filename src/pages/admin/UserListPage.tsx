import React, { useState } from "react";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetAllUsersQuery } from "../../slices/userApiSlice";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

const UserListPage = () => {
  const [pageNo, setPageNo] = useState(0);
  const pageSize = 2; // You can adjust pageSize as needed

  const {
    data: usersData,
    isLoading,
    error,
  } = useGetAllUsersQuery({ pageNo, pageSize });

  const users = usersData?.users || [];
  const totalNumberOfUsers = usersData?.totalNumberOfUsers || 0;

  const totalPages = Math.ceil(totalNumberOfUsers / pageSize);
  const isNextPageDisabled = pageNo + 1 >= totalPages;

  const goToNextPage = () =>
    setPageNo((prev) => (isNextPageDisabled ? prev : prev + 1));
  const goToPreviousPage = () => setPageNo((prev) => (prev > 0 ? prev - 1 : 0));

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">Failed to fetch users</Message>;

  return (
    <div className="flex">
      <Sidebar username="ADMIN" />
      <div className="flex-grow p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.username}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-around items-center mt-4">
          <button
            onClick={goToPreviousPage}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            disabled={pageNo === 0}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            disabled={isNextPageDisabled}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
