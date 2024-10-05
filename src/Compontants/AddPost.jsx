import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useContext } from 'react';
import { ToastContext } from '../Context/Context';

export default function AddPost() {
  const { handleOpen } = useContext(ToastContext);
  const { register, handleSubmit, setValue , reset, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate the file type (optional)
      if (!file.type.startsWith('image/')) {
        handleOpen("Please select a valid image file");
        return;
      }

      setValue("image", file); // Store file in useForm
      const imageUrl = URL.createObjectURL(file); // Temporary image URL for preview
      setImagePreview(imageUrl); // Store image preview URL
    }
  };

  const onSubmit = async (formData) => {
    try {
      const form = new FormData();
      form.append('image', formData.image[0]);
      form.append('body', formData.body);
      form.append('title', formData.title);

      const response = await axios.post(
        "https://tarmeezacademy.com/api/v1/posts",
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${window.localStorage.getItem("login") || window.localStorage.getItem("register") }`,
          },
        }
      );

      handleOpen("Post added successfully");
      setOpen(false);
      reset(); 

      // Ideally update the local state instead of reloading
      location.reload();

    } catch (error) {
      handleOpen("Error adding the post");
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isLoggedIn = window.localStorage.getItem("login") || window.localStorage.getItem("register");

  if (!isLoggedIn) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle>Publish</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="filled"
            {...register("title", { required: true })}
            error={Boolean(errors.title)}
            helperText={errors.title ? "This field is required" : ""}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="body"
            name="body"
            label="Body"
            type="text"
            fullWidth
            variant="filled"
            {...register("body", { required: true })}
            error={Boolean(errors.body)}
            helperText={errors.body ? "This field is required" : ""}
          />
          <TextField
            type="file"
            onChange={handleImageChange}
            fullWidth
            {...register("image", { required: true })}
            error={Boolean(errors.image)}
            helperText={errors.image ? "This field is required" : ""}
          />
          {imagePreview && (
            <div style={{ marginTop: '10px' }}>
              <img src={imagePreview} alt="Preview" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Publish the post</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
