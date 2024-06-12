import React, { useEffect, useState } from 'react';
import styles from './Addemployee.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Addemployee = ({ids}) => {

 
 //date start
  const date = new Date()
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear()
  const fullDate = day +"-"+ month +"-"+ year
 //date end
  
 
  
  const [orderId, setOrderId] = useState();
  const [receivedQty,setReceivedQty] = useState();
  const [sumOfAvlProduct, setSumOfAvlProduct] = useState();
  const [givenInp, setGivenInp] = useState('');
  const [suplyQty, setSuplyQty] = useState(0);
 
  
  
  const [orderData, setOrderData] = useState(
  
    {
    order_product_name: '',
    order_qty: '',
    rcd_order_qty: '',
    order_category: '',
    order_party: '',
    price: '',
    total: 0,
    order_date: '',
    rcd_date: fullDate,
    rcd_status:'',
    description: '',
    order_no: '',
    image: '',
   
}
  );


  const qtyAlert = () => {
    
 Swal.fire({ position: "middle", icon: "error", title: "SORRY! QTY NOT AVAILABLE", showConfirmButton: true });
      setGivenInp(''); 
}
 
 

  const [partyData,setPartyData] = useState([]);
  const [category, setCategory] = useState([]);
  const Navigate = useNavigate();

 

 

