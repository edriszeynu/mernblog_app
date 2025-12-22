import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json(); // ✅ await here!

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        if (res.ok) {
          setPost(data.posts[0]);
          setError(false);
          setLoading(false);
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  if (error || !post)
    return <p className="text-center mt-10 text-red-600">Failed to load post.</p>;

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>

      <Link className="self-center mt-5" to={`/search?category=${post.category}`}>
        <button className="text-gray-700 rounded-lg text-lg">{post.category}</button>
      </Link>

      {post.image && (
        <img
          className="mt-10 p-3 max-h-[600px] w-full object-cover"
          src={post.image}
          alt={post.title}
        />
      )}

      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">{(post.content.length / 1000).toFixed(0)} mins read</span>
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>

      <CallToAction/>
      </div>
      <CommentSection postId={post._id}/>
    </main>
  );
};

export default PostPage;
