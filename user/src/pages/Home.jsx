import React, { useState } from 'react'
import DisplayPosts from '../components/DisplayPosts'

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    setIsLoading(true);
    const data = await getPosts();
    setPosts(data);
    setIsLoading(false);
  }
  return (
    <DisplayPosts 
      title="All Posts"
      isLoading={isLoading}
      posts={posts}
    />
  )
}

export default Home
