
import React,{useState,useEffect,useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import {Clock} from '../Clock/Clock';
import {UserContext} from '../../App';

export const Admin = () => {

  const Navigate = useNavigate();

  const admid = useContext(UserContext);

  const [adminName, setAdminName] = useState("");


  axios.defaults.withCredentials = true;

const handleLogout =()=>{
  axios.get('http://localhost:8000/auth/logout').then((result)=>{
    if (result.data.Status) {

        Swal.fire({
  title: "LEAVE THIS SIDE?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Log Out!",
              text: "Log Out Successfully.",
              icon: "success"
            });

  //if we logout remove cockies
            localStorage.removeItem("valid"); 
          
            Navigate('/')
          }
        })
    }
  })
}

  useEffect(()=>{

    axios.get("http://localhost:8000/auth/adminname").then(result => {
    
    if (result.data.Status) {

      setAdminName((result.data.Result[0]))
    }else{
      alert(result.data.Error)
    }

    }).catch(err => console.log(err))
    
},[])


    return (
        <div className= "container-fluid" id={styles.outlet_conatiner}>

            <div className= "row flex-nowrap">
                <div className= "col-auto col-md-3 col-xl-2 px-0" id={styles.vertical_navbar}>
                    <div className='d-flex flex-column align-items-center align-items-sm-start px-1 pt-2 text-white min-vh-100'>
              <NavLink to="/auth/admin/dashboard" className='d-flex align-item-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
                <marquee id={styles.marque} className='fm-5 fw-bolder d-none d-sm-inline my-1 text-white' scrolldelay='250' >SAHAKAR COMPUTER SHOP</marquee>
               </NavLink>
              <ul className='nav nav-pills flex-column mb-sm-auto mb-1 align-items-center align-items-sm-start' id={styles.navlist}>

               <li className='w-100 nav-item' id={styles.menutxt}>
                  <NavLink to="/auth/admin/dashboard" className='text-decoration-none  text-white px-0 align-middle'>
                    
                    <i className='fs-4 bi-list ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline h6 thumbnail'>Menu</span>
                    </NavLink>
                </li>

                <li className='w-100 nav-item py-2' >
                  <NavLink to="/auth/admin/dashboard" className='text-decoration-none text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-speedometer2 ms-2 text-danger'></i>
                    <span className='ms-2 d-none d-sm-inline  thumbnail  '>Dashboard</span>
                    </NavLink>
                </li>

                  <li className='w-100 nav-item '>
                  <NavLink to="/auth/admin/dashboard/addorder" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-clipboard-check ms-2 text-warning'></i>
                    <span className='ms-2 d-none d-sm-inline'  >Add Order</span>
                    </NavLink>
                </li>

                
                 <li className='w-100 nav-item ' >
                  <NavLink to="/auth/admin/dashboard/direct_purchase"  className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-coin ms-2 text-warning'></i>
                    <span className='ms-2 d-none d-sm-inline '>Direct Purchase</span>
                    </NavLink>
                </li>

                  <li className='w-100 nav-item ' >
                  <NavLink to="/auth/admin/dashboard/getorder"  className='nav-link text-white px-0 align-middle'>
                        
                    <i className='fs-5 bi-box-seam ms-2 text-info'></i>
            
                    <span className='ms-2 d-none d-sm-inline '>Pending Order</span>
                    </NavLink>
                </li>

                
                <li className='w-100 nav-item' >
                  <NavLink to="/auth/admin/dashboard/completed_order" className='nav-link text-white px-0 align-middle'>
                    <i class="bi bi-bag-check fs-5 ms-2 text-info"></i>
                    <span className='ms-2 d-none d-sm-inline '>Complete Order</span>
                    </NavLink>
                </li>
            
                 <li className='w-100'>
                  <NavLink to="/auth/admin/dashboard/receivedproduct" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-cart-check ms-2 text-info'></i>
                    <span className='ms-2 d-none d-sm-inline '>Received Order </span>
                    </NavLink>
                </li>

             

                <li className='w-100' >
                  <NavLink to="/auth/admin/dashboard/avl_product" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-boxes ms-2 text-info'></i>
                    <span className='ms-2 d-none d-sm-inline '>In Stock</span>
                    </NavLink>
                </li>

                  <li className='w-100' >
                  <NavLink to="/auth/admin/dashboard/givenproduct" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-bank ms-2 text-info'></i>
                    <span className='ms-2 d-none d-sm-inline '>Suplied Stock</span>
                    </NavLink>
                </li>

                <li className='w-100' >
                  <NavLink to="/auth/admin/dashboard/outofstockproduct" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-cart-x ms-2 text-info'></i>
                    <span className='ms-2 d-none d-sm-inline '>Out Of Stock</span>
                    </NavLink>
                </li>

             <li className='w-100' >
                  <NavLink to="/auth/admin/dashboard/allproductrecord" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-cpu ms-2 text-info'></i>
                    <span className='ms-2 d-none d-sm-inline '>Profit/Loss</span>
                    </NavLink>
                </li>


                <li className='w-100' >
                  <NavLink to="/auth/admin/dashboard/repair" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-gear-wide ms-2 text-info'></i>
                    <span className='ms-2 d-none d-sm-inline '>Damage/Repair</span>
                    </NavLink>
                </li>

              

                 <li className='w-100' >
                  <NavLink to="/auth/admin/dashboard/category" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-columns ms-2 text-info'></i>
                    <span className='ms-2 d-none d-sm-inline '>Category</span>
                    </NavLink>
                </li>

                <li className='w-100'>
                  <NavLink to="/auth/admin/dashboard/party" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-diagram-3 ms-2 text-info'></i>
                    <span className='ms-2 d-none d-sm-inline '>Party</span>
                    </NavLink>
                </li>

                <li className='w-100' >
                  <NavLink to="/auth/admin/dashboard/profile" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-5 bi-person ms-2 text-info'></i>
                    <span className='ms-2 d-none d-sm-inline '>Profile</span>
                    </NavLink>
                </li>
                 <li className='w-100' >
                  <NavLink onClick={handleLogout} className='text-decoration-none text-white px-0 align-middle'>  
                    <i className='fs-5 bi-power ms-2 text-info'></i>
                    <span className='ms-2 d-none d-sm-inline '>Log Out</span>
                    </NavLink>
                </li>
              </ul>
                    </div>
          </div>
          
          <div className='col p-0 m-0 '>
            <h5 className='px-5 py-0 my-3 bg-light shadow'></h5>
            <div className='p-2 py-3 d-flex justify-content-center' id={styles.headimg}>
              <h3 className=''>COMPANY AND COMPANY SHOP NAME</h3>
            </div>
            
            <div className='px-5 py-2 my-0 bg-light d-flex flex-row justify-content-between align-items-center shadow text-primary w-100 '>  <span id={styles.clock}><Clock /></span> <span className={styles.adminname}>Admin Name - {adminName.name}</span> </div>
          
          
              <Outlet />  
             
             
          </div>
            </div>

        </div>
    )
}
