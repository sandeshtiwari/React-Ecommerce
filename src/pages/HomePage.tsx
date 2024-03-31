import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { IProduct } from "../types";
import Loader from "../components/Loader";

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  // console.log(products);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h2>Error...</h2>
      ) : (
        <div className="flex items-center flex-col justify-center flex-wrap md:flex-row w-full py-3 px-1 ">
          {products?.map((product: IProduct) => (
            <div
              key={product.productId}
              className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
            >
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
