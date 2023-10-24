import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { fetchDpAreas, fetchDpPictures } from "../action/projects";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import {MdOutlineContentCopy} from 'react-icons/md'
import ProjectDetail from "../components/projectDetail";
import { toast } from "react-toastify";
import copy from 'clipboard-copy';
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

 const handleCopy = (lat, lng) => {
  // copyToClipboard('lat')

  copy(`${lat}, ${lng}`)

  toast.info('Coordinates copied to clipboard', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

 }

  return (
    <div className="flex flex-col gap-[4%] py-8 px-[20px] h-[100%]">
 <Breadcrumb />
       {
        loading ? <div className='flex-1 flex justify-center'>
        <CircularProgress />
      </div> : areas?.length ? <div 
      className="grid lg:grid-cols-4 mt-[6.5rem] gap-6 md:grid-cols-3 sm:grid-cols-1 scroll-smooth"
      >

        {areas?.map((area) => (
          <div key={area.id} className="flex flex-col border rounded-xl font-roboto">
            <div className="flex flex-row bg-gray-200 p-[8px] rounded-xl gap-[5%]">
              <img src={area?.thumbnail_image} alt={area?.dp_image} className="w-40 h-40 rounded-lg"/>
              <div className="flex flex-row flex-wrap flex-1 p-1 justify-between">
                <div className="flex flex-col">
                  {/* <h1 className="text-[16px] font-mono">{area?.created_at_local}</h1> */}
                  {area?.created_at_local.slice(0, -6)}
                  <button className="border rounded-lg shadow-md cursor-not-allowed text-[15px] border-gray-400 p-1">To inspect</button>
                </div>
                {
                  area?.updated_by?.profile_picture ? <img src={area?.updated_by?.profile_picture} alt="profile picture" className="w-20 h-10 rounded-full"/> : <p className="bg-yellow-600 w-10 h-10 rounded-full flex items-center justify-center"><span>{area?.updated_by?.username.slice(0, 2)}</span></p>
                }

              </div>
            </div>

            <div className="p-4">
              <p className="text-[16px] font-semibold">Location</p>
            <div className="flex flex-row justify-between mt-1.5">
               <p className="text-[15px]"> <span>Lat: {getWholeAndDecimal(area?.latitude)}</span> <span className="ml-2">Lon:  {getWholeAndDecimal(area?.longitude)}</span></p>
               <MdOutlineContentCopy className="text-blue-700 text-xl cursor-pointer" onClick={() => handleCopy(area?.latitude, area?.longitude)}/>
            </div>
            <h1 className="text-[16px] font-semibold mt-3">Note</h1>
            <p className="mt-1.5 text-[15px]">{area?.dp_note ? area?.dp_note?.slice(0, 65)   : 'No note'}</p>
            <h1 className="text-[16px] font-semibold mt-2">Depth</h1>
            <p className="text-[15px]">{area?.depth ? area?.depth : "No depth information"}cm</p>
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
