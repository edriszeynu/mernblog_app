import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts');
        const data = await res.json(); // ✅ FIXED

        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-12">
      {/* HERO */}
      <div className="flex flex-col gap-4 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Welcome to my blog
        </h1>

        <p className="text-gray-600 max-w-2xl">
          Here you will find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>

        <Link
          to="/search"
          className="text-teal-500 font-semibold hover:underline w-fit mx-auto sm:mx-0"
        >
          View all posts
        </Link>
      </div>

      {/* CTA */}
      <CallToAction />

      {/* RECENT POSTS */}
      {posts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center sm:text-left">
            Recent posts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/search"
              className="text-teal-500 font-semibold hover:underline"
            >
              View all posts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
