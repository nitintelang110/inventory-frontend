import React,{useState,useEffect }  from 'react';
import styles from './EditOrder.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const EditOrder = () => {

  const { id } = useParams();

  const Navigate = useNavigate();

const [employee, setEmployee] = useState({
    order_product_name: '',
    order_qty: '',
    order_date: '',
    order_status: '',
    order_category: '',
    order_party: '',
    order_remark: ''
 
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
    axios.get("http://localhost:8000/auth/edit_order/"+id).then(result=>{
setEmployee({...employee,
order_product_name:result.data.Result[0].order_product_name,
 order_qty:result.data.Result[0].order_qty,
order_date:result.data.Result[0].order_date,
order_status:result.data.Result[0].order_status,
order_category: result.data.Result[0].order_category,
order_party:result.data.Result[0].order_party,
order_remark:result.data.Result[0].order_remark,
    })
  
  }).catch(err => console.log(err))
},[])



  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:8000/auth/edited_order/"+id,  employee )
      .then(result => {
        if (result) {
         Swal.fire({ position: "middle", icon: "success", title: "Update Successfully!", timer: 1800, showConfirmButton: false });
      } })
    .catch(err=>{console.log(err)})
Navigate("/auth/admin/dashboard/getorder")
    
  }


  return (
    <div className={styles.mainsection} id={styles.mainsection}>
    
    <div className={styles.container}>
      <h4 style={{color:"white",backgroundColor:"#606c88 "}} className='d-flex justify-content-start align-items-start px-3 rounded'>Edit Order</h4>
     
    <p className='mx-3 text-white'>You Can Edit Your Order Here!</p>
<form className={styles.form} onSubmit={handleSubmit}>
  <div className="mb-3">
    <label  className="form-label h6">Name</label>
            <input type="text" name='order_product_name' value={employee.order_product_name}  onChange={(e) => setEmployee({...employee, order_product_name:e.target.value})} placeholder='Enter Name' autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
  <div className="mb-3">
    <label  className="form-label h6">Quantity</label>
            <input type="text" name='order_qty' value={employee.order_qty}  onChange={(e) => setEmployee({...employee, order_qty:e.target.value})}  placeholder='Enter Qty' autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          </div>


                    <div className="mb-3">
    <label  className="form-label h6">Order Date</label>
            <input type="text" name='order_date' value={employee.order_date} onChange={(e) => setEmployee({...employee, order_date:e.target.value})}  placeholder='Enter Price' autoComplete='off' className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
          
          <div className="mb-3">
    <label  className="form-label h6">Category</label>
            <select name='order_category' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, order_category:e.target.value})}>
            <option value={employee.order_category}>{employee.order_category}</option>
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
    <label  className="form-label h6">Party Name</label>
                      <select name='order_party' id='categoryId' className="form-select" onChange={(e) => setEmployee({ ...employee, order_party: e.target.value })}>
                          <option>{ employee.order_party}</option>                  
                <option>-- Select --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
            </select>
          </div>

  <div className="mb-3">
    <label  className="form-label h6">Remark</label>
            <input type="text" name='order_remark' value={employee.order_remark} onChange={(e) => setEmployee({...employee, order_remark:e.target.value})}  placeholder='describe product' autoComplete='off' className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
 
 
  <button type="submit" className="btn btn-info w-100 mt-">Submit</button>
</form>
    </div>
    </div>
  )
}

