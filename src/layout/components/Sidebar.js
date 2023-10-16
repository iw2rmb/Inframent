import React, {useEffect, useState} from 'react';
import {AiOutlineFolder} from 'react-icons/ai';
import {FiMap, FiLogOut} from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom';
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from 'react-icons/md';


const Sidebar = ({setToggleOpen}) => {
  const params = useLocation()
    const [showSlide, setShowSlide] = useState(false);
    const [showOptions, setShowOptions] = useState(false)
    const active = 1;


    const [currParam, setCurrParam] = useState();
    const updateParam = () => {
        setCurrParam(params.pathname);
    }
    useEffect(() => {
        updateParam();
    }, [params, updateParam]);

    console.log(currParam)
    const navLinks = [
        {
            id: 1,
            title: 'Projects',
            link: '/',
            icon: <AiOutlineFolder />
        },
        {
            id: 2,
            title: 'Map',
            link: '/map',
            icon: <FiMap />
        }
    ]

    const handleLogOut = () => {
      sessionStorage.clear()
    }
    useEffect(() => {
      setToggleOpen(showSlide)
    }, [showSlide, setToggleOpen])

    
  return (
    <div className={`h-[100%] fixed ${!showSlide ? 'slide-out-in ' : 'slide-in'} py-8 w-fit bg-[#D9E2FF] flex flex-col justify-between`}>
      <div className='flex flex-col items-center'>
        <Link to="/projects" className='flex justify-center'>
        <img src="/assets/inframent-logo.png" alt="inframent web app logo icon" className={`bg-white cursor-pointer rounded-full drop-shadow-lg w-[80%] max-w-[120px]`}/>
        </Link>
        <div className='w-[80%] mt-[3rem] flex flex-col items-center gap-3'>
            {
            navLinks.map((nav) => (
                <Link to={nav.link} key={nav.id} className={`flex flex-row  items-center ${nav.link === currParam ? 'bg-[#355CA8] text-white' : ''}  rounded-full ${!showSlide ? 'h-[4rem] w-[4rem] justify-center items-center' : 'w-[100%] h-[50px] pl-4 gap-2 drop-shadow-xl'}`}>
                    
                    <div className='text-[28px] '>
                        {nav.icon}
                    </div>
                    
                    <h1 className={`font-roboto ${!showSlide ? 'hidden' : 'block'} text-[16px]`}>{nav.title}</h1>
                </Link>
            ))
        }
        </div>
        
      </div>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <div className='flex flex-row'>
            <h1 className='bg-red-200 px-5 py-3 font-bold rounded-full cursor-pointer' onClick={() => setShowOptions(!showOptions)}>T</h1>
            {
              showOptions && <Link to="/login" className='absolute mt-2 flex flex-row items-center gap-2 p-2 text-red-500 border bg-gray-200 drop-shadow-xl w-fit ml-[4rem]' onClick={handleLogOut}>
                <FiLogOut className='text-[22px]' />
                <p>Log Out</p>
            </Link>
            }
            
        </div>
        {
          showSlide ? <MdOutlineKeyboardArrowLeft className='text-[32px] cursor-pointer' onClick={() => setShowSlide(!showSlide)}/> : <MdOutlineKeyboardArrowRight className='text-[32px] cursor-pointer' onClick={() => setShowSlide(!showSlide)}/>
        }
        
      </div>
    </div>
  );
}

export default Sidebar;
