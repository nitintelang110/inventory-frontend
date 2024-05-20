
import React,{useState,useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../Order/GetOrder.module.css'
import style from './ReceivedRepairOrder.module.css'
import Swal from 'sweetalert2';
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";



 const ReceivedRepairOrder = () => {


  const Navigate = useNavigate();
  const [order, setOrder] = useState([]);
   const [searchName,setSearchName] = useState(''); 
   const [partyName, setPartyName] = useState(''); 
   const [orderNo,setOrderNo] = useState(''); 

   const [startDate,setStartDate] = useState('');
   const [endDate,setEndDate] = useState('');

  useEffect(()=>{
  
    axios.get("http://localhost:8000/auth/received_inprocess_order").then(result=>{
      if (result.data.Status) {
  
        setOrder(result.data.Result)
         
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))


  
  },[])
  
  const handleDelete = (id) => {
  
    axios.delete("http://localhost:8000/auth/delete_rcd_repair_Order/"+id).then(result => {
      if (result.data.Status) {

        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    location.reload(Navigate("/auth/admin/dashboard/received_repair_order"))
    setMode(false)
  }
});
        
      
      } else {
        alert(result.data.Error)
      }
    }
     )
   }



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

   
   
    const createDownLoadRcdOrderData = () => {
      handleExport().then((url) => {
    
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", url);
        downloadAnchorNode.setAttribute("download", "received_report.xlsx");
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

      const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
        Toast.fire({
      icon:"success",
      title: "Download Successfuly",
      timer:1800
    });
      });
    };
  
    const workbook2blob = (workbook) => {
      const wopts = {
        bookType: "xlsx",
        bookSST: false,
        type: "binary",
      };
  
      const wbout = XLSX.write(workbook, wopts);
  
      // The application/octet-stream MIME type is used for unknown binary files.
      // It preserves the file contents, but requires the receiver to determine file type,
      // for example, from the filename extension.
      const blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream",
      });
  
      return blob;
    };
  
    const s2ab = (s) => {
      // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
      // create an ArrayBuffer with a size in bytes
      const buf = new ArrayBuffer(s.length);
  
      //create a 8 bit integer array
      const view = new Uint8Array(buf);
  
      //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
      for (let i = 0; i !== s.length; i++) {
        view[i] = s.charCodeAt(i);
      }
  
      return buf;
    };
  
    const handleExport = () => {
      const title = [{ A: "SAHAKAR VIDYA MANDIR, BULDHANA"},{ B: "RECEIVED REPAIR ORDERS LIST"}];
         
    
      let table1 = [
        {
         
          A: "Sr. No.",
          B: "Order No",
          C: "Name",
          D: "Category",
          E: "Order Qty",
          F: "Rcvd Qty",
          G: "Repair Price",
          H: "Order Date",
          I: "Rcd Date",
          J: "Status",
          K: "Party Name",
          L: "Remark",
    
          
        },
      ];
  
     
      orders.forEach((row,index) => {
        const orderDetails = row;

  
        table1.push({
          A: index + 1,
          B: orderDetails.repair_order_no,
          C: orderDetails.rcd_rep_name,
          D: orderDetails.rcd_rep_category,
          E: orderDetails.rep_qty,
          F: orderDetails.rcd_rep_qty,
          G: orderDetails.repair_price,
          H: orderDetails.rep_order_date,
          I: orderDetails.rcd_rep_order_date,
          J: orderDetails.rep_status,
          K: orderDetails.rcd_rep_party,
          L: orderDetails.repair_description
        });
  
       
      });
  

      const finalData = [...title,...table1];
  
      //create a new workbook
      const wb = XLSX.utils.book_new();
  
      const sheet = XLSX.utils.json_to_sheet(finalData, {
        skipHeader: true,
      });
  
      XLSX.utils.book_append_sheet(wb, sheet, "Rcd_order_report");
  
      // binary large object
      // Since blobs can store binary data, they can be used to store images or other multimedia files.
  
      const workbookBlob = workbook2blob(wb);
  
      var headerIndexes = [];
      finalData.forEach((data, index) =>
        data["B"] === "Order No" ? headerIndexes.push(index) : null
      );
  
      const totalRecords = orders.length;
  
      const dataInfo = {
        titleCell: "A1",
        titleRange: "A1:L1",
        tbodyRange: `A1:L${finalData.length}`,
        theadRange:
          headerIndexes?.length >= 1
            ? `A${headerIndexes[0] + 1}:L${headerIndexes[0] + 1}`
            : null,
        tFirstColumnRange:
          headerIndexes?.length >= 1
            ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
            : null,
        tLastColumnRange:
          headerIndexes?.length >= 1
            ? `L${headerIndexes[0] + 1}:L${totalRecords + headerIndexes[0] + 1}`
            : null,
  
      };
  
      return addStyle(workbookBlob, dataInfo);
    };
  
    const addStyle = (workbookBlob, dataInfo) => {
      return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
        workbook.sheets().forEach((sheet) => {
          sheet.usedRange().style({
            fontFamily: "Arial",
            verticalAlignment: "center",
           
          });
  
          sheet.column("A").width(15);
          sheet.column("B").width(15);
          sheet.column("C").width(20);
          sheet.column("D").width(15);
          sheet.column("E").width(15);
          sheet.column("F").width(15);
          sheet.column("G").width(15);
          sheet.column("H").width(20);
          sheet.column("I").width(20);
          sheet.column("J").width(20);
          sheet.column("K").width(20);
          sheet.column("L").width(50);
         
  
          sheet.range(dataInfo.titleRange).merged(true).style({
            fill: "99CCFF",
            bold: true,
            horizontalAlignment: "center",
            verticalAlignment: "center",
             border:true
          });
         
  
          if (dataInfo.tbodyRange) {
            sheet.range(dataInfo.tbodyRange).style({
              horizontalAlignment: "center",
              border: true,
               bold:false
            });
          }
  
          sheet.range(dataInfo.theadRange).style({
            fill: "99FF99",
            bold: true,
            horizontalAlignment: "center",
            border:true
          });
  
         
  
          if (dataInfo.tFirstColumnRange) {
            sheet.range(dataInfo.tFirstColumnRange).style({
              bold: true,
               border:true
            });
          }
  
          if (dataInfo.tLastColumnRange) {
            sheet.range(dataInfo.tLastColumnRange).style({
              bold: false,
               border:true
            });
          }
  
        });
  
        return workbook
          .outputAsync()
          .then((workbookBlob) => URL.createObjectURL(workbookBlob));
      });
    };


     // Filter data based on the date range
     const filteredData = orders.filter((item) => {
      if (!startDate.split('-').reverse().join('-') || !endDate.split('-').reverse().join('-')) {
        return true; // No filter applied
      }
      return item.rep_order_date >= startDate.split('-').reverse().join('-') && item.rep_order_date <= endDate.split('-').reverse().join('-');
    });

   

  return (
 
    <>

    <div className={styles.container}>


       <div className='px-5 border p-3  w-100'>
    
          <div className='mt-1  '>

            <div className="d-flex bg-light p-2 flex-row col-md-12 mb-4">
           
       
            <div className='col-md-3 bg-light'>
                 <div className=''>Select Date</div>
                <div className='col-md-4 bg-light d-flex flex-row'>
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
                 <option value={orders.length}>ALL</option>
          </select>
               </div>

              <div className='col-md-2' id={styles.dwn_btn_container}>
                <div>Download</div>
                <button id={styles.dwn_btn} className='btn px-4 border-0' onClick={()=>createDownLoadRcdOrderData()}>Download Excel</button>
              </div>


            </div>

        <div className={style.btns}>
      <button className={style.btns_process}><Link to={`/auth/admin/dashboard/repair_process`} className=' text-decoration-none text-white'>In Process Repair Order</Link></button>
      <button className={style.btns_complete}><Link to={`/auth/admin/dashboard/repair_process_complete`} className=' text-decoration-none text-white'>Complete Repair Order</Link></button>
      </div> 
            
            <div className='rounded border-1 d-flex justify-content-between' id={styles.get_order_container_strip}>
         <div className=''>
              <h5 className=' my-1 mx-2 '>RECEIVED REPAIR ORDERS</h5>
          </div>
          </div>
            <table className='table table-striped table-bordered'>
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
                   Repair Price
                </th>
                   <th>
                   Order Date
                  </th>
                  <th>
                   Rcd Date
                  </th>
                    <th>
                   Status
                  </th>
                  <th>
                   Party Name
                 </th>
                <th>
                    Remark
                  </th>
            
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
            <tbody>

              

              {filteredData.filter((data)=> searchName === ""? data : data.rcd_rep_name.includes(`${searchName.toUpperCase()}`)).filter((data)=> partyName === ""? data : data.rcd_rep_party.includes(`${partyName.toUpperCase()}`)).filter((data)=> orderNo === ""? data : data.repair_order_no.includes(`${orderNo}`)).map((emp, id) => {
              
                return (
                  <>
          
                      <tr key={id} className="">
                        <td className=''>
                          {id+1}
                        </td>
                         <td className=''>
                          {emp.repair_order_no}
                        </td>
                        <td className=''>
                          {emp.rcd_rep_name}
                        </td>
                        <td className='' >
                          {emp.rcd_rep_category}
                        </td>
                        <td className='' >
                          {emp.rep_qty} Nos
                        </td>
                          <td className='' >
                          {emp.rcd_rep_qty} Nos
                        </td>
                        <td className='' >
                          {emp.repair_price}
                        </td>
                        <td className=''>
                          {emp.rep_order_date}
                        </td>
                        <td className=''>
                          {emp.rcd_rep_order_date}
                        </td>
                       
                        <td className=''>
                          {emp.rep_status}
                        </td>
                        <td className=''>
                          {emp.rcd_rep_party}
                        </td>
                        <td >
                          {emp.repair_description}
                        </td>
                      
                       
                        <td className="mt-0">
                          <Link to={`/auth/admin/dashboard/edit_order/` + emp.id} className='btn btn-primary btn-sm mx-2'>Edit</Link>
        
                          <button className='btn btn-danger btn-sm' onClick={() => handleDelete(emp.id)}>Delete</button>
  
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

   <div className={styles.none_text}>{order.length < 0 ?"No order in pending queue":""}</div> 
    </>
  )
}
export default ReceivedRepairOrder ;



