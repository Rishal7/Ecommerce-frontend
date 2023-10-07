export const Dropdown = ({ category, onSelectCategory }) => {
  return (
    <div
      id="dropdown"
      className="z-20 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <div
            onClick={() => onSelectCategory(category.id)}
            className="block px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            All
          </div>
        </li>
        {category.map((category) => (
          <li key={category.id}>
            <div
              onClick={() => onSelectCategory(category.id)}
              className="block px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {category.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
