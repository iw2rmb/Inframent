import React, {useState, useEffect} from 'react';
import {IoMdArrowDropright} from 'react-icons/io';
import {useSelector, useDispatch} from 'react-redux'
// import { projects } from '../data';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchProjects } from '../action/projects';

const Projects = ({setSelectedProject}) => {
  const dispatch = useDispatch()

  const [selectedProjectId, setSelectedProjectId] = useState(0)


  const {loading, projects} = useSelector((state) => state?.listProjects);


  const data = sessionStorage.getItem("userInfo");

  useEffect(() => {
    if (data){
      dispatch(fetchProjects())
    }

    
  }, [data, dispatch])

  const handleSelected = (project) => {
    setSelectedProject(project.project_id, project.name)
    setSelectedProjectId(project.project_id)
  }

  return (
    <div className='pb-4 h-[100%] w-[30%] shadow-xl rounded-2xl bg-white'>
      <h1 className='h-[15%] w-[100%] font-roboto flex items-center justify-center text-2xl font-[400]'>Projects</h1>

    {
      loading ? <div className='flex-1 flex justify-center'>
        <CircularProgress />
      </div>  : projects.length > 0 ? <div>
      {
          projects?.map((project) => 

          (
              <div  key={project.project_id} onClick={() => handleSelected(project)} className={`flex flex-row w-[100%] cursor-pointer border border-b-gray-400  px-3 justify-between py-5 ${selectedProjectId === project?.project_id ? 'bg-indigo-200 border-indigo-200' : 'border-white'}`}>
                  <h1 className='text-xl font-roboto'>{project.name}</h1>
                  <IoMdArrowDropright className='text-2xl' />
              </div>
          )
          )
      }
    </div> :  <div className='flex-1 text-center'>
      <h1 className='font-roboto text-2xl'>There is no project.</h1>
    </div>
    }
      
     

      
    </div> 
  );
}

export default Projects;
