import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { NewProduct } from "./NewProduct";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const token = sessionStorage.getItem("token");
  const [count, setCount] = useState(1);
  const [listView, setListView] = useState(true);
  const [edit, setEdit] = useState();
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const id = searchParam.get("list");

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/products")
      .then((response) => {
        setProducts(response.data.products);
        console.log("catgeory: ", response.data.categories);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [count]);

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/admin/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        setCount(count + 1);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (id === "new") {
      setListView(true);
    } else {
      setListView(false);
    }
  }, [id]);

  const handleChange = (product) => {
    setEdit(product);
    navigate(`/admin/products?list=${product.id}`);
  };

  return (
    <>
      {listView ? (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="mb-4 shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm  text-gray-900 capitalize">
                              <a href="/products/{{ $product->name }}">
                                {product.name}
                              </a>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm ">
                          <button
                            onClick={() => handleChange(product)}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            Edit
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm ">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-xs text-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NewProduct product={edit} />
      )}
    </>
  );
};
