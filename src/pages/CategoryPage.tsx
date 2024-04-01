import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";

export default function CategoryPage() {
  const { category } = useParams();
  if (!category) {
    return <Message variant="danger">Failed to load category</Message>;
  }
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(category);

  if (!products) {
    return <Message variant="danger">Failed to load products</Message>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-5">Products in "{category}"</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.toString()}</Message>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <Product key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
