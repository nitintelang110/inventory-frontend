

import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './Order.module.css';
import {useNavigate} from 'react-router-dom';


const Order = () => {

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


  const [addRows, setAddRows] = useState(false);
  const [partyData,setPartyData] = useState([]);
  const [category, setCategory] = useState([]);
  const [partyName, setPartyName] = useState("");
  const [partyNameTrue, setPartyNameTrue] = useState(false)
  

     let randomInteger = `${ Math.floor(Math.random() * 100000) + 1
}`;
    
   
     
  const [formData, setFormData] = useState([{ order_product_name: '', order_qty: '', rcd_order_qty: 0, order_date: fullDate, order_status: 'NO', order_category: '', order_party:partyName,order_remark:'',order_no:randomInteger}]);
  console.log(formData)



  const Navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFormData = [...formData];
    updatedFormData[index][name] = value;
    setFormData(updatedFormData);
  };


  const addRow = () => {
   
    setFormData([...formData, {order_product_name:'', order_qty:'', rcd_order_qty: 0, order_date:fullDate, order_status:'NO',order_category:'',order_party:partyName,order_remark:'',order_no:randomInteger }]);
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

 
  const sendDataToServer = async () => {
    try {
        await axios.post('http://localhost:8000/auth/addorder', formData).then((Status) => {
        if (Status) {
          Swal.fire({ position: "center", icon: "success", title: "Submit Successfully!", timer: 1800, showConfirmButton: false });
          Navigate("/auth/admin/dashboard/getorder");
          setPartyNameTrue(false);
        }
     

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



  },[formData])

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
      <div className={styles.head}><h5 className='mx-4'>ADD ORDER</h5></div>

      <div className={styles.partContainer}>
    
        <select className={styles.part} value={partyName.party} onChange={(e) => setPartyName(e.target.value)} onClick={()=>setPartyNameTrue(true)}>
                <option onClick={()=>setPartyNameTrue(false)}>--SELECT PARTY--</option>
                {partyData.map((c,id)=>{
                    return(
                      <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
          </select>
        
      </div>

      <div id={styles.container}>

        
      
      <div className="col-md-12  d-flex flex-row text-white   " id={styles.container_head_strip}>
            
            <p className='my-1 mx-4'>Add Your All Order Here</p>
           
      </div>

      {formData.map((data, index) => (
        <div key={index+1} id={styles.rows} className="col-md-12 ">

        <div className="col-md-12 d-flex flex-row">

          <div className='d-flex flex-column col-md-2 mx-2'>
           <div className="col-md-2 w-100 mb-1 px-2 ">Name</div>
          <input
            type="text"
            id={styles.name}
            className='col-md-2 py-1 mx-2 px-2 w-100'
            placeholder="Product Name"
            name="order_product_name"
            value={data.order_product_name}
            onChange={e => handleInputChange(index, e)}
            onFocus={!partyNameTrue?partyAlertMsg:""}
            required
           />

     { /*   <input
           type="text"
           className={styles.pname}
           name="order_party"
           value={partyName}
           onFocus={e => handleInputChange(index, e)}
           required
         />*/}

          </div>


         

          <div className='d-flex flex-column col-md-1 mx-2 '>
           <div className="col-md-1 w-100">Category</div>
             <select name='order_category'   id={styles.category}  className={styles.cat} onChange={e => handleInputChange(index, e)}>
             <option >-- Select --</option>
                {category.map((c,id)=>{
                    return(
                    <>
                    <option className='' key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
            </div>


           <div className='d-flex flex-column col-md-1  '>
           <div className="col-md-1  mb-1 ">Qty</div>
          <input
            type="int"
               id={styles.qty}
            className='col-md-1 py-1 px-1 w-100 '
            placeholder="Qty"
            name="order_qty"
            value={data.order_qty}
            onChange={e => handleInputChange(index, e)}
           
          />
         </div>


<div className='d-flex flex-column col-md-1 mx-1'>
           <div className="col-md-1 w-100 mb-1 px-1 ">Date</div>
              <input
            type="text"
               id={styles.date}
            className='col-md-1 px-2 py-1 mx-1 w-100'
            placeholder="date"
            name="order_date"
            value={data.order_date}
            onChange={e => handleInputChange(index, e)}
          />
      </div>

 <div className='d-flex flex-column col-md-1'>
           <div className="col-md-1 w-100 mb-1 px-2">Status</div>
           <select name='order_status'    id={styles.status}  className={styles.status} onChange={e => handleInputChange(index, e)}>
              <option className='' value={"NO"}>NO</option>
             <option className=''  value={"YES"}>YES</option>
            </select>
</div>
         
          
<div className='d-flex flex-column col-md-4 mx-1'>
           <div className="col-md-4 w-100 mb-1 px-1 ">Remark</div>
            <input
            type="text"
               id={styles.remark}
            className='col-md-4 px-3 py-1 mx-1 w-100'
            placeholder="remark"
            name="order_remark"
            value={data.order_remark}
            onChange={e => handleInputChange(index, e)}
          />
</div>

          <div className='d-flex flex-row'>
           <div className='d-flex flex-column'>
              <div className="mx-2 px-1 ">Action</div>
          <button onClick={addRow} className = {styles.plus_btn}><i class="bi bi-plus-circle"></i></button>
          </div>

          <button className = {addRows ?styles.minus_btn:styles.minus_btn_after} onClick={() => removeRow(index)}><i class="bi bi-trash3"></i></button>
          </div>
        </div>
        </div>
      ))}

          <div className="w-100 d-flex flex-row justify-content-end mt-3">
          <button type='submit' className={styles.send_btn} onClick={partyNameTrue?sendDataToServer:partyAlert}>SUBMIT</button>
          </div>


        </div>
    </div>
     
  );
};

export default Order;



