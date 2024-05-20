import { React, useState } from 'react';
import Swal from 'sweetalert2';
import styles from './Register.module.css';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
//import { Watch } from 'react-loader-spinner'
import im from "/recimg.png";


export const Register = () => {

  
 // const [spinner, setSpinner] = useState(true);
  const [values, setValues] = useState({
   name:"",  
    email: "",
    passward:""

  });
  
  
   const handleChange = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value
    });
  };

  const [error, setError] = useState();

  const Navigate = useNavigate();
 

   const handleSubmit = (e)=>{
     e.preventDefault();
     const data = {
       name: values.name,
       email: values.email,
       passward:values.passward
     }
      axios.post("http://localhost:8000/auth/register", data)
        .then(result => {
          
          if (result.data.Status) {  //taking this status from backend if its match then open dashboard other wise send error which we set in backend
           //if login valid then navigate
            Swal.fire({ position: "middle", icon: "success", title: "Your Registration Has Been Saved successfully!", showConfirmButton: true });
             Navigate("/")
          }else{
            setError(result.data.Error)
          }
        })
        .catch(err => console.log(err))
    
  }
  
  /*  <Watch
  visible={spinner}
  height="80"
  width="80"
  radius="48"
  color="#4fa94d"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
        wrapperClass=""
      
  />*/
    
  return (
    <>
   
        <div className={styles.maincontainer}>
    <div className={styles.mainsection}>

   
 <div className={styles.leftside}>
          <img src={im} alt="" />
          </div>
          
      <div className={styles.rightside}>
  
       <h3 style={{color:"black",marginLeft:"20px"}}>Admin Registration</h3>
      <div className='text-danger'> <h6>{error}</h6></div>
      
    
     
        <form className={styles.form} onSubmit={handleSubmit}>
         
           <div className="mb-3">
    <label  className="form-label">Name</label>
            <input type="text" name='name' value={values.name} autoComplete='off' onChange={handleChange} className="form-control  " id="exampleInputName1" aria-describedby="nameHelp"/>
          </div>
         
  <div className="mb-3">
    <label  className="form-label">User Email</label>
            <input type="email" name='email'  value={values.email} autoComplete='off' onChange={handleChange} className="form-control  " id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Password</label>
    <input type="passward"  name="passward"  value={values.passward} autoComplete='off' onChange={handleChange} className="form-control " id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="btn btn-primary w-100 mt-"><b>Submit</b></button>
        </form>
       
        <div className={styles.links}>
         <Link to="/loginpage"  className=''>
                  Home Login
        </Link>
        <Link to="/"  className=''>
                   Admin Login
          </Link>
        </div>
          </div>
         
    </div>
      </div>
      </>
  )
}


