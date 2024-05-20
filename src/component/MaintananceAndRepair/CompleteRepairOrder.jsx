
import styl from './CompleteRepairOrder.module.css'
import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './GetRepairDataReport.module.css';
import style from './MaintananceAndRepair.module.css';
import { DownloadTableExcel } from 'react-export-table-to-excel';

 const CompleteRepairOrder = () => {


  const [order, setOrder] = useState([]);
  const [searchName,setSearchName] = useState(''); 
  const [partyName, setPartyName] = useState(''); 
  const [orderCategory,setOrderCategory] = useState('');

  useEffect(()=>{
  
    axios.get("http://localhost:8000/auth/get_repair_process").then(result=>{
      if (result.data.Status) {
  
        setOrder((result.data.Result))
         
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
  
 const tableRef = useRef(null);
    
    
  return (
    <>
    <div className={styles.container}>
       <div className='px-5 mt-3 border  w-100'>
    
        
            <div className="d-flex bg-light p-2 mt-3 flex-row col-md-12 ">
           
          
    <div className='col-md-3 bg-light'>
        <div className=''>Select Date</div>
          <input className='p-1' type="date" /><span className='mx-2'>TO</span><input className='p-1' type="date" />
  
            </div>
            
                <div className='col-md-2'>
                <div>Product Name</div>
          <input type="text" className='w-100' name="searchname" placeholder='' onChange={(e)=>setSearchName(e.target.value)} id={styles.productName}/> 
              </div>
              
               <div className='col-md-2 mx-2'>
                <div>Party Name</div>
          <input type="text" className='w-100 ' name="partyname" placeholder='' onChange={(e)=>setPartyName(e.target.value)} id={styles.partyname}/> 
              </div>
              
                 <div className='col-md-2'>
                <div>Category Name</div>
                <input type="text" className='w-100' name="ordercategory" placeholder='' onChange={(e) => setOrderCategory(e.target.value)} id={styles.orderNo} /> 
              </div>
              
          
            
            
                <div className='col-md-1 mx-2'>
                <div>Records</div>
               <select   id={styles.pgNo} className='w-100 py-2' value={page} onChange={(e) => setPage(e.target.value )} >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                 <option value={orders.length}>ALL</option>
          </select>
               </div>

              <div className='col-md-2' id={styles.dwn_btn_container}>
                <div>Download</div>
              <DownloadTableExcel
                    filename="OutOfStock_item_list"
                    sheet="OutOfStock_Item_List"
                    currentTableRef={tableRef.current}
           
                >
                   <button id={styles.dwn_btn} className='btn px-4 border-0' on> Export excel </button>

          </DownloadTableExcel>
              </div>

          </div>
          
          <div className={styles.btns_container}>
           <div className={style.btns}>
           <button className={style.btns_received}><Link to={`/auth/admin/dashboard/received_repair_order`} className=' text-decoration-none text-white'>Received Repair Order</Link></button>
           <button className={style.btns_complete}><Link to={`/auth/admin/dashboard/repair_process`} className=' text-decoration-none text-white'>Pending Repair Order</Link></button>
          </div>
         </div> 
   
        <div className='mt-1' ref={tableRef}>
          
               <div className='shadow rounded border-1 d-flex justify-content-between' id={styles.strip_head}>
         <div className=' text-white ' >
              <h5 className='my-1 mx-2' >REPAIR COMPLETE ORDERS</h5>
          </div>
          </div>

            <table className='table table-striped table-bordered'>
             
              <thead className={styles.table_head}>
                <tr>
                <th>
                    Sr No.
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
                   Rcd Quantity
                </th>
                   <th>
                   Order Date
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
              { orders.filter((data)=> searchName === ""? data : data.order_product_name.includes(`${searchName.toUpperCase()}`)).filter((data)=> partyName === ""? data : data.order_party.includes(`${partyName.toUpperCase()}`)).filter((data)=> orderCategory === ""? data : data.order_category.includes(`${orderCategory.toUpperCase()}`)).map((emp, id) => {
                return (<>
                      
                  {emp.order_qty == emp.rcd_order_qty? <tr key={id} className="">

                        <td className=''>
                          {id+1}
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
                          {emp.rcd_order_qty === 0?0:emp.rcd_order_qty} Nos
                    </td>
                       <td className=''>
                          {emp.order_date}
                    </td>
                       
                     
                     <td className=''>
                          {emp.order_party}
                        </td>
                       <td >
                          {emp.order_remark}
                        </td>
                      
                       
                        <td className='p-0 text-danger' >
                        
                            <div className='my-2 px-2 '>COMPLETE <i class="bi bi-check-all"></i></div>  

                        </td>
                      </tr>:""}
                     
    
                    </>
                    )
                  })
                } 
              </tbody>
            </table>
          </div>
      </div>

      <div className='d-flex flex-row justify-content-center my-5 text-danger h6'>
        {order.length < 1 ? "No Repair Order In Queue, Add Order" : ""}
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
export default CompleteRepairOrder;


//.filter(names => names.name.includes(`${searchName}`))
