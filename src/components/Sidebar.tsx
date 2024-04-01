import { Link } from "react-router-dom";

const Sidebar = ({ username }: { username: string }) => {
  return (
    <div className="h-screen sticky top-0 w-64 bg-gray-800 text-white flex flex-col">
      {username === "ADMIN" ? (
        <>
          <Link to="/admin/productlist" className="p-4 hover:bg-gray-700">
            Products
          </Link>
          <Link to="/admin/orderlist" className="p-4 hover:bg-gray-700">
            Orders List
          </Link>
          <Link to="/admin/userlist" className="p-4 hover:bg-gray-700">
            Orders List
          </Link>
        </>
      ) : (
        <>
          <Link to={`/profile/${username}`} className="p-4 hover:bg-gray-700">
            User Profile
          </Link>
          <Link to={`/orders/${username}`} className="p-4 hover:bg-gray-700">
            Orders List
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
