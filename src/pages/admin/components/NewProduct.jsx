import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const NewProduct = ({ product }) => {
  const token = sessionStorage.getItem("token");
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    file: null,
    category_id: product?.category_id || "",
  });

  console.log("New Product", product);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/products/create")
      .then((response) => {
        setCategory(response.data.categories);
        console.log("catgeory: ", response.data.categories);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    if (!!formData.file) {
      formDataToSend.append("thumbnail", formData.file);
    }
    formDataToSend.append("category_id", formData.category_id);

    try {
      let response;
      if (product === true) {
        response = await axios.post(
          "http://localhost:8000/api/admin/products",
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        formDataToSend.append("_method", "PUT");
        response = await axios.post(
          `http://localhost:8000/api/admin/update/${product.id}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding/updating product:", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="mx-10"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
          >
            name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
          >
            price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="file"
            className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
          >
            File
          </label>
          <input
            type="file"
            name="thumbnail"
            id="file"
            onChange={handleFileChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
          >
            category
          </label>
          <select
            name="category_id"
            id="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-44 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize"
          >
            {category.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-500 uppercase hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
    </div>
  );
};
