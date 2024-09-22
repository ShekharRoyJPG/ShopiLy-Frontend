// import React from 'react'

import { Link } from "react-router-dom";
import bannerImage from "../../assets/header.png";

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">Up To 20% Discount on</h4>
        <h1>New Arrivals</h1>
        <p>
          Discover our latest products at an unbeatable discount, and save up to
          20% on all items with Our Women's fashion website Explore a curated
          collection of products, accessories, and footwear that caters to every
          taste and occasion.
        </p>
        <button className="btn">
          <Link to="/shop">Explore Now</Link>
        </button>
      </div>
      <div className="header__image">
        <img src={bannerImage} alt="Women's fashion" />
      </div>
    </div>
  );
};

export default Banner;
