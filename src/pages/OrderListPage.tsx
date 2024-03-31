import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAppSelector } from "../hooks";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function OrderListPage() {
  const { username: profileUsername } = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);

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
  }, [userInfo, profileUsername, navigate]);

  return (
    <div className="flex h-full">
      <Sidebar username={profileUsername || ""} />
      <div className="flex-1 p-8">
        <p>
          {profileUsername} {userInfo?.username} Order List Page
        </p>
      </div>
    </div>
  );
}
