import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../types"; // Your product type

interface ProductProps {
  product: IProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link to={`/product/${product.productId}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900">
          <Link to={`/product/${product.productId}`}>{product.name}</Link>
        </h5>
        <p className="text-gray-700">${product.price}</p>
      </div>
    </div>
  );
};

export default Product;
