import axios from "axios";
import { toast } from "react-toastify";

export const NewManager = () => {
  const token = sessionStorage.getItem("token");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/register-manager",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Manager has been created successfully!", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to create manager", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-10">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
          >
            Name
          </label>
          <input
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
          >
            username
          </label>
          <input
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
          >
            email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6 hidden">
          <label
            htmlFor="roles"
            className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
          >
            roles
          </label>
          <input
            name="roles"
            id="roles"
            defaultValue="manager"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
          >
            password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <input type="hidden" name="_token" value="{{ csrf_token() }}" />

        <button
          type="submit"
          className="text-white bg-blue-500 uppercase hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Add
        </button>
      </form>
    </div>
  );
};
