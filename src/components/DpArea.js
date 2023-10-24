import React, { useEffect } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchDP } from "../action/projects";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation, useNavigate } from "react-router-dom";
const DpArea = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedSubProjectId = location?.pathname.split("/")[3];
  const { loading, dpAreas } = useSelector((state) => state?.listPopAreas);

  useEffect(() => {
    dispatch(fetchDP(selectedSubProjectId));
  }, [dispatch, selectedSubProjectId]);

  const handleNavigate = (id) => {
    navigate(`${location.pathname}/${id}`);
  };


  return (
    <div className="border pb-4 font-roboto h-[100%] w-[30%] bg-white shadow-xl rounded-2xl">
      <h1 className="h-[15%] w-[100%] flex items-center justify-center text-2xl font-[400]">
        DP areas
      </h1>
      {loading ? (
        <div className="flex-1 flex justify-center">
          <CircularProgress />
        </div>
      ) : dpAreas.length > 0 ? (
        <div className="scroll-smooth">
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
      ) : (
        <div className="flex-1 text-center">
          <h1 className="sans">This sub-project has no DP areas, add one to get started</h1>
        </div>
      )}
    </div>
  );
};

export default DpArea;
