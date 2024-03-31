import { useLocation } from "react-router-dom";
import { useSetOrderPaidMutation } from "../slices/orderApiSlice";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

interface OrderPaidResponse {
  status: string;
  message: string;
}

export default function PaymentSuccess() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const token = sp.get("token");

  const [response, setResponse] = useState<OrderPaidResponse | null>(null);

  if (!token) {
    return;
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
  return (
    <div>
      <h2>Payment Processing</h2>
      <p>{response ? response.message : <Loader />}</p>
    </div>
  );
}
