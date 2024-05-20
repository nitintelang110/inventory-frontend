import { React,useState } from 'react';
import styles from './UserLogin.module.css';
import axios from 'axios';
import {useNavigate,Link} from "react-router-dom";
import im from "../../assets/login/imgs.jpg";

export const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
 
 
  const [errors, setErrors] = useState();


  const Navigate = useNavigate();
 
  axios.defaults.withCredentials = true;  //to save the token in cookies
   const handleSubmitEmployee = (e)=>{
    e.preventDefault();
     let values = {
      email:email.email,
      password:password.password
    }
     axios.post("https://inventory-backend-delta-ten.vercel.app/employee/employeelogins", values)
        .then(result => {
          if (result.data.loginStatus) {  //taking this status from backend if its match then open dashboard other wise send error which we set in backend
            //access only when we login valid
                  localStorage.setItem("valid",true)      
         Navigate("/employee_details/"+result.data.id)
          }else{
            setErrors(result.data.Error)
          }
          
   })
        .catch(err => console.log(err))
    }
 
  return (
     <div className={styles.maincontainer}>
    <div className={styles.mainsection}>

   
 <div className={styles.leftside}>
          <img src={im} alt="" />
          </div>
          
      <div className={styles.rightside}>



       <h4 style={{color:"black",marginLeft:"20px"}}>Employee Login</h4>
      <div className='text-danger'> <h6>{errors}</h6></div>
      
    
     
<form className={styles.form} onSubmit={handleSubmitEmployee}>
  <div className="mb-3">
    <label  className="form-label">Email</label>
            <input type="email" name='email' autoComplete='off' onChange={(e) => setEmail({ ...email, email: e.target.value })} className="form-control  border " id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Password</label>
    <input type="passward"  name="password"autoComplete='off' onChange={(e) => setPassword({ ...password, password: e.target.value })} className="form-control border " id="exampleInputPassword1"/>
  </div>
 
            <button type="submit" className="btn btn-info w-100 mt-"><b>Submit</b></button>
             
          </form>
          
        
            <Link to="/registration" className='mx-4'>
                   I Don't Have An Account
            </Link><br></br>
         <Link to="/loginpage" className='mx-4'>
                  Login Page
          </Link>
          
          <Link to="/" className='mx-5'>
                  Admin Login
                    </Link>
        </div>
        
        
      </div>
      
      </div>
  )
}


