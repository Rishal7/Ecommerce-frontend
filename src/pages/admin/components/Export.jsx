import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Export = () => {
  const token = sessionStorage.getItem("token");
  const [category, setCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [schedule, setSchedule] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((response) => {
        setCategory(response.data.categories);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSchedule = () => {
    setSchedule(!schedule);
  };

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsExporting(true);

    const formData = new FormData();
    formData.append("categories[]", selectedCategories);
    formData.append("date", selectedDate);

    console.log(formData);
    console.log(selectedCategories);

    const apiUrl = schedule
      ? "http://localhost:8000/api/admin/schedule-export"
      : "http://localhost:8000/api/admin/export";

    axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Export successful!", response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error exporting data:", error);
      })
      .finally(() => {
        setIsExporting(false);
      });
  };

  return (
    <div>
      <div className=" ">
        <p className="block mb-6 text-lg font-semibold text-gray-600 dark:text-white capitalize">
          {schedule ? "Export now" : "Schedule an Export"}
        </p>
        <button
          onClick={() => handleSchedule()}
          type="submit"
          className="text-white  bg-blue-500 uppercase hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {schedule ? "Export now" : "Schedule"}
        </button>

        <div className="border border-b my-10 "></div>

        <p className="block mb-5 text-lg font-semibold text-gray-600 dark:text-white capitalize">
          {schedule ? "Schedule" : "Export now"}
        </p>

        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          {schedule && (
            <div className="mb-6">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white uppercase"
              >
                date
              </label>
              <input
                type="datetime-local"
                value={selectedDate}
                onChange={handleDateChange}
                name="date"
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          )}
          <p className="text-md text-gray-600 mb-4 font-semibold">
            Select Categories
          </p>
          <div className="m-2 mb-6">
            {category.map((category) => (
              <div key={category.id} className="flex items-center mb-2">
                <input
                  id={`category${category.id}`}
                  type="checkbox"
                  name="categories[]"
                  value={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCheckboxChange(category.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
                <label
                  htmlFor={`category${category.id}`}
                  className="ml-3 text-md font-medium text-gray-600 capitalize"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>

          <button
            disabled={isExporting}
            type="submit"
            className="text-white mb-5 bg-blue-500 uppercase hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isExporting
              ? "Exporting..."
              : schedule
              ? "Schedule"
              : "Export now"}
          </button>
        </form>
      </div>
    </div>
  );
};
