import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { navlinks } from '../constants';
import sun from '../assets/sun.svg';
import { ThemeContext } from '../theme';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div onClick={handleClick} className={`w-[48px] h-[48px] rounded-[10px] border border-green-200 ${isActive && isActive === name && 'bg-[#7eb387]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`}>
    {!isActive ? (
      <img src={imgUrl} alt="logo" className='w-1/2 h-1/2' />
    ) : (
      <img src={imgUrl} alt="logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
);

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');

  const [isRotated, setIsRotated] = useState(false);

  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated);
  };

  const rotationStyle = {
    transform: isRotated ? 'rotate(180deg)' : 'rotate(0)',
    transition: 'transform 0.5s ease-in-out',
  };

  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#a7ffda]" imgUrl={logo} />
      </Link>


      <div className={`flex-1 flex flex-col justify-between items-center side rounded-[20px] w-[70px] py-4 mt-12 ${theme}`}>
        <div className='flex flex-col justify-center items-center gap-3'>
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <button onClick={toggleTheme}>
          <img className="rotate" onClick={handleImageClick} style={rotationStyle} src={sun} alt="sun" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
