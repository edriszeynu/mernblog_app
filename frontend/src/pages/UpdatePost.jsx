import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { postId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
  });

  const [publishError, setPublishError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json(); // ✅ FIX

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }

        setFormData(data.posts[0]); // ✅ load post data
        setPublishError(null); // ✅ FIX
      } catch (error) {
        setPublishError("Failed to fetch post");
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message || "Failed to update post");
        return;
      }

      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update a Post
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            className="flex-1 border p-2 rounded-lg"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <select
            className="border p-2 rounded-lg"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select Category</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="next">Next.js</option>
          </select>
        </div>

        <ReactQuill
          theme="snow"
          className="h-96 mb-12"
          placeholder="Write your post..."
          value={formData.content}
          onChange={(value) =>
            setFormData({ ...formData, content: value })
          }
        />

        <button className="bg-purple-600 text-white p-2 rounded-lg">
          Update post
        </button>

        {publishError && (
          <p className="text-red-600 text-center">{publishError}</p>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
