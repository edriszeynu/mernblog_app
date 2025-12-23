import { Textarea, Button, Alert } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Comment from './Comment';

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  /* ================= CREATE COMMENT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;

    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCommentError(data.message);
        return;
      }

      setComment('');
      setCommentError(null);
      setComments([data, ...comments]);
    } catch (error) {
      setCommentError(error.message);
    }
  };

  /* ================= GET COMMENTS ================= */
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  /* ================= LIKE COMMENT ================= */
  const handleLike = async (commentId) => {
    if (!currentUser) return navigate('/sign-in');

    try {
      const res = await fetch(`/api/comment/likeComment/${commentId}`, { method: 'PUT' });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((c) =>
            c._id === commentId ? { ...c, likes: data.likes, numberOfLikes: data.likes.length } : c
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /* ================= EDIT COMMENT (LOCAL) ================= */
  const handleEdit = (comment, editedContent) => {
    setComments(
      comments.map((c) => (c._id === comment._id ? { ...c, content: editedContent } : c))
    );
  };

  /* ================= DELETE COMMENT ================= */
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, { method: 'DELETE' });
      if (res.ok) {
        setComments(comments.filter((c) => c._id !== commentIdToDelete));
        setShowModal(false);
        setCommentIdToDelete(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 w-full">
      {currentUser ? (
        <div className="flex items-center gap-2 my-5 text-gray-500 text-sm">
          <p>Signed in as</p>
          <img className="h-6 w-6 rounded-full object-cover" src={currentUser.profilePicture} alt="" />
          <Link className="text-cyan-600 hover:underline" to="/dashboard?tab=profile">
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5">
          You must be signed in to comment.
          <Link className="ml-1 text-blue-500 hover:underline" to="/sign-in">
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form onSubmit={handleSubmit} className="border rounded-lg p-4 mb-6">
          <Textarea
            rows={3}
            maxLength={200}
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-3">
            <p className="text-xs text-gray-500">{200 - comment.length} characters left</p>
            <Button type="submit" disabled={!comment}>Submit</Button>
          </div>

          {commentError && <Alert color="failure" className="mt-3">{commentError}</Alert>}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet</p>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            onLike={handleLike}
            onEdit={handleEdit}
            onDelete={(id) => { setShowModal(true); setCommentIdToDelete(id); }}
          />
        ))
      )}

      {/* DELETE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-80 shadow-lg">
            <div className="flex flex-col items-center">
              <HiOutlineExclamationCircle className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete this comment?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
