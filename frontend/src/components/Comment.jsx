import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Textarea } from 'flowbite-react'
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Comment = ({ comment, onLike,onEdit,onDelete }) => {
  const { currentUser } = useSelector((state) => state.user)

  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`)
        const data = await res.json()
        if (res.ok) {
          setUser(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [comment.userId])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedContent(comment.content)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedContent(comment.content)
  }

  const handleSave=async()=>{
    try{
        const res=await fetch(`/api/comment/editComment/${comment._id}`,{
            method:'PUT',
            headers:{
                'Content=Type':'application/json',
            },
            body:JSON.stringify({
                content:editedContent
            })
        })
        if(res.ok){
            setIsEditing(false)
            onEdit(comment,editedContent

            )
        }
    }
    catch(error){

    }
  }

  return (
    <div className="flex gap-3 my-4">
      <img
        className="w-10 h-10 rounded-full bg-gray-200"
        src={user?.profilePicture}
        alt={user?.username}
      />

      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{user ? `@${user.username}` : 'anonymous user'}</span>
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>

        {isEditing ? (
          <>
            <Textarea
              rows={3}
              maxLength={200}
              onChange={(e) => setEditedContent(e.target.value)}
              value={editedContent}
            />
            <div className="flex gap-2 mt-2">
              <button type="button" className="text-blue-600" onclick={handleSave}>
                Save
              </button>
              <button type="button" onClick={handleCancel} className="text-red-600">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="my-2">{comment.content}</p>

            <div className="flex items-center gap-3 text-sm">
              <button type="button" onClick={() => onLike(comment._id)}>
                <FaThumbsUp />
              </button>

              {comment.numberOfLikes > 0 && (
                <p>
                  {comment.numberOfLikes}{' '}
                  {comment.numberOfLikes === 1 ? 'like' : 'likes'}
                </p>
              )}

              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                    <>
                  <button type="button" onClick={handleEdit}>
                    Edit
                  </button>

                    <button type="button" onClick={()=>onDelete(comment._id)}>
                    Delete
                  </button>
                  </>
                )}

            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Comment
