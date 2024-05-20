import React, { useState } from 'react'
import styles from './Addcategory.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Addcategory = () => {


  const [category, setCategory] = useState({

    name:""
  });
  

  const Navigate = useNavigate();


  const handleSubmit= async (e)=>{
    e.preventDefault();
await axios.post("http://localhost:8000/auth/addcategory", {category})
.then(res =>{
  if(res.data.Status){
    Swal.fire({ position: "middle", icon: "success", title: "Added Successfully!", timer: 1800, showConfirmButton: false });
      
    Navigate("/auth/admin/dashboard/category")
  }else{
return alert(res.data.Error)
  }
} )


  }

  return (
 <div className={styles.mainsection} id={styles.mainsection}>
    
    <div className={styles.container}>
      <h4 style={{color:"white",marginLeft:"15px"}}>Add Category</h4>
<p className='text-white mx-3'>You Can Add Your Product Category Here!</p>
<form className={styles.form} onSubmit={handleSubmit} >
  <div className="mb-3">
            <input type="text" name='category' autoComplete='off' onChange={(e) => setCategory(e.target.value)} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
 
  <button type="submit" className="btn btn-primary w-100 mt-">Add</button>
</form>
    </div>
    </div>
  )
}

 
