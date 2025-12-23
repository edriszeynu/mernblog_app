import { Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PostCard from '../components/PostCard'

const Search = () => {

    const [sidebarData,setSidebarData]=useState({
        searchTerm:'',
        sort:'desc',
        category:'uncatagorized'
    })
    const [posts,setPosts]=useState([])
    const [loading,setLoading]=useState(false)
    const [showMore,setShowMore]=useState(false)
    const location=useLocation()
    const navigate=useNavigate()

    useEffect(()=>{
     const urlParams=new URLSearchParams(location.search)
     const seachTermFromUrl=urlParams.get('searchTerm')
     const sortFromUrl=urlParams.get('sort')
     const categoryFromUrl=urlParams.get('category')
     if(seachTermFromUrl ||sortFromUrl ||categoryFromUrl){
        setSidebarData({...sidebarData,
            searchTerm:seachTermFromUrl,
            sort:sortFromUrl,
            category:categoryFromUrl
       }  )
     }

     const fetchPosts=async()=>{
        setLoading(true)
        const searchQuery=urlParams.toString();
        const res=await fetch(`/api/post/getposts?${searchQuery}`)
        if(!res.ok){
            setLoading(false)
            return
        }
        if(res.ok){
            const data=await res.json();
            setPosts(data)
            setLoading(false)
        }
        if(data.posts.length===9){
            setShowMore(true)
        }
        else{
            setShowMore(false)
        }
     }
     fetchPosts()
    },[location.search])

    const handleChange=(e)=>{
     if(e.target.id==='searchTerm'){
        setSidebarData({...sidebarData,searchTerm:e.target.value})
     }
     if(e.target.id==='sort'){
        const order=e.target.value;
        setSidebarData({...sidebarData,sort:order})
     }
     if(e.target.id==='category'){
        const category=e.target.value || 'uncategorized'
        setSidebarData({...sidebarData,category})
     }
    }

    const handleSubmit=(e)=>{
      e.preventDeault()
      const urlParams=new URLSearchParams(location.search)
      urlParams.set('searchTerm',sidebarData.searchTerm)
      urlParams.set('sort',sidebarData.sort)
      urlParams.set('category',sidebarData.category)
      const searchQuery=urlParams.toString()
      navigate(`/search?${searchQuery}`)
    }

    const handleShowMore=async()=>{
        const numberOfPosts=posts.length;
        const startIndex=numberOfPosts;
        urlParams=new URLSearchParams(location.search)
        const searchQuery=urlParams.toString()
        
        const res=await FaThemeco(`/api/post/getposts?${searchQuery}`)
        if(!res.ok){
            return
        }
        if(res.ok){
            const data=await res.json();
            setPosts([...posts,...data.posts])
            if(data.posts.lenfth===9){
                setShowMore(true)
            }else{
                setShowMore(false)
            }
        }
    }
  return (
    <div>
        <div>
            
                <form onSubmit={handleSubmit}>
                <label htmlFor="">Search Term</label>
                <TextInput placeholder='search ...' id='searchTerm' type='text' value={sidebarData.searchTerm} onChange={handleChange}/>

                <div>
                    <label htmlFor="">sort:</label>
                    <Select onChange={handleChange} Value={sidebarData.sort} id='sort'>
                        <option value="desc">latest</option>
                        <option value="asc">Oldest</option>
                    </Select>
                </div>

                <div>
                    <label htmlFor="">category:</label>
                    <Select id='category' onChange={handleChange} Value={sidebarData.category}>
                        <option value="uncatagorized">uncategorized</option>
                        <option value="react">react.js</option>
                         <option value="nextjs">next.js</option>
                          <option value="javascript">javascript.js</option>
                        
                        

                    </Select>
                </div>
                 
                 <button type='submit'>apply filters</button>
            
            </form>
            
           
        </div>
        <div>
            <h1>post result</h1>
            <div>
                {!loading && posts.length===0 && <p> no post found</p>}

                {loading && <p>loading ...</p>}

                {!loading && posts && posts.map((post)=>{<PostCard key={post._id} post={post}/>})}

                {showMore && <button onClick={handleShowMore}>show more</button>}
            </div>
        </div>
    </div>
  )
}

export default Search