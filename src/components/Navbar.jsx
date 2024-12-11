import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useSupabaseAuth } from "../contexts/useSupabaseAuth";
import { useDebounce } from "../hooks/useDebounce";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { logout } = useSupabaseAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(true);

  const dropdownRef = useRef(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery && isSearching) {
      navigate(`/search?query=${debouncedSearchQuery}`);
    }
  }, [debouncedSearchQuery, navigate, isSearching]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsSearching(false);
    setSearchQuery("");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <a href="/" onClick={handleLogoClick} className="navbar-logo">
        Logo
      </a>

      <div className="nav-search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInput}
            placeholder="영화를 검색해보세요"
            className="nav-search-input"
          />
        </form>
      </div>

      <div className="navbar-button">
        {user ? (
          <div className="profile-container" ref={dropdownRef}>
            <div className="profile-image-container" onClick={toggleDropdown}>
              <img
                src={user.profileImageUrl || "/profile_image.jpg"}
                alt="profile"
                className="profile-image"
                onError={(e) => {
                  e.target.src = "/profile_image.jpg";
                }}
              />
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
                <button
                  onClick={() => {
                    navigate("/mypage");
                    setShowDropdown(false);
                  }}
                  className="dropdown-item"
                >
                  마이페이지
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowDropdown(false);
                  }}
                  className="dropdown-item"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
