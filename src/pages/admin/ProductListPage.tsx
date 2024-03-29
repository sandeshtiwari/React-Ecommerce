import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsAdminQuery,
} from "../../slices/productApiSlice";
import { IProduct } from "../../types";
import { FaPen, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { PLACEHOLDER_IMAGE } from "../../constants";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../slices/authSlice";
import { clearCartItems } from "../../slices/cartSlice";

const ProductListPage = () => {
  const [pageNo, setPageNo] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<IProduct | null>(null);
  const [pageSize] = useState(2);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: { products = [], totalNumberOfProducts = 0 } = {},
    isLoading,
    error,
    refetch,
  } = useGetProductsAdminQuery({
    pageNo,
    pageSize,
  });

  useEffect(() => {
    refetch();
  }, [pageNo, pageSize, refetch]);

  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();

  const [deleteProductMutation, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const [logoutApiCall] = useLogoutMutation();

  // const { data: totalNumberOfProducts } = useGetProductsCountQuery();

  const totalPages = Math.ceil((totalNumberOfProducts || 0) / pageSize);
  const isNextPageDisabled = pageNo + 1 >= totalPages;

  // Pagination Handlers
  const goToNextPage = () => setPageNo((prevPageNo) => prevPageNo + 1);
  const goToPreviousPage = () =>
    setPageNo((prevPageNo) => Math.max(prevPageNo - 1, 0));

  const addProductHandler = async () => {
    try {
      const { productId } = await createProduct().unwrap();
      navigate(`/admin/product/${productId}/edit?newProduct=true`);
    } catch (err) {
      toast.error("Failed to create product!");
    }
  };

  const handleModalOpen = (p: IProduct) => {
    setIsModalOpen(true);
    setDeleteProduct(p);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDeleteProduct(null);
  };

  const deleteHandler = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    // console.log(deleteProduct);
    try {
      if (deleteProduct === null) {
        toast.error("Failed to delete product!");
        return;
      }
      // console.log("Deleting " + deleteProduct);
      const response = await deleteProductMutation(deleteProduct).unwrap();
      toast.success(response.message);
      handleCloseModal();
      refetch(); // Refetch the product list to reflect the deletion
    } catch (error) {
      toast.error("Failed to delete product! " + error);
      console.error("Delete error:", error);
      const res = await logoutApiCall().unwrap();
      console.log(res);
      dispatch(logout());
      dispatch(clearCartItems());
    }
  };

  return (
    <>
      {isLoading || createProductLoading || deleteLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Failed to get products</Message>
      ) : (
        <div className="flex flex-col items-center mx-auto max-w-screen-lg p-4">
          <div className="self-end mb-2 w-full flex justify-end">
            <button
              onClick={addProductHandler}
              className="px-4 py-2 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded"
            >
              Add new Product
            </button>
          </div>
          <table className="table-auto w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 hidden md:table-cell">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2 hidden md:table-cell">Brand</th>
                <th className="px-4 py-2 hidden md:table-cell">Category</th>
                <th className="px-4 py-2 hidden md:table-cell">Stock</th>
                <th className="px-4 py-2 hidden md:table-cell">Rating</th>
                <th className="px-4 py-2 hidden md:table-cell">Reviews</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2 md:table-cell">Edit</th>
                <th className="px-4 py-2 md:table-cell">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: IProduct) => (
                <tr key={product.productId} className="border-b">
                  <td className="px-4 py-2 text-center hidden md:table-cell">
                    <img
                      src={product.image || PLACEHOLDER_IMAGE}
                      alt={product.name}
                      className="mx-auto max-w-[50px] max-h-[50px]"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/product/${product.productId}`}
                      className="hover:underline"
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {product.brand}
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {product.category}
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {product.countInStock}
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {product.rating}
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {product.numReviews}
                  </td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2 text-center md:table-cell">
                    <Link
                      className="flex items-center justify-center border rounded-sm bg-gray-200 hover:bg-gray-300 p-2"
                      to={`/admin/product/${product.productId}/edit`}
                    >
                      <FaPen />
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-center md:table-cell">
                    <button
                      className="flex items-center justify-center border rounded-sm bg-gray-200 hover:bg-gray-300 p-2"
                      onClick={() => handleModalOpen(product)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-around items-center mt-4 w-full">
            <button
              onClick={goToPreviousPage}
              className={`px-4 py-2 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded ${
                pageNo === 0 && "pointer-events-none bg-slate-200"
              }`}
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              className={`px-4 py-2 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded ${
                isNextPageDisabled && "pointer-events-none bg-slate-200"
              }`}
            >
              Next
            </button>
          </div>
          <Modal
            name={deleteProduct?.name || ""}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={deleteHandler}
          />
        </div>
      )}
    </>
  );
};

export default ProductListPage;
