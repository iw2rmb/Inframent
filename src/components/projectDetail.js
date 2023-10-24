import React, { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteDpArea } from "../action/projects";
import copy from "clipboard-copy";
import { toast } from "react-toastify";
const ProjectDetail = ({ setShowDetails, id }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { loading, picture } = useSelector((state) => state?.dpPicture);

  useEffect(() => {

      setData("");
      setData(picture);
  
  }, [picture]);

  function getWholeAndDecimal(decimalNumber) {
    // Split the decimal number into its components.
    const [wholeNumber, decimalPart] = decimalNumber?.toString().split(".");

    // // Get the first three digits of the decimal part.
    const decimalDigits = decimalPart?.substring(0, 3);

    // // Return the whole number, the decimal point, and the first three digits of the decimal part.
    return `${wholeNumber}.${decimalDigits}`;
  }

  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    return (
      <div>
        <p>
          {formattedTime}, {formattedDate}
        </p>
      </div>
    );
  };

  const handleDelete = () => {
    dispatch(deleteDpArea(id, data?.dp_area?.name, data?.dp_note, data?.depth));
    setShowDetails(false)
    setShowModal(false)
  };

  const handleCopy = (lat, lng) => {
    copy(`${lat}, ${lng}`);

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
  };


  return (
    <div className="fixed flex items-center justify-center z-10 backdrop top-0 left-0 w-[100%] h-[100%]">
      {loading === true ? (
        <div>loading</div>
      ) : !data ? (
        ""
      ) : (
        <div className="bg-white z-10 rounded-xl w-[70rem] h-[80vh] gap-12 flex flex-row py-8 px-12 font-roboto">
          <div className="w-[65%] flex flex-col justify-between">
            <p className="text-2xl font-roboto">Picture details</p>
            <img
              src={data?.dp_image ? data?.dp_image : data?.thumbnail_image}
              alt={data?.dp_image}
              className="w-[100%] h-[90%] rounded-md"
            />
          </div>

          <div className="flex flex-col justify- h-[100%] w-[40%] relative">
            <div className="mb-8 w-[100%] flex justify-end h-fit">
              <AiOutlineClose
                className="text-xl text-blue-600 cursor-pointer"
                onClick={() => setShowDetails(false)}
              />
            </div>
            <div className="p-4 ">
              <div className="overflow-scroll scroll-smooth h-[92.5%]">
                <p className="text-[16px] font-semibold">Location</p>
                <div className="flex flex-row justify-between mt-1.5">
                  <div className="flex flex-row gap-2">
                    <p>
                      Lat: <span>{getWholeAndDecimal(picture?.latitude)}</span>
                    </p>
                    <p>
                      Lon: <span>{getWholeAndDecimal(picture?.longitude)}</span>
                    </p>
                  </div>

                  {/* <div> */}
                    <MdOutlineContentCopy
                    className="text-blue-700 text-xl cursor-pointer"
                    onClick={() =>
                      handleCopy(picture?.latitude, picture?.longitude)
                    }
                  />

                  
                </div>
                <h1 className="text-[16px] font-semibold mt-3">Note</h1>
                <p className="mt-1.5 text-[15px] w-[75%]">
                  {data?.dp_note ? data?.dp_note?.slice(0, 65) : "No note"}
                </p>
                <h1 className="text-[16px] font-semibold mt-2">Depth</h1>
                <p className="text-[15px] mt-1.5">
                  {data?.depth ? data?.depth : "No depth information"}
                  cm
                </p>
                <h1 className="text-[16px] font-semibold mt-3">Category</h1>
                <p className="text-[15px] mt-1.5 border bg-gray-100 px-5 rounded-md py-2 w-fit shadow-md">
                  {data?.dp_category?.name}
                </p>
                <h1 className="text-[16px] font-semibold mt-3">Project</h1>
                <p className="text-[15px] mt-1.5">
                  Project: {data?.dp_area?.pop_area?.city_area?.name}
                </p>
                <p className="text-[15px]">
                  Sub-project: {data?.dp_area?.name}
                </p>
                <p className="text-[15px]">
                  Dp area: {data?.dp_area?.pop_area?.name}
                </p>

                <h1 className="text-[16px] font-semibold mt-3">Reported</h1>
                <div className="flex mt-1.5 flex-row gap-3 items-center">
                  {data?.updated_by?.profile_picture ? (
                    <img
                      src={data?.thumbnail_image}
                      alt="thumbnail"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <p className="bg-yellow-600 h-fit w-fit py-3 px-4 capitalize rounded-full">
                      {picture?.updated_by?.username.slice(0, 2)}
                    </p>
                  )}
                  <p className="text-[17px] font-roboto">
                    {data?.updated_by?.username}
                  </p>
                </div>
                <h1 className="text-[16px] font-semibold mt-3">
                  Time of recording
                </h1>
                <h1 className="text-[15px] mt-1.5">
                  {formatDateAndTime(data?.created_at_utc)}
                </h1>
                <h1 className="text-[16px] font-semibold mt-3">Device</h1>
                <p className="text-[15px]">{data?.device_model}</p>
              </div>
              <div className="mt-4 cursor-pointer flex flex-row justify-end font-semibold  text-red-500">
                <div
                  className="flex flex-row items-center gap-3"
                  onClick={() => setShowModal(true)}
                >
                  <RiDeleteBin6Line />
                  <p>Delete Picture</p>
                </div>
              </div>

              {showModal && (
                <div className="w-[100%] h-[13rem] justify-evenly flex flex-col rounded-xl bg-neutral-200 absolute bottom-0 left-0 px-4">
                  <div>
                    <h1 className="font-roboto text-xl">Are you sure?</h1>
                    <p className="font-roboto mt-2 text-[15px] w-[80%]">
                      When you delete a picture it's gone forever along with the
                      information attached to it.
                    </p>
                  </div>
                  <div className="flex flex-row gap-8 justify-end pr-4">
                    <button
                      className="text-red-700 cursor-pointer"
                      onClick={handleDelete}
                    >
                      Yes
                    </button>
                    <button
                      className="text-blue-900 cursor-pointer"
                      onClick={() => setShowModal(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className="absolute w-[100vw] h-[100vh] top-0 cursor-pointer"
        onClick={() => setShowDetails(false)}
      ></div>
    </div>
  );
};

export default ProjectDetail;
