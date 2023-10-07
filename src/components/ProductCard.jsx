import { Link } from "react-router-dom";

export const ProductCard = ({ product, category }) => {
  const { name, price, category_id, thumbnail } = product;

  const image = `http://localhost:8000/storage/${thumbnail}`;

  const c_name = category.map((item) => {
    if (item.id === category_id) {
      return item.name;
    }
    return null; // or any default value if no match is found
  });

  return (
    <div className=" m-4 max-w-xs w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to="#">
        <img className="p-8 rounded-t-lg" src={image} alt={name} />
      </Link>
      <div className="px-5 pb-5">
        <Link to="#">
          <h5 className="text-xl font-semibold capitalize tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>
        <div className="flex items-center my-4">
          <button className="px-3 py-1 border border-blue-500 rounded-lg text-blue-500 text-xs font-semibold capitalize">
            {c_name}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            ${price}
          </span>
          <Link
            to="#"
            className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
};
