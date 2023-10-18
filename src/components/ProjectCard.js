import React, {useState, useEffect} from 'react';
import {IoMdArrowDropright} from 'react-icons/io'
import CircularProgress from '@mui/material/CircularProgress';

const ProjectCard = ({setSelectedProject, data, title}) => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
      }, [3000])
    
  }, [])


  return (
    <div className='py-5 h-[100%] w-[30%] shadow-2xl rounded-2xl'>
      <h1 className='h-[15%] w-[100%] flex items-center justify-center text-2xl font-semibold'>{title}</h1>

    {
      loading ? <div className='flex-1 flex justify-center'>
        <CircularProgress />
      </div>  : <div>
      {
          data?.map((project) => (
              <div  key={project.id} onClick={() => setSelectedProject(project.id)} className='flex flex-row w-[100%] cursor-pointer border border-b-black border-white px-3 justify-between py-5'>
                  <h1 className='text-xl font-mono'>{project.location}</h1>
                  <IoMdArrowDropright className='text-2xl' />
              </div>
          ))
      }
    </div>
    }

    </div>
  );
}

export default ProjectCard;
