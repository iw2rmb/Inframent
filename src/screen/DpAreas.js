import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { fetchDpAreas, fetchDpPictures, resetForm } from "../action/projects";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import {MdOutlineContentCopy} from 'react-icons/md'
import ProjectDetail from "../components/projectDetail";
import { toast } from "react-toastify";
import copy from 'clipboard-copy';
import getColorByAlphabet from "../components/getRandomColor";
const DpAreas = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false)
  const [pictureId, setPictureId] = useState(null)
  const data = location?.pathname?.split('/')[4]
  const {  areas, loading } = useSelector((state) => state?.listDpAreas);
  const deleteDp = useSelector((state) => state?.deleteDpArea)

  const {subProjects} = useSelector((state) => state?.listSubProjects)

  useEffect(() => {
    if (areas && areas.length > 0) {
      dispatch(fetchDpPictures(areas[0]?.id))
    }
    
  }, [areas])

  useEffect(() => {
      dispatch(fetchDpAreas(data));
  }, [data, dispatch]);


  useEffect(() => {
    if(deleteDp?.status) {
      dispatch(resetForm())
      dispatch(fetchDpAreas(data));
    }
    
}, [deleteDp, dispatch]);



  const handleShowPicture = (id) => {
    setShowDetails(true)
    setPictureId(id)
    dispatch(fetchDpPictures(id))
  }


  

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


 function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return dateTime.toLocaleString(undefined, options);
}


  return (
    <div className="flex flex-col gap-[4%] py-8 px-[20px] h-[100%]">
 <Breadcrumb />
       {
        loading ? <div className='flex-1 flex justify-center h-[100vh] items-center'>
        <CircularProgress />
      </div> : areas?.length ? <div 
      className="grid xl:grid-cols-4 lg:grid-cols-3 mt-[6.5rem] gap-6 md:grid-cols-2 sm:grid-cols-1 scroll-smooth"
      >

        {areas?.map((area) => (
          <div key={area.id} className="flex flex-col border rounded-xl font-roboto lg:min-w-[20rem]">
            <div className="flex flex-row bg-gray-200 p-[8px] rounded-xl gap-[5%]">
              <img src={area?.thumbnail_image} alt={area?.dp_image} className={`w-[50%] h-40 rounded-lg ${area?.thumbnail_image ? '' : 'bg-gray-600'}`}/>
              <div className="flex flex-row flex-1 p-1 justify-between">
                <div className="flex flex-col w-fit">

                  <p className="text-[15px] w-24">
                    { area?.created_at_utc? formatDateTime(area?.created_at_utc) : ''}
                  </p>
                  
                    
                  
                  
                  <p className="text-[15px] mt-1.5 border bg-gray-100 px-5 rounded-md py-2 w-fit shadow-md">
                  Inspect
                </p>
                </div>
                {
                  area?.updated_by?.profile_picture ? <img src={area?.updated_by?.profile_picture} alt="profile picture" className="w-20 h-10 rounded-full"/> : <p   style={{backgroundColor: area?.created_by?.username ? getColorByAlphabet(area?.created_by?.username.slice(0, 1)) : '#e5e7eb'}} className=" w-10 h-10 uppercase rounded-full flex items-center justify-center"><span>{area?.created_by?.username.slice(0, 2)}</span></p>
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
            <p className="text-[15px]">{area?.depth ? area?.depth + "cm" : "No depth information"}</p>
            <div className="mt-8 flex flex-1 justify-end">
              <button className="text-blue-700 cursor-pointer" onClick={() => handleShowPicture(area?.id)}>Full details</button>
            </div>
            </div>
            {
        showDetails && areas && <ProjectDetail setShowDetails={setShowDetails} id={pictureId} showDetails={showDetails}/>
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
