import * as React from "react"; // تأكد من استيراد useState
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function DialogRegister({ openRegister, setOpenRegister }) {
  const [imagePreview, setImagePreview] = React.useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    
    console.log(formData);
    console.log(formData.image[0]);
    const image = formData.image[0];
    const email = formData.email;
    const password = formData.password;
    const username = formData.username;
    const name = formData.name;


;

    try {
      const newFormData = new FormData();
      newFormData.append("username", username);
      newFormData.append("password", password);
      newFormData.append("image", image);
      newFormData.append("name", name);
      newFormData.append("email", email);

      const response = await axios.post(
        "https://tarmeezacademy.com/api/v1/register",
        newFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status < 300) {
        window.localStorage.setItem("register", response.data.token);
        console.log("register  " + window.localStorage.getItem("register"));
        console.log(response);

        window.localStorage.setItem("user", JSON.stringify(response.data.user));

        reset();
        handleClose();
        location.reload()
      } else {
        console.error("register failed with status:", response.status);
        reset();
        setImagePreview("")
        handleClose();
      }
    } catch (error) {
      console.error("Error registering user", error);
      reset();
      setImagePreview("")
      handleClose();
    }
  };

  const handleClose = () => {
    setOpenRegister(false);
    reset();
    setImagePreview("")

  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };


  return (
    <React.Fragment>
      <Dialog
        open={openRegister}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit), 
        }}
      >
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <TextField
            type="file"
            fullWidth
            {...register("image", { required: true })}
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width:"200px" , height:"200px" ,  marginTop: "10px" , 
               }}
            />
          ) : null}

          <TextField
          autoComplete="off"
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            {...register("username", { required: true })}
            error={Boolean(errors.username)}
            helperText={Boolean(errors.username) ? "this field is required" : ""}
          />
          <TextField
          autoComplete="off"
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            {...register("name", { required: true })}
            error={Boolean(errors.name)}
            helperText={Boolean(errors.name) ? "this field is required" : ""}
          />
          <TextField
          autoComplete="off"
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            {...register("email", { required: true })}
            error={Boolean(errors.email)}
            helperText={Boolean(errors.email) ? "this field is required" : ""}
          />
          <TextField
          autoComplete="off"
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            {...register("password", { required: true })}
            error={Boolean(errors.password)}
            helperText={Boolean(errors.password) ? "this field is required" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Register</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
