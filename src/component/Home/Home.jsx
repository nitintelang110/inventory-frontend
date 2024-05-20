import React, { useEffect, useState } from 'react'
import styles from './Home.module.css';
import axios from 'axios';
import { FaIndianRupeeSign } from "react-icons/fa6";
import Chart from '../Chart/Chart';

export const Home = () => {

  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal, setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();
  const [categoryTotal, setCategoryTotal] = useState();
  const [avlTotal, setAvlTotal] = useState();
  const [partyTotal, setPartyTotal] = useState();
  const [outOfStockTotal, setOutOfStockTotal] = useState();


  useEffect(() => {
    adminCount()
    employeeCount()
    salaryCount()
    categoryCount()
    avlcount()
    partyCount()
  }, [])
  

  
  const adminCount = () => {
    axios.get("http://localhost:8000/auth/admin_count").then(result => {
      if(result.data.Status){
      setAdminTotal(result.data.Result[0].admin)
      }
    })
  }

   const employeeCount = () => {
    axios.get("http://localhost:8000/auth/employee_count").then(result => {
      if(result.data.Status){
      setEmployeeTotal(result.data.Result[0].product)
      }
    })
  }

   const salaryCount = () => {
    axios.get("http://localhost:8000/auth/salary_count").then(result => {
      if(result.data.Status){
      setSalaryTotal(result.data.Result[0].total)
      }
    })
  }

   const categoryCount = () => {
    axios.get("http://localhost:8000/auth/category_count").then(result => {
      if(result.data.Status){
      setCategoryTotal(result.data.Result[0].name)
      }
    })
  }

  const partyCount = () => {
    axios.get("http://localhost:8000/auth/party_count").then(result => {
      if(result.data.Status){
      setPartyTotal(result.data.Result[0].party_name)
      }
    })
  }
    const avlcount = () => {
    axios.get("http://localhost:8000/auth/avl_count").then(result => {
      if(result.data.Status){
        setAvlTotal(result.data.Result[0].avlqty)
           setOutOfStockTotal(result.data.Result[0].outofstock)
      }
    })
  }

  
  return (

    
    <div className={styles.mcontainer}>
      <div  className='col-md-12 my-4 d-flex w-100'>
       {/* <div className="d-flex justify-content-center gap-5 my-5 " >*/}



<div className="px-3 pt-2 border shadow-sm w-25 bg-primary rounded " data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
            <div className="text-center pb-1">
              <h5>Admin</h5>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
               <h5>0{adminTotal}</h5>
            </div>
          </div>


          <div className="px-3 pt-2  border shadow-sm w-25 bg-secondary rounded " data-aos="flip-right"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2600">
            <div className="text-center  pb-1">
              <h5>Total Category</h5>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
               <h5 className="d-flex flex-direction-row" >0{categoryTotal}</h5>
            </div>
          </div>

         
            <div className="px-3 pt-2  border shadow-sm w-25 bg-info rounded " data-aos="flip-right"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2600">
            <div className="text-center  pb-1">
              <h5>Total Parties</h5>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
               <h5 className="d-flex flex-direction-row" >0{partyTotal}</h5>
            </div>
          </div>

          

             <div className="px-3 pt-2  border shadow-sm w-25 bg-warning rounded " data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2200">
            <div className="text-center pb-1">
              <h5>Item In List</h5>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
               <h5>0{employeeTotal}</h5>
            </div>
          </div>



            <div className="px-3 pt-2  border shadow-sm w-25 bg-info  rounded" data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2400">
            <div className="text-center pb-1">
              <h5>Total Price</h5>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
               <h5 className="d-flex flex-direction-row" ><span><FaIndianRupeeSign style={{width:'100px',height:'20px'}}/></span>0{salaryTotal}</h5>
            </div>
          </div>
       {/* </div>

        <div className="d-flex justify-content-center gap-5 my-5">*/}



          <div className="px-3 pt-2 border shadow-sm w-25 bg-success rounded" data-aos="flip-right"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2800">
            <div className="text-center pb-1">
              <h5>Product in Stock</h5>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
               <h5 className="d-flex flex-direction-row" >0{avlTotal}</h5>
            </div>
          </div>

          <div className="px-3 pt-2  border shadow-sm w-25 bg-danger rounded" data-aos="flip-right"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="3000">
            <div className="text-center pb-1">
              <h5>Out Of Stock</h5>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
              <h5 className="d-flex flex-direction-row" >0{outOfStockTotal}</h5>
            </div>
          </div>
      </div>
      <div className="W-100">
        <Chart />
      </div>
     </div>
    /*</div>*/
  )
}


