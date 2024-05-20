
import React,{useState,useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Employee.module.css';
import Swal from 'sweetalert2';
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

export const GivenProduct = () => {

  const Navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
   const [searchName,setSearchName] = useState(''); 
   const [partyName, setPartyName] = useState(''); 
   const [orderNo,setOrderNo] = useState(''); 


  
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
      const title = [{ A: "SAHAKAR VIDYA MANDIR, BULDHANA"},{ B: "SUPLY ITEM LIST"}];
         
    
      let table1 = [
        {
         
          A: "Sr. No.",
          B: "Order No",
          C: "Name",
          D: "Category",
          E: "Given Qty",
          F: "Price / Item",
          G: "Total Price",
          H: "Remark",
          I: "Given Date / Time",
        
    
          
        },
      ];
  
     
      orders.forEach((row,index) => {
        const orderDetails = row;

  
        table1.push({
          A: index + 1,
          B: orderDetails.order_no,
          C: orderDetails.name,
          D: orderDetails.category,
          E: orderDetails.givenqty,
          F: orderDetails.given_suply_price,
          G: orderDetails.given_total_price,
          H: orderDetails.description,
          I: orderDetails.given_date + " ( " + orderDetails.given_time + " ) "
      
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
        titleRange: "A1:I1",
        tbodyRange: `A1:I${finalData.length}`,
        theadRange:
          headerIndexes?.length >= 1
            ? `A${headerIndexes[0] + 1}:I${headerIndexes[0] + 1}`
            : null,
        tFirstColumnRange:
          headerIndexes?.length >= 1
            ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
            : null,
        tLastColumnRange:
          headerIndexes?.length >= 1
            ? `I${headerIndexes[0] + 1}:I${totalRecords + headerIndexes[0] + 1}`
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
          sheet.column("H").width(50);
          sheet.column("I").width(25);
         
         
  
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
  
    axios.get("http://localhost:8000/auth/givenproducts").then(result=>{
      if (result.data.Status) {
  
        setEmployee((result.data.Result))
         setProductName((result.data.Result))
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
  
  },[])
  
  const handleDelete = (id) => {
  
    axios.delete("http://localhost:8000/auth/deletegivenproduct/"+id).then(result => {
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
     location.reload(Navigate("/auth/admin/dashboard/givenproduct"))
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
                <button id={styles.dwn_btn} className='btn px-4 border-0' onClick={()=>createDownLoadRcdOrderData()}>Download Excel</button>
              </div>
              
            </div>
            
        
        <div className=' '>
          
            <div className='d-flex justify-content-between w-100 ' id={styles.rcd_order_headings}>
          <h5 className='mx-2 my-1'>Supply Product List</h5>
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
                   Given Quantity
                              </th>
                              
                  <th>
                    One Qty Price
               </th>
               <th>
                    Total Price
               </th>
             
                  <th>
                    Remark
                </th>
                  <th>
                    Given Date / Time
                  </th>
                
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
            <tbody>
              { employee.filter((data)=> searchName === ""? data :data.name.includes(`${searchName.toUpperCase()}`)).filter((data)=> partyName === ""? data : data.category.includes(`${partyName.toUpperCase()}`)).filter((data)=> orderNo === ""? data : data.order_no.includes(`${orderNo}`)).map((emp, id) => {
                    return (<>
                      <tr key={id} className="">

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
                          {emp.givenqty} Nos
                            </td>
                               <td className=''>
                          {emp.given_suply_price}
                        </td>
                        <td className=''>
                          {emp.given_total_price}
                        </td>
                        
                        <td >
                          {emp.description}
                        </td>
                         <td >
                          {emp.given_date} ({emp.given_time})
                         
                        </td>
                       
                        <td className='p-0' >
                          <Link to={`/auth/admin/dashboard/editemployee/` + emp.id} className='btn btn-primary btn-sm m-2'>Edit</Link>
        
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

