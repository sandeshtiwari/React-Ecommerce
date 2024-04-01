import { useLocation, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Rating from "../../components/Rating";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { PLACEHOLDER_IMAGE } from "../../constants";
import Sidebar from "../../components/Sidebar";

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  if (productId === undefined) {
    return;
  }
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const [newProductCheck, setNewProductCheck] = useState(false);

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(productId ?? "");

  const [uploadProductImage, { isLoading: uploadLoading }] =
    useUploadProductImageMutation();

  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const result = await uploadProductImage({
          formData,
          productId,
        }).unwrap();
        // console.log("Upload success, image URL:", result.securedUrl);
        setImageUrl(result.securedUrl);
        toast.success("Uploaded image successfully!");
      } catch (error) {
        console.error("Upload failed", error);
        toast.error("Failed to upload image.");
      }
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (
      name === "" ||
      brand === "" ||
      category === "" ||
      description === "" ||
      price === 0
    ) {
      toast.warn("Please enter value for all the required* fields");
      return;
    }
    try {
      await updateProduct({
        productId,
        name,
        brand,
        category,
        description,
        price,
        countInStock,
      }).unwrap();
      refetch();
      // console.log(result);
      toast.success("Successfully Updated Product!");
      // navigate("/admin/productlist");
    } catch (err) {
      console.log(err);
      toast.error("Failed");
    }
  };

  useEffect(() => {
    if (product) {
      setImageUrl(product.image);
      setName(product.name);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [product, setImageUrl]);

  useEffect(() => {
    const newProduct = sp.get("newProduct");
    if (newProduct) {
      toast.success("Successfully created a new product!");
      setNewProductCheck(true);
    }
  }, [search]);

  if (isLoading) return <Loader />;
  if (error || !product)
    return <Message variant="danger">Error loading</Message>;

  return (
    <div className="flex min-h-screen">
      <Sidebar username="ADMIN" />
      <div className="flex-grow py-4 px-8">
        <h2 className="text-2xl font-bold mb-5">
          {!newProductCheck ? "Edit Product" : "Add New Product Details"}
        </h2>
        {uploadLoading || (updateLoading && <Loader />)}
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name*
            </label>
            <input
              type="text"
              id="productName"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand Name*
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category*
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price*
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Count In Stock*
            </label>
            <input
              type="text"
              id="countInStock"
              name="countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reviews
            </label>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div className="flex justify-left items-center">
              <img
                src={imageUrl || PLACEHOLDER_IMAGE}
                alt={name}
                className="md:max-w-[80px] md:max-h-[80px]"
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Upload Image
            </button>
          </div>

          <div>
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description*
            </label>
            <textarea
              required
              id="productDescription"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;
