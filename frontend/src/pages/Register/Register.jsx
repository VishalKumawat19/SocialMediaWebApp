import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import TextInput from '../../components/TextInput/TextInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { register } from '../../services/authService';
import Alert from '../../components/Alert/Alert';
import { AlertContext } from '../../ContextApi/AlertContext';
import Spinner from '../../components/Spinner/Spinner';
import { AuthContext } from '../../ContextApi/AuthContext';
import ImageComponent from '../../components/ImageComponent/ImageComponent';


function Register() {
  const navigateTo = useNavigate()
  const [registerData,setRegisterData] = useState({username:'',email:'',password:''})
  const { alert, setAlert } = useContext(AlertContext);
  const { loading, setLoading,setIsAuthenticated } = useContext(AuthContext);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!registerData.username || !registerData.email || !registerData.password){
      return setAlert({visible:true,alertType:'error',alertMessage:"Please fill all the fields"})
    }
    if(!emailRegex.test(registerData.email)){
      return setAlert({visible:true,alertType:'error',alertMessage:"Please enter a valid email address"})
    }
    setLoading(true)
    const res = await register(registerData)
    console.log(res)
    if(res.status==201){
      setIsAuthenticated(true)
      setLoading(false)
      setAlert({visible:true,alertType:'success',alertMessage:res.data.message})
      setTimeout(() => {
        setAlert({...alert,visible:false})
        navigateTo('/home')
      }, 5000);
      
    }
    else{
      setLoading(false)
      setAlert({visible:true,alertType:'error',alertMessage:res.data.message})
      setTimeout(() => {
        setAlert({...alert,visible:false})
      }, 5000);
    }
  };

  const handleOnChange = (e) =>{
   setRegisterData({...registerData,[e.target.name]:e.target.value})
  }

  if(loading) return <ImageComponent />;

  return (
    <div>
      
    <div className={styles.registerPage}>
      <h2 className={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          type="text"
          id="username"
          name="username"
          value={registerData.username}
          onChange={handleOnChange}
          
        />
        <TextInput
          label="Email"
          // type="email"
          id="email"
          name="email"
          value={registerData.email}
          onChange={handleOnChange}
          
        />
        <PasswordInput
          label="Password"
          id="password"
          name="password"
          value={registerData.password}
          onChange={handleOnChange}
          
        />
        <button type="submit" className={styles.submitBtn}>Register</button>
      </form>
      <p className={styles.loginLink}>
        Already have an account? <Link to="/">Login</Link>
      </p>
      
    </div>
    <Alert />
    </div>
  );
}

export default Register;




