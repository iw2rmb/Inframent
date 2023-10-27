import React, { useEffect, useState, useRef } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchDP } from "../action/projects";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation, useNavigate } from "react-router-dom";
import {AiOutlineFolderAdd} from 'react-icons/ai'
import BasicModal from './Modal';
const DpArea = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false)

  const selectedSubProjectId = location?.pathname.split("/")[3];
  const { loading, dpAreas } = useSelector((state) => state?.listPopAreas);



  useEffect(() => {
    dispatch(fetchDP(selectedSubProjectId));
  }, [dispatch, selectedSubProjectId]);




  const handleNavigate = (id) => {
    navigate(`${location.pathname}/${id}`);
  };



  const containerRef = useRef(null);



  const scrollToBottom = () => {
    if (containerRef.current) {
      console.log('scrollTop before:', containerRef.current.scrollTop);
      console.log('scrollHeight:', containerRef.current.scrollHeight);
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      console.log('scrollTop after:', containerRef.current.scrollTop);
    } else {
      console.log('none')
    }
  };


  return (
    <div className="border pb-4 font-roboto relative h-[100%] w-[33%] bg-white shadow-xl rounded-2xl">
      <h1 className="h-[15%] w-[100%] flex items-center justify-center text-2xl font-[400]">
        DP areas
      </h1>
      {loading ? (
        <div className="flex-1 flex justify-center">
          <CircularProgress />
        </div>
      ) : dpAreas.length > 0 ? (
        <div className="scroll-smooth overflow-y-scroll h-[85%]" ref={containerRef}>
                <div className='h-fit overflow-y-scroll' >
          {dpAreas?.map((areas) => (
            <div
              key={areas.id}
              onClick={() => handleNavigate(areas?.id)}
              className={`flex flex-row w-[100%] cursor-pointer border border-b-gray-400 border-white px-3 justify-between py-5
             
              `}
            >
              <h1 className="text-xl w-[90%]">{areas.name}</h1>
              <IoMdArrowDropright className="text-2xl" />
            </div>
          ))}
          </div>
        </div>
      ) : (
        <div className='flex-1 flex h-[80%] text-center justify-center items-center'>
          <h1 className="sans">This sub-project has no DP areas, <br /> add one to get started</h1>
        </div>
      )}



<button className='absolute bottom-[2rem] right-[2rem] border cursor-pointer bg-[#E9E7EC] px-[2rem] py-[1.25rem] font-roboto flex flex-row gap-[1.5rem] items-center rounded-2xl text-blue-600 shadow-xl'  onClick={() => setShowModal(true)}><AiOutlineFolderAdd className='text-blue-700 text-2xl'/> Add DP area</button>
<BasicModal type="DP area" setShowModal={setShowModal} showModal={showModal} scrollToBottom={scrollToBottom}/>
    </div>
  );
};

export default DpArea;
