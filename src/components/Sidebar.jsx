import React from "react";
import { Link, useParams } from "react-router-dom";

export const Sidebar = () => {
  const section = useParams();
  console.log("Style:", section);

  return (
    <>
      <aside>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
          <div className=" flex flex-col shadow-lg left-0 w-64 bg-white h-screen border-r">
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Menu
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    to="/admin/products?list=new"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-slate-500 pr-6 ${
                      section.product === "products"
                        ? "bg-slate-100 border-l-4  border-blue-600 rounded-e-md mr-1 "
                        : ""
                    }`}
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      All Products
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/products/create"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      New Product
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/register-manager"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      New Manager
                    </span>
                  </Link>
                </li>

                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Import
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    to="/admin/import"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      Import
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/schedule-import"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      Scheduled Imports
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/schedule-import/history"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      Past Imports
                    </span>
                  </Link>
                </li>
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Export
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    to="/admin/export"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      Export
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/schedule-export"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      Scheduled Exports
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/schedule-export/history"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      Past Exports
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
