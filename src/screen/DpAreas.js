import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { fetchDpAreas, fetchDpPictures } from "../action/projects";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import {MdOutlineContentCopy} from 'react-icons/md'
import ProjectDetail from "../components/projectDetail";
const DpAreas = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false)
  const [pictureId, setPictureId] = useState(null)
  const data = location?.pathname?.split('/')[4]

  useEffect(() => {
    dispatch(fetchDpAreas(data));
  }, [data, dispatch]);

  const handleShowPicture = (id) => {
    setShowDetails(true)
    setPictureId(id)
    dispatch(fetchDpPictures(id))
  }

  const { loading, areas } = useSelector((state) => state?.listDpAreas);


  function getWholeAndDecimal(decimalNumber) {
    // Split the decimal number into its components.
    const [wholeNumber, decimalPart] = decimalNumber.toString().split('.');
  
    // Get the first three digits of the decimal part.
    const decimalDigits = decimalPart?.substring(0, 3);
  
    // Return the whole number, the decimal point, and the first three digits of the decimal part.
    return `${wholeNumber}.${decimalDigits}`;
  }

 

  return (
    <div className="flex flex-col gap-[4%] py-8 px-[20px] h-[100%]">
 <Breadcrumb />
       {
        loading ? <div className='flex-1 flex justify-center'>
        <CircularProgress />
      </div> : areas?.length ? <div 
      className="grid lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-1"
      >

        {areas?.map((area) => (
          <div key={area.id} className="flex flex-col border rounded-xl font-roboto">
            <div className="flex flex-row bg-gray-200 p-[8px] rounded-xl gap-[5%]">
              <img src={area?.dp_image} alt={area?.dp_image} className="w-40 h-40 rounded-lg"/>
              <div className="flex flex-row flex-1 p-1 justify-between">
                <div>
                  <h1 className="text-[16px] font-mono">12:23:34, 12/09/22</h1>
                  <button className="border rounded-lg shadow-md cursor-not-allowed text-[15px] border-gray-400 p-1">To inspect</button>
                </div>
                {
                  area?.updated_by?.profile_picture ? <img src={area?.thumbnail_image} alt="thumbnail" className="w-10 h-10 rounded-full"/> : <p className="bg-yellow-600 h-fit w-fit py-3 px-4 capitalize rounded-full">{area?.updated_by?.username.slice(0, 2)}</p>
                }

              </div>
            </div>

            <div className="p-4">
              <p className="text-[16px] font-semibold">Location</p>
            <div className="flex flex-row justify-between mt-1.5">
               <p className="text-[15px]"> <span>Lat: {getWholeAndDecimal(area?.latitude)}</span> <span>Lon:  {getWholeAndDecimal(area?.longitude)}</span></p>
               <MdOutlineContentCopy className="text-blue-700 text-xl cursor-pointer"/>
            </div>
            <h1 className="text-[16px] font-semibold mt-3">Note</h1>
            <p className="mt-1.5 text-[15px]">{area?.dp_note ? area?.dp_note?.slice(0, 65)   : 'Empty'}</p>
            <h1 className="text-[16px] font-semibold mt-2">Depth</h1>
            <p className="text-[15px]">{area?.depth}cm</p>
            <div className="mt-8 flex flex-1 justify-end">
              <button className="text-blue-700 cursor-pointer" onClick={() => handleShowPicture(area?.id)}>Full details</button>
            </div>
            </div>
            {
        showDetails && areas && <ProjectDetail setShowDetails={setShowDetails} id={pictureId}/>
      }
          </div>
        ))}
      </div> : <div className="w-[100%] h-[100vh] items-center justify-center flex flex-col">
       <img src="/assets/no-data.png" alt="" className=""/>
       <h1 className="sans relative bottom-[4rem]">The DP picture has no area yet</h1>
      </div>
      }

      
      
    </div>
  );
};

export default DpAreas;
