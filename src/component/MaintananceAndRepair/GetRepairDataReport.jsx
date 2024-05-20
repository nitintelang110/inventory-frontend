
import React,{useState,useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './GetRepairDataReport.module.css';
import style from './MaintananceAndRepair.module.css';
import Swal from 'sweetalert2';
import { AddToReceived } from './AddToReceived';
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

 const GetRepairDataReport = () => {

  const Navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [searchName,setSearchName] = useState(''); 
  const [partyName, setPartyName] = useState(''); 
  const [orderCategory,setOrderCategory] = useState('');
  const [mode,setMode] = useState(false)
  const [I,setI] = useState()
    

const id = useParams();
 

  useEffect(()=>{
  
    axios.get("https://inventory-backend-delta-ten.vercel.app/auth/get_repair_process").then(result=>{
      if (result.data.Status) {
  
        setOrder((result.data.Result))
         
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
  
  },[])
  
  const handleDelete = (id) => {
  
    axios.delete("https://inventory-backend-delta-ten.vercel.app/auth/deleteRepairOrder/"+id).then(result => {
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
    location.reload(Navigate("/auth/admin/dashboard/repair_process"))
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
      const title = [{ A: "SAHAKAR VIDYA MANDIR, BULDHANA"},{ B: "REPAIR PENDING ORDERS"}];
         
    
      let table1 = [
        {
         
          A: "Sr. No.",
          B: "Order No",
          C: "Name",
          D: "Category",
          E: "Order Qty",
          F: "Rcd Qty",
          G: "Order Date",
          H: "Complete Status",
          I: "Party Name",
          J: "Remark",
        
        },
      ];
  
     
      orders.forEach((row,index) => {
        const orderDetails = row;

  
        table1.push({
          A: index + 1,
          B: orderDetails.order_no,
          C: orderDetails.order_product_name,
          D: orderDetails.order_category,
          E: orderDetails.order_qty,
          F: orderDetails.rcd_order_qty,
          G: orderDetails.order_date,
          H: orderDetails.order_status,
          I: orderDetails.order_party,
          J: orderDetails.order_remark,
       
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
        titleRange: "A1:K1",
        tbodyRange: `A1:K${finalData.length}`,
        theadRange:
          headerIndexes?.length >= 1
            ? `A${headerIndexes[0] + 1}:K${headerIndexes[0] + 1}`
            : null,
        tFirstColumnRange:
          headerIndexes?.length >= 1
            ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
            : null,
        tLastColumnRange:
          headerIndexes?.length >= 1
            ? `K${headerIndexes[0] + 1}:K${totalRecords + headerIndexes[0] + 1}`
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
          sheet.column("J").width(50);
     
         
         
  
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


  return (
    <>
 
 <div className="modal fade w-100" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
  <div className="modal-dialog modal-xl modal-transition modal-fade-transform" >
    <div className="modal-content ">
      <div className="modal-header ">
      <h1 className="modal-title fs-5 mx-2 px-3 bg-success text-white" id="staticBackdropLabel">PRODUCT NAME - {order.map((oq) =>oq.id=== I ? oq.order_product_name:'' )}</h1>
              <h1 className="modal-title fs-5 mx-2 px-3 bg-info" id="staticBackdropLabel">ORDER QTY - {order.map((oq) =>oq.id=== I ? oq.order_qty:'' )}</h1>
              <h1 className="modal-title fs-5 px-2 bg-warning" id="staticBackdropLabel">RECEIVED QTY - {order.map((oq) =>oq.id=== I ? oq.rcd_order_qty:'' )}</h1>
                <h1 className="modal-title fs-5 px-2 bg-info mx-2 " id="staticBackdropLabel">PENDING QTY - {order.map((oq) =>oq.id=== I ? oq.order_qty - oq.rcd_order_qty:'' )}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body ">
       {mode && <AddToReceived ids={I}/>}
      </div>
    
    </div>
  </div>
</div>



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
   
             
          <div className={styles.btns_container}>
           <div className={style.btns}>
           <button className={style.btns_received}><Link to={`/auth/admin/dashboard/received_repair_order`} className=' text-decoration-none text-white'>Received Repair Order</Link></button>
           <button className={style.btns_complete}><Link to={`/auth/admin/dashboard/repair_process_complete`} className=' text-decoration-none text-white'>Complete Repair Order</Link></button>
          </div>
         </div> 

        <div className='mt-1  '>
          
               <div className='shadow rounded border-1 d-flex justify-content-between' id={styles.strip_head}>
         <div className=' text-white '>
              <h5 className='my-1 mx-2'>REPAIR PENDING ORDERS</h5>
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
                   Complete Status
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
              { orders.filter((data)=> searchName === ""? data : data.order_product_name.includes(`${searchName.toUpperCase()}`)).filter((data)=> partyName === ""? data : data.order_party.includes(`${partyName.toUpperCase()}`)).filter((data)=> orderCategory === ""? data : data.order_category.includes(`${orderCategory.toUpperCase()}`)).map((emp, id) => {
                return (<>
                      
                  {emp.order_qty != emp.rcd_order_qty? <tr key={id} className="">

                        <td className=''>
                          {id + 1}
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
                          {emp.order_status}
                    </td>
                     <td className=''>
                          {emp.order_party}
                        </td>
                       <td >
                          {emp.order_remark}
                        </td>
                      
                       
                        <td className='p-0' >
                          <Link to={`/auth/admin/dashboard/editemployee/` + emp.id} className='btn btn-primary btn-sm m-2'>Edit</Link>
        
                          <button className='btn btn-danger btn-sm' onClick={() => handleDelete(emp.id)}>Delete</button>

                         
                           <button className='btn btn-success mx-2 px-4 btn-sm m2' data-bs-target="#staticBackdrop" data-bs-toggle="modal" onClick={()=>setMode(true)}><span onClick={()=>setI(emp.id)}>Received Order</span> </button>       

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
export default GetRepairDataReport;


//.filter(names => names.name.includes(`${searchName}`))
