import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useSelector, useDispatch} from 'react-redux'
import {AiOutlineClose} from 'react-icons/ai';
import { createNewDpArea, createNewProject, createNewSubProject, fetchDP, fetchProjects, fetchSubProjects, resetForm } from '../action/projects';
import { useLocation, useNavigate } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
};

export default function BasicModal({type, setShowModal, showModal, scrollToBottom}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [value, setValue] = useState("")
  const [projectId, setProjectId] = useState('')
  const [subProjectId, setsubProjectId] = useState('')
  const location = useLocation();
  const handleClose = () => {
    setShowModal(false)
    setValue("")
  };

  const addNewProject = useSelector((state) => state?.addProject)
  const addNewSubProject = useSelector((state) => state?.addNewSubProject)
  const addNewDpArea = useSelector((state) => state?.addNewDpArea)
  
  const data = sessionStorage.getItem("userInfo");
  const userId = JSON.parse(data)?.user_id;
  const paths = location.pathname
    .split('/')
    .filter((path) => path !== '')
    .slice(1);



    useEffect(() => {
      if (addNewProject?.projectData?.project_id) {
        navigate(`/projects/${addNewProject?.projectData?.project_id}`)
        setValue("")
        handleClose()
        dispatch(fetchProjects())
        dispatch(resetForm())
        scrollToBottom()
      }
      else if (addNewSubProject?.subProjectData?.id) {
        setValue("")
        handleClose()
        navigate(`/projects/${paths[0]}/${addNewSubProject?.subProjectData?.id}`)
        dispatch(fetchSubProjects(paths[0]))
        dispatch(resetForm())

      }
      else if(addNewDpArea?.dpAreaData?.name) {
        setValue("")
        handleClose()
        navigate(location.pathname)
        dispatch(fetchDP(paths[1]))
        dispatch(resetForm())
      }

    }, [addNewProject, addNewSubProject, addNewDpArea, dispatch, scrollToBottom, handleClose, location, navigate, paths])
    useEffect(() => {
      if(paths.length === 1) {
      setProjectId(paths[0])
      } else if(paths.length === 2) {
        setsubProjectId(paths[1])
        }
    }, [paths])



  const handleSubmit = () => {
    if (type === "Project") {
      dispatch(createNewProject({userId, value}))
      
    } else if (type === "sub-project") {
      dispatch(createNewSubProject({projectId, value, userId}))
    } else {
      dispatch(createNewDpArea({subProjectId, value, userId}))
    }
    
  }

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >


<Box sx={style}>
           <div className='w-[35rem] h-[20rem] px-[10%] flex flex-col pt-[2rem] pb-[4rem] justify-between rounded-xl bg-white'>
            <div className='flex justify-end text-xl'>
              <AiOutlineClose className='cursor-pointer text-blue-500' onClick={handleClose}/>
            </div>
        
        <h1 className='font-roboto text-2xl text-center'>Add {type}</h1>
        <div className='flex flex-col bg-gray-200 px-2 py-1'>
          <label className='font-roboto text-[14px]'>{`${type} name`}</label>
        <input  value={value} onChange={(e) => setValue(e.target.value)} className='border outline-none font-roboto bg-gray-200 text-[20px]'/>
        </div>

        <div className='text-[18px] font-roboto flex flex-row justify-end gap-[4rem]'>
        <button className='text-red-600' onClick={handleClose}>Cancel</button>
          <button className={`${value === "" ? "text-gray-500" : "text-blue-600"}`} disabled={value === ""} onClick={handleSubmit}>Add</button>
          
        </div>
           </div>
        </Box>
       
      </Modal>
    </div>
  );
}