import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/';
const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [links, setLinks] = useState([])
  

  const { picture } = useSelector((state) => state?.dpPicture);

  useEffect(() => {
    if (picture) {
 setLinks([
    `${picture?.dp_area?.pop_area?.city_area?.name}`,
    `${picture?.dp_area?.pop_area?.name}`,
    `${picture?.dp_area?.name}`,
    
  ]);

    }
  }, [picture])


  const paths = location.pathname
    .split('/')
    .filter((path) => path !== '')
    .slice(1);

  return (
    <div className=''>
      {
        links.length > 0 && 
        <div className='flex fixed  z-[10] bg-white flex-row gap-4 px-12 py-7 w-fit border rounded-full shadow-lg'>
      
      {paths.map((path, index) => (
        <div key={index} className='flex cursor-pointer flex-row items-center gap-2'>
          <p
            className='font-mono'
            onClick={() => navigate(`/projects/${paths.slice(0, index + 1).join('/')}`)}
          >
            {path}
          </p>
          {index < paths.length - 1 && (
            <IoIosArrowForward className='text-blue-600 text-[20px]' />
          )}
        </div>
      ))}
      </div>
          }
    </div>
  );
};

export default Breadcrumb;