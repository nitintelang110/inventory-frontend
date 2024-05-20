import React,{useState,useEffect }  from 'react';
import styles from './Editemployee.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Editemployee = () => {

  const { id } = useParams();

  const Navigate = useNavigate();

const [employee, setEmployee] = useState({
    given_name:'',
    given_qty:'',
    given_category:'',
   given_total:'',
    order_no: '',
    order_id:'',
  description: '',
    avl_qty:''
 
});


const [category,setCategory]=useState([]);
const [partyData,setPartyData] = useState([]);

useEffect(()=>{
//getting here categories
  axios.get("http://localhost:8000/auth/addcategory").then(result=>{
    if (result.data.Status) {

      setCategory((result.data.Result))
    }else{
      alert(result.data.Error)
    }
  }).catch(err => console.log(err))

//getting here party
  axios.get("http://localhost:8000/auth/party").then(result=>{
      if (result.data.Status) {
  
        setPartyData((result.data.Result))
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))

//get for edit 
    axios.get("http://localhost:8000/auth/avl_suply_product/"+id).then(result=>{
setEmployee({...employee,
 given_name:result.data.Result[0].avl_name,
 given_qty:result.data.Result[0].avl_qty,
given_category:result.data.Result[0].avl_category,
given_total:result.data.Result[0].avl_total,
  description: result.data.Result[0].description,
  order_no: result.data.Result[0].order_no,
  order_id: result.data.Result[0].order_id,
 avl_qty:result.data.Result[0].avl_qty
    })
  
  }).catch(err => console.log(err))
},[])



  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:8000/auth/avl_given/"+id,  employee )
      .then(result => {
        if (result) {
         Swal.fire({ position: "middle", icon: "success", title: "Update Successfully!", timer: 1800, showConfirmButton: false });
      } })
    .catch(err=>{console.log(err)})
Navigate("/auth/admin/dashboard/avl_product")
    
  }


  return (
    <div className={styles.mainsection} id={styles.mainsection}>
    
    <div className={styles.container}>
      <h4 style={{color:"#00008B"}} className='d-flex justify-content-center align-items-center'>Edit fsdfdsfsfs Product</h4>

<form className={styles.form} onSubmit={handleSubmit}>
  <div className="mb-3">
    <label  className="form-label text-dark">Product Name</label>
            <input type="text" name='name' value={employee.given_name}  onChange={(e) => setEmployee({...employee, given_name:e.target.value})} autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
  <div className="mb-3">
    <label  className="form-label text-dark">Quantity</label>
            <input type="text" name='qty' value={employee.given_qty}  onChange={(e) => setEmployee({...employee, given_qty:e.target.value})}  autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          </div>
          
          <div className="mb-3">
    <label  className="form-label text-dark">Category</label>
            <select name='category' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, given_category:e.target.value})}>
            <option value={employee.given_category}>{employee.given_category}</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
  </div>

 
  

                 <div className="mb-3">
    <label  className="form-label ">Total Price</label>
            <input type="int" name='total_price'  value={employee.given_qty }  autoComplete='off' onKeyDown={(e) => setEmployee({...employee, total:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>

 

  <div className="mb-3">
    <label  className="form-label text-dark">Remark</label>
            <input type="text" name='description' value={employee.description} onChange={(e) => setEmployee({...employee, description:e.target.value})}  placeholder='describe product' autoComplete='off' className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
 
 
  <button type="submit" className="btn btn-success w-100 mt-">Submit</button>
</form>
    </div>
    </div>
  )
}

