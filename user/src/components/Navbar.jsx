import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import search from '../assets/search.svg'
import CustomButton from './CustomButton';
import menu from '../assets/menu.svg'
import { navlinks } from '../constants';
import Web3 from 'web3';
import sun from '../assets/sun.svg'
import { ThemeContext, ThemeProvider } from '../theme';

const Navbar = () => {

  const [isRotated, setIsRotated] = useState(false);

  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated);
  };

  const rotationStyle = {
    transform: isRotated ? 'rotate(180deg)' : 'rotate(0)',
    transition: 'transform 0.5s ease-in-out',
  };

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState
  ('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState
  (false);

  const [address, setAddress] = useState(null);
  const [showCreateButton, setShowCreateButton] = useState(false);
  const {toggleTheme, theme} = useContext(ThemeContext)

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const selectedAddress = accounts[0];
        setShowCreateButton(true);
        setAddress(selectedAddress);
      } else {
        console.log('Web3 not found. Please install a wallet like MetaMask.');
      }
    } catch (error) {
      console.log('Wallet connection error:', error);
    }
  };

  // Function to handle create button click
  const handleCreateClick = () => {
    if (address) {
      navigate('create-post');
    } else {
      connectWallet();
    }
  };

  useEffect(() => {
    if (address) {
      setShowCreateButton(true);
    }
  }, [address]);
  
  return (
    <ThemeProvider>
      <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]'>

        <input type="text" className='flex w-full font-epilogue font-normal text-[15px] placeholder:text-[#4b5264] text-white bg-transparent outline-none' placeholder='Search for usernames' />

        <div className='w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer'>
          <img src={search} className='w-[15px] h-[15px] object-contain' alt="search" />
        </div>
      </div>

      <div className='sm:flex hidden flex-row justify-end gap-4'>
      {showCreateButton && (
          <div className='flex gap-x-2'>
            <CustomButton
            btnType="button"
            title="Create"
            styles="bg-[#ff8420]"
            handleClick={handleCreateClick}
          />
          <CustomButton
            btnType="button"
            title="Sign"
            styles="bg-[#ff8420]"
          />
          </div>
        )}

        {!showCreateButton && (
          <CustomButton
            btnType="button"
            title="Connect"
            styles="bg-[#8c6dfd]"
            handleClick={connectWallet}
          />
        )}


        <Link to='/profile'>
          <div className='w-[50px] h-[50px] rounded-full bg-[#2c2f32] flex justify-center items-center overflow-hidden'>
            <img src="https://tryhackme-images.s3.amazonaws.com/user-avatars/37057b55b9b7fb9def70d32aa0183e16.jpg" alt="avatar" className='w-[100%] h-[100%]' />
          </div>
        </Link>
      </div>

      <div className='sm:hidden flex justify-between items-center relative'>
        <div className='w-[40px] h-[40px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer overflow-hidden'>
          <img src="https://tryhackme-images.s3.amazonaws.com/user-avatars/37057b55b9b7fb9def70d32aa0183e16.jpg" alt="avatar" className='w-[100%] h-[100%]' />
        </div>

      
        <button onClick={toggleTheme}>
          <img className="rotate" onClick={handleImageClick} style={rotationStyle} src={sun} alt="sun" />
        </button>
        

        <img
          src={menu} 
          alt="menu"
          className='w-[34px] h-[34px] object-contain cursor-pointer'
          onClick={() => setToggleDrawer((prev) => !prev)} 
        />

        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] dropdown z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`} id={theme}>
          <ul className='mb-4'>
            {navlinks.map((Link) => (
              <li key={Link.name} className={`flex p-4 ${isActive === Link.name && 'bg-[#a3ce81]'}`} onClick={() => {
                setIsActive(Link.name);
                setToggleDrawer(false)
                navigate(Link.link);
              }}>
                <img alt={Link.name} src={Link.imgUrl} className={`w-[24px] h-[24px] object-contain ${isActive === Link.name ? 'grayscale-0' : 'grayscale'}`} />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === Link.name ? 'text-[#ff8420]' : 'text-[#808191]'}`}>{Link.name}</p>
              </li>
            ))}
          </ul>

          <div className='flex mx-4'>
          {address ? (
          <div className='flex gap-x-2'>
          <CustomButton
          btnType="button"
          title="Create"
          styles="bg-[#ff8420]"
          handleClick={handleCreateClick}
        />
        <CustomButton
          btnType="button"
          title="Sign"
          styles="bg-[#ff8420]"
        />
        </div>
        ) : (
          <CustomButton
            btnType="button"
            title="Connect"
            styles="bg-[#8c6dfd]"
            handleClick={connectWallet}
          />
        )}
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default Navbar
