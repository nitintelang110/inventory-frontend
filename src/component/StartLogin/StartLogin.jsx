import React,{ useEffect } from 'react';
import styles from './StartLogin.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




export const StartLogin = () => {

   
      const Navigate = useNavigate();
axios.defaults.withCredentials = true;
  //roll base access
  useEffect(() => {
    axios.get("http://localhost:8000/verify").then((result) => {
      if (result.data.Status) {
        if (result.data.role === 'admin') {
        Navigate("/auth/admin/dashboard")
        } else {
          Navigate('/employee_details/'+result.data.id)
      }
      } 
  }).catch((err)=> console.log(err))
  }, [])

const loginadmin =()=>{
    Navigate('/')
}

const loginuser =()=>{
    Navigate('/user')
}

  return (
    <div className={styles.main_container}>
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage' >
        <div className='py-5 px-5 rounded border loginForm bg-dark' id={styles.container}>
            <h2 className='mx-2 text-white'>Login As </h2>
            <div className='d-flex justify-content-between mt-5 mb-5 px-2 col-md-12'>
                <button type='button' className='btn btn-primary col-md-5 ' onClick={loginuser}>Employee</button>
                <button type='button' className='btn btn-success col-md-5' onClick={loginadmin}>Admin</button>
            </div>
        </div>
    </div>
    </div>
  )
}
