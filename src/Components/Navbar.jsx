import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
      <a className="navbar-brand" href="#">
       <img src={logo} alt="Logo" className="navbar-logo" /> 
       <span className="first-part">YOUR</span> LIBRARY
      </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link"  to="/">
                Catalog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bookform">
                Create Book
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/booktransaction">
                Transaction
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/users">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/payment">
                Payment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
