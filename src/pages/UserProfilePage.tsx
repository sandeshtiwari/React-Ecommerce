import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function UserProfilePage() {
  const { username: profileUsername } = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);

  const [editAuthorized, setEditAuthorized] = useState(false);

  const navigate = useNavigate();

  if (!userInfo) {
    <Message variant="info">
      Please{" "}
      <Link className="underline" to={`/login?redirect=${profileUsername}`}>
        Login
      </Link>{" "}
      to view User profile.
    </Message>;
  }

  useEffect(() => {
    if (!userInfo || !profileUsername || profileUsername === "") {
      navigate("/");
    }
    if (userInfo!.username === profileUsername) {
      setEditAuthorized(true);
    }
  }, [userInfo, profileUsername, navigate]);

  return (
    <div className="flex h-full min-h-screen">
      <Sidebar username={profileUsername || ""} />
      <div className="flex-1 p-8">
        {userInfo ? (
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-medium">Email:</h3>
                <p className="text-gray-600">{userInfo.email}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">First Name:</h3>
                <p className="text-gray-600">{userInfo.firstName}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Last Name:</h3>
                <p className="text-gray-600">{userInfo.lastName}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Username:</h3>
                <p className="text-gray-600">{userInfo.username}</p>
              </div>
            </div>
            {editAuthorized && (
              <button
                onClick={() => navigate(`/profile/${profileUsername}/edit`)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Profile
              </button>
            )}
          </div>
        ) : (
          <Message variant="info">
            Please{" "}
            <Link
              className="underline"
              to={`/login?redirect=${profileUsername}`}
            >
              Login
            </Link>{" "}
            to view the User profile.
          </Message>
        )}
      </div>
    </div>
  );
}
