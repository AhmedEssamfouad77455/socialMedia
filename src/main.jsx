import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { Store } from './Redux/Store.jsx'
import { Provider } from 'react-redux'
import { ToastProvider } from "./Context/Context.jsx"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Protfolio from './Compontants/Protfolio.jsx'
const Root = () =>{
  const themeStorage = window.localStorage.getItem("mode")
  const [mode , setMode] = React.useState(themeStorage || "light")
  const theme = createTheme({
    palette: {
      mode,
      ...(mode == "light"
        ? {
          
          }
        : {
        
          }
      )

    },
  }

  )
  const toggleMode =() =>{
    const newMode = mode == "light"? "dark" : "light"
    setMode(newMode)
    window.localStorage.setItem("mode", newMode)
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App toggleMode={toggleMode} />}>
        <Route path="profolio" element={<Protfolio/>} />
      </Route>
    )
  );
  return (
    <ThemeProvider theme={theme}>
    <Provider store={Store}>

<ToastProvider>
<RouterProvider router={router} />


    

</ToastProvider>
    </Provider>


    </ThemeProvider>
  )

}

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Root/>
  </StrictMode>,
)
