import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardComponent = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  useEffect(() => {
    if (!currentUser?.isAdmin) return;

    const fetchUsers = async () => {
      const res = await fetch("/api/user/getusers?limit=5");
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      }
    };

    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=5");
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
      }
    };

    const fetchComments = async () => {
      const res = await fetch("/api/comment/getcomments?limit=5");
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments);
        setTotalComments(data.totalComments);
        setLastMonthComments(data.lastMonthComments);
      }
    };

    fetchUsers();
    fetchPosts();
    fetchComments();
  }, [currentUser]);

  return (
    <div className="p-4 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-2xl font-bold">{totalUsers}</p>
            <span className="text-green-500 flex items-center text-sm">
              <HiArrowNarrowUp /> {lastMonthUsers}
            </span>
            <p className="text-xs text-gray-400">Last month</p>
          </div>
          <HiOutlineUserGroup className="text-4xl text-teal-500" />
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Total Comments</h3>
            <p className="text-2xl font-bold">{totalComments}</p>
            <span className="text-green-500 flex items-center text-sm">
              <HiAnnotation /> {lastMonthComments}
            </span>
            <p className="text-xs text-gray-400">Last month</p>
          </div>
          <HiAnnotation className="text-4xl text-teal-500" />
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Total Posts</h3>
            <p className="text-2xl font-bold">{totalPosts}</p>
            <span className="text-green-500 flex items-center text-sm">
              <HiArrowNarrowUp /> {lastMonthPosts}
            </span>
            <p className="text-xs text-gray-400">Last month</p>
          </div>
          <HiDocumentText className="text-4xl text-teal-500" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full lg:w-[48%]">
          <div className="flex justify-between mb-3">
            <h1 className="font-semibold">Recent Users</h1>
            <Link to="/dashboard?tab=users" className="text-teal-500 text-sm">
              See all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead>
                <TableHeadCell>User Image</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <img
                        src={user.profilePicture}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full lg:w-[48%]">
          <div className="flex justify-between mb-3">
            <h1 className="font-semibold">Recent Comments</h1>
            <Link to="/dashboard?tab=comments" className="text-teal-500 text-sm">
              See all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead>
                <TableHeadCell>Content</TableHeadCell>
                <TableHeadCell>Likes</TableHeadCell>
              </TableHead>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell className="max-w-xs truncate">
                      {comment.content}
                    </TableCell>
                    <TableCell>{comment.numberOfLikes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full lg:w-[48%]">
          <div className="flex justify-between mb-3">
            <h1 className="font-semibold">Recent Posts</h1>
            <Link to="/dashboard?tab=posts" className="text-teal-500 text-sm">
              See all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead>
                <TableHeadCell>Image</TableHeadCell>
                <TableHeadCell>Title</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
              </TableHead>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell>
                      <img
                        src={post.image}
                        alt=""
                        className="w-14 h-10 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
