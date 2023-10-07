import axios from "axios";
import React, { useEffect, useState } from "react";

export const ExportHistory = () => {
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
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-600 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                exported Date
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Completion
              </th>
            </tr>
          </thead>
          <tbody>
            {/* @foreach ($export as $import) */}
            {/* @if ($import->executed) */}
            {items
              .filter((item) => item.executed)
              .map((item) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 text-blue-400 text-right">Completed</td>
                </tr>
              ))}
            {/* @endif */}
            {/* @endforeach */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
