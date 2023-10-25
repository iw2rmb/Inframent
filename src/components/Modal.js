import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {AiOutlineClose} from 'react-icons/ai'
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

export default function BasicModal({type, setShowModal, showModal}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("")
//   const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setShowModal(false)
    setValue("")
  };

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
              <AiOutlineClose onClick={handleClose}/>
            </div>
        
        <h1 className='font-roboto text-2xl'>Add {type}</h1>
        <input placeholder={`${type} name`} value={value} onChange={(e) => setValue(e.target.value)} className='border outline-none font-roboto bg-gray-200 px-2 py-3'/>
        <div className='text-[18px] font-roboto flex flex-row justify-end gap-[4rem]'>
        <button className='text-red-600' onClick={handleClose}>Cancel</button>
          <button className={`${value === "" ? "text-gray-500" : "text-blue-600"}`} disabled={value === ""}>Yes</button>
          
        </div>
           </div>
        </Box>
       
      </Modal>
    </div>
  );
}