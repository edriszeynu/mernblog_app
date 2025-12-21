import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import {signoutSuccess} from '../redux/user/userSlice'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSignout = async () => {
      try {
        const res = await fetch("/api/user/signout", {
          method: "POST",
        });
  
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <nav className="border-b px-4 py-2 flex items-center justify-between flex-wrap
                    bg-white dark:bg-[rgb(16,23,42)]
                    text-gray-700 dark:text-gray-200">

      {/* Brand */}
      <Link to="/" className="flex items-center space-x-2">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          endris
        </span>
        <span className="self-center text-sm sm:text-xl font-semibold">
          Blog
        </span>
      </Link>

      {/* Search */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search ..."
          className="hidden lg:inline-block px-4 py-1 border rounded-lg focus:outline-none pr-10
                     bg-white dark:bg-gray-800
                     border-gray-300 dark:border-gray-600"
        />
        <AiOutlineSearch className="hidden lg:inline absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <button className="lg:hidden w-10 h-10 flex items-center justify-center
                           bg-gray-200 dark:bg-gray-700 rounded-lg ml-2">
          <AiOutlineSearch />
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 items-center relative">

        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="w-10 h-10 hidden sm:flex items-center justify-center
                     bg-gray-200 dark:bg-gray-700 rounded-lg"
        >
          {theme === 'dark' ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-700" />
          )}
        </button>

        {/* User Dropdown (HTML) */}
        {currentUser ? (
          <div className="relative">
            <img
              src={currentUser.profilePicture}
              alt="user"
              className="w-10 h-10 rounded-full cursor-pointer object-cover"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800
                              border border-gray-200 dark:border-gray-700
                              rounded-lg shadow-lg z-50">

                <div className="px-4 py-2 border-b dark:border-gray-700">
                  <p className="text-sm">@{currentUser.username}</p>
                  <p className="text-sm font-medium truncate">
                    {currentUser.email}
                  </p>
                </div>

                <Link
                  to="/dashboard?tab=profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>

                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleSignout}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/sign-in">
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
              Sign in
            </button>
          </Link>
        )}

        {/* Hamburger */}
        <button
          className="lg:hidden px-3 py-2 border rounded-lg
                     border-gray-300 dark:border-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex gap-4 ml-4">
        {['/', '/about', '/projects'].map((path) => (
          <Link
            key={path}
            to={path}
            className="py-2 px-4 rounded
                       hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {path === '/' ? 'home' : path.replace('/', '')}
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="w-full flex flex-col mt-2 gap-2 lg:hidden">
          <Link className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700" to="/">home</Link>
          <Link className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700" to="/about">about</Link>
          <Link className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700" to="/projects">projects</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
