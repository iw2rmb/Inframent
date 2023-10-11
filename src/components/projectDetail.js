import React, {useEffect} from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import {RiDeleteBin6Line} from 'react-icons/ri';

import { useDispatch, useSelector } from "react-redux";
import { fetchDpPictures } from "../action/projects";
const ProjectDetail = ({setShowDetails, id}) => {
  const dispatch = useDispatch();
  const {loading, picture} = useSelector((state) => state?.dpPicture)
  
  useEffect(() => {
  }, [ dispatch, picture])


  function getWholeAndDecimal(decimalNumber) {
    // Split the decimal number into its components.
    const [wholeNumber, decimalPart] = decimalNumber.toString().split('.');
  
    // Get the first three digits of the decimal part.
    const decimalDigits = decimalPart.substring(0, 3);
  
    // Return the whole number, the decimal point, and the first three digits of the decimal part.
    return `${wholeNumber}.${decimalDigits}`;
  }

  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    
    return (
      <div>
        <p>{formattedTime}, {formattedDate}</p>
      </div>
    );
  };
  

 
  return (
    <div className="fixed flex items-center justify-center z-10 backdrop top-0 left-0 w-[100%] h-[100%]">

      {
        loading === true ? <div>loading</div> : !picture ? '' : 
      <div className="bg-white rounded-xl w-[70vw] min-w-[50rem] h-[80vh] gap-12 flex flex-row py-8 px-12 font-roboto">
        <div className="w-[55%] flex flex-col justify-between">
          <p className="text-2xl font-roboto">Picture details</p>
          <img
            src={picture?.dp_image}
            alt="image"
            className="w-[100%] h-[90%] rounded-md"
          />
        </div>

        <div className="flex flex-col justify- h-[100%] w-[45%]">
        <div className="mb-8 w-[100%] flex justify-end h-fit">
              <AiOutlineClose className="text-xl text-blue-600 cursor-pointer" onClick={() => setShowDetails(false)}/>
            </div>
          <div className="p-4 ">
           

            <div>
            <p className="text-[16px] font-semibold">Location</p>
            <div className="flex flex-row justify-between mt-1.5">


                    <div className="flex flex-row gap-2">
                      <p>Lat: <span>{getWholeAndDecimal(picture?.latitude)}</span>
                        </p>
                      <p>Lon: <span>{getWholeAndDecimal(picture?.longitude)}</span>
                        </p>
                    </div>

               <MdOutlineContentCopy className="text-blue-700 text-xl cursor-pointer"/>
            </div>
            <h1 className="text-[16px] font-semibold mt-3">Note</h1>
            <p className="mt-1.5 text-[15px] w-[75%]">
                {picture?.dp_note ? picture?.dp_note?.slice(0, 65)   : 'Empty'}
                </p>
            <h1 className="text-[16px] font-semibold mt-2">Depth</h1>
            <p className="text-[15px] mt-1.5">
                {picture?.depth}
                
                cm</p>
            <h1 className="text-[16px] font-semibold mt-3">Category</h1>
            <p className="text-[15px] mt-1.5 border bg-gray-100 px-5 rounded-md py-2 w-fit shadow-md">{picture?.dp_category?.name}</p>
            <h1 className="text-[16px] font-semibold mt-3">Project</h1>
            <p className="text-[15px] mt-1.5">Project: {picture?.dp_area?.pop_area?.city_area?.name}</p>
            <p className="text-[15px]">Sub-project: {picture?.dp_area?.name}</p>
            <p className="text-[15px]">Dp area: {picture?.dp_area?.pop_area?.name}</p>

            <h1 className="text-[16px] font-semibold mt-3">Reported</h1>
            <div className='flex mt-1.5 flex-row gap-3 items-center'>
            {
                  picture?.updated_by?.profile_picture ? <img src={picture?.thumbnail_image} alt="thumbnail" className="w-10 h-10 rounded-full"/> : <p className="bg-yellow-600 h-fit w-fit py-3 px-4 capitalize rounded-full">{picture?.updated_by?.username.slice(0, 2)}</p>
                }
                <p className="text-[17px] font-roboto">Tobiloba Salau</p>
            </div>
            <h1 className="text-[16px] font-semibold mt-3">Time of recording</h1>
            <p className="text-[15px] mt-1.5">
              {/* {picture?.created_at_utc.split("T")} */}
              {formatDateAndTime(picture?.created_at_utc)}
              </p>
            <h1 className="text-[16px] font-semibold mt-3">Device</h1>
            <p className="text-[15px]">Google Pixel 6</p>
            
            </div>
            {/* <div className="mt-16 flex flex-row justify-end gap-3 font-semibold items-center text-red-500">
              <RiDeleteBin6Line />
              <p>Delete Pictures</p>
            </div> */}
          </div>
         
        </div>
      </div>
}
    </div>
  );
};

export default ProjectDetail;