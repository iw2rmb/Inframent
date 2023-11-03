import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, fetchProjects, resetForm } from "../action/projects";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./deleteModal";
const ProjectCard = ({ project }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setSelectedProject(location?.pathname.split("/")[2]);
  }, [location]);

  const handleProjectDelete = () => {
    dispatch(deleteProject(project.project_id));
    setShowDeleteModal(false);
  };

  const projectDelete = useSelector((state) => state?.deleteProject);

  useEffect(() => {
    if (projectDelete?.deleteProject?.detail) {
      navigate("/projects");
      dispatch(fetchProjects());
      dispatch(resetForm());
      setShowMenu(false);
      setShowOptions(false);
    }
  }, [projectDelete]);


  return (
    <>
        <div
          className={`flex flex-row w-[100%] relative pr-3 cursor-pointer border border-b-gray-400 items-center  justify-between  bg-b
             ${
               selectedProject === `${project?.project_id}`
                 ? "bg-indigo-200 border-indigo-200"
                 : "border-white"
             }`}
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => (setShowMenu(false), setShowOptions(false))}
        >
        
         
          <div className=" py-5 flex-1 pl-3" onClick={() => navigate(`/projects/${project.project_id}`)}>
              <h1 className="text-xl font-roboto">{project.name}</h1>
          </div>
          
          {showMenu && (
            <div className="p-2">
               <BsThreeDotsVertical
              className="text-xl "
              onClick={() => setShowOptions(true)}
            />
            </div>
           
          )}

          {showOptions && (
            <div
              className="absolute z-[100] shadow-md rounded-md right-5 bg-[#EFEDF1] text-red-500 bottom-[-2rem] flex flex-row gap-3 px-5 py-4 font-roboto items-center"
              onClick={() => setShowDeleteModal(true)}
            >
              <RiDeleteBinLine />
              <p>Delete project</p>
            </div>
          )}
        </div>
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          type="project"
          name={project?.name}
          handleDelete={handleProjectDelete}
        />
    </>
  );
};

export default ProjectCard;
