import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
  });
  const [publishError, setPublishError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ SEND COOKIE
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message || "Failed to create post");
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
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            className="flex-1 border p-2 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <select
            className="border p-2 rounded-lg"
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
          onChange={(value) =>
            setFormData({ ...formData, content: value })
          }
        />

        <button className="bg-purple-600 text-white p-2 rounded-lg">
          Publish
        </button>

        {publishError && (
          <p className="text-red-600 text-center">{publishError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
