
import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import styles from './GetOrder.module.css'
import style from './CompleteOrder.module.css'
import { DownloadTableExcel } from 'react-export-table-to-excel';


 const CompleteOrder = () => {

   
   const [order, setOrder] = useState([]);
   const [OrderIdFromRcdProduct ,setOrderIdFromRcdProduct]=useState([]);
 const [searchName,setSearchName] = useState(''); 
   const [partyName, setPartyName] = useState(''); 
   const [orderNo, setOrderNo] = useState(''); 

   const [startDate,setStartDate] = useState('');
   const [endDate,setEndDate] = useState('');

  const tableRef = useRef(null);
  
   
  useEffect(()=>{
  
    axios.get("http://localhost:8000/auth/getorder").then(result=>{
      if (result.data.Status) {
  
      setOrder(result.data.Result)  
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))



      axios.get("http://localhost:8000/auth/receivedTotalReceivedAmount").then(result=>{
      if (result.data.Status) {
  
      
          setOrderIdFromRcdProduct(result.data.Result)
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
  
  },[])
  

    const [page,setPage]=useState(10)
  //logic for pagination start
  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = page;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const orders = order.slice(firstIndex, lastIndex);
  const npage = Math.ceil(order.length / recordPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
   //logic for pagination end


   const handlePage = (id) => {
  
    setCurrentPage(id + 1)

  }

  const handleNext = () => {
    if (currentPage == npage) {
      alert("This Is Last page")
    } else {
      setCurrentPage(currentPage + 1)
    }
    
  }

  const handlePrev = () => {
         if (currentPage == 1) {
           alert("This Is First page")
    } else {
      setCurrentPage(currentPage - 1)
    }
    
  }


  
    // Filter data based on the date range
    const filteredData = orders.filter((item) => {
      if (!startDate.split('-').reverse().join('-') || !endDate.split('-').reverse().join('-')) {
        return true; // No filter applied
      }
      return item.order_date >= startDate.split('-').reverse().join('-') && item.order_date <= endDate.split('-').reverse().join('-');
    });


  return (
 
    <>

    <div className={styles.container}>


        <div className='px-5 mt-1 border p-3  w-100'>
          
            <div className="d-flex flex-row bg-light p-2 col-md-12 mb-4">
           
        
            <div className='col-md-3 bg-light'>
                 <div className=''>Select Date</div>
                <div className='col-md-5 bg-light d-flex flex-row'>
          <input className='col-md-12' name='startDate' type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)}  id={styles.fromDate} />
          <span className='mx-2'>TO</span>
          <input className='col-md-12' name='endDate' type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} id={styles.toDate} />
                  </div>
              </div>
            
                <div className='col-md-2'>
                <div>Product Name</div>
          <input type="text" className='w-100' name="searchname" placeholder='' onChange={(e)=>setSearchName(e.target.value)} id={styles.productName}/> 
              </div>
              
               <div className='col-md-2 mx-2'>
                <div>Party Name</div>
          <input type="text" className='w-100 ' name="partyname" placeholder='' onChange={(e)=>setPartyName(e.target.value)} id={styles.partyname}/> 
              </div>
              
                 <div className='col-md-1'>
                <div>Order No</div>
                <input type="text" className='w-100' name="orderno" placeholder='' onChange={(e) => setOrderNo(e.target.value)} id={styles.orderNo} /> 
            </div>
            
                 <div className='col-md-1 mx-2'>
                <div>No Of Record</div>
               <select   id={styles.pgNo} className='w-100 py-2' value={page} onChange={(e) => setPage(e.target.value )} >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                 <option value={order.length}>ALL</option>
          </select>
               </div>

            <div className='col-md-2' id={styles.dwn_btn_container}>
                <div>Download</div>
               <DownloadTableExcel
                    filename="Complete_Order_list "
                    sheet="Complete_order_sheet"
                    currentTableRef={tableRef.current}
                >

                   <button id={styles.dwn_btn} className='btn px-4 border-0'> Export excel </button>

            </DownloadTableExcel>
              </div>
              
            </div>
    
     
          <div className='' ref={tableRef}>

               <div className='rounded border-1 d-flex justify-content-between' id={style.get_order_container_strip}   >
         <div className=' text-white  '>
              <h5 className='my-1 mx-1 text-white'>COMPLETED ORDERS</h5>
          </div>
          </div>
            <table className='table table-striped table-bordered' >
              <thead className={styles.table_head}>
                <tr>
                <th>
                    Sr.No.
                </th>
                <th>
                    Order No.
                  </th>
                  <th>
                    Product Name
                </th>
                 <th>
                  Product Category
                  </th>
                  <th>
                   Order Quantity
                </th>
                   <th>
                   Rcvd Quantity
                  </th>
              
                   <th>
                   Order Date
                  </th>
                    <th>
                   Received
                  </th>
                  <th>
                   Party Name
                 </th>
                  <th>
                   Remark
                  </th>
                  <th>
                   Status
                 </th>
            
                </tr>
              </thead>
            <tbody>

              {filteredData.filter((data)=> searchName === ""? data : data.order_product_name.includes(`${searchName.toUpperCase()}`)).filter((data)=> partyName === ""? data : data.order_party.includes(`${partyName.toUpperCase()}`)).filter((data)=> orderNo === ""? data : data.order_no.includes(`${orderNo}`)).map((emp, index) => {
               
                return (
                
                  <>
                    
                    {emp.order_qty === emp.rcd_order_qty ?
                      
                      
                      <tr key={index} className={style.order_completed_row}>
                         
                        <td className=''>
                          {index +1}
                         
                        </td>
                          <td className=''>
                          {emp.order_no}
                        </td>
                        <td className=''>
                          {emp.order_product_name}
                        </td>
                        <td className='' >
                          {emp.order_category}
                        </td>
                        <td className='' >
                          {emp.order_qty} Nos
                        </td>
                        <td className='' >
                          {emp.rcd_order_qty} Nos
                        </td>

                     
                        <td className=''>
                          {emp.order_date}
                        </td>
                       
                        <td className=''>
                          {emp.order_status}
                        </td>
                        <td className=''>
                          {emp.order_party}
                        </td>
                        <td >
                          {emp.order_remark}
                        </td>
                      
                    
                        <td className='p-0' id={style.order_completed_btn}>
                       
                          <div className={styles.order_completed_btn}>Order Completed <i class="bi bi-check-all"></i> </div>
                         
                        </td>
                      </tr>
                      
                      :
                      ''
                    
                    }
                                        
                        </>
                    )
                  })
                } 

              </tbody>
            </table>

          </div>
            </div>
    </div>



    <div className={styles.page_numbers_slide} ><div className={styles.page_number}>
      
      <button className={styles.prev} onClick={handlePrev}><i class="bi bi-chevron-left"></i></button>

      {numbers.map((n, ind) => {
        return (
          <div key={ind}>
            <li id={styles.numbers} className={currentPage == n?styles.active_numbers:styles.numbers}  onClick={()=>handlePage(ind)}>{n}</li>
          </div>
       )
     })}
        <button className={styles.next} onClick={handleNext}><i class="bi bi-chevron-right"></i></button>
    </div>
    </div>


    </>
  )
}
export default CompleteOrder;


//.filter(names => names.name.includes(`${searchName}`))





















