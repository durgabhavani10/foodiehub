import React, { useState, useEffect } from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  // ✅ Retrieve login state
  const [isLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");

  // ✅ Load cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ State for menu items from API
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ State for active category
  const [activeCategory, setActiveCategory] = useState("all");

  // ✅ Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'https://msd-backend-crhk.onrender.com/api';
        const response = await fetch(`${API_URL}/menu`);
        const data = await response.json();
        
        if (data.success) {
          setMenuItems(data.data);
        } else {
          setError('Failed to load menu items');
        }
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError('Unable to connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // ✅ Filter items by category
  const getItemsByCategory = (category) => {
    return menuItems.filter(item => item.category === category);
  };

  // ✅ Add to cart
  const addToCart = (item, price, img) => {
    if (!isLoggedIn) {
      alert("⚠️ Please log in to add items to the cart.");
      navigate("/login");
      return;
    }
    const updatedCart = [...cart, { name: item, price, image: img }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`🍴 ${item} added to cart!`);
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="menu-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2 style={{ color: '#ff6600' }}>Loading menu...</h2>
            <p>Please wait while we fetch delicious items</p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="menu-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2 style={{ color: '#ff6600' }}>⚠️ {error}</h2>
            <p>Please check your connection and try again</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ 
                marginTop: '20px', 
                padding: '10px 20px', 
                background: '#ff6600', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Get category data from API
  const biryanis = getItemsByCategory('biryanis');
  const mandis = getItemsByCategory('mandis');
  const coolDrinks = getItemsByCategory('cool-drinks');
  const fastFoods = getItemsByCategory('fast-foods');
  const cakes = getItemsByCategory('cakes');
  const chocolates = getItemsByCategory('chocolates');

  return (
    <div className="menu-page">
      <div className="container">
        <h2 className="section-title">FOOD ITEMS</h2>

        {/* ===== Navigation ===== */}
        <nav className="menu-navigation">
          <button onClick={() => setActiveCategory("biryanis")} className="nav-button">🍛 Biryanis</button>
          <button onClick={() => setActiveCategory("mandis")} className="nav-button">🍗 Mandis</button>
          <button onClick={() => setActiveCategory("cool-drinks")} className="nav-button">🥤 Cool Drinks</button>
          <button onClick={() => setActiveCategory("fast-foods")} className="nav-button">🍔 Fast Foods</button>
          <button onClick={() => setActiveCategory("cakes")} className="nav-button">🍰 Cakes</button>
          <button onClick={() => setActiveCategory("chocolates")} className="nav-button">🍫 Chocolates</button>
        </nav>

        {/* 🍛 Biryanis - Dynamic from API */}
        {(activeCategory === "all" || activeCategory === "biryanis") && biryanis.length > 0 && (
          <>
            <h3 id="biryanis" className="category-label">🍛 Biryanis</h3>
            <div className="biryani-grid">
              <div className="biryani-row">
                {biryanis.slice(0, 3).map((item) => (
                  <MenuItem
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    desc={item.description}
                    img={item.image}
                    addToCart={addToCart}
                  />
                ))}
              </div>
              {biryanis.length > 3 && (
                <div className="biryani-row">
                  {biryanis.slice(3, 6).map((item) => (
                    <MenuItem
                      key={item._id}
                      name={item.name}
                      price={item.price}
                      desc={item.description}
                      img={item.image}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* 🍗 Mandis - Dynamic from API */}
        {(activeCategory === "all" || activeCategory === "mandis") && mandis.length > 0 && (
          <>
            <h3 id="mandis" className="category-label">🍗 Mandis</h3>
            <div className="biryani-grid">
              <div className="biryani-row">
                {mandis.map((item) => (
                  <MenuItem
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    desc={item.description}
                    img={item.image}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* 🥤 Cool Drinks - Dynamic from API */}
        {(activeCategory === "all" || activeCategory === "cool-drinks") && coolDrinks.length > 0 && (
          <>
            <h3 id="cool-drinks" className="category-label">🥤 Cool Drinks</h3>
            <div className="biryani-grid">
              <div className="biryani-row">
                {coolDrinks.slice(0, 3).map((item) => (
                  <MenuItem
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    desc={item.description}
                    img={item.image}
                    addToCart={addToCart}
                  />
                ))}
              </div>
              {coolDrinks.length > 3 && (
                <div className="biryani-row">
                  {coolDrinks.slice(3).map((item) => (
                    <MenuItem
                      key={item._id}
                      name={item.name}
                      price={item.price}
                      desc={item.description}
                      img={item.image}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* 🍔 Fast Foods - Dynamic from API */}
        {(activeCategory === "all" || activeCategory === "fast-foods") && fastFoods.length > 0 && (
          <>
            <h3 id="fast-foods" className="category-label">🍔 Fast Foods</h3>
            <div className="biryani-grid">
              <div className="biryani-row">
                {fastFoods.slice(0, 3).map((item) => (
                  <MenuItem
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    desc={item.description}
                    img={item.image}
                    addToCart={addToCart}
                  />
                ))}
              </div>
              {fastFoods.length > 3 && (
                <div className="biryani-row">
                  {fastFoods.slice(3).map((item) => (
                    <MenuItem
                      key={item._id}
                      name={item.name}
                      price={item.price}
                      desc={item.description}
                      img={item.image}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

                {/* 🍰 Cakes - Dynamic from API */}
        {(activeCategory === "all" || activeCategory === "cakes") && cakes.length > 0 && (
          <>
            <h3 id="cakes" className="category-label">🍰 Cakes</h3>
            <div className="biryani-grid">
              <div className="biryani-row">
                {cakes.slice(0, 3).map((item) => (
                  <MenuItem
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    desc={item.description}
                    img={item.image}
                    addToCart={addToCart}
                  />
                ))}
              </div>
              {cakes.length > 3 && (
                <div className="biryani-row">
                  {cakes.slice(3).map((item) => (
                    <MenuItem
                      key={item._id}
                      name={item.name}
                      price={item.price}
                      desc={item.description}
                      img={item.image}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

                {/* 🍫 Chocolates - Dynamic from API */}
        {(activeCategory === "all" || activeCategory === "chocolates") && chocolates.length > 0 && (
          <>
            <h3 id="chocolates" className="category-label">🍫 Chocolates</h3>
            <div className="biryani-grid">
              <div className="biryani-row">
                {chocolates.slice(0, 3).map((item) => (
                  <MenuItem
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    desc={item.description}
                    img={item.image}
                    addToCart={addToCart}
                  />
                ))}
              </div>
              {chocolates.length > 3 && (
                <div className="biryani-row">
                  {chocolates.slice(3).map((item) => (
                    <MenuItem
                      key={item._id}
                      name={item.name}
                      price={item.price}
                      desc={item.description}
                      img={item.image}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ✅ Reusable Menu Item Component
const MenuItem = ({ name, price, desc, img, addToCart }) => (
  <div className="menu-item">
    <img src={img} alt={name} />
    <h4>{name}</h4>
    <p>{desc}</p>
    <div className="price">₹{price}</div>
    <button className="add-to-cart" onClick={() => addToCart(name, price, img)}>
      Add to Cart
    </button>
  </div>
);

export default Menu;
