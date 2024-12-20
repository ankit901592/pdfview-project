import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import feather from "feather-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPdfData,
  pdfSelector,
} from "../redux/Reducers/pdfReducers";

const Navbar = () => {
  const dispatch = useDispatch();
  const data = useSelector(pdfSelector);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const inputRef = useRef();
  const searchBarRef = useRef(); // Ref for the input field

  useEffect(() => {
    feather.replace();
    dispatch(fetchPdfData()); // Fetch data on component mount
  }, [dispatch]);

  // Filter the results based on search query
  useEffect(() => {
    const filtered = searchQuery
      ? data.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data;
    setFilteredResults(filtered); // Set filtered results
  }, [searchQuery, data]);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (!showSearchBar && inputRef.current) {
      // Focus on the input field when the search bar is shown
      inputRef.current.focus();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Query:", searchQuery);
  };

  // Hide search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowSearchBar(false);
      }
    };

    if (showSearchBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchBar]);

  return (
    <>
      {showSearchBar && (
        <div className="search-bar-container" ref={searchBarRef}>
          <form onSubmit={handleSearchSubmit} className="search-bar-form">
            <input
              // Attach the ref to the input field
              ref={inputRef}
              type="text"
              placeholder="Search your PDF..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-bar-input"
            />
            <button type="submit" className="search-bar-submit">
              Search
            </button>
          </form>
        </div>
      )}

      <nav className="navbar">
        <ul className="navbar__menu">
          <li className="navbar__item">
            <Link to="/home" className="navbar__link">
              <i data-feather="home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li className="navbar__item">
            <button
              className="navbar__link search-toggle"
              onClick={toggleSearchBar}
            >
              <i data-feather="search"></i>
              <span>Search</span>
            </button>
          </li>
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              <i data-feather="folder"></i>
              <span>Projects</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              <i data-feather="archive"></i>
              <span>Resources</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              <i data-feather="help-circle"></i>
              <span>Help</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              <i data-feather="settings"></i>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <Outlet context={filteredResults} />
      </main>
    </>
  );
};

export default Navbar;
