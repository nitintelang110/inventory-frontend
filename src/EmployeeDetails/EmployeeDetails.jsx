import React, { useEffect, useState } from 'react';
import './EmployeeDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {

  const [employeeDetails, setEmployeeDetails] = useState([]);

 

  const { id } = useParams();

  const Navigate = useNavigate();

  //for user logout
const handleLogOut =()=>{
  axios.get('http://localhost:8000/employee/logout').then((result)=>{
    if (result.data.Status) {
      //remove cockies from storage when we log out
       localStorage.removeItem("valid")
      Navigate('/')
    }
  }).catch((err)=> console.log(err))
}

  useEffect(() => {
    axios.get('http://localhost:8000/employee/employeeDetails/' + id).then((result) => {
     setEmployeeDetails(result.data[0])
    }).catch((err) => {
        alert(err)
      })
   
  },[])

  return (
    <>
      <h5 className='logo_name'>--NtCoder--</h5>
    <div className='employee_details_container'>
      <div className='head_container'>
       <h4>Employee Number : 0{employeeDetails.id} </h4> 
      </div>
      <div  className='emp_img_container'>
        <img src={`http://localhost:8000/images/`+employeeDetails.image} alt="" className='emp_det_image' />

        <div className='emp_info_details'>
          <h3>Name :{employeeDetails.name}</h3>
          <h3>Email :{employeeDetails.email}</h3>
          <h3>Salary : &#8377; {employeeDetails.salary}</h3>
          
          <div className='emp_logout_btn'>
           <button className='btn btn-success' onClick={handleLogOut}>Log out</button>
        </div>
        </div>

        
      </div>
      </div>
      </>
  )
}

export default EmployeeDetails