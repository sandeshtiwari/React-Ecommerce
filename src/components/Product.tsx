import { Link } from "react-router-dom";
import Rating from "./Rating";
import { IProduct } from "../types";
import { PLACEHOLDER_IMAGE } from "../constants";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  return (
    <div
      className="my-3 p-3 mx-auto rounded border border-solid border-gray-400 shadow-md"
      style={{ maxWidth: "500px" }}
    >
      <Link to={`/product/${product.productId}`}>
        <img
          src={product.image || PLACEHOLDER_IMAGE}
          alt=""
          className="rounded"
        />
      </Link>
      <div>
        <Link to={`/product/${product.productId}`}>
          <div className="text-xl overflow-hidden whitespace-nowrap">
            <strong className="block max-w-[100%] overflow-hidden text-ellipsis">
              {product.name}
            </strong>
          </div>
        </Link>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <h3>${product.price}</h3>
      </div>
    </div>
  );
}