const handleSubmit = (e)=>{
  e.preventDefault();
document.getElementById("submit_btn").style.display="none"
   const data = {
     rcd_order_qty:parseInt(orderData.rcd_order_qty) + parseInt(receivedQty),
     order: orderData.rcd_status,
   
  }
  
axios.put('http://localhost:8000/auth/order_table_update/'+ orderId, data )

  //we should not send file from front end without this code bcoz file always use form data object so we cant send file without this so that why we need for all input bcoz file also going with this input
  const formData = new FormData();
    formData.append('name', orderData.order_product_name);
    formData.append('qty', orderData.order_qty);
    formData.append('rcd_qty',orderData.rcd_order_qty );
    formData.append('category', orderData.order_category);
    formData.append('party', orderData.order_party);
    formData.append('price', orderData.price);
    formData.append('total', parseInt(orderData.rcd_order_qty) * parseInt(orderData.price));
    formData.append('order_date', orderData.order_date);
    formData.append('rcd_date', fullDate);
    formData.append('rcd_status', orderData.rcd_status);
    formData.append('description', orderData.description);
    formData.append('order_id', orderId);
    formData.append('order_no',orderData.order_no);
    formData.append('image', orderData.image);
   //end form data
  


  axios.post('http://localhost:8000/auth/receivedproduct', formData)
 
   .then(result =>{
     if (result.data.Status) {
       
        Swal.fire({ position: "middle", icon: "success", title: "Added Successfully!", timer: 1800, showConfirmButton: false });
        location.reload()
         Navigate("/auth/admin/dashboard/receivedproduct")
  }else{
return alert(result.data.Error)
  }
   }).then(() => {
     
     
     const avlData = {
       avl_name:orderData.order_product_name,
       avl_qty: parseInt(orderData.rcd_order_qty) + parseInt(receivedQty),
       avl_category:orderData.order_category,
       avl_total:  parseInt(orderData.rcd_order_qty) * parseInt(orderData.price),
       order_no:orderData.order_no,
       order_id:orderId,
       given_qty: 0,
       avl_price:orderData.price,
       total_order_qty:orderData.order_qty,
       total_rcd_qty:parseInt(orderData.rcd_order_qty) + parseInt(receivedQty)
     }
     
      const avlUpdateData = {
    
       avl_qty:(parseInt(orderData.rcd_order_qty) + parseInt(receivedQty)) - parseInt(suplyQty),
       avl_price:parseInt(orderData.price),
       avl_product_sum: sumOfAvlProduct,
       rcd_order_qty: parseInt(orderData.rcd_order_qty),
       total_rcd_qty:parseInt(orderData.rcd_order_qty) + parseInt(receivedQty)
  }
     if(receivedQty === 0){
      axios.post('http://localhost:8000/auth/add_avl_product', avlData)
     } else if (receivedQty > 0) {
       axios.put('http://localhost:8000/auth/update_exist_avl_product/'+orderId, avlUpdateData ) 
     } else {
       alert("SOMETHING WRONG")
}    
     
   })
  
  
  
}

  
  useEffect(() => {


     //getting order product here
    axios.get("http://localhost:8000/auth/getorder/"+ids).then(result=>{
      if (result.data.Status) {
       setOrderId(result.data.Result[0].id)
        setOrderData(result.data.Result[0])
         setReceivedQty(result.data.Result[0].rcd_order_qty)
       
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))


      //getting given order qty product here
    axios.get("http://localhost:8000/auth/get_given_order_qty/"+ids).then(result=>{
      if (result.data.Status) {
      
        setSuplyQty(result.data.Result[0].given_qty)
    
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))



  //getting order product category here
    axios.get("http://localhost:8000/auth/addcategory").then(result=>{
      if (result.data.Status) {
  
        setCategory((result.data.Result))
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
//getting order product party here
    axios.get("http://localhost:8000/auth/party").then(result=>{
      if (result.data.Status) {
  
        setPartyData((result.data.Result))
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
  
 

      //getting received avl product amount sum to add next order from avl_product here
      axios.get("http://localhost:8000/auth/total_amount/"+ids).then(result=>{
        if (result.data.Status) {
         
          setSumOfAvlProduct(result.data.Result[0].avl_total)
     
           
        }else{
          alert(result.data.Error)
        }
    
      }).catch(err => console.log(err))
  

},[])

  const givenInput = parseInt(givenInp);
  const avlQty = parseInt(orderData.order_qty - receivedQty);
  
 

  return (

    <div className={styles.mainsection} id={styles.mainsection}>
    
       <div className={styles.container}>
        <h5 style={{ color: "#00008B" }} className='d-flex justify-content-left mx-4' id={styles.rcd_prouduct_heading}>RECEIVED ORDER</h5>

      
     
<form className={styles.form} onSubmit={handleSubmit} >

  <div id={styles.formContainer} className='col-md-12 p-1'>
    
           

  <div className="col-md-2 d-none ">
    <label  className="form-label text-dark h6">Name</label>
            <input type="text" name='order_product_name' placeholder='Enter Name' value={orderData.order_product_name} autoComplete='off' onChange={(e) => setOrderData({...orderData, order_product_name:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" />     
              </div>
              

<div className="col-md-2 mx-1 d-none">
    <label  className="form-label text-dark h6">Category</label>
            <select name='order_category' id='categoryId'  value={orderData.order_category}  className="form-select " onChange={(e) => setOrderData({...orderData, order_category:e.target.value})}>
             <option >-- Select --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className={styles.options} key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
          </div>
 
  <div className="col-md-2 d-none">
    <label  className="form-label text-dark h6">Order Quantity</label>
                <input type="int" name='order_qty' value={orderData.order_qty} placeholder='Enter Qty' autoComplete='off' onChange={(e) => setOrderData({ ...orderData, order_qty: e.target.value })} className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp" /> 

  </div>
 
            <div className="col-md-12 my-2">
    <label  className="form-label text-dark h6">Received Qty</label>
            <input type="int" name='rcd_order_qty' placeholder='Rcvd Qty'  autoComplete='off' value={givenInp} onChange={(e) => setOrderData({...orderData, rcd_order_qty:e.target.value})}className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp" onChangeCapture={(e)=>setGivenInp(e.target.value)} onKeyUp={givenInput > avlQty?qtyAlert:""} required />     
  </div>
  
              
               <div className=" col-md-12 my-3">
         <label  className="form-label text-dark h6 ">Single Product Price</label>
            <input type="int" name='price'  value={orderData.price}  placeholder='Enter Price' autoComplete='off' onChange={(e) => setOrderData({...orderData, price:e.target.value})} className="form-control text-capital" required />
          </div>
          
                  <div className=" col-md-12 my-2 d-none ">
              <label className="form-label text-dark h6">Total Price</label>
            <input type="int" name='total' placeholder='Enter Total Price' value={orderData.rcd_order_qty*orderData.price}  autoComplete='off' onSubmit ={(e) => setOrderData({ ...orderData,total:orderData.rcd_order_qty*orderData.price})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
              </div>
              

             <div className=" col-md-2 d-none">
    <label className="form-label text-dark h6">Order Date</label>
            <input type="text" name='order_date' value={orderData.order_date} placeholder='order date' autoComplete='off' onChange={(e) => setOrderData({...orderData, order_date:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>

            
                  <div className=" col-md-2 mx-1 d-none">
    <label className="form-label text-dark h6">Received Date</label>
            <input type="text" name='rcd_date' defaultValue={fullDate}  placeholder='Received date' autoComplete='off' onSubmit={(e) => setOrderData({...orderData,rcd_date:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
                            <div className=" col-md-12 my-2">
                <label className="form-label text-dark h6">Order Status</label>
          
                <select name='rcd_status' value={orderData.rcd_status}  id='statusId' className='form-select' onChange={(e) => setOrderData({...orderData,rcd_status: e.target.value })}>
                <option className='' value={"NOT SELECT"}>-- SELECT ORDER STATUS --</option> 
              <option className='' value={"YES"}>YES</option>
                  <option className='' value={"NO"}>NO</option>
                   <option className=''  value={"HALF"}>HALF</option>
                  </select>
                  </div>

 
                    <div className="col-md-2 mx-1 d-none">
    <label  className="form-label text-dark h6">Party</label>
            <select name='order_party' id='categoryId'  value={orderData.order_party} className="form-select " onChange={(e) => setOrderData({...orderData, order_party:e.target.value})}>
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
              

              <div className=" col-md-12 my-2">
    <label  className="form-label text-dark h6">Description</label>
            <input type="text" name='description'  placeholder='describe product' autoComplete='off' onChange={(e) => setOrderData({...orderData, description:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </div>

 <div className="col-md-12 my-2">
              <label className="form-label text-dark h6">Upload Invoice</label>
              
              <input type="file" name='image' autoComplete='off' onChange={(e) => setOrderData({ ...orderData, image: e.target.files[0] })} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" /> 
              
  </div>


          </div>
          

 <div className='d-flex justify-content-end my-2'>
  <button id='submit_btn' type="submit" className="btn btn-success mx-4 mb-3 my-5" >SUBMIT</button>
 </div>
          

</form>
      </div>
    
    </div>

  )
}

