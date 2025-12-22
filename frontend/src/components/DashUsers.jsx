import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // Fetch users from backend
  const fetchUsers = async (startIndex = 0) => {
    try {
      const res = await fetch(
        `/api/user/getusers?startIndex=${startIndex}&limit=9`,
        { credentials: "include" } // important to send cookie
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }

      if (startIndex === 0) {
        setUsers(data.users);
      } else {
        setUsers((prev) => [...prev, ...data.users]);
      }

      if (!data.users || data.users.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  // Show more users
  const handleShowMore = () => {
    fetchUsers(users.length);
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!userIdToDelete) return;
    setShowModal(false);

    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }

      setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      setUserIdToDelete(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!currentUser?.isAdmin) {
    return <p className="text-center mt-6">Admin access only</p>;
  }

  return (
    <div className="p-4">
      {users.length > 0 ? (
        <>
          <table className="w-full border shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Username</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Admin</th>
                <th className="border p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="text-center">
                  <td className="border p-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    <img
                      src={user.profilePicture || "https://via.placeholder.com/40"}
                      alt={user.username}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-600 mx-auto" />
                    ) : (
                      <FaTimes className="text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="border p-2">
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 p-4 mt-2 border rounded"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-center mt-6">No users found</p>
      )}

      {/* Delete confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <HiOutlineExclamationCircle className="w-14 h-14 mx-auto text-gray-400" />
            <p className="text-center my-4">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteUser}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashUsers;
