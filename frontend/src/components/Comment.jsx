import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Textarea } from 'flowbite-react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (!res.ok) return;
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment.userId]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    if (!editedContent.trim()) return;

    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editedContent }),
      });

      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex gap-4 p-4 border-b dark:border-gray-700">
      <img
        src={user?.profilePicture || '/avatar.png'}
        alt={user?.username}
        className="w-10 h-10 rounded-full object-cover bg-gray-200"
      />

      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {user ? `@${user.username}` : 'anonymous'}
          </span>
          <span>•</span>
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>

        {isEditing ? (
          <>
            <Textarea
              rows={3}
              maxLength={200}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="mt-2"
            />

            <div className="flex gap-4 mt-3">
              <button
                type="button"
                onClick={handleSave}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 text-gray-800 dark:text-gray-200">
              {comment.content}
            </p>

            <div className="flex items-center gap-5 mt-2 text-sm text-gray-500">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className="flex items-center gap-1 hover:text-blue-600 transition"
              >
                <FaThumbsUp />
                {comment.numberOfLikes > 0 && <span>{comment.numberOfLikes}</span>}
              </button>

              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
