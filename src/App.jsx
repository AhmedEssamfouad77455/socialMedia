import { Container } from '@mui/material'
import React from 'react' ; 
import TopBar from './Compontants/TopBar'
import Post from './Post';
import AddPost from './Compontants/addPost';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>

    {location.pathname == "/profolio" ? 
    <Outlet/> :
    <>

    <TopBar/>
    <Container>
    <Post/>
    <AddPost/>
     
    </Container>
    </>
    
    
    
    
    }
  
    </>
      
  )
}
