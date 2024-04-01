import { Link } from "react-router-dom";

interface CategoriesProps {
  category: string;
  imageUrl: string;
}

const Categories: React.FC<CategoriesProps> = ({ category, imageUrl }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link to={`/categories/${encodeURIComponent(category)}`}>
        <img
          src={imageUrl}
          alt={category}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900">
          <Link to={`/categories/${encodeURIComponent(category)}`}>
            {category}
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Categories;
