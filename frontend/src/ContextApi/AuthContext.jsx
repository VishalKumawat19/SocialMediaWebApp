import React, { createContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyUser } from "../services/authService";

const AuthContext = createContext();



const AuthProvider = ({ children }) => {


  const [loading,setLoading] = useState(true)
  const[isAuthenticated,setIsAuthenticated] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    const excludedRoutes = ['/', '/register'];
    if (excludedRoutes.includes(location.pathname)) {
      setLoading(false); // Set loading to false directly if on excluded route
      return; // Exit the effect early
    }
    const verify = async () => {
      try {
        const response = await verifyUser();
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate('/')
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/')
      }
      finally{
        setLoading(false)
      }
    };
    verify();
  }, []);


  if(loading) return <Spinner />;

  return (
    <AuthContext.Provider value={{ loading,setLoading,isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
