import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Dashpost = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  /* ================= FETCH POSTS ================= */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/getposts?userId=${currentUser._id}`
        );
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchPosts();
    }
  }, [currentUser]);

  /* ================= SHOW MORE ================= */
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();

      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /* ================= DELETE POST ================= */
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <>
          {/* ================= TABLE ================= */}
          <table className="min-w-full border border-gray-200 shadow-md rounded-md">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Date Updated</th>
                <th className="px-4 py-2 text-left">Post Image</th>
                <th className="px-4 py-2 text-left">Post Title</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Delete</th>
                <th className="px-4 py-2 text-left">Edit</th>
              </tr>
            </thead>

            <tbody>
              {userPosts.map((post) => (
                <tr
                  key={post._id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-2">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover rounded"
                      />
                    </Link>
                  </td>

                  <td className="px-4 py-2">
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>

                  <td className="px-4 py-2">{post.category}</td>

                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>

                  <td className="px-4 py-2">
                    <Link
                      to={`/update-post/${post._id}`}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ================= SHOW MORE ================= */}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="block mx-auto mt-6 text-teal-600 hover:underline"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">You have no posts yet!</p>
      )}

      {/* ================= DELETE MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80">
            <div className="flex flex-col items-center">
              <HiOutlineExclamationCircle className="text-gray-400 w-14 h-14 mb-4" />
              <h3 className="text-center mb-6 text-gray-600 dark:text-gray-300">
                Are you sure you want to delete this post?
              </h3>

              <div className="flex gap-4">
                <button
                  onClick={handleDeletePost}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Yes, delete
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashpost;
