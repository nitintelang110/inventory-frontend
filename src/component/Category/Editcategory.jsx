import axios from 'axios';
import  { React,useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles  from './Editcategory.module.css';
import Swal from 'sweetalert2';





export const Editcategory =()=>{

 const [category, setCategory] = useState({
  name:''
 });

 const Navigate = useNavigate()
  
  const{ id }= useParams();

useEffect(()=>{

  axios.get("https://inventory-backend-delta-ten.vercel.app/auth/editcategory/"+id).then(result=>{
    
 setCategory(result.data.Result)
  }).catch(err => console.log(err))
},[])

console.log(category)

const handleSubmit = (e) => {
  e.preventDefault();
  axios.put("https://inventory-backend-delta-ten.vercel.app/auth/editedcategory/" + id,  {category} )
    .then(result =>{if(result){
      Swal.fire({ position: "middle", icon: "success", title: "Added Successfully!", timer: 1800, showConfirmButton: false });
    } })
  .catch(err=>console.log(err))
Navigate("/auth/admin/dashboard/category")
  
}



  return(

 
    <div className={styles.mainsection} id={styles.mainsection} onSubmit={handleSubmit}>
    
    <div className={styles.container}>
      <h4 style={{color:"white",marginLeft:"15px"}}>Edit Category</h4>
<p className='text-white mx-3'>You Can Edit Your Product Category Here!</p>

<form className={styles.form}  >
  <div className="mb-3">
            <input type="text" name='name' value={category} onChange={(e) => setCategory(e.target.value)} autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
 
  <button type="submit" className="btn btn-primary w-100 mt-">Update</button>
</form>
    </div>
    </div>



  )
}




