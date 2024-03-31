import { Link } from "react-router-dom";

interface ICheckoutStepsProps {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
}

const CheckoutSteps = ({ step1, step2, step3 }: ICheckoutStepsProps) => {
  return (
    <div className="flex justify-center items-center mt-4 mb-4">
      {step1 ? (
        <Link className="mx-4" to="/login">
          Sign In
        </Link>
      ) : (
        <Link
          to="/login"
          className="text-gray-400 mx-4"
          style={{ pointerEvents: "none" }}
        >
          Sign In
        </Link>
      )}
      {step2 ? (
        <Link className="mx-4" to="/shipping">
          Shipping
        </Link>
      ) : (
        <Link
          to="/shipping"
          className="text-gray-400 mx-4"
          style={{ pointerEvents: "none" }}
        >
          Shipping
        </Link>
      )}
      {step3 ? (
        <Link className="mx-4" to="/placeorder">
          Checkout
        </Link>
      ) : (
        <Link
          to="/placeorder"
          className="text-gray-400 mx-4"
          style={{ pointerEvents: "none" }}
        >
          Checkout
        </Link>
      )}
    </div>
  );
};

export default CheckoutSteps;
