
import React,{useEffect,useState} from 'react';
import axios from 'axios';

export const AllProductRecord = () => {


  const [receivedItem, setReceivedItem] = useState([]);
  const [suplyItem, setSuplyItem] = useState([]);

 
  useEffect(()=>{
  
    axios.get("https://inventory-backend-delta-ten.vercel.app/auth/receivedproducts").then(result=>{
      if (result.data.Status) {
  
        setReceivedItem((result.data.Result));
        setAllData((result.data.Result));
        
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))


     axios.get("https://inventory-backend-delta-ten.vercel.app/auth/givenproducts").then(result=>{
      if (result.data.Status) {
  
        setSuplyItem((result.data.Result));
        setAllData((result.data.Result));
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
  
  },[])

  
  return (
    <div className='col-md-12 my-5 p-3 border'>


      <div className='col-md-12 mb-3 bg-light p-2'>
        <div className='mb-1'>Select Date</div>
          <input className='p-1' type="date" /><span className='mx-2'>TO</span><input className='p-1' type="date" />
  
              </div>
              
        <div className="d-flex bg-light p-2 flex-row col-md-12 mt-4">
           
        
            
              
      
          
</div>
        
      <div >
        <h5 className=' bg-light px-2'>PROFIT & LOSS SHEET</h5>
        <table className='col-md-12 table table-striped table-bordered'>
          <thead >
            <tr >
              <th className='col-md-5 bg-info'>RECEIVED ORDER EXPENSE</th>
               <th className='col-md-5 bg-warning'>SUPLY RECORD</th>
            </tr>
            
           
          </thead>
          <tbody >

            <tr>
               
              <td className='col-md-5 p-0'>
              <table className='col-md-12 table table-striped table-bordered'>
                
            <thead >
               <tr className='' >      
               <th className='col-md-1 '>Sr. No</th>
                      <th className='col-md-3 '>Product Name</th>
                      <th className='col-md-3 '>Received Date</th>
               <th className='col-md-3 '>Received Qty</th>
               <th className='col-md-3 '>Stock Price</th>
              </tr>
            </thead>
             
                  <tbody className=' '>
                    {receivedItem.map((data, id) => {
                      return (
                        <tr key={id} className=' '>
                  <td className=''>{id+1}</td>
                          <td className=''>{data.rcd_name }</td>
                  <td className=''>{data.rcd_date}</td>
                  <td className=''>{ data.rcd_qty}</td>
                  <td className=''> {data.rcd_total}</td>
                        </tr>
                      
                      )
                    })}
                    <tr className='bg-secondary text-white h6 col-md-12'>
                      <td className='colspan-md-10'>k</td>
                     
                  </tr>
                  </tbody>
                  </table>
              </td>


              <td className='col-md-5 p-0'>
                
                   <table className='col-md-12 table table-striped table-bordered'>
            <thead >
            <tr className=' ' >
           <th className='col-md-1 '>Sr. No</th>
                      <th className='col-md-3 '>Product Name</th>
                        <th className='col-md-3 '>Suply Date</th>
               <th className='col-md-3 '>Suply Qty</th>
               <th className='col-md-3 '>Sell Price</th>
           </tr>
        
                  </thead>
             
                <tbody className=''>
              {suplyItem.map((data, id) => {
                      return (
                        <tr key={id} className=' '>
                  <td className=''>{id+1}</td>
                          <td className=''>{data.name}</td>
                           <td className=''> {data.given_date}</td>
                  <td className=''>{data.givenqty}</td>
                  <td className=''>{ data.given_total_price}</td>
                 
                        </tr>
                      
                      )
                    })}
                    
               
                  </tbody>
                     </table>
               </td>
          </tr>
          </tbody>
        </table>
        
      </div>
      </div>
  )
}

