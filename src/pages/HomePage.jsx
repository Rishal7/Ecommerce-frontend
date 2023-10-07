import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductCard } from "../components/ProductCard";
import { Dropdown } from "../components/Dropdown";

export const HomePage = () => {
  const [dropdown, setDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((response) => {
        setProducts(response.data.products);
        setCategory(response.data.categories);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setDropdown(false); // Close the dropdown when a category is selected
  };
  //   console.log(selectedCategory);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_id === selectedCategory)
    : products;

  //   console.log("Filtered Products", filteredProducts);

  return (
    <main>
      <button
        onClick={() => setDropdown(!dropdown)}
        className="text-white my-3 bg-blue-500 hover:bg-blue-600 text-base rounded-lg  px-5 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Category
        <span className="bi bi-chevron-down ml-2  text-lg font-extrabold"></span>
      </button>
      {dropdown && (
        <Dropdown category={category} onSelectCategory={handleSelectCategory} />
      )}

      <div className="flex flex-wrap justify-center lg:flex-row">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} category={category} />
        ))}
      </div>
    </main>
  );
};
