import { useEffect, useState } from "react";
import product from "../../data/products.json";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/feature/products/productsApi";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "blue", "gold", "green", "silver", "beige"],
  priceRanges: [
    {
      label: "Under $50",
      min: 0,
      max: 50,
    },
    {
      label: "$50 - $100",
      min: 50,
      max: 100,
    },
    {
      label: "$100 - $200",
      min: 100,
      max: 200,
    },
    {
      label: "Over $200",
      min: 200,
      max: Infinity,
    },
  ],
  size: ["all", "s", "m", "l", "xl"],
};

const ShopPage = () => {
  const [products, setProducts] = useState(product);
  const [filterState, setFilterState] = useState({
    categories: "all",
    colors: "all",
    priceRange: "",
  });

  // const [currentPage, setCurrentPage] = useState(1);
  // const [productsPerPage] = useState(8);
  // const { category, color, priceRange } = filterState;
  // const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  // const {
  //   data: { products = [], totalPages, totalProducts } = {},
  //   error,
  //   isLoading,
  // } = useFetchAllProductsQuery({
  //   category: category !== "all" ? category : "",
  //   color: color !== "all" ? color : "",
  //   minPrice: isNaN(minPrice) ? "" : minPrice,
  //   maxPrice: isNaN(maxPrice) ? "" : maxPrice,
  //   page: currentPage,
  //   limit: productsPerPage,
  // });

  // // filtering functions
  const applyFilters = () => {
    let filteredProducts = product;

    // Filter by category
    if (filterState.categories && filterState.categories !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filterState.categories
      );
    }

    // Filter by color
    if (filterState.colors && filterState.colors !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === filterState.colors
      );
    }

    // Filter by price range
    if (filterState.priceRange) {
      const [minPrice, maxPrice] = filterState.priceRange
        .split("-")
        .map(Number);
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= minPrice &&
          product.price <= maxPrice
      );
    }

    setProducts(filteredProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [filterState]);

  // Clear filters
  const clearFilters = () => {
    setFilterState({
      categories: "all",
      colors: "all",
      priceRange: "",
    });
  };


  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Error Loading products</div>;
  // }

  // const startProduct = (currentPage - 1) * productsPerPage + 1;
  // const endProduct = startProduct + products.length -1;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop page</h2>
        <p className="section__subheader">
          Discover the Hottest Picks: Elevate Your Style with Our Curated
          Collection of Trending Women's Fashion.!
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* left side */}
          <ShopFiltering
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilters={clearFilters}
          />

          {/* right side */}
          <div>
            <h3 className="text-xl font-medium mb-4">
              {/* Showing {startProduct} to {endProduct} of {totalProducts} products */}
            </h3>
            <ProductCards products={products} />

            {/* pagination controls */}
            <div className="mt-6 flex justify-center">
              <button
              // disabled = {currentPage === 1}
                // onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Previous
              </button>
              {/* {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "text-gray-700"
                    } rounded-md ${
                      currentPage === page ? "border-primary" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )} */}
              <button
              // disabled = {currentPage === totalPages}
                // onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
