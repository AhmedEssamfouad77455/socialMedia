import { Box, IconButton } from "@mui/material"
import React from 'react';
import { Card, CardContent, Typography, Avatar, Button, Stack } from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export default function Protfolio() {
    const local = window.localStorage.getItem("user")

    const nivgate = useNavigate()
    const ProfileCard = styled(Card)({
      maxWidth: 400,
      margin: 'auto',
      padding: '20px',
      textAlign: 'center',
      height:"100vh" ,
      display:"felx" , 
      flexDirection:"column" , 
      gap:"20px"
    });
    if(local){
        const {name, profile_image} = JSON.parse(local)
            
            
            
              return (
                <>
                <IconButton sx={{
                    position: 'absolute',
                    top: 10,
                    left: 320,
                    backgroundColor: 'transparent',
                    zIndex: 1000,


  
                }}
                onClick={()=>{
                    nivgate("/")
                    location.reload()
                }}
                >
                <ArrowBackIcon/>
                </IconButton>

                <ProfileCard>
                
                  <Avatar 
                    alt="Profile Picture" 
                    src={profile_image}
                    sx={{ width: 100, height: 100, margin: 'auto' }} 
                  />
                  <CardContent sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection:"column" , 
                    gap:"10px" , 
                    
                   
                  }}>
                    <Typography variant="h5" component="div">
                      {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Web Developer | Alexandria
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                      ahmed@example.com
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
                      <Button variant="contained" color="primary">
                        Edit Profile
                      </Button>
                      <Button variant="outlined" color="secondary">
                        View Projects
                      </Button>
                    </Stack>
                  </CardContent>
                </ProfileCard>
                </>
              );
        

    }
    else{

        return (
null
  )
}
}
