import {
    ShoppingBag,
    Menu,
    X,
    Search,
    LogOut,
    User as UserIcon,
    MessageCircle,
    PlusCircle,
    Home,
  } from "lucide-react";
  import { useAuth } from "../../context/useAuth";
  import { Link, useNavigate, useLocation } from "react-router-dom";
  import { useState } from "react";
  import clsx from "clsx";
  
  const Header: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation(); // 👈 get current route
  
    const isActive = (path: string) => location.pathname === path;
  
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        setIsMenuOpen(false);
      }
    };
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const handleLogout = () => {
      logout();
      navigate("/");
      setIsMenuOpen(false);
    };
  
    return (
      <header className="nav-shell text-white sticky top-0 z-50 shadow-xl shadow-black/10">
        <div className="max-w-7xl flex items-center justify-between md:px-8 mx-auto px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white">
            <ShoppingBag className="h-6 w-6 md:h-8 md:w-8" />
            <span className="text-lg md:text-xl whitespace-nowrap font-bold">
              CampusBazaar
            </span>
          </Link>
  
          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-6 md:mx-12"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-full text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-gray-500"
                title="Search"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
  
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={clsx(
                    "hover:text-amber-100 transition-colors",
                    isActive("/dashboard") && "underline font-semibold"
                  )}
                >
                  Dashboard
                </Link>
                <Link
                  to="/messages"
                  className={clsx(
                    "hover:text-amber-100 transition-colors",
                    isActive("/messages") && "underline font-semibold"
                  )}
                >
                  Messages
                </Link>
                <Link
                  to="/sell"
                  className={clsx(
                    "bg-white text-[var(--color-brand-strong)] px-4 py-2 rounded-full font-medium transition-colors",
                    isActive("/sell") && "bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]"
                  )}
                >
                  Sell Item
                </Link>
                <div className="relative group">
                  <button
                    title="User Menu"
                    aria-label="User Menu"
                    className="flex items-center space-x-1 hover:text-amber-100 transition-colors"
                  >
                    <span className="hidden sm:inline">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <img
                      src={
                        user?.avatar ||
                        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100"
                      }
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-gray-800">
                    <Link
                      to="/profile"
                      className={clsx(
                        "block px-4 py-2 hover:bg-gray-100",
                        isActive("/profile") && "bg-gray-100 font-semibold"
                      )}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={clsx(
                    "hover:text-amber-100 transition-colors",
                    isActive("/login") && "underline font-semibold"
                  )}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={clsx(
                    "bg-white text-[var(--color-brand-strong)] px-4 py-2 rounded-full font-medium hover:bg-[var(--color-brand-soft)] transition-colors",
                    isActive("/register") && "bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]"
                  )}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
  
          {/* Mobile menu button */}
          <button
            title={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            className="md:hidden p-2 rounded-md hover:bg-black/15 focus:ring-2 focus:ring-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
  
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-40 md:hidden">
            <div className="bg-white text-gray-800 h-full w-72 flex flex-col overflow-y-auto transition-transform duration-300 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Menu</h2>
                <button
                  onClick={toggleMenu}
                  title="Close Menu"
                  aria-label="Close Menu"
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
  
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full py-2 px-4 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    title="Search"
                    aria-label="Search"
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>
  
              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-4">
                <Link
                  to="/"
                  className={clsx(
                    "flex items-center gap-2 p-2 rounded-md",
                    isActive("/") ? "bg-gray-200" : "hover:bg-gray-100"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
  
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className={clsx(
                        "flex items-center gap-2 p-2 rounded-md",
                        isActive("/dashboard") ? "bg-gray-200" : "hover:bg-gray-100"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserIcon className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
  
                    <Link
                      to="/messages"
                      className={clsx(
                        "flex items-center gap-2 p-2 rounded-md",
                        isActive("/messages") ? "bg-gray-200" : "hover:bg-gray-100"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Messages</span>
                    </Link>
  
                    <Link
                      to="/sell"
                      className={clsx(
                        "flex items-center gap-2 p-2 rounded-md text-white bg-[var(--color-brand)]",
                        isActive("/sell") && "bg-[var(--color-brand-strong)]"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <PlusCircle className="h-5 w-5" />
                      <span>Sell Item</span>
                    </Link>
  
                    <Link
                      to="/profile"
                      className={clsx(
                        "flex items-center gap-2 p-2 rounded-md",
                        isActive("/profile") ? "bg-gray-200" : "hover:bg-gray-100"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserIcon className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
  
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-red-600 w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={clsx(
                        "flex items-center gap-2 p-2 rounded-md",
                        isActive("/login") ? "bg-gray-200" : "hover:bg-gray-100"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserIcon className="h-5 w-5" />
                      <span>Login</span>
                    </Link>
  
                    <Link
                      to="/register"
                      className={clsx(
                        "flex items-center gap-2 p-2 rounded-md bg-[var(--color-brand)] text-white",
                        isActive("/register") && "bg-[var(--color-brand-strong)]"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserIcon className="h-5 w-5" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
  
              {/* User info on mobile */}
              {isAuthenticated && (
                <div className="absolute bottom-8 left-0 right-0 p-4 border-t">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        user?.avatar ||
                        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100"
                      }
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[var(--color-brand)]"
                    />
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.college}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    );
  };
  
  export default Header;
  
