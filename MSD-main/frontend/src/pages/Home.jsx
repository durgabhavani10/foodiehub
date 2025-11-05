import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>🍴 Welcome to FoodieHub</h1>
            <p>Delicious meals delivered fast. Order now and enjoy!</p>
            <div className="hero-buttons">
              <Link to="/menu" className="btn btn-order">
                Order Now
              </Link>
              <Link to="/about" className="btn btn-learn">
                Learn More
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Delicious food"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fast Delivery</h3>
            <p>Get your food delivered within 30 minutes or it's free!</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍔</div>
            <h3>Fresh Food</h3>
            <p>We use only the freshest ingredients in all our dishes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Quality Service</h3>
            <p>Rated 4.8/5 by our satisfied customers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Affordable prices without compromising on quality.</p>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="popular-items">
        <h2>Popular Items</h2>
        <div className="popular-grid">
          <div className="popular-item">
            <img src="https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-chicken-Biryani.jpg" alt="Biryani" />
            <h3>Hyderabadi Biryani</h3>
            <p>₹280</p>
            <Link to="/menu#biryanis" className="btn btn-small">View Menu</Link>
          </div>
          <div className="popular-item">
            <img src="https://images.slurrp.com/prod/recipe_images/transcribe/dinner/Chicken-Mandi.webp" alt="Mandi" />
            <h3>Chicken Mandi</h3>
            <p>₹750</p>
            <Link to="/menu#mandis" className="btn btn-small">View Menu</Link>
          </div>
          <div className="popular-item">
            <img src="https://orders.popskitchen.in/storage/2024/09/image-148.png" alt="Manchurian" />
            <h3>Chicken Manchurian</h3>
            <p>₹240</p>
            <Link to="/menu#fast-foods" className="btn btn-small">View Menu</Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Order?</h2>
          <p>Join thousands of happy customers and order your favorite meal today!</p>
          <Link to="/menu" className="btn btn-cta">
            Browse Menu
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
