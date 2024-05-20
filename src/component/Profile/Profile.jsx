import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Profile.module.css'


export const Profile = () => {

  const [admin, setAdmin] = useState([])

  
    useEffect(()=>{

    axios.get("https://inventory-backend-delta-ten.vercel.app/auth/adminname").then(result => {
    
    if (result.data.Status) {

      setAdmin((result.data.Result))
    }else{
      alert(result.data.Error)
    }

  }).catch(err => console.log(err))
},[])



  return (

    <>
    
       <div className='col-md-12 my-5 d-flex justify-content-center' id={styles.profile_container} >
      <div className='col-md-3 '>
        {admin.map((data,index) => {
          return(
            <div key={index} className='shadow py-5'>
              <div className={styles.imgcontainer}><div className='p-2 py-3' id={styles.headimg}>
            </div></div>
              <div className='mx-5 py-3'><h5>Admin - {data.name}</h5></div>
                <div className='mx-5'>Email - {data.email}</div>
            </div>
          )
        })}
      </div>
       <div className='col-md-8'></div>
    </div>
  
    
    </>
  
  )
}

 
