import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
  // width: 400,
  // bgcolor: 'background.paper',
  boxShadow: 24,
//   p: 4,
};

export default function BasicModal({type, setShowModal, showModal, scrollToBottom}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
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
  // console.log(userId)
  const paths = location.pathname
    .split('/')
    .filter((path) => path !== '')
    .slice(1);
  // console.log(paths)



    useEffect(() => {
      if (addNewProject?.projectStatus) {
        navigate('/projects')
        setValue("")
        handleClose()
        dispatch(fetchProjects())
        dispatch(resetForm())
        scrollToBottom()
      }
      else if (addNewSubProject?.subProjectStatus === "successful" ) {
        setValue("")
        handleClose()
        // navigate(`/projects/${paths[0]}`)
        dispatch(fetchSubProjects(paths[0]))
        dispatch(resetForm())
        console.log(paths[0])

      }
      else if(addNewDpArea?.dpAreaStatus === "successful" ) {
        setValue("")
        handleClose()
        // navigate(location.pathname)
        dispatch(fetchDP(paths[1]))
        dispatch(resetForm())
        console.log('dp added')
      }

      // ||  || addNewSubProject?.subProjectStatus
    }, [addNewProject, addNewSubProject, addNewDpArea])
    console.log(addNewDpArea)
    console.log(addNewProject)
    useEffect(() => {
      if(paths.length === 1) {
      // console.log(paths[0])
      setProjectId(paths[0])
      } else if(paths.length === 2) {
        // console.log(paths[1])
        setsubProjectId(paths[1])
        }
    }, [paths])



  const handleSubmit = () => {
    if (type === "Project") {
      console.log('submit project')
      dispatch(createNewProject({userId, value}))
      console.log(userId, value)
      
    } else if (type === "sub-project") {
      dispatch(createNewSubProject({projectId, value, userId}))
      console.log('submit sub project')
    } else {
      dispatch(createNewDpArea({subProjectId, value, userId}))
      console.log('submit dp area')
    }
    
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <div className='absolute w-[100vw] h-[100vh] flex justify-center items-center'>
           
        </div> */}


<Box sx={style}>
           <div className='w-[35rem] h-[20rem] px-[10%] flex flex-col pt-[2rem] pb-[4rem] justify-between rounded-xl bg-white'>
            <div className='flex justify-end text-xl'>
              <AiOutlineClose className='cursor-pointer text-blue-500' onClick={handleClose}/>
            </div>
        
        <h1 className='font-roboto text-2xl text-center'>Add {type}</h1>
        <input placeholder={`${type} name`} value={value} onChange={(e) => setValue(e.target.value)} className='border outline-none font-roboto bg-gray-200 px-2 py-3'/>
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