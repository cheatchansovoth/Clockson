import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import ThemeContext from './ThemeContext';
const ItemPreview = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const formattedSizes = item.sizes.map((size) => {
  return size + " ";
});



  return (
    <>
      <button onClick={handleClickOpen} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">  Preview Item</button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="item-preview-dialog">
        <DialogTitle id="item-preview-dialog">{item.name}</DialogTitle>
        <DialogContent>
        <DialogContentText>
        <img src={item.image} alt={item.name} className="w-full lg:h-[70vh] object-cover" />
          </DialogContentText>
          <DialogContentText>
          </DialogContentText>
          <DialogContentText>
          <p>Size Available: {formattedSizes}</p>
          </DialogContentText>
          <DialogContentText>
            Price: {item.price}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Close</button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemPreview;
