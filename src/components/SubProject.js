import React, {useEffect, useState} from 'react';
import {IoMdArrowDropright} from 'react-icons/io';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { fetchSubProjects } from '../action/projects';
import CircularProgress from '@mui/material/CircularProgress';
import {useLocation, Link, useNavigate} from 'react-router-dom'
const SubProject = ({setSelectedSubProject, selectedProject}) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location?.pathname
  const selectedProjectId = location?.pathname.split('/')[2]
  // const selectedProject = location?.pathname.split('/')[2]
  const [proj, setProj] = useState()
  const [selectedSubProjectId, setSelectedSubProjectId] = useState(0);
  const {loading, subProjects} = useSelector((state) => state?.listSubProjects)

const handleNavigate = (id) => {
  navigate(`/projects/${selectedProjectId}/${id}`)
}

  useEffect(() => {
    if (subProjects) {
      setProj(subProjects)
    }
    
  }, [subProjects])

  useEffect(() => {
      dispatch(fetchSubProjects(selectedProjectId))
  }, [selectedProject, location])



  useEffect(() => {
    setSelectedSubProjectId(location?.pathname.split('/')[3])
}, [location])
  return (
    <div className='border pb-4 h-[100%] bg-white w-[30%] shadow-xl rounded-2xl'>
      <h1 className='h-[15%] font-roboto w-[100%] flex items-center justify-center text-2xl font-[400]'>Sub-projects</h1>
      {
      loading ? <div className='flex-1 flex justify-center'>
        <CircularProgress />
      </div>  : proj?.length > 0 ? <div className='scroll-smooth'>
      {
          proj?.map((project) => 
          (
            <div onClick={() => handleNavigate(project?.id)} key={project.id}  className={`flex flex-row w-[100%] cursor-pointer border border-b-gray-400  px-3 justify-between py-5 ${selectedSubProjectId === `${project?.id}` ? 'bg-indigo-200 border-indigo-200' : 'border-white'}`}>
                  <h1 className='text-xl font-roboto'>{project.name}</h1>
                  <IoMdArrowDropright className='text-2xl' />
              </div>
              
          )
          )
      }
    </div>: <div className='flex-1 text-center'>
      <h1 className='sans'>This project has no sub-project, add one to get started.</h1>
    </div>
    }
    </div>
  );
}

export default SubProject;
