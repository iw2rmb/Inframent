import React, {useEffect, useState} from 'react';
// import Slide from "@mui/material/Slide";
import Sidebar from './components/Sidebar';
import { useNavigate } from "react-router-dom";
const Layout = ({children}) => {
    const navigate = useNavigate();
    const [toggleOpen, setToggleOpen] = useState(false)


    // Check if the user is not logged in the redirect to the login page
    const data = sessionStorage.getItem("userInfo");
    useEffect(() => {
      if (!data) {
        navigate("/login");
        
        return ;
      }
    }, [data, navigate]);
  return (
    <>
      {
        data && <div className='w-screen h-screen flex flex-row'>
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
