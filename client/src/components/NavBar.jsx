import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiShoppingBag } from "react-icons/bi";

const NavBar = () => {
  // Use the useSelector hook to access the cartTotalQuantity from the Redux store
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container">
          {/* Link to the home page */}
          <Link to="/" className="text-decoration-none">
            <h4 className="navbar-brand">OnlineShop</h4>
          </Link>

          {/* Navbar toggler button for responsive design */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li>
                {/* Link to the cart page with a shopping bag icon and quantity indicator */}
                <Link to="/cart" className="text-decoration-none">
                  <BiShoppingBag />
                  <span>{cartTotalQuantity}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
