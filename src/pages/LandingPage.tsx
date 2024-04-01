import { useGetProductsCategoryQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Categories from "../components/Categories"; // Ensure you have this component set up

export default function LandingPage() {
  const { data: categories, isLoading, error } = useGetProductsCategoryQuery();

  if (!categories) {
    return <Message variant="danger">Failed to load categories</Message>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Browse by Categories
        </h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">Failed to load categories</Message>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories?.map(({ category, imageUrl }) => (
              <Categories
                key={category}
                category={category}
                imageUrl={imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
