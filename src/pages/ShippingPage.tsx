import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ICart } from "../types";
import { toast } from "react-toastify";

const ShippingPage = () => {
  const cart: ICart = useAppSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (address === "" || city === "" || postalCode === "" || country === "") {
      toast.error("Please provide all the fields.");
      return;
    }
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/login?redirect=/payment");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <CheckoutSteps step1 step2 />
      <h1 className="mb-4">Shipping</h1>
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 min-w-[50%] max-w-[50rem]"
      >
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            City
          </label>
          <input
            type="text"
            id="City"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="PostalCode"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="PostalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Country"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline min-w-full md:min-w-[8rem]"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;
