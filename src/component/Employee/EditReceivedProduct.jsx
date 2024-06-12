import React,{useState,useEffect }  from 'react';
import styles from './Editemployee.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const EditReceivedProduct = () => {

  const { id } = useParams();

  const Navigate = useNavigate();
  
const [stockAmount,setStockAmount] = useState("");
const [employee, setEmployee] = useState({
    rcd_name:'',
    rcd_qty:'',
    rcd_category:'',
    rcd_party:'',
    rcd_price: '',
    rcd_total:'',
    rcd_description: '',
    order_id:'',
    stockAmount:stockAmount
});



const [category,setCategory]=useState([]);
const [partyData,setPartyData] = useState([]);
const [pendingOrder,setPendingOrder] = useState([]);




console.log(stockAmount)

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
    axios.get("http://localhost:8000/auth/editreceivedproduct/"+id).then(result=>{
setEmployee({...employee,
rcd_name:result.data.Result[0].rcd_name,
rcd_qty:result.data.Result[0].rcd_qty,
rcd_category:result.data.Result[0].rcd_category,
rcd_party: result.data.Result[0].rcd_party,
rcd_price: result.data.Result[0].rcd_price,
rcd_total:result.data.Result[0].rcd_total,
rcd_description:result.data.Result[0].rcd_description,
order_id:result.data.Result[0].order_id
    })})
  
    axios.get("http://localhost:8000/auth/avl_product").then(result=>{
      if (result.data.Status) {
  
        setStockAmount((result.data.Result))
        
      }else{
        alert(result.data.Error)
      }

  }).catch(err => console.log(err))


  axios.get("http://localhost:8000/auth/getPendingorder_rcd_qty/"+`${employee.order_id}`).then(result=>{
    if (result.data.Status) {
    
      setPendingOrder(result.data.Result[0].rcd_order_qty)
       
    }else{
      alert(result.data.Error)
    }

  }).catch(err => "")


},[])



  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:8000/auth/updatereceivedproduct/"+id,  employee )
      .then(result => {
        if (result) {
         Swal.fire({ position: "middle", icon: "success", title: "Update Successfully!", timer: 1800, showConfirmButton: false });
      } })
    .catch(err=>{console.log(err)})

       

       const dat = {
        order_id:employee.order_id,
        rcd_qty:pendingOrder - employee.rcd_qty
       }


    axios.put("http://localhost:8000/auth/update_received_qty_in_pending", dat
    )
    .then(result => {
      if (result) {
       " "
    } })
  .catch(err=>{console.log(err)})

  axios.put("http://localhost:8000/auth/update_received_qty_in_stock", employee)
  .then(result => {
    if (result) {
     ""
  } })
.catch(err=>{console.log(err)})
Navigate("/auth/admin/dashboard/receivedproduct")
    
  }


  return (
    <div className={styles.mainsection} id={styles.mainsection}>
    
    <div className={styles.container}>
      <h4 style={{color:"green"}} className='d-flex justify-content-center align-items-center'>EDIT RECEIVED ORDER</h4>

<form className={styles.form} onSubmit={handleSubmit}>
  <div className="mb-3">
    <label  className="form-label text-dark">Name</label>
            <input type="text" name='rcd_name' value={employee.rcd_name}  onChange={(e) => setEmployee({...employee, rcd_name:e.target.value})} placeholder='Enter Name' autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
  <div className="mb-3">
    <label  className="form-label text-dark">Quantity</label>
            <input type="text" name='rcd_qty' value={employee.rcd_qty}  onChange={(e) => setEmployee({...employee, rcd_qty:e.target.value})}  placeholder='Enter Qty' autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          </div>
          
          <div className="mb-3">
    <label  className="form-label text-dark">Category</label>
            <select name='rcd_category' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, rcd_category:e.target.value})}>
            <option value={employee.rcd_category}>{employee.rcd_category}</option>
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
    <label  className="form-label text-dark">Price</label>
            <input type="text" name='rcd_price' value={employee.rcd_price} onChange={(e) => setEmployee({...employee, rcd_price:e.target.value})}  placeholder='Enter Price' autoComplete='off' className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>

                 <div className="mb-3">
    <label  className="form-label text-dark">Total Price</label>
            <input type="int" name='rcd_total' placeholder='Enter Total Price' value={employee.rcd_price*employee.rcd_qty }  autoComplete='off' onKeyDown={(e) => setEmployee({...employee, rcd_total:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>

  <div className="mb-3">
    <label  className="form-label text-dark fs-6">Party</label>
            <select name='rcd_party' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, rcd_party:e.target.value})}>
            <option value={employee.rcd_party}>{employee.rcd_party}</option>
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
    <label  className="form-label text-dark">Description</label>
            <input type="text" name='rcd_description' value={employee.rcd_description} onChange={(e) => setEmployee({...employee, rcd_description:e.target.value})}  placeholder='describe product' autoComplete='off' className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
 
 
  <button type="submit" className="btn btn-success w-100 mt-">Submit</button>
</form>
    </div>
    </div>
  )
}

