import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [signup, { isLoading }] = useSignupMutation();

  const submitHandler = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = await signup({
        email,
        firstName,
        lastName,
        password,
        username,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Signup success!");
      navigate(redirect);
    } catch (err) {
      const message =
        (err as any)?.data?.message ||
        (err as any)?.err?.message ||
        (err as any)?.message;

      if (message) {
        toast.error("Failed to signup. " + message);
      } else {
        toast.error("Failed to signup due to an unexpected error.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-full max-w-[28rem]">
        <h1 className="mb-5 text-3xl text-center">Sign Up</h1>
        {isLoading && <Loader />}
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              placeholder="Enter Firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              placeholder="Enter Lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="user-name"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col items-center justify-between space-y-3">
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[50%]"
            >
              Register
            </button>

            <div className="inline-block align-baseline font-bold text-sm text-gray-500">
              Already have an account?{" "}
              <Link className="text-blue-500 hover:text-blue-800" to="/login">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
