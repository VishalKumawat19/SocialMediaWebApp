import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import TextInput from '../../components/TextInput/TextInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { login } from '../../services/authService';
import Alert from '../../components/Alert/Alert';
import { AlertContext } from '../../ContextApi/AlertContext';
import Spinner from '../../components/Spinner/Spinner';
import { AuthContext } from '../../ContextApi/AuthContext';
import ImageComponent from '../../components/ImageComponent/ImageComponent';

function Login() {
  const navigateTo = useNavigate()
  const [loginData,setLoginData] = useState({username:'',password:''})
  const { loading, setLoading,isAuthenticated,setIsAuthenticated } = useContext(AuthContext);
  const { alert, setAlert } = useContext(AlertContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!loginData.username || !loginData.password){
      return setAlert({visible:true,alertType:'error',alertMessage:"Please fill all the fields"})
    }
    setLoading(true)
    try {
    const res = await login(loginData)
    console.log(res)
    if(res.status==200){
      setLoading(false)
      setIsAuthenticated(true)
      navigateTo('/home')
    }
    else{
      // handleShowAlert('error',res.data.message)
      setLoading(false)
      setAlert({visible:true,alertType:'error',alertMessage:res.data.message})
    }
  }
    catch (error) {
      setLoading(false)
      console.log(error)
      setAlert({visible:true,alertType:'error',alertMessage:error.data.message})
    }
  }

  const handleOnChange = (e) =>{
    setLoginData({...loginData,[e.target.name]:e.target.value})
  }

  if(loading) return <ImageComponent />;

  return (
    <div>
    <div className={styles.loginPage}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          type="text"
          id="username"
          name="username"
          value={loginData.username}
          onChange={handleOnChange}
          
        />
        <PasswordInput
          label="Password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleOnChange}
          
        />
        <button type="submit" className={styles.submitBtn}>Login</button>
      </form>
      <p className={styles.registerLink}>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
    <Alert />
    </div>
  );
}

export default Login;



