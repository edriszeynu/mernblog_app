import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarItems,
  SidebarItemGroup,
  SidebarItem,
} from "flowbite-react";
import {
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

const DashSidebar = () => {
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
        credentials: "include", // ✅ IMPORTANT
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
    <Sidebar className="w-full md:max-w-56">
      <SidebarItems>
        <SidebarItemGroup>
          {/* PROFILE */}
          <SidebarItem
            as={Link}
            to="/dashboard?tab=profile"
            icon={HiUser}
            active={tab === "profile"}
            labelColor="dark"
            label={currentUser?.isAdmin ? "Admin" : "User"} // ✅ SAFE
          >
            Profile
          </SidebarItem>

          {/* POSTS */}
          <SidebarItem
            as={Link}
            to="/dashboard?tab=posts"
            icon={HiDocumentText}
            active={tab === "posts"}
            labelColor="dark"
          >
            Posts
          </SidebarItem>

          {/* USERS (ADMIN ONLY) */}
          {currentUser?.isAdmin && (
            <SidebarItem
              as={Link}
              to="/dashboard?tab=users"
              icon={HiOutlineUserGroup}
              active={tab === "users"}
              labelColor="dark"
            >
              Users
            </SidebarItem>
          )}

          {/* SIGN OUT */}
          <SidebarItem
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default DashSidebar;
