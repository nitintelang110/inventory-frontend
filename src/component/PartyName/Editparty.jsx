import axios from 'axios';
import  { React,useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles  from './Editparty.module.css';
import Swal from 'sweetalert2';





export const Editparty =()=>{

 const [editParty, setEditParty] = useState({
  party_name:''
 });


console.log(editParty)

 const Navigate = useNavigate()
  
  const{ id }= useParams();

useEffect(()=>{

  axios.get("http://localhost:8000/auth/editparty/"+id).then(result=>{
    
 setEditParty(result.data.Result)
  }).catch(err => console.log(err))
},[])



const handleSubmit = (e) => {
  e.preventDefault();
  axios.put("http://localhost:8000/auth/editedparty/" + id,  {editParty} )
    .then(result =>{if(result){
      Swal.fire({ position: "middle", icon: "success", title: "Update Successfully!", timer: 1800, showConfirmButton: false });
    } })
  .catch(err=>console.log(err))
Navigate("/auth/admin/dashboard/party")
  
}



  return(

 
    <div className={styles.mainsection} id={styles.mainsection} onSubmit={handleSubmit}>
    
    <div className={styles.container}>
      <h4 style={{color:"#00008B",marginLeft:"20px"}}>Update Party</h4>

<form className={styles.form}  >
  <div className="mb-3">
    <label  className="form-label text-dark">Party Name</label>
            <input type="text" name='editParty' value={editParty} onChange={(e) => setEditParty(e.target.value)} autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
 
  <button type="submit" className="btn btn-primary w-100 mt-">Update</button>
</form>
    </div>
    </div>



  )
}




