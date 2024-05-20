import React, { useState } from 'react'
import styles from './Addparty.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export const Addparty = () => {


  const [party, setParty] = useState({

    party_name:""
  });
  

  const Navigate = useNavigate();



  const handleSubmit= async (e)=>{
    e.preventDefault();
await axios.post("https://inventory-backend-delta-ten.vercel.app/auth/addparty", {party})
.then(res =>{
  if(res.data.Status){

    Swal.fire({ position: "middle", icon: "success", title: "Added Successfully!", timer: 1800, showConfirmButton: false });
    Navigate("/auth/admin/dashboard/party")
  }else{
return alert(res.data.Error)
  }
} )


  }

  return (
 <div className={styles.mainsection} id={styles.mainsection}>
    
    <div className={styles.container}>
      <h4 style={{color:"#00008B",marginLeft:"20px"}}>Add Party</h4>

<form className={styles.form} onSubmit={handleSubmit} >
  <div className="mb-3">
    <label  className="form-label text-dark">Party Name</label>
            <input type="text" name='party' autoComplete='off' onChange={(e) => setParty(e.target.value)} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
 
  <button type="submit" className="btn btn-primary w-100 mt-">Add</button>
</form>
    </div>
    </div>
  )
}

 
