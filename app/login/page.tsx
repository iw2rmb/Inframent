import { Button, Input } from '@/src/components';
import React from 'react';

const page = () => {
  return (
    <div className='w-screen h-screen bg-white flex items-center justify-center p-3'>
      <div className='w-[30rem] flex flex-col justify-between pb-8 items-center z-10 bg-white rounded-xl h-[70vh] border'>
        

        <div className='flex items-center flex-col'>
        <img src="/assets/inframent-logo.png" alt="logo" className='w-[15rem] h-auto mb-2'/>
        <p className='mb-[3rem]'>Welcome to inframent</p>
        <div className='flex flex-col gap-5'>
          <Input placeholder='Type in your email' type='text' label='Name'/>
          <Input placeholder='Type in your password' type='password' label='Password'/>
        </div>
      </div>

      <div>
        <Button title='Login' btnType='submit' color='bg-gray-100'/>
      </div>
        
      </div>
      
      <div className='absolute bottom-0 left-0 flex flex-row justify-between'>
        <img src="/assets/construction-crane-left.png" alt='image' className='w-[42%] h-auto'/>
        <img src="/assets/construction-crane-right.png" alt='image' className='w-[42%] h-auto'/>
      </div>
    </div>
  );
}

export default page;
