import React from 'react';
import {SlArrowRight} from 'react-icons/sl';
import {IoIosArrowForward} from 'react-icons/io'

const Breadcrumb = (links) => {

  return (
    <div className='flex flex-row gap-4 px-12 py-7 w-fit border rounded-full shadow-lg'>
      {
        links.links.map((item) =>

         (
            <div key={item.id} className='flex flex-row items-center gap-2'>
                <p className='font-mono'>{item.link}</p>
                {
                  item.id < links.links.length &&  <IoIosArrowForward className='text-blue-600 text-[20px]'/>
                }
               
            </div>
         )
        )
      }
    </div>
  );
}

export default Breadcrumb;
