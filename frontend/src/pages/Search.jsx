import { Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPosts(data.posts || []);
        setShowMore(data.posts?.length === 9);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData({ ...sidebarData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.toString();
    try {
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) return;
      const data = await res.json();
      setPosts([...posts, ...(data.posts || [])]);
      setShowMore(data.posts?.length === 9);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-8 md:py-12">
      {/* Filter Form */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center text-teal-600">
          Filter Posts
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 md:gap-6 items-center"
        >
          <div className="flex-1 w-full">
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="flex-1 w-full">
            <Select
              id="sort"
              value={sidebarData.sort}
              onChange={handleChange}
              className="w-full"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex-1 w-full">
            <Select
              id="category"
              value={sidebarData.category}
              onChange={handleChange}
              className="w-full"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="react">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>

          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors w-full md:w-auto"
          >
            Apply Filters
          </button>
        </form>
      </div>

      {/* Posts Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Post Results</h2>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-600">No posts found.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>

        {showMore && (
          <div className="text-center mt-6">
            <button
              onClick={handleShowMore}
              className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
