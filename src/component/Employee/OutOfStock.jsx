
import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import styles from './Employee.module.css';
import style from './AvlProduct.module.css';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useNavigate } from 'react-router-dom';


export const OutOfStock = () => {

  
   const [outofstock, setOutofstock] = useState([]);
 
   const [searchName,setSearchName] = useState(''); 
   const [partyName, setPartyName] = useState(''); 
   const [orderNo,setOrderNo] = useState('');
  
 
  const tableRef = useRef(null);
  const Navigate = useNavigate();

  
  const [page,setPage]=useState(10)
  //logic for pagination start
  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = page;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const orders = outofstock.slice(firstIndex, lastIndex);
  const npage = Math.ceil(outofstock.length / recordPerPage);
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
  
  useEffect(()=>{
  
    axios.get("http://localhost:8000/auth/outofstock_product").then(result=>{
      if (result.data.Status) {
  
        setOutofstock((result.data.Result))
    
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
  
  }, [])
  

  const handleDelete = (id) => {
  
    axios.delete("http://localhost:8000/auth/delete_outofstock_product/"+id).then(result => {
      if (result.data.Status) {

        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Revert to stock!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Sucessfull!",
      text: "Your file has been reverted.",
      icon: "success"
    });
    location.reload(Navigate("/auth/admin/dashboard/outofstockproduct"))
  }
});
        
      
      } else {
        alert(result.data.Error)
      }
    }
     )
   }


  return (
    
    <div className={styles.container}>
      
        <div className='px-5 mt-1 border w-100'>
          
         <div className="d-flex bg-light p-2 mt-3 mb-4 flex-row col-md-12">
           
            <div className='col-md-3 bg-light'>
        <div className=''>Select Date</div>
          <input className='p-1' type="date" /><span className='mx-2'>TO</span><input className='p-1' type="date" />
  
          </div>
          
                <div className='col-md-2'>
                <div>Product Name</div>
          <input type="text" className='w-100' name="searchname" placeholder='' onChange={(e)=>setSearchName(e.target.value)} id={styles.productName}/> 
              </div>
              
               <div className='col-md-2 mx-2'>
                <div>Category Name</div>
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
        
     
        <div className='mt-3  ' ref={tableRef}>

          <div className='d-flex justify-content-between  w-100 ' id={style.rcd_order_outofstock_heading}>
          <h5 className='mx-2 my-1'>OUT OF STOCK</h5>
          </div>

            <table className='table table-striped table-bordered' >
              <thead className={style.table_head}>
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
                   Rcvd Qty
                </th>
                 <th>
                  Suply Qty
                </th>
                  <th>
                  Avl Qty
                </th>
                 <th>
                  Status
                  </th>
                  <th>
                  Action
                  </th>
                 
                </tr>
              </thead>
            <tbody>
              { outofstock.filter((data)=> searchName === ""? data :data.avl_name.includes(`${searchName.toUpperCase()}`)).filter((data)=> partyName === ""? data : data.avl_category.includes(`${partyName.toUpperCase()}`)).filter((data)=> orderNo === ""? data : data.order_no.includes(`${orderNo}`)).map((emp, id) => {
                return (<>
                 
                      
                    <tr key={id} className={style.order_completed_row}>

                        <td className=''>
                          {id + 1}
                    </td>
                      <td className=''>
                          {emp.order_no}
                        </td>
                        <td className=''>
                          {emp.name}
                        </td>
                         <td className='' >
                          {emp.category}
                        </td>
                        <td className='' >
                          {emp.rcdqty} Nos
                      </td>
                       <td className='' >
                          {emp.givenqty} Nos
                        </td>
                     <td className='' >
                          {emp.avlqty} Nos
                        </td>
                        <td className='p-0' >
                        <div className={style.order_completed_btn}>Out Of Stock<i class="bi bi-check-all"></i> </div>
                        </td>
                        <td className='p-0' >
                        <button className="btn btn-sm btn-success my-1 mx-1" onClick={()=>handleDelete(emp.id)}>Revert In Stock</button>
                        </td>
                      </tr>
                      
                    </>
                    )
                  })
                } 
              </tbody>
            </table>
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

    </div>
  )
}

//.filter(names => names.name.includes(`${searchName}`))
