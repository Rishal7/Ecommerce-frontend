import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ExportList = () => {
  const token = sessionStorage.getItem("token");
  const [count, setCount] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/schedule-export")
      .then((response) => {
        setItems(response.data.exports);
        console.log(response.data);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [count]);

  const handleDelete = (itemId) => {
    axios
      .delete(`http://localhost:8000/api/admin/schedule-export/${itemId}`, {
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
      });
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                scheduled Date
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Cancel</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => !item.executed)
              .map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="font-medium text-blue-500 hover:text-blue-600"
                      type="button"
                      data-modal-toggle="authentication-modal"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="font-medium  text-red-500 hover:text-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
