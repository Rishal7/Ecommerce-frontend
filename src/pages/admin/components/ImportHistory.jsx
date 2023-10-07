import axios from "axios";
import React, { useEffect, useState } from "react";

export const ImportHistory = () => {
  const [imports, setImports] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/schedule-import")
      .then((response) => {
        setImports(response.data.imports);
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
                imported Date
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Completion
              </th>
            </tr>
          </thead>
          <tbody>
            {imports
              .filter((item) => item.executed)
              .map((item) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 text-blue-400 text-right">
                    Completed
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
