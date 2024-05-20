
import React, {  useEffect,useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './MaintananceAndRepair.module.css';
import {useNavigate,Link} from 'react-router-dom';


const MaintananceAndRepair = () => {

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

 let randomInteger = `${ Math.floor(Math.random() * 1000) + 1
 }`;

  const [formData, setFormData] = useState([{ order_product_name: '', order_qty: '',rcd_order_qty: 0,  order_date: fullDate, order_status: 'No',order_category:'' ,order_party:'' ,order_remark:'',order_no:randomInteger}]);



  const [addRows, setAddRows] = useState(false);
  const [partyData,setPartyData] = useState([]);
  const [category, setCategory] = useState([]);

  const Navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFormData = [...formData];
    updatedFormData[index][name] = value;
    setFormData(updatedFormData);
  };

  const addRow = () => {
    setFormData([...formData, { order_product_name: '', order_qty: '',rcd_order_qty:0, order_date:fullDate,order_status:'No',order_category:'',order_party:'',order_remark:'',order_no:randomInteger }]);
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
       await axios.post('http://localhost:8000/auth/add_repair', formData).then((Status) => {
        if (Status) {
             Swal.fire({ position:"center", icon: "success", title: "Submit Successfully!", timer: 1800, showConfirmButton: false });
               Navigate("/auth/admin/dashboard/repair_process")
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
  },[])


  return (
    <div className={styles.main_container} >

      <div className={styles.head}> 
      <h4>Repair & Maintanance</h4>
    <div className={styles.btns}>
      <button className={styles.btns_process}><Link to={`/auth/admin/dashboard/repair_process`} className=' text-decoration-none text-white'>In Process Repair Order</Link></button>
      <button className={styles.btns_received}><Link to={`/auth/admin/dashboard/received_repair_order`} className=' text-decoration-none text-white'>Received Repair Order</Link></button>
      <button className={styles.btns_complete}><Link to={`/auth/admin/dashboard/repair_process_complete`} className=' text-decoration-none text-white'>Complete Repair Order</Link></button>
      </div>
      </div>
     
      <div id={styles.container}>

        
        <div className="col-md-12 d-flex flex-row text-white h6" id={styles.head_strip}>
        <p className='my-1 mx-3'>Add Your All Damage Product Here</p>
     </div>



        
      {formData.map((data, index) => (
        <div key={index} id={styles.rows} className="col-md-12 ">
          <input
            type="text"
            className='col-md-2 py-1 mx-2 px-2'
            placeholder="Damage Product Name"
            name="order_product_name"
            value={data.order_product_name}
            onChange={e => handleInputChange(index, e)}
            id={styles.name}
          />

             <select name='order_category'  className={styles.cat} onChange={e => handleInputChange(index, e)} id={styles.category}>
             <option >-- Select Category --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className='' key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
          
          <input
            type="int"
            className='col-sm-1 py-1 px-3 mx-1'
            placeholder="Qty"
            name="order_qty"
            value={data.order_qty}
            onChange={e => handleInputChange(index, e)}
            id={styles.qty}
          />
              <input
            type="text"
            className='col-md-1 px-2 py-1 mx-1 d-none'
            placeholder="date"
            name="order_date"
            value={data.order_date}
            onChange={e => handleInputChange(index, e)}

          />

           <select name='order_status' id='statusId'  className={styles.status} onChange={e => handleInputChange(index, e)}>
              <option className='' value={"No"}>No</option>
             <option className=''  value={"Yes"}>Yes</option>
            </select>


           <select name='order_party'   className={styles.part} onChange={e => handleInputChange(index, e)} id={styles.party}>
             <option>-- Select Party --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
          </select>
          

            <input
            type="text"
            className='col-md-4 px-3 py-1 mx-1'
            placeholder="Damage Product Description"
            name="order_remark"
            value={data.order_remark}
            onChange={e => handleInputChange(index, e)}
            id={styles.remark}
          />

          <button onClick={addRow} className = {styles.plus_btn}><i class="bi bi-plus-circle"></i></button>
          
          <button className = {addRows ?styles.minus_btn:styles.minus_btn_after} onClick={() => removeRow(index)}><i class="bi bi-trash3"></i></button>
          
        </div>
      ))}
     <div className="w-100 d-flex flex-row justify-content-end mt-3">
          <button className={styles.send_btn} onClick={sendDataToServer}>SUBMIT</button>
          </div>
        </div>
    </div>
  );
};

export default MaintananceAndRepair;
