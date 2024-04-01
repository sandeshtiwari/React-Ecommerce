import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import Loader from "../components/Loader";

export default function EditMyUserProfile() {
  const { username: profileUsername } = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // State for form fields
  const [email, setEmail] = useState(userInfo?.email || "");
  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [lastName, setLastName] = useState(userInfo?.lastName || "");
  const [username, setUsername] = useState(userInfo?.username || "");
  const [oldUsername, setOldUsername] = useState(userInfo?.username || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (!userInfo || userInfo.username !== profileUsername) {
      navigate("/");
      return;
    }
  }, [userInfo, profileUsername, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!userInfo) {
      navigate("/");
      return;
    }
    const token = userInfo.token;

    if (newPassword !== confirmNewPassword) {
      toast.error("Pase make sure new passwords match.");
      return;
    }
    try {
      const response = await updateUser({
        email,
        firstName,
        lastName,
        oldUsername,
        username,
        newPassword,
        token,
      }).unwrap();
      toast.success(
        "Successfully updated user profile! Please login with your new credentials"
      );
      dispatch(logout());
      navigate(`/login?username=${response.username}`);
    } catch (err) {
      toast.error("Failed to update user profile!");
    }
  };

  return (
    <div className="flex h-full min-h-screen">
      <Sidebar username={profileUsername || ""} />
      <div className="flex-1 p-8">
        {isLoading && <Loader />}
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Edit User Profile</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Old Username
            </label>
            <input
              className="border p-2 rounded-lg mb-2"
              value={oldUsername}
              onChange={(e) => setOldUsername(e.target.value)}
              placeholder="Old Username"
              type="text"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="border p-2 rounded-lg mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              className="border p-2 rounded-lg mb-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              type="text"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              className="border p-2 rounded-lg mb-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              type="text"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Username
            </label>
            <input
              className="border p-2 rounded-lg mb-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="New Username"
              type="text"
            />

            <div className="flex flex-col col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                className="border p-2 rounded-lg mb-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                type="password"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm New Password
              </label>
              <input
                className="border p-2 rounded-lg"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm New Password"
                type="password"
              />
            </div>

            <div className="flex justify-end col-span-1">
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
