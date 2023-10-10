import React, {useEffect, useState} from 'react';
import {BiSolidRightArrow} from 'react-icons/bi';
import {IoMdArrowDropright} from 'react-icons/io';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { fetchSubProjects } from '../action/projects';
import CircularProgress from '@mui/material/CircularProgress';
const SubProject = ({setSelectedSubProject, selectedProject}) => {
  const dispatch = useDispatch();

  const [selectedSubProjectId, setSelectedSubProjectId] = useState(0);
  useEffect(() => {
      setSelectedSubProjectId(0)
  }, [selectedProject])

  useEffect(() => {
      dispatch(fetchSubProjects(selectedProject))
  }, [selectedProject])

  const {loading, subProjects} = useSelector((state) => state?.listSubProjects)

  const handleSelectedSubProject = (project) => {
    setSelectedSubProject(project.id, project.name)
    setSelectedSubProjectId(project.id)
  }

  return (
    <div className='border pb-4 h-[100%] bg-white w-[30%] shadow-xl rounded-2xl'>
      <h1 className='h-[15%] font-roboto w-[100%] flex items-center justify-center text-2xl font-[400]'>Sub Projects</h1>
      {
      loading ? <div className='flex-1 flex justify-center'>
        <CircularProgress />
      </div>  : subProjects.length > 0 ? <div>
      {
          subProjects?.map((project) => 
          (
              <div  key={project.id} onClick={() => handleSelectedSubProject(project)} className={`flex flex-row w-[100%] cursor-pointer border border-b-gray-400  px-3 justify-between py-5 ${selectedSubProjectId === project?.id ? 'bg-indigo-200 border-indigo-200' : 'border-white'}`}>
                  <h1 className='text-xl font-roboto'>{project.name}</h1>
                  <IoMdArrowDropright className='text-2xl' />
              </div>
          )
          )
      }
    </div>: <div className='flex-1 text-center'>
      <h1 className='font-roboto text-2xl'>This project has no sub project, add one to get started.</h1>
    </div>
    }
    </div>
  );
}

export default SubProject;
