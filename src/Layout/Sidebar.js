import React, { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Users from "../Users/Users";
import "./styles.css";
// import { FaHome, FaInfo, FaServicestack, FaEnvelope } from "react-icons/fa"; // Example icons

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [showLayout, setShowLayout] = useState(false);

  useEffect(() => {
    const AccessToken = localStorage.getItem("Accesstoken");

    if (AccessToken) {
      navigate(location.pathname);
      setShowLayout(true);
    } else {
      navigate("/login");
      setShowLayout(false);
    }
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("Accesstoken");
  };

  return (
    <>
      {location.pathname === "/login" ? (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      ) : showLayout === true ? (
        <div className="d-flex">
          {/* Sidebar */}
          <div
            className={`bg-dark text-white p-3 sidebar ${
              isOpen ? "col-2" : "col-1"
            }`}
            style={{
              position: "fixed", // Keep sidebar fixed
              height: "100vh", // Full viewport height
              transition: "width 0.3s",
              overflowY: "auto", // Optional: Enable scrolling within sidebar if content overflows
            }}
          >
            <button onClick={toggleSidebar} className="btn btn-primary mb-3">
              {isOpen ? "Hide" : "Show"}
            </button>

            {/* <Collapse isOpen={isOpen}>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <a href="#" className="text-white">
                    Home
                  </a>
                </li>
                <li className="mb-3">
                  <a href="#" className="text-white">
                    About
                  </a>
                </li>
                <li className="mb-3">
                  <a href="#" className="text-white">
                    Services
                  </a>
                </li>
                <li className="mb-3">
                  <a href="#" className="text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </Collapse> */}

            {/* Always-visible icons (even when sidebar is collapsed) */}
            <div className="icon-list">
              <div className="sidebar_names_container">
                <p>H</p>
                {isOpen && <span className="ms-2">Home</span>}
              </div>
              <div className="sidebar_names_container">
                <p>H</p>
                {isOpen && <span className="ms-2">About</span>}
              </div>
              <div className="sidebar_names_container">
                <p>H</p>
                {isOpen && <span className="ms-2">Services</span>}
              </div>
              <div className="sidebar_names_container">
                <p>H</p>
                {isOpen && <span className="ms-2">Contact</span>}
              </div>
            </div>

            <div className="sidebar_logout_container">
              <p>H</p>
              {isOpen && (
                <button className="ms-2" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div
            className={`main-content col ${isOpen ? "offset-2" : "offset-1"}`}
          >
            <div className="col">
              <Routes>
                <Route path="/users" element={<Users />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
