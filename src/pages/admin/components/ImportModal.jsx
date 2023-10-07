export const ImportModal = () => {
  return (
    <div>
      <div className=" overflow-x-hidden overflow-y-auto md:h-full  md:inset-0 z-50 justify-center items-center">
        <div className="relative w-full max-w-md px-4 h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="authentication-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Schedule an import
              </h3>

              <form
                className="space-y-6"
                method="POST"
                action="/admin/schedule-import"
                encType="multipart/form-data"
              >
                <div className="mb-6">
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
                  >
                    date
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    id="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="file"
                    className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
                  >
                    file
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Schedule Import
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
