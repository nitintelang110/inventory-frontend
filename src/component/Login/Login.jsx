import { React,useState,useContext } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import {useNavigate,Link} from "react-router-dom";
import im from "/recimg.png";
import { UserContext } from '../../App';

export const Login = () => {


  const [adamId,setAdamId] = useState()

  const userId = useContext(UserContext)
 
 

   

  const [values, setValues] = useState({
   // name:"",  
    email: "",
    passward:""

    });
  const [error, setError] = useState();

  console.log(values)

  const Navigate = useNavigate();
 
  axios.defaults.withCredentials = true;  //to save the token in cookies
   const handleSubmit = (e)=>{
      e.preventDefault();
      axios.post("https://inventory-backend-delta-ten.vercel.app/adminlogin", values)
        .then(result => {
          if (result.data.loginStatus) {
          setAdamId(result.data.Result[0].id)
          userId.setUserAdminId(result.data.Result[0].id)
            //taking this status from backend if its match then open dashboard other wise send error which we set in backend
           //if login valid then navigate
            localStorage.setItem("valid",true)
             Navigate("/auth/admin/dashboard")
          }else{
            setError(result.data.Error)
          }
        })
        .catch(err => console.log(err))
    
    }
  
  return (

    <div className={styles.maincontainer}>

    <div className={styles.mainsection}>

        <div className={styles.rightside}>
      
       <h3 style={{color:"black",marginLeft:"20px",marginBottom:"40px",fontFamily:'arial'}} className="h3">Admin Login</h3>
      <div className='text-danger'> <h6>{error}</h6></div>
     
        <form className={styles.form} onSubmit={handleSubmit}  >
       
  <div className="mb-5 d-flex flex-row" >
    <i class="bi bi-person-circle position-absolute my-2 h6 text-primary "></i>
            <input type="email" name='email'  autoComplete="off" onChange={(e) => setValues({ ...values, email: e.target.value })} className="form-control"  id={styles.input_name} aria-describedby="emailHelp" placeholder='Email'/>
  </div>
  <div className="mb-5 d-flex flex-row">
 <i class="bi bi-unlock position-absolute my-2 h6 text-primary"></i>
    <input type="password"  name="passward"   autoComplete="off" onChange={(e) => setValues({ ...values, passward: e.target.value })} className="form-control "  id={styles.input_name} placeholder='password'/>
  </div>
 
  <button type="submit" className="btn btn-primary w-100 mt-3" ><b>Submit</b></button>
        </form>
       
         <Link to="/registration" className='mx-4'>
                   I Don't Have An Account
        </Link>
         <Link to="/loginpage" className=''>
                  Login Page
                    </Link>
        </div>

         <div className={styles.leftside}>
          <img src={im} alt="" />
        </div>
        
        </div>
   </div>
  )
}

