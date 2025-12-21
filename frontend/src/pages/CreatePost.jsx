import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || "Failed to create post");
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError(error.message || "Failed to create post");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <select
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select Category</option>
            <option value="javascript">JavaScript</option>
            <option value="react.js">React.js</option>
            <option value="next.js">Next.js</option>
          </select>
        </div>

        <ReactQuill
          theme="snow"
          placeholder="Write your post here..."
          className="h-96 mb-12"
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-200"
        >
          Publish
        </button>

        {publishError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-5">
            {publishError}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
