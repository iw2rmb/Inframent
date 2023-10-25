import React, {useState, useEffect} from 'react';
import {BiSolidRightArrow} from 'react-icons/bi';
import {IoMdArrowDropright} from 'react-icons/io';
import {useSelector, useDispatch} from 'react-redux'
// import { projects } from '../data';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchProjects } from '../action/projects';
import {useLocation, Link} from 'react-router-dom';
import {AiOutlineFolderAdd} from 'react-icons/ai'
import BasicModal from './Modal';

const Projects = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [projectInfo, setProjectInfo] = useState()
  const [selectedProject, setSelectedProject] = useState()
  const [showModal, setShowModal] = useState(false)

  const {loading, projects} = useSelector((state) => state?.listProjects);

  
  useEffect(() => {
if (projects) {
    setProjectInfo(projects)
  }
  }, [projects])
  const data = sessionStorage.getItem("userInfo");

  useEffect(() => {
    if (data){

      dispatch(fetchProjects())

    }

    
  }, [dispatch, data])

  useEffect(() => {
      setSelectedProject(location?.pathname.split('/')[2])
  }, [location])

  return (
    <div className='pb-4 h-[100%] relative w-[30%] shadow-xl rounded-2xl bg-white'>
      <h1 className='h-[15%] w-[100%] font-roboto flex items-center justify-center text-2xl font-[400]'>Projects</h1>

    {
      loading ? <div className='flex-1 flex justify-center'>
        <CircularProgress />
      </div>  : projectInfo?.length > 0 ? <div>
      {
          projectInfo?.map((project) => 

          (
            <Link to={`/projects/${project.project_id}`} key={project.project_id}>
            <div    className={`flex flex-row w-[100%] cursor-pointer border border-b-gray-400  px-3 justify-between py-5
             ${selectedProject === `${project?.project_id}` ? 'bg-indigo-200 border-indigo-200' : 'border-white'}`}>
                  <h1 className='text-xl font-roboto'>{project.name}</h1>
                  <IoMdArrowDropright className='text-2xl' />
              </div>
            </Link>
              
          )
          )
      }
    </div> :  <div className='flex-1 text-center'>
      <h1 className='font-roboto text-2xl'>There is no project.</h1>
    </div>
    }
      
     
    <button className='absolute bottom-[2rem] right-[2rem] border cursor-pointer bg-[#E9E7EC] px-[2rem] py-[1.25rem] font-roboto flex flex-row gap-[1.5rem] items-center rounded-2xl text-blue-600 shadow-xl' onClick={() => setShowModal(true)}><AiOutlineFolderAdd className='text-blue-700 text-2xl'/> Add project</button>
       <BasicModal type="Project" setShowModal={setShowModal} showModal={showModal}/>
    </div> 
  );
}

export default Projects;
