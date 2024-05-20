import React,{useState,useEffect }  from 'react';
import styles from './Editemployee.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment'

export const GiveThisProduct = () => {

  const { id } = useParams();

   const time = moment().format('LTS')
  const date = moment().format('L'); 
  
    const Navigate = useNavigate();
    
  const [orderId, setOrderId] = useState({
      order_id:''
    });
  const [givenQty, setGivenQty] = useState({
    given_qty:''
  });
  const [avlQty, setAvlQty] = useState({
    available_qty:''
  });

  const [rcdTotal, setRcdTotal] = useState({
    given_total:''
  });

  const [suplyPrice,setSuplyPrice] =useState({
    given_suply_price:0
  })

  const [suplyTotal,setSuplytotal] =useState({
    given_total_price:0
  })

const [employee, setEmployee] = useState({
     given_name:'',
    given_qty:'',
    given_category:'',
   given_price:'',
  order_no: '',
  order_id:'',
  description: '',
  given_date: date,
  given_time: time,
    
});

const [category,setCategory]=useState([]);
    
useEffect(()=>{
//getting here categories
  axios.get("http://localhost:8000/auth/addcategory").then(result=>{
    if (result.data.Status) {

      setCategory((result.data.Result))
    }else{
      alert(result.data.Error)
    }
  }).catch(err => console.log(err))

//get for edit 
       axios.get("http://localhost:8000/auth/avl_suply_product/"+id).then(result=>{
setEmployee({...employee,
 given_name:result.data.Result[0].avl_name,
 avl_qty:result.data.Result[0].avl_qty,
given_category:result.data.Result[0].avl_category,
given_price:result.data.Result[0].avl_price,
given_total:result.data.Result[0].avl_total,
  description: result.data.Result[0].description,
  order_no: result.data.Result[0].order_no,
  order_id: result.data.Result[0].order_id,
 
    })
         setGivenQty({ ...employee, given_qty: result.data.Result[0].given_qty })
         setAvlQty({ ...employee, available_qty: result.data.Result[0].avl_qty })
           setOrderId({ ...employee, order_id: result.data.Result[0].order_id })
           setRcdTotal({ ...employee, given_total: result.data.Result[0].avl_total })

  }).catch(err => console.log(err))
},[])


     
      const updateData = {
      allGivenQty: parseInt(givenQty.given_qty) + parseInt(employee.given_qty),
      updateAvlQty : parseInt(avlQty.available_qty - employee.given_qty),
      //updateAvlTotal:parseInt(rcdTotal.given_total) - parseInt(suplyPrice.given_suply_price*employee.given_qty)
   }


    
  const info = {
  given_name:employee.given_name,
  given_qty:employee.given_qty,
  given_category:employee.given_category,
  given_price:employee.given_price,
  order_no:employee.order_no,
  order_id:employee.order_id,
  description:employee.description,
  given_date: date,
  given_time: time,
  given_suply_price:suplyPrice.given_suply_price,
  given_total_price:suplyPrice.given_suply_price*employee.given_qty
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/auth/givethisproduct",  info )
      .then(result => {
        if (result) {
          Swal.fire({ position: "middle", icon: "success", title: "Update Successfully!", timer: 1800, showConfirmButton: false });
      
        }  
       Navigate("/auth/admin/dashboard/avl_product")
      
      })
          .catch(err => { console.log(err) })
      

       axios.put("http://localhost:8000/auth/updateavlqty/"+ id,updateData )
      .then(result =>{console.log(result) })
      .catch(err => { console.log(err) })
    

    
    if (updateData.updateAvlQty == 0) {
        axios.post("http://localhost:8000/auth/outofstock",  info )
      .then(result => {
      console.log(result)
      }).catch(err => { console.log(err) })
    } else {
      ""
    }
    
  }


  return (
    <div className={styles.mainsection} id={styles.mainsection}>
    
        {employee.given_qty>avlQty.available_qty? alert(`Input Should Be Less Than ${avlQty.available_qty}`):""}
          
    <div className={styles.container}>
        <h4 style={{ color: "#00008B" }} className='d-flex justify-content-center align-items-center'>Available Product Quantity</h4> <h4 className='bg-info rounded shadow text-dark px-4 mx-3 rounded'>{avlQty.available_qty < employee.given_qty?"Not Available":avlQty.available_qty-employee.given_qty} Nos  </h4>
              
<form className={styles.form} onSubmit={handleSubmit}>
  <div className="mb-3">
    <label  className="form-label text-dark">Name</label>
            <input type="text" name='name' value={employee.given_name}  onChange={(e) => setEmployee({...employee, given_name:e.target.value})} placeholder='Enter Name' autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required readOnly />
  </div>
 

                  
                  <div className="mb-3">
    <label  className="form-label text-dark">Supply Quantity</label>
            <input type="text" name='givenqty' value={employee.given_qty}  onChange={(e) => setEmployee({...employee, given_qty:e.target.value})}  placeholder='Enter Qty' autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          </div>
          
          <div className="mb-3">
    <label  className="form-label text-dark">Category</label>
            <select name='category' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, given_category:e.target.value})} readOnly>
            <option value={employee.given_category} readOnly>{employee.given_category}</option>
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
            <input type="text" name='price' value={suplyPrice.given_suply_price} onChange={(e) => setSuplyPrice({given_suply_price:e.target.value})}  placeholder='Enter Price' autoComplete='off' className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>

  <div className="mb-3">
    <label  className="form-label text-dark">Total Price</label>
            <input type="text" name='price' value={suplyPrice.given_suply_price*employee.given_qty}  onChange={(e) => setSuplytotal({given_total_price:e.target.value})}  placeholder='Enter Price' autoComplete='off' className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>

     

  <div className="mb-3">
    <label  className="form-label text-dark">Remark</label>
            <input type="text" name='description' value={employee.description} onChange={(e) => setEmployee({...employee, description:e.target.value})}  placeholder='remark' autoComplete='off' className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
  </div>
 
 
 
  <button type="submit" className="btn btn-success w-100 mt-">Submit</button>
</form>
    </div>
    </div>
  )
}

