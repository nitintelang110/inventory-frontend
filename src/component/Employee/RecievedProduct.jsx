
import React,{useState,useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Employee.module.css';
import Swal from 'sweetalert2';
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

export const ReceivedProduct = () => {

  const Navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [searchName,setSearchName] = useState(''); 
   const [partyName, setPartyName] = useState(''); 
   const [orderNo,setOrderNo] = useState(''); 
  
  

   const [startDate,setStartDate] = useState('');
   const [endDate,setEndDate] = useState('');

  const [page,setPage]=useState(10)
  //logic for pagination start
  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = page;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const orders = employee.slice(firstIndex, lastIndex);
  const npage = Math.ceil(employee.length / recordPerPage);
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
      const title = [{ A: "SAHAKAR VIDYA MANDIR, BULDHANA"},{ B: "RECEIVED PRODUCT LIST"}];
         
    
      let table1 = [
        {
         
          A: "Sr. No.",
          B: "Order No",
          C: "Name",
          D: "Category",
          E: "Received Qty",
          F: "Price / Item",
          G: "Total Price",
          H: "Party Name",
          I: "Order Date",
          J: "Received Date",
          K: "Remark",
    
          
        },
      ];
  
     
      filteredData.forEach((row,index) => {
        const orderDetails = row;

  
        table1.push({
          A: index + 1,
          B: orderDetails.order_no,
          C: orderDetails.rcd_name,
          D: orderDetails.rcd_category,
          E: orderDetails.rcd_qty,
          F: orderDetails.rcd_price,
          G: orderDetails.rcd_total,
          H: orderDetails.rcd_party,
          I: orderDetails.order_date,
          J: orderDetails.rcd_date,
          K: orderDetails.rcd_description,
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
  
      const totalRecords = filteredData.length;
  
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
          sheet.column("J").width(20);
          sheet.column("K").width(50);
         
         
  
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



  useEffect(()=>{
  
    axios.get("http://localhost:8000/auth/receivedproducts").then(result=>{
      if (result.data.Status) {
  
        setEmployee((result.data.Result))
        
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
  
  },[])
  
  const handleDelete = (id) => {

    axios.put("http://localhost:8000/auth/update_received_qty_in_pending_on_delete", employee)
    .then(result => {
      if (result) {
       ""
    } })
  .catch(err=>{console.log(err)})
  
    axios.delete("http://localhost:8000/auth/deletereceivedproduct/"+id).then(result => {
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
    location.reload(Navigate("/auth/admin/dashboard/receivedproduct"))
  }
});
        
      } else {
        alert(result.data.Error)
      }
    }
     )
   }

 

    // Filter data based on the date range
    const filteredData = orders.filter((item) => {
      if (!startDate.split('-').reverse().join('-') || !endDate.split('-').reverse().join('-')) {
        return true; // No filter applied
      }
      return item.order_date >= startDate.split('-').reverse().join('-') && item.order_date <= endDate.split('-').reverse().join('-');
    });


  return (
    <div className={styles.container}>
      <div className='px-5  py-3 border w-100'>
        
  <div className="d-flex flex-row col-md-12 mb-4 bg-light p-1">
           
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
                <div>Record</div>
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


        
     
        <div className=''>
          <div className='d-flex justify-content-between w-100 px-1 ' id={styles.rcd_order_heading}>
          <h5 className='mx-1 my-1'>RECEIVED ORDERS</h5>
          </div>

            <table className='table table-striped table-hover table-bordered'>
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
                   Rcd Quantity
                  </th>
                 
                  <th>
                    Price / Item
                </th>
                <th>
                    Total Price
                  </th>
                  <th>
                  Party
                </th>
                <th>
                  Order Date
                  </th>
                 <th>
                  Received Date
                  </th>
                  <th>
                    Description
                  </th>
                  <th>
                    Image
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
            <tbody>
              { filteredData.filter((data)=> searchName === ""? data : data.rcd_name.includes(`${searchName.toUpperCase()}`)).filter((data)=> partyName === ""? data : data.rcd_party.includes(`${partyName.toUpperCase()}`)).filter((data)=> orderNo === ""? data : data.order_no.includes(`${orderNo}`)).map((emp, id) => {
                    return (<>
                      <tr key={id} className="">

                        <td className=''>
                          {id + 1}
                        </td>
                          <td className=''>
                          {emp.order_no}
                        </td>
                        <td className=''>
                          {emp.rcd_name}
                        </td>
                         <td className='' >
                          {emp.rcd_category}
                        </td>
                        <td className='' >
                          {emp.rcd_qty} Nos
                        </td>
                       
                        <td className=''>
                          {emp.rcd_price}
                        </td>
                         <td className=''>
                          {emp.rcd_price * emp.rcd_qty}
                        </td>
                        <td >
                          {emp.rcd_party}
                        </td>
                            <td >
                          {emp.order_date}
                        </td>
                         <td >
                          {emp.rcd_date}
                        </td>
                        <td >
                          {emp.rcd_description}
                        </td>
                        <td className='p-0' >
                          <img src={`http://localhost:8000/images/` + emp.rcd_image} alt="" className={styles.employee_image} />
                        </td>
                        <td className='p-0' >
                          <Link to={`/auth/admin/dashboard/editreceivedproduct/` + emp.id} className='btn btn-primary btn-sm m-2'>Edit</Link>
        
                          <button className='btn btn-danger btn-sm' onClick={() => handleDelete(emp.id)}><i class="bi bi-trash3"></i></button>

                                                     
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
