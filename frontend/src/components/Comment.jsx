import React, { useEffect, useState } from 'react'
import moment from 'mement'
const Comment = ({comment}) => {
    const [user,setUser]=useState({})
    useEffect(()=>{
        const getUser=async ()=>{
            try{
                const res=await fetch(`/api/user/${comment.userId}`)
                const data=await res.json()

                if(res.ok){
                    setUser(data)
                }
            }
            catch(error){

            }

        }
        getUser()
    },[comment])
  return (
    <div>
        <div>
            <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} alt={user.username} />
        </div>
        <div>
            <div>
                <span>{user ? `@${user.username}`:'anonymous user'}</span>
                {moment(comment.createdAt).fromNow()}
            </div>
            <p>{comment.content}</p>
        </div>
    </div>
  )
}

export default Comment