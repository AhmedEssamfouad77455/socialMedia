import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { set, useForm } from "react-hook-form"
import axios from 'axios';
export default function DialogLoging({openDialoge ,setOpenDialoga }) {
  const [networkError, setNetworkError] = React.useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm()
  const onSubmit = async (formData) => {
    const user = formData.username;
    const password = formData.password;
    
    console.log(user); 
    console.log(password);
  
    try {
      const response = await axios.post("https://tarmeezacademy.com/api/v1/login", {
        username: user,
        password: password,
      });
  
      if (response.status === 200) {
        setNetworkError("")
        console.log('Login successful:', response.data.token); 
        window.localStorage.setItem("login"  , response.data.token);
        window.localStorage.setItem("user"  , JSON.stringify( response.data.user));
        console.log(response)

        reset({
          username: '',
          password: '',
        });
        handleClose();
      } else {
        console.error('Login failed with status:', response.status);
      }
    } catch (error) {
      if (error.response) {
        setNetworkError('Login failed, please check your credentials.');
      } else {
        setNetworkError('Network error, please check your connection.');
      }
    


    }
  };
 



  const handleClose = () => {
    setOpenDialoga(false);
  };

  return (
    <React.Fragment>
     
      <Dialog
      onSubmit={handleSubmit(onSubmit)}
        open={openDialoge}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
      
        }}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
      
          <TextField


            autoComplete='off'
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            {...register("username"  , { required :  true}) }
            error={Boolean(errors.password && networkError )}

          />
          <TextField
          autoComplete='off'
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            {...register("password"  , { required :  true})}
            error={Boolean(errors.password)}
            


                      />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" >Login</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
