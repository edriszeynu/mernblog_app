import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.comment);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  // useEFetch users from backend
  useEffect(()=>{
const fetchComments=async ()=>{
 try{
    const res=fetch('/api/comment/getComments')
    const data=await res.json()
    i(res.ok){
        
    setComments(data.comments)
    if(data.comments.length<9){
        setShowMore(false)
    }
    }
 }
 catch(error){
    console.log(error.message)
 }
}
  if (currentUser?.isAdmin) {
      fetchComments();
    }
  

  },[currentUser._id])
  
 


  
    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  

  // Show more users
  const handleShowMore = () => {
        const startIndex=comments.length;
       try {
      const res = await fetch(
        `/api/comment/getComments?startIndex=${startIndex}&limit=3`,
        { credentials: "include" } // important to send cookie
      );

      const data = await res.json();

      if (res.ok) {
        setComments((prev)=>[...prev , ...data.comments])
        return;
      }

      if (startIndex === 0) {
        setUsers(data.users);
      } else {
        setUsers((prev) => [...prev, ...data.comments]);
      }

      if (!data.users || data.comments.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete comment
  const handleDeleteComment = async () => {
    setShowModal(false)
    try{
        const res=await fetch(`/api/comment/deleteComment/${userIdToDelete}`,{
            method:'DELETE'
        })
        const data=await res.json()
        if(res.ok{
            setComments((prev=>prev.filter((comment)=>comment._id===commentIdToDelete)))
        })
    }
    catch(error){
    console.log(error.message)
    }
  }
   



  if (!currentUser?.isAdmin) {
    return <p className="text-center mt-6">Admin access only</p>;
  }

  return (
    <div className="p-4">
      {comments.length > 0 ? (
        <>
          <table className="w-full border shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date updated</th>
                <th className="border p-2">content</th>
                <th className="border p-2">Number of likes</th>
                <th className="border p-2">postId</th>
                <th className="border p-2">userId</th>
                <th className="border p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment._id} className="text-center">
                  <td className="border p-2">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                      {comment.content}
                  </td>
                  <td className="border p-2">{comment.numberOfLikes}</td>
                  <td className="border p-2">{comment.postId}</td>
                  <td className="border p-2">
                    {comment.userId }
                   
                  </td>
                  <td className="border p-2">
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 p-4 mt-2 border rounded"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-center mt-6">No users found</p>
      )}

      {/* Delete confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <HiOutlineExclamationCircle className="w-14 h-14 mx-auto text-gray-400" />
            <p className="text-center my-4">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteComment}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashComments;
