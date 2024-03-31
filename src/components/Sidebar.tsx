import { Link } from "react-router-dom";

const Sidebar = ({ username }: { username: string }) => {
  return (
    <div className="h-screen w-50 md:w-64  bg-gray-800 text-white flex flex-col">
      <Link to={`/profile/${username}`} className="p-4 hover:bg-gray-700">
        User Profile
      </Link>
      <Link to={`/orders/${username}`} className="p-4 hover:bg-gray-700">
        Orders List
      </Link>
    </div>
  );
};

export default Sidebar;
