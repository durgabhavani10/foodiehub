import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About FoodieHub</h1>
          <p>Your trusted partner for delicious meals delivered with love</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-content">
        <div className="about-layout">
          <div className="about-image">
            <img
              src="https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=500"
              alt="Foodie Hub Restaurant"
            />
          </div>

          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              ⭐ We are passionate about delivering delicious, fresh food right to your doorstep. 
              Our mission is to make ordering food easy, enjoyable, and accessible to everyone.
            </p>
            <p>
              ⭐ At FoodieHub, we believe that great food brings people together. Whether it's a family dinner, 
              a quick lunch, or a celebration with friends, we're committed to providing you with authentic 
              flavors, premium ingredients, and good service every single time.
            </p>
            <p>
              ⭐ From traditional biryanis to exotic mandis, every dish is prepared with love and care by our 
              expert chefs who understand the art of perfect seasoning and cooking.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="story-section">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, FoodieHub started with a simple idea: great food shouldn't be complicated. 
            We partner with talented local chefs and restaurants to bring you authentic, mouth-watering 
            dishes from biryanis to mandis, all delivered fresh to your door.
          </p>
          <p>
            Today, we serve thousands of happy customers every day, maintaining our commitment to quality, 
            speed, and exceptional service.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🎯</div>
            <h3>Quality First</h3>
            <p>We never compromise on the quality of our ingredients or service.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">⚡</div>
            <h3>Speed</h3>
            <p>Fast delivery without sacrificing food quality or taste.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">❤️</div>
            <h3>Customer Care</h3>
            <p>Your satisfaction is our top priority, always.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3>Sustainability</h3>
            <p>We care about the environment and use eco-friendly packaging.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="team-avatar">👩‍💻</div>
            <h3>Shaik Abeda Begum</h3>
            <p className="team-role">Co-Founder & CEO</p>
            <p className="team-bio">Visionary leader with a passion for food and technology.</p>
          </div>
          <div className="team-member">
            <div className="team-avatar">👨‍🍳</div>
            <h3>Anand Kumar</h3>
            <p className="team-role">Co-Founder & Head Chef</p>
            <p className="team-bio">Master chef bringing authentic flavors to every dish.</p>
          </div>
          <div className="team-member">
            <div className="team-avatar">👨‍💼</div>
            <h3>Development Team</h3>
            <p className="team-role">Tech Innovators</p>
            <p className="team-bio">Building the best food ordering experience.</p>
          </div>
          <div className="team-member">
            <div className="team-avatar">🚚</div>
            <h3>Delivery Partners</h3>
            <p className="team-role">Logistics Heroes</p>
            <p className="team-bio">Ensuring your food arrives hot and fresh.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>10,000+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Menu Items</p>
          </div>
          <div className="stat-card">
            <h3>30 Min</h3>
            <p>Average Delivery</p>
          </div>
          <div className="stat-card">
            <h3>4.8/5</h3>
            <p>Customer Rating</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;