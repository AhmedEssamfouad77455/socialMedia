import { Children, createContext, useState } from "react";
import SimpleSnackbar from "../Snackbar";

 export const ToastContext = createContext({})

export const ToastProvider = ({children }) =>{
    const [open, setOpen] = useState(false);

    const[message , setmessage] = useState("") ; 


    function handleOpen(message){
        setOpen(true);
        setmessage(message);
        setTimeout(() => {
            setOpen(false);
        }, 3000);

    }
    return (
        <ToastContext.Provider value={{handleOpen}}>
        <SimpleSnackbar open={open} message={message} />
            {children}
        </ToastContext.Provider>
    )
}

