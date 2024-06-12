import React, {  useEffect,useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './DirectPurchase.module.css';
import {useNavigate} from 'react-router-dom';


const DirectPurchase = () => {

   //date start
   let date = new Date()
   let day = date.getDate();
   let month = date.getMonth() + 1;
   let year = date.getFullYear()
 
   if (day < 10) {
     day = '0' + day;
 }
 if (month < 10) {
     month = '0' + month;
 }
 
   const fullDate = day +"-"+ month +"-"+ year
  //date end

     let randomInteger = `${ Math.floor(Math.random() * 100000) + 1
}`;

  let randomDirectOrderId = Math.floor(Math.random() * 10) + 1;
  let randomDirectOrderIdForRow = Math.floor(Math.random() * 10) + 1;
  let directGivenQty = 0;

   const [partyName, setPartyName] = useState('');

  const [partyNameTrue, setPartyNameTrue] = useState(false)
    
 

  const [formData, setFormData] = useState([{ direct_rcd_name: '',  direct_rcd_qty: '', direct_rcd_category: '', direct_rcd_party:partyName, direct_rcd_price: '', direct_rcd_total:'',direct_rcd_description:'',direct_order_date:fullDate,direct_rcd_date:fullDate,direct_rcd_status:'YES',direct_order_no:randomInteger,direct_order_id:randomDirectOrderId,direct_given_qty:directGivenQty}]);

  const [addRows, setAddRows] = useState(false);
  const [partyData,setPartyData] = useState([]);
  const [category, setCategory] = useState([]);


  const [orderId, setOrderId] = useState({
  direct_purchase_order_id:''
})




    
  const Navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFormData = [...formData];
    updatedFormData[index][name] = value;
    setFormData(updatedFormData);

  };

  const addRow = () => {
    setFormData([...formData, { direct_rcd_name: '',  direct_rcd_qty:'',direct_rcd_category:'',direct_rcd_party:partyName,direct_rcd_price:'',direct_rcd_total:'',direct_rcd_description:'',direct_order_date:fullDate,direct_rcd_date:fullDate,direct_rcd_status:'YES',direct_order_no:randomInteger,direct_order_id:randomDirectOrderIdForRow,direct_given_qty:directGivenQty}]);
    if (formData.length >= 1) {
      setAddRows(true)
 
    } 
    

  };

  const removeRow = index => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
   if (formData.length <= 2) {
     setAddRows(false)
  
  } 
  };

  
  //useEffect(()=>{alert("update")},[removeRow,addRow])

  const sendDataToServer = async () => {
    try {
       await axios.post('http://localhost:8000/auth/direct_purchase', formData).then((Status) => {
        if (Status) {
             Swal.fire({ position:"center", icon: "success", title: "Submit Successfully!", timer: 1800, showConfirmButton: false });
               Navigate("/auth/admin/dashboard/receivedproduct")
        }
     

      }).then(() => {
    
     
      axios.post('http://localhost:8000/auth/direct_purchase_add_avl_product', formData)

    
   })
      
    } catch (error) {
      console.error('Error while sending data:', error);
    }
  };


  useEffect(()=>{
    axios.get("http://localhost:8000/auth/addcategory").then(result=>{
      if (result.data.Status) {
  
        setCategory((result.data.Result))
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))

    axios.get("http://localhost:8000/auth/party").then(result=>{
      if (result.data.Status) {
  
        setPartyData((result.data.Result))
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))


     axios.get("http://localhost:8000/auth/order_id_for_direct_avl_product").then(result=>{
      if (result) {
  
        setOrderId(result.data.Result[0].last_id)
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
  },[])

 const partyAlert = () => {
    alert("Please Select Party Name")
  }

  const partyAlertMsg =()=> {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: true,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      title: "Select Party Name"
    });
  }
  return (
    <div className={styles.main_container} >

    
   
      <div className={styles.head}><h5 className='px-4'>DIRECT PURCHASE ORDER</h5></div>
      
      <div id={styles.container}>

        <div className={styles.partContainer}>
        <div className={styles.para}>
      </div>
      

           <select name='direct_rcd_party'  value={partyName}  className={styles.part} onChange={(e) => setPartyName(e.target.value)} onClick={()=>setPartyNameTrue(true)}>
             <option>-- SELECT PARTY --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
          </select>
          
        
        </div>
        


        <div className="col-md-12 d-flex flex-row text-white  " id={styles.container_head_strip}>
            
           <p className='my-1 mx-2'>Add Your All Purchase Product Here</p>
          
     </div>



        
      {formData.map((data, index) => (

           
        <div key={index} id={styles.rows} className="col-md-12 d-flex flex-column ">
          
      

       <div className="col-md-12 d-flex flex-row">
          <div className='d-flex flex-column col-md-2'>
           <div className="col-md-2 w-100 mb-1 ">Name</div>
          <input
                type="text"
                id={styles.direct_name}
                className='col-md-2 w-100 py-1 px-1'
                placeholder="Product Name"
                name="direct_rcd_name"
                value={data.direct_rcd_name}
                onChange={e => handleInputChange(index, e)}
                onFocus={!partyNameTrue?partyAlertMsg:""}
          />


          {/* <input
           type="text"
           className={styles.pname}
           name="direct_rcd_party"
           value={partyName}
           onFocus={e => handleInputChange(index, e)}
           onSubmit={e => handleInputChange(index, e)}
           required
         />*/}

          </div>
          

                    <div className='d-flex flex-column col-md-1 mx-1'>
           <div className="col-md-1 px-1 mb-1 w-100 ">Category</div>
             <select name='direct_rcd_category'   id={styles.direct_category}  value={data.direct_rcd_category} className={styles.cat} onChange={e => handleInputChange(index, e)}>
             <option >-- Select -- </option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className='' key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
                   </div>
              
            
                
                     <div className='d-flex flex-column col-md-1'>
           <div className="col-md-1 px-2 mb-1 w-100 ">Qty</div>
            <input
                type="int"
                  id={styles.direct_qty}
            className='col-md-1 w-100 py-1 px-3 mx-1'
            placeholder="Qty"
                name="direct_rcd_qty"
                 value={data.direct_rcd_qty}
            onChange={e => handleInputChange(index, e)}
          />
            </div>

    
          
                       <div className='d-flex flex-column col-md-1 mx-1'>
           <div className="col-md-1 px-2 mb-1 w-100 ">Price/Item</div>
            <input
                type="int"
                  id={styles.direct_price}
            className='col-md-1 w-100 py-1 px-1 mx-2'
            placeholder="One Item"
                name="direct_rcd_price"
                 value={data.direct_rcd_price}
            onChange={e => handleInputChange(index, e)}
          />
                     </div>
          
              <div className='d-flex flex-column d-none '>
           <div className="col-md-2 px-4 w-100 ">Total Price</div>
            <input
            type="int"
            className='col-md-1 w-100 py-1 px-1 mx-4'
            placeholder="Total Price"
                name="direct_rcd_total"
                value={data.direct_rcd_total}
                onChange={e => handleInputChange(index, e)}
                
          />
             </div>

            <div className='d-flex flex-column col-md-2 d-none'>
           <div className="col-md-2 w-100 ">Order Date</div>
              <input
            type="text"
            className='col-md-2 px-2 w-100 py-1'
                placeholder="dd/mm/yyyy"
                value={data.direct_order_date}
            name="direct_order_date"
            onChange={e => handleInputChange(index, e)}
          />
            </div>
            

                  <div className='d-flex flex-column col-md-1 mx-2'>
           <div className="col-md-1 px-1 w-100 mb-1">Date</div>
              <input
                type="text"
                  id={styles.direct_date}
            className='col-md-1 w-100 px-2 py-1 mx-1'
            placeholder="dd/mm/yyyy"
                name="direct_rcd_date"
                value={data.direct_rcd_date}
            onChange={e => handleInputChange(index, e)}
              />
            </div>
            

            
                  <div className='d-flex flex-column col-md-2 d-none'>
           <div className="col-md-2 px-2 w-100 ">Complete Status</div>
          <select name='direct_rcd_status'   id={styles.direct_status} value={formData.direct_rcd_status} className={styles.status} onChange={e => handleInputChange(index, e)}>
         
              <option className='' value={"Yes"}>Yes</option>
               <option className=''  value={"No"}>No</option>
            </select>
      </div>

          
        
                  <div className='d-flex flex-column col-md-4'>
           <div className="col-md-4 px-2 w-100 mb-1">Remark</div>
            <input
                type="text"
                  id={styles.direct_remark}
            className='col-md-4 w-100 px-3 py-1 mx-1 '
            placeholder="remark ( if any )"
            name="direct_rcd_description"
            onChange={e => handleInputChange(index, e)}
          />
          </div>
            

    <div className='d-flex flex-column'>
              <div className="px-4 w-100 ">Action</div>
              
          <button onClick={addRow} className = {styles.plus_btn}><i class="bi bi-plus-circle"></i></button>
          
        
            </div>
              <button className = {addRows ?styles.minus_btn:styles.minus_btn_after} onClick={() => removeRow(index)}><i class="bi bi-trash3"></i></button>
          </div>
          </div>
     
      ))}
        

     <div className="w-100 d-flex flex-row justify-content-end mt-3">
          <button className={styles.send_btn} onClick={partyNameTrue?sendDataToServer:partyAlert}>SUBMIT</button>
          </div>
        </div>
    </div>
  );
};

export default DirectPurchase;
