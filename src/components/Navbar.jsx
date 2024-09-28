// import React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../pages/shop/CartModal";
import avaterImg from "../assets/avatar.png";
import { logout } from "../redux/feature/auth/authSlice";
import { useLogoutUserMutation } from "../redux/feature/auth/authApi";
function Navbar() {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigation = useNavigate();
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  //admin dropdown menu
  const admitDropdownMenu = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "profile", path: "/dashboard/profile" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add New Post", path: "/dashboard/add-new-post" },
  ];

  // user dropdown menu
  const userDropdownMenu = [
    { label: "Dashboard", path: "/dashboard/user" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "payments", path: "/dashboard/profile" },
    { label: "My Orders", path: "/dashboard/my-orders" },
  ];

  const dropdownMenus =
    user?.role === "admin" ? [...admitDropdownMenu] : [...userDropdownMenu];
  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigation("/");
    } catch (error) {
      console.error("Failed to logout user", error);
      // Show error message or redirect to login page
    }
  };
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/page">Pages</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        {/* logo */}
        <div className="nav__logo">
          <Link to="/">shopiLy</Link>
        </div>
        {/* nav icons */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button onClick={handleCartToggle} className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            {user && user ? (
              <>
                <img
                  onClick={handleDropdownToggle}
                  src={user?.profileImage || avaterImg}
                  alt=""
                  className="size-6 rounded-full cursor-pointer"
                />
                {showDropdown && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link className="dropdown-items" to={menu.path}>
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link onClick={handleLogout} className="dropdown-items">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>
      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
}

export default Navbar;
