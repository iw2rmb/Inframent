import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {AiOutlineClose} from 'react-icons/ai';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
//   boxShadow: 24,
};

export default function DeleteModal({showDeleteModal, setShowDeleteModal, name, type, handleDelete}) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
  const handleClose = () => {setShowDeleteModal(false)
};

 
  return (
    
      <Modal
        open={showDeleteModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <div className='w-[35rem] h-[25rem] px-[10%] flex flex-col pt-[2rem] pb-[4rem] justify-between rounded-xl bg-white'>
            <div className='flex justify-end text-xl'>
              <AiOutlineClose className='cursor-pointer text-blue-500' onClick={handleClose}/>
            </div>
        
        <div>
                    <h1 className='font-roboto text-4xl'>Are you sure you want to delete {type === 'project' ? `project` : type === 'sub-project' ? `sub-project` : 'DP area '} <br /> {name}</h1>
    <p className='mt-4 text-[16px]'>When you delete a {type === 'project' ? ' project, all sub-projects, DP areas, and' : type === 'sub-project' ? ' sub-project, all DP areas, and' : ' DP area,'}  all pictures associated with the DP areas also get deleted. This action cannot be undone!</p>
        </div>

       

        <div className='text-[16px] font-roboto flex flex-row justify-end gap-[4rem]'>
        <button className='text-red-600' onClick={handleDelete}>Yes</button>
          <button className="text-blue-600" onClick={handleClose}>No</button>
          
        </div>
           </div>
        </Box>
      </Modal>
  );
}