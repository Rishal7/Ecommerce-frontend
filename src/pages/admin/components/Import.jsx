import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Import = () => {
  const token = sessionStorage.getItem("token");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [schedule, setSchedule] = useState(false);
  const [importStarted, setImportStarted] = useState(false);

  const handleSchedule = () => {
    setSchedule(!schedule);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setImportStarted(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("date", selectedDate);

    const apiUrl = schedule
      ? "http://localhost:8000/api/admin/schedule-import"
      : "http://localhost:8000/api/admin/import";

    axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Import successful!", response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error importing data:", error);
      });
  };

  // const ImportProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (importStarted) {
      const fetchData = async () => {
        try {
          let c = 0;
          const response = await axios.get(
            "http://localhost:8000/api/admin/import-progress"
          );
          setProgress(response.data.batch.progress);
          console.log(typeof response.data.batch.progress, "-", progress);
          if (response.data.batch.progress === 100 && c > 0) {
            console.log(response.data.batch.progress, "res");
            setImportStarted(false);
          }
          c++;
        } catch (error) {
          console.error("Error fetching progress data:", error);
        }
      };

      // Fetch data initially
      fetchData();

      // Poll for updates every 2 seconds (adjust the interval as needed)
      const intervalId = setInterval(fetchData, 1000);

      // Cleanup the interval when the component is unmounted
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [importStarted,progress]);

  return (
    <div>
      <div className=" ">
        <p className="block mb-6 text-lg font-semibold text-gray-600 dark:text-white capitalize">
          {schedule ? "Import now" : "Schedule an Import"}
        </p>
        <button
          onClick={() => handleSchedule()}
          type="submit"
          className="text-white  bg-blue-500 uppercase hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {schedule ? "Import now" : "Schedule"}
        </button>

        <div className="border border-b my-10 "></div>

        <p className="block mb-5 text-lg font-semibold text-gray-600 dark:text-white capitalize">
          {schedule ? "Schedule" : "Import now"}
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
          <div className="mb-10">
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
              onChange={handleFileChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white mb-5 bg-blue-500 uppercase hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {schedule ? "Schedule" : "Import now"}
          </button>
        </form>
        {progress < 100 ? (
          <>
            <div className="mt-4 mb-1 flex justify-between items-center">
              <span className="text-xs font-medium text-blue-700 dark:text-white">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </>
        ) : (
          <p className="mt-4 ml-1 text-blue-500 text-sm">Import completed</p>
        )}
      </div>
    </div>
  );
};
