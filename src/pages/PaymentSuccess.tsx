import { useLocation } from "react-router-dom";
import { useSetOrderPaidMutation } from "../slices/orderApiSlice";
import { useEffect, useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

interface OrderPaidResponse {
  status: string;
  message: string;
}

export default function PaymentSuccess() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const token = sp.get("token");
  const fail = sp.get("fail");

  const [response, setResponse] = useState<OrderPaidResponse | null>(null);

  const CenteredMessageWithIcon = ({
    title,
    message,
    color,
  }: {
    title: string;
    message: string;
    color: string;
  }) => {
    return (
      <div className="flex flex-col items-center justify-center mt-5">
        <TaskAltIcon sx={{ fontSize: 80, fill: color }} />
        <h1 className="text-black-500 text-3xl my-4">{title}</h1>
        <p className="text-black-500 text-lg">{message}</p>
      </div>
    );
  };

  if (!token || fail) {
    return (
      <CenteredMessageWithIcon
        title="Failed to process payment."
        message="Something went wrong. Please try again later."
        color="red"
      />
    );
  }

  const [setOrderPaid, { isLoading }] = useSetOrderPaidMutation();

  useEffect(() => {
    const makeOrderPaid = async () => {
      const res = await setOrderPaid(token).unwrap();
      console.log(res);
      setResponse(res);
    };
    makeOrderPaid();
  }, [token, setOrderPaid]);

  if (!response) {
    return (
      <CenteredMessageWithIcon
        title="Failed to process payment."
        message="Something went wrong. Please try again later."
        color="red"
      />
    );
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        response.status === "Success" && (
          <div className="flex flex-col justify-center items-center m-auto py-3 px-1">
            <CenteredMessageWithIcon
              title="Success!"
              message="Successfully processed your payment!"
              color="green"
            />
            <Link
              className="p-2 bg-gray-300 hover:bg-gray-400 hover:text-white border border-solid rounded-sm w-[100px] text-center my-5"
              to="/"
            >
              Go Home
            </Link>
          </div>
        )
      )}
    </>
  );
}
