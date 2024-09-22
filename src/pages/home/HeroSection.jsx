// import React from "react";
import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";
const HeroSection = () => {
  const cards = [
    {
      id: 1,
      image: card1,
      title: "New Arrivals",
      description: "Discover our latest products at an unbeatable discount",
      trend: "2024 Trends",
    },
    {
      id: 2,
      image: card2,
      title: "Best Sellers",
      description: "Check out the top-selling products in our store",
      trend: "2024 Trends",
    },
    {
      id: 3,
      image: card3,
      title: "Exclusive Offers",
      description: "Get the latest discounts and promotions",
      trend: "2024 Trends",
    },
  ];
  return (
    <section className="section__container hero__container">
      {cards.map((card) => (
        <div key={card.id} className="hero__card">
          <img src={card.image} alt={card.title} />
          <div className="hero__content">
            <p>{card.trend}</p>
            <h4>{card.title}</h4>
            {/* <p>{card.description}</p> */}
            <a href="#">Discover More</a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
