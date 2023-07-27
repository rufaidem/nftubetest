import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import loader from '../assets/loader.svg'
import PostCard from './PostCard'
import { ThemeContext, ThemeProvider } from '../theme'

const DisplayPosts = ({ title, isLoading, posts }) => {

    const navigate = useNavigate();

    const handleNavigate = (post) => {
        navigate(`/post-details/`)
    }

    const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider>
      <div className='w-full displayposts' id={theme}>
      <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>{title}</h1>

      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {!isLoading && (
            <img src={loader} alt="loader" className='w-[100px] hidden h-[100px] object-contain' />
        )}

        {!isLoading && (
            <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183] hidden'>You have not created any posts yet</p>
        )}

        {!isLoading && 
        (
          <PostCard
            handleClick={() => handleNavigate(posts)}
          />)}
      </div>
    </div>
    </ThemeProvider>
  )
}

export default DisplayPosts
