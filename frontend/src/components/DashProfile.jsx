import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userslice";
import { useDispatch } from "react-redux";
import { Alert } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal } from "flowbite-react";
import { Link } from "react-router-dom";

const DashProfile = () => {
  const [formData, setFormData] = useState({});
  const { currentUser, error, isLoading } = useSelector((state) => state.user);
  console.log(currentUser);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("no changes made");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("users profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `http://localhost:3000/api/delete/${currentUser._id}`,
        {
          method: "delete",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/signout", {
        method: "post",
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
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser?.photoURL || "/default-avatar.png"}
            // src="/default-avatar.png"
            className="rounded-full w-full h-full border-4 border-gray-300 object-cover"
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
        <Link to="/create-post" className="w-full">
          {currentUser.isAdmin && (
            <Button type="button" className="w-full">
              create a post
            </Button>
          )}
        </Link>
      </form>

      {/* Account Actions */}
      <div className="text-red-500 flex justify-between mt-5 text-sm">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => setShowModel(true)}
        >
          Delete account
        </span>
        <span
          className="cursor-pointer hover:underline"
          onClick={handleSignout}
        >
          Sign out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}

      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              are you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <button color="failure" onClick={handleDeleteUser}>
                yes,i'mb sure
              </button>
              <button onClick={() => setShowModel(false)}>no,cancel</button>
            </div>
          </div>
        </Modal.body>
      </Modal>
    </div>
  );
};

export default DashProfile;
