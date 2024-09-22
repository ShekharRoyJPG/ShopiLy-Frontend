import { useState } from "react";
import ProductCards from "./ProductCards";
import products from "../../data/products.json";
const TrendingProducts = () => {
  const [visibleproducts, setVisbleProducts] = useState(8);
  const handleShowMore = () => {
    setVisbleProducts((prev) => prev + 4);
  };
  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover the Hottest Picks: Elevate Your Style with Our Curated
        Collection of Trending Woman's Fashion Products.
      </p>
      {/* Products Cards */}
      <div className="mt-12">
        <ProductCards products={products.slice(0, visibleproducts)} />
      </div>
      {/* load more product btn */}
      <div className="product__btn">
        {visibleproducts < products.length && (
          <button className="btn" onClick={handleShowMore}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
