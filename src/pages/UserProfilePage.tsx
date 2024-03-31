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
    <div className="flex h-full">
      <Sidebar username={profileUsername || ""} />
      <div className="flex-1 p-8">
        <p>
          {profileUsername} {userInfo?.username}
        </p>
      </div>
    </div>
  );
}
