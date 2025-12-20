import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Dropdown } from 'flowbite-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {currentUser}=useSelector(state=>state.user)

  return (
    <nav className="border-b-2 px-4 py-2 flex items-center justify-between flex-wrap">
      {/* Brand */}
      <Link to="/" className="flex items-center space-x-2">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          endris
        </span>
        <span className="self-center text-sm sm:text-xl font-semibold dark:text-white">
          Blog
        </span>
      </Link>

      {/* Search */}
      <div className="relative flex items-center">
        {/* Input visible on large screens */}
        <input
          type="text"
          placeholder="Search ..."
          className="hidden lg:inline-block px-4 py-1 border rounded-lg focus:outline-none pr-10"
        />
        {/* Search icon inside input on large screens */}
        <AiOutlineSearch className="hidden lg:inline absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {/* Search button visible only on small screens */}
        <button className="lg:hidden w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg ml-2">
          <AiOutlineSearch />
        </button>
      </div>

      {/* Buttons and Hamburger */}
      <div className="flex gap-2 items-center">
        <button className="w-10 h-10 hidden sm:flex items-center justify-center bg-gray-200 rounded-lg">
          <FaMoon />
        </button>
        {currentUser ?(
          <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded/>}>
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
            <Dropdown.Item>
              profile
            </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item>Sign Out</Dropdown.Item>
            </Link>
          </Dropdown>
        ):(
           <Link to="/sign-in">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
            Sign in
          </button>
        </Link>
        )}
      

        {/* Hamburger menu for small screens */}
        <button
          className="lg:hidden px-3 py-2 border rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Nav links */}
      <div className="hidden lg:flex gap-4 ml-4">
        <Link
          to="/"
          className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          home
        </Link>
        <Link
          to="/about"
          className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          about
        </Link>
        <Link
          to="/projects"
          className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          projects
        </Link>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="w-full flex flex-col mt-2 gap-2 lg:hidden">
          <Link
            to="/"
            className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            home
          </Link>
          <Link
            to="/about"
            className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            about
          </Link>
          <Link
            to="/projects"
            className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            projects
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
