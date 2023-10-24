import React, {useEffect, useState} from 'react';
// import Slide from "@mui/material/Slide";
import Sidebar from './components/Sidebar';
import { useNavigate, useLocation } from "react-router-dom";
const Layout = ({children}) => {
    const navigate = useNavigate();
    const [toggleOpen, setToggleOpen] = useState(false)
  const location = useLocation();
    const data = sessionStorage.getItem("userInfo");
    useEffect(() => {
      if (!data) {
        navigate("/login");
        
        return ;
      } 
      else if (
        location.pathname.split('/')[location.pathname.split('/').length - 1] === 'map'
      ) {
        navigate('/map')
      }

      else if (
        location.pathname.split('/').length === 2
      ) {
        navigate("/projects");
        return
      }
    }, [data]);
  return (
    <>
      {
        data && <div className='w-screen h-[100vh] flex flex-row'>
      <div className={`${!toggleOpen ? 'slide-out-in' : 'slide-in '} h-[100vh]`}>
        <Sidebar setToggleOpen={setToggleOpen}/>
      </div>
        
        <div className='flex-1 relative'>
         {children}
        </div>
        
     </div>
      }
    </>
  );
}

export default Layout;
