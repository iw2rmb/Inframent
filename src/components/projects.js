import React, {useState, useEffect, useRef} from 'react';
import {BiSolidRightArrow} from 'react-icons/bi';
import {IoMdArrowDropright} from 'react-icons/io';
import {useSelector, useDispatch} from 'react-redux'
// import { projects } from '../data';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteProject, fetchProjects, resetForm } from '../action/projects';
import {useLocation, Link, useNavigate} from 'react-router-dom';
import {AiOutlineFolderAdd} from 'react-icons/ai'
import BasicModal from './Modal';

import ProjectCard from './projectCard';
const Projects = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [projectInfo, setProjectInfo] = useState()
  const [selectedProject, setSelectedProject] = useState()
  const [showModal, setShowModal] = useState()
  const [showMenu, setShowMenu] = useState(false)

  const {loading, projects} = useSelector((state) => state?.listProjects);
  const addNewProject = useSelector((state) => state?.addProject)

  
  useEffect(() => {
if (projects) {
    setProjectInfo(projects)
  }
  }, [projects])
  const data = sessionStorage.getItem("userInfo");


  useEffect(() => {
    if (data) {
      dispatch(fetchProjects())
    }
    
  }, [dispatch, data])


  const containerRef = useRef(null);


  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    } else {
    }
  };


  const projectDelete = useSelector((state) => state?.deleteProject)

  



  return (
    <div className='pb-4 h-[100%] relative w-[33%] shadow-xl rounded-2xl bg-white' >
      <h1 className='h-[15%] w-[100%] font-roboto flex items-center justify-center text-2xl font-[400]'>Projects</h1>

    {
      loading ? <div className='flex-1 flex justify-center'>
        <CircularProgress />
      </div>  : projectInfo?.length > 0 ? 
      <div className='h-[85%] overflow-y-scroll' ref={containerRef}>
      <div className='h-fit overflow-y-scroll pb-[10rem]' >

        
      {
          projectInfo?.map((project) => 

          (
            <ProjectCard project={project} key={project?.project_id} />
              
          )
          )
      }
      </div>
    </div> :  <div className='flex-1 flex h-[80%] text-center justify-center items-center'>
      <h1 className='font-roboto text-2xl h-[80%] text-center'>So empty, add a <br /> project to get started</h1>
    </div>
    }
      
     
    <button className='absolute bottom-[2rem] right-[2rem] border cursor-pointer bg-[#E9E7EC] px-[2rem] py-[1.25rem] font-roboto flex flex-row gap-[1.5rem] items-center rounded-2xl text-blue-600 shadow-xl' onClick={() => setShowModal(true)}><AiOutlineFolderAdd className='text-blue-700 text-2xl'/> Add project</button>
    
    
       <BasicModal type="Project" setShowModal={setShowModal} showModal={showModal} scrollToBottom={scrollToBottom}/>

       </div> 
  );
}

export default Projects;
