import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubProject, fetchProjects, resetForm, fetchSubProjects } from "../action/projects";
import DeleteModal from "./deleteModal";
// import { useNavigate } from "react-router-dom";
const SubProjectCard = ({ project, handleNavigate }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedSubProjectId, setSelectedSubProjectId] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  // const [selectedSubProjectId, setSelectedSubProjectId] = useState(0);

  useEffect(() => {
    setSelectedProject(location?.pathname.split("/")[2]);
  }, [location]);

  const handleDelete = () => {
      dispatch(deleteSubProject(project?.id))
      setShowDeleteModal(false)
  };

  useEffect(() => {
    setSelectedSubProjectId(location?.pathname.split("/")[3]);
  }, [location]);

const subProjectDelete = useSelector((state) => state?.deleteSubProject)
const selectedProjectId = location?.pathname.split('/')[2]

useEffect(() => {
  if(subProjectDelete?.deleteSubProject?.detail) {
    
    navigate(`/projects/${selectedProjectId}`)
    dispatch(fetchSubProjects(selectedProjectId))
    dispatch(resetForm())
    setShowMenu(false)
    setShowOptions(false)
  }
}, [subProjectDelete])
useEffect(() => {
  setSelectedSubProjectId(location?.pathname.split('/')[3])
}, [location])

  return (
    <div
      className={`flex flex-row w-[100%] relative cursor-pointer border border-b-gray-400  px-3 justify-between items-center ${
        selectedSubProjectId === `${project?.id}`
          ? "bg-indigo-200 border-indigo-200"
          : "border-white"
      }`}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => (setShowMenu(false), setShowOptions(false))}
    >
      <div
        onClick={() => handleNavigate(project?.id)}
        key={project.id}
        className="flex-1 py-5"
      >
        <h1 className="text-xl font-roboto">{project.name}</h1>
        
      </div>

<div>
    {showMenu && (
      <div className="p-2" onClick={() => setShowOptions(true)}>
          <BsThreeDotsVertical
            className="text-xl "
            
          />
          </div>
        )}
      {showOptions && (
        <div
          className="absolute z-[100] shadow-md rounded-md right-5 bg-[#EFEDF1] text-red-500 bottom-[-2rem] flex flex-row gap-3 px-5 py-4 font-roboto items-center"
          onClick={() => setShowDeleteModal(true)}
        >
          <RiDeleteBinLine />
          <p>Delete sub-project</p>
        </div>
      )}
</div>

<DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} type='sub-project' name={project?.name} handleDelete={handleDelete} />
    
    </div>
  );
};

export default SubProjectCard;
