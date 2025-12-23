import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard'

const Home = () => {

  const [posts,setPosts]=useState([])
  useEffect(()=>{
    const fetchPosts=async()=>{ 
      const res=await fetch('/api/post/getposts')
      const data=res.json();
      setPosts(data.posts)
    
    }
      fetchPosts()
  },[])
  return (
    <div>
      <div>
        <h1>
          welcome to my blog
        </h1>
        <p> hre you will find a variety of articles  and 
          tutorials on topics such as web decelopmennts software 
          enginnering ,and programing languages.
        </p>
      <Link to='/search'>view all posts</Link>
      </div>
      <div>
        <CallToAction/>
      </div>
      <div>

        {posts && posts.length>0 && (
          <div>
            <h2>Recent posts</h2>

            <div>
              {posts.map((post)=>(
                <PostCard key={post._id} post={post}/>
              ))}
            </div>
            <Link to='/search'>view all posts</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home