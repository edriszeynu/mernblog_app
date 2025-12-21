import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const DashProfile = () => {
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(deleteUserSuccess());
        setUpdateUserSuccess(data.message || "User deleted successfully");
        dispatch(signoutSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) console.log(data.message);
      else dispatch(signoutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={
              currentUser?.profilePicture && currentUser.profilePicture.trim() !== ""
                ? currentUser.profilePicture
                : "/default-avatar.png"
            }
            alt="Profile"
            className="rounded-full w-full h-full border-4 border-gray-300 object-cover"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        </div>

        {/* Username */}
        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser?.username || ""}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
        />

        {/* Email */}
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser?.email || ""}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-200"
        >
          Update Profile
        </button>

        {/* Create Post Button */}
        <Link to="/create-post" className="w-full">
          {currentUser?.isAdmin && (
            <button type="button" className="w-full mt-2">
              Create a Post
            </button>
          )}
        </Link>
      </form>

      {/* Account Actions */}
      <div className="text-red-500 flex justify-between mt-5 text-sm">
        <span className="cursor-pointer hover:underline" onClick={() => setShowModal(true)}>
          Delete account
        </span>
        <span className="cursor-pointer hover:underline" onClick={handleSignout}>
          Sign out
        </span>
      </div>

      {/* Success & Error Alerts */}
      {updateUserSuccess && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mt-5">
          {updateUserSuccess}
        </div>
      )}
      {updateUserError && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-5">
          {updateUserError}
        </div>
      )}

      {/* Delete Account Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteUser}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashProfile;
