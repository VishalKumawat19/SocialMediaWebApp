import React, { createContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({children}) =>{
    // const [showAlert, setShowAlert] = useState(false);
    // const [alertType, setAlertType] = useState('success');
    // const [alertMessage, setAlertMessage] = useState('');

    const [alert,setAlert] = useState({visible:false,alertType:'',alertMessage:''})

    const handleCloseAlert = () => {
        setAlert({visible:false,alertType:'',alertMessage:''});
      };

    // <Alert type={alertType} message={alertMessage} onClose={handleCloseAlert} />

    return (
        <AlertContext.Provider value={{alert,setAlert,handleCloseAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

export { AlertContext, AlertProvider };