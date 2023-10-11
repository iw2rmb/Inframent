import React, {useEffect, useState} from 'react';
import {BiSolidRightArrow} from 'react-icons/bi';
import {IoMdArrowDropright} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDP } from '../action/projects';
import CircularProgress from '@mui/material/CircularProgress';
const DpArea = ({setSelectedDP, selectedSubProject}) => {

  const dispatch = useDispatch();
  const [selectedDpId, setSelectedDpId] = useState(0)
  const {loading, dpAreas}  = useSelector((state) => state?.listPopAreas)

  useEffect(() => {
    dispatch(fetchDP(selectedSubProject))
  }, [dispatch, selectedSubProject])

  const handleSelectedDpArea = (area) => {

    setSelectedDP(area.id, area.name)
    setSelectedDpId(area.id)
  }

  return (
    <div className='border pb-4 font-roboto h-[100%] w-[30%] bg-white shadow-xl rounded-2xl'>
    <h1 className='h-[15%] w-[100%] flex items-center justify-center text-2xl font-[400]'>Dp Areas</h1>
    {
    loading ? <div className='flex-1 flex justify-center'>
      <CircularProgress />
    </div>  : dpAreas.length > 0 ? <div>
    {
        dpAreas?.map((areas) => 

        (
            <div  key={areas.id} onClick={() => handleSelectedDpArea(areas)} className={`flex flex-row w-[100%] cursor-pointer border border-b-gray-400 border-white px-3 justify-between py-5 ${selectedDpId === areas?.id ? 'bg-indigo-200 border-indigo-200' : 'border-white'}`}>
                <h1 className='text-xl w-[90%]'>{areas.name}</h1>
                <IoMdArrowDropright className='text-2xl' />
            </div>
        )
        )
    }
  </div>: <div className='flex-1 text-center'>
    <h1>This sub project has no dp area, add one to get started.</h1>
  </div>
  }
  </div>
  );
}

export default DpArea;