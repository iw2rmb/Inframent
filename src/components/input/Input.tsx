'use client'
import React, {useState} from 'react';
import { IInputProps } from '@/src/types';
// import IoEyeSharp from 'react-icons/io';
import {IoEyeSharp} from 'react-icons/io5'
import {BsFillEyeSlashFill} from 'react-icons/bs'
const Input = ({
    placeholder,
    type,
    label
}: IInputProps) => {
  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };


  return (
    <div className='border px-2 w-[20rem] bg-gray-100 py-1'>
      <p className='text-slate-500 text-[12px]'>{label}</p>
      <div className='flex flex-row items-center gap-1'>
        <input placeholder={placeholder} value={value} type={type === 'password' && visible === true ? 'password' : 'text'} onChange={handleInputChange} className='bg-inherit py-1 text-[16px] text-black w-[100%] outline-none'/>
        {type === 'password' && value != '' && <div>
          {
            visible  ? <IoEyeSharp className="borde cursor-pointer text-[18px]" onClick={() => setVisible(!visible)}/> : <BsFillEyeSlashFill className="borde cursor-pointer text-[18px]" onClick={() => setVisible(!visible)}/>
          }
        </div>
        }
      </div>
    </div>
  );
}

export default Input;


