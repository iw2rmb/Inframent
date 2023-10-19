import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const paths = location.pathname
    .split('/')
    .filter((path) => path !== '')
    .slice(1);

  return (
    <div className='flex flex-row gap-4 px-12 py-7 w-fit border rounded-full shadow-lg'>
      {paths.map((path, index) => (
        <div key={index} className='flex cursor-pointer flex-row items-center gap-2'>
          <p
            className='font-mono'
            onClick={() => navigate(`/${paths.slice(0, index + 1).join('/')}`)}
          >
            {path}
          </p>
          {index < paths.length - 1 && (
            <IoIosArrowForward className='text-blue-600 text-[20px]' />
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;