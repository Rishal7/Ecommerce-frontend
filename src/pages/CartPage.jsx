import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const CartPage = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();
  const [totalItems, setTotalItems] = useState();
  const token = sessionStorage.getItem("token");
  const [count, setCount] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {
        setItems(response.data.cartItems);
        setTotal(response.data.total);
        setTotalItems(
          response.data.cartItems.reduce((acc, item) => acc + item.quantity, 0)
        );
        console.log("cart Items", response.data.cartItems);
        console.log("Total", response.data.total);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token, count]);

  const handleRemoveItem = (id) => {
    axios
      .delete(`http://localhost:8000/api/cart/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        setCount(count + 1);
      })
      .catch((error) => {
        console.error("Error removing item:", error);
        toast.error(error.message);
      });
  };

  const handleIncreaseQuantity = (id) => {
    axios
      .patch(`http://localhost:8000/api/cart/increase/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        setCount(count + 1);
      })
      .catch((error) => {
        console.error("Error increasing quantity:", error);
      });
  };

  const handleDecreaseQuantity = (id) => {
    axios
      .patch(`http://localhost:8000/api/cart/decrease/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        setCount(count + 1);
      })
      .catch((error) => {
        console.error("Error increasing quantity:", error);
      });
  };

  return (
    <div>
      <div className="container  mx-auto mt-10">
        <div className="flex rounded-lg shadow-md my-10">
          <div className="w-3/4 rounded-s-lg bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{totalItems} Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Total
              </h3>
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center hover:bg-gray-100 hover:rounded -mx-8 px-6 py-5"
              >
                <div className="flex w-2/5">
                  {/* <!-- product --> */}
                  <div className="w-20">
                    <img
                      className="h-24 rounded"
                      src={`http://localhost:8000/storage/${item.product.thumbnail}`}
                      alt={item.product.name}
                    />
                  </div>
                  <div className="flex flex-col justify-around ml-4 ">
                    <span className="font-bold text-sm capitalize">
                      {item.product.name}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg
                    className="fill-current text-gray-500 hover:text-red-500 w-3 cursor-pointer"
                    viewBox="0 0 448 512"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>

                  <input
                    className="mx-2 border border-gray-300 text-center bg-inherit rounded w-8"
                    disabled
                    value={item.quantity}
                  />
                  <svg
                    className="fill-current text-gray-500 hover:text-blue-500 w-3 cursor-pointer"
                    viewBox="0 0 448 512"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${item.product.price}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}

            <Link
              to="/"
              className="flex items-center font-semibold text-blue-600 bi bi-arrow-lef gap-3 text-sm mt-10"
            >
              <i className="bi bi-arrow-left text-base"></i>
              Continue Shopping
            </Link>
          </div>

          <div
            id="summary"
            className="w-1/4 px-8 rounded-e-lg py-10 bg-slate-200"
          >
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {totalItems}
              </span>
              <span className="font-semibold text-sm">${total}</span>
            </div>

            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full rounded"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${total}</span>
              </div>
              <button className="bg-blue-500 rounded font-semibold hover:bg-blue-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
