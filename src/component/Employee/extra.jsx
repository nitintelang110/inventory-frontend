import React, { useEffect, useState } from 'react';
import styles from './Addemployee.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Addemployee = () => {


  const [employee, setEmployee] = useState(
  

    {
    name:'',
      qty: '',
      category: '',
      party: '',
      price: '',
      total: '',
      description: '',
      image:'',
    },
    {
   name2:'', 
   qty2: '',
   category2:'',
   party2:'',
   price2: '',
   total2:'',
   description2:'',
   image2:'',
    },
    {
     name3:'',
      qty3: '',
      category3: '',
      party3: '',
      price3: '',
      total3: '',
      description3: '',
      image3:'',
    },
    {
     name4:'',
      qty4: '',
      category4: '',
      party4: '',
      price4: '',
      total4: '',
      description4: '',
      image4:'', 
    },
    {
      name5:'',
      qty5: '',
      category5: '',
      party5: '',
      price5: '',
      total5: '',
      description5: '',
      image5:'',
    },
    {
      name6: '',
      qty6: '',
      category6: '',
      party6: '',
      price6: '',
      total6: '',
      description6: '', 
        image6:'',
    },
    {
      name7: '',
      qty7: '',
      category7:'',
      party7: '',
      price7: '',
      total7: '',
      description7: '',
      image7:'',
    },
    {
    name8: '', 
    qty8: '',
    category8:'',
    party8:'',
    price8: '',
    total8:'',
    description8:'',
     image8:'',
  
    },
    {

     name9: '',
     qty9: '',
     category9: '',
     party9: '',
     price9: '',
     total9:'',
     description9:'',
    image9:'',
    },
    {
      name10: '',
      qty10: '',
      category10: '',
      party10: '',
      price10: '',
      total10: '',
      description10: '',
      image10:'',
    }

   

);



  
  const [partyData,setPartyData] = useState([]);
  const [category, setCategory] = useState([]);
  const Navigate = useNavigate();

  

const handleSubmit = (e)=>{
  e.preventDefault();
  //we should not send file from front end without this code bcoz file always use form data object so we cant send file without this so that why we need for all input bcoz file also going with this input
  const formData = new FormData();

    formData.append('name', employee.name);
    formData.append('name2', employee.name2);
    formData.append('name3', employee.name3);
    formData.append('name4', employee.name4);
    formData.append('name5', employee.name5);
    formData.append('name6', employee.name6);
    formData.append('name7', employee.name7);
    formData.append('name8', employee.name8);
    formData.append('name9', employee.name9);
  formData.append('name10', employee.name10);
  

    formData.append('qty', employee.qty);
    formData.append('qty2', employee.qty2);
    formData.append('qty3', employee.qty3);
    formData.append('qty4', employee.qty4);
    formData.append('qty5', employee.qty5);
    formData.append('qty6', employee.qty6);
    formData.append('qty7', employee.qty7);
    formData.append('qty8', employee.qty8);
    formData.append('qty9', employee.qty9);
  formData.append('qty10', employee.qty10);


  formData.append('category', employee.category);
  formData.append('category2', employee.category2);
  formData.append('category3', employee.category3);
  formData.append('category4', employee.category4);
  formData.append('category5', employee.category5);
  formData.append('category6', employee.category6);
  formData.append('category7', employee.category7);
  formData.append('category8', employee.category8);
  formData.append('category9', employee.category9);
  formData.append('category10', employee.category10);



  formData.append('party', employee.party);
  formData.append('party2', employee.party2);
  formData.append('party3', employee.party3);
  formData.append('party4', employee.party4);
  formData.append('party5', employee.party5);
  formData.append('party6', employee.party6);
  formData.append('party7', employee.party7);
  formData.append('party8', employee.party8);
  formData.append('party9', employee.party9);
  formData.append('party10', employee.party10);
 

  formData.append('price', employee.price);
  formData.append('price2', employee.price2);
  formData.append('price3', employee.price3);
  formData.append('price4', employee.price4);
  formData.append('price5', employee.price5);
  formData.append('price6', employee.price6);
  formData.append('price7', employee.price7);
  formData.append('price8', employee.price8);
  formData.append('price9', employee.price9);
  formData.append('price10', employee.price10);



    formData.append('total', employee.total);
    formData.append('total2', employee.total2);
    formData.append('total3', employee.total3);
    formData.append('total4', employee.total4);
    formData.append('total5', employee.total5);
    formData.append('total6', employee.total6);
    formData.append('total7', employee.total7);
    formData.append('total8', employee.total8);
    formData.append('total9', employee.total9);
  formData.append('total10', employee.total10);



  formData.append('description', employee.description);
  formData.append('description2', employee.description2);
  formData.append('description3', employee.description3);
  formData.append('description4', employee.description4);
  formData.append('description5', employee.description5);
  formData.append('description6', employee.description6);
  formData.append('description7', employee.description7);
  formData.append('description8', employee.description8);
  formData.append('description9', employee.description9);
  formData.append('description10', employee.description10);
  formData.append('image', employee.image);
  formData.append('image', employee.image2);
  formData.append('image', employee.image3);
  formData.append('image', employee.image4);
  formData.append('image', employee.image5);
  formData.append('image', employee.image6);
  formData.append('image', employee.image7);
  formData.append('image', employee.image8);
  formData.append('image', employee.image9);
  formData.append('image', employee.image10);


  //end form data

  axios.post('http://localhost:8000/auth/receivedproduct', formData)
 // axios.post('http://localhost:8000/auth/addemployee', formData )
   .then(result =>{
     if (result.data.Status) {
        Swal.fire({ position: "middle", icon: "success", title: "Added Successfully!", timer: 1800, showConfirmButton: false });
       Navigate("/auth/admin/dashboard/receivedproduct")
  }else{
return alert(result.data.Error)
  }
   })
  
  
  
}

  
useEffect(()=>{
    axios.get("http://localhost:8000/auth/addcategory").then(result=>{
      if (result.data.Status) {
  
        setCategory((result.data.Result))
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))

    axios.get("http://localhost:8000/auth/party").then(result=>{
      if (result.data.Status) {
  
        setPartyData((result.data.Result))
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
  },[])





  return (
   
         <div className={styles.mainsection} id={styles.mainsection}>
    
    <div className={styles.container}>
      <h4 style={{color:"#00008B"}} className='d-flex justify-content-center align-items-center'>Add Product</h4>

<form className={styles.form} onSubmit={handleSubmit} >

  <div id={styles.formContainer} className='col-md-12 p-1'>
    


  <div className="col-md-2 ">
    <label  className="form-label text-dark h6">Name</label>
            <input type="text" name='name' placeholder='Enter Name' autoComplete='off' onChange={(e) => setEmployee({...employee, name:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />     
  </div>


 
  <div className="col-md-1">
    <label  className="form-label text-dark h6">Quantity</label>
            <input type="text" name='qty'  placeholder='Enter Qty' autoComplete='off' onChange={(e) => setEmployee({...employee, qty:e.target.value})} className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp" required />     
  </div>
 
  
  <div className=" ">
    <label  className="form-label text-dark h6">Category</label>
            <select name='category' id='categoryId'  className="form-select " onChange={(e) => setEmployee({...employee, category:e.target.value})}>
             <option >-- Select --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className={styles.options} key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
          </div>



          <div className="">
    <label  className="form-label text-dark h6">Party</label>
            <select name='party' id='categoryId'  className="form-select " onChange={(e) => setEmployee({...employee, party:e.target.value})}>
             <option>-- Select --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
            </select>
          </div>


          <div className=" col-md-1">
         <label  className="form-label text-dark h6">Price</label>
            <input type="int" name='price'  placeholder='Enter Price' autoComplete='off' onChange={(e) => setEmployee({...employee, price:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          </div>
          
                  <div className=" col-md-1">
              <label className="form-label text-dark h6">Total Price</label>
            <input type="int" name='total_price' placeholder='Enter Total Price' value={ employee.price*employee.qty }  autoComplete='off' onKeyUp={(e) => setEmployee({...employee, total:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
           </div>
 
  <div className=" col-md-3">
    <label  className="form-label text-dark h6">Description</label>
            <input type="text" name='description'  placeholder='describe product' autoComplete='off' onChange={(e) => setEmployee({...employee, description:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>

 

  <div className="col-md-1">
              <label className="form-label text-dark h6">Image</label>
              
              <input type="file" name='image' autoComplete='off' onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" /> 
              
  </div>
 
  </div>


  <div id={styles.formContainer} className='col-md-12 p-1 '>
    


  <div className=" col-md-2 ">
            <input type="text" name='name2' placeholder='Enter Name' autoComplete='off' onChange={(e) => setEmployee({...employee, name2:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"/>     
  </div>


 
  <div className="col-md-1">

            <input type="text" name='qty2'  placeholder='Enter Qty' autoComplete='off' onChange={(e) => setEmployee({...employee, qty2:e.target.value})} className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp"  />     
  </div>
 
  
  <div className=" ">
   
            <select name='category2' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, category2:e.target.value})}>
             <option >-- Select --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className={styles.options} key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
          </div>



          <div className="">
  
            <select name='party2' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, party2:e.target.value})}>
             <option>-- Select --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
            </select>
          </div>


          <div className=" col-md-1">
      
            <input type="int" name='price2'  placeholder='Enter Price' autoComplete='off' onChange={(e) => setEmployee({...employee, price2:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
          </div>
          
                  <div className=" col-md-1">
       
            <input type="int" name='total_price2' placeholder='Enter Total Price' value={employee.price2*employee.qty2 }  autoComplete='off' onKeyUp={(e) => setEmployee({...employee, total2:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" />
           </div>
 
  <div className="col-md-3">

            <input type="text" name='description2'  placeholder='describe product' autoComplete='off' onChange={(e) => setEmployee({...employee, description2:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>

 

  <div className="col-md-1">
  
            <input type="file" name='image' autoComplete='off' onChange={(e) => setEmployee({...employee, image2:e.target.files[0]})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>
 
  </div>



  <div id={styles.formContainer} className='col-md-12 p-1 '>
    


    <div className=" col-md-2 ">
              <input type="text" name='name3' placeholder='Enter Name' autoComplete='off' onChange={(e) => setEmployee({...employee, name3:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"/>     
    </div>
  
  
   
    <div className="col-md-1">
  
              <input type="text" name='qty3'  placeholder='Enter Qty' autoComplete='off' onChange={(e) => setEmployee({...employee, qty3:e.target.value})} className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp"  />     
    </div>
   
    
    <div className=" ">
     
              <select name='category3' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, category3:e.target.value})}>
               <option >-- Select --</option>
                  {category.map((c,id)=>{
                      return(
                          <>
                      <option className={styles.options} key={id} value={c.name}>{c.name}</option>
                      </>
                      )
                  })}
              </select>
            </div>
  
  
  
            <div className="">
    
              <select name='party3' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, party3:e.target.value})}>
               <option>-- Select --</option>
                  {partyData.map((c,id)=>{
                      return(
                          <>
                      <option key={id} value={c.party_name}>{c.party_name}</option>
                      </>
                      )
                  })}
              </select>
            </div>
  
  
            <div className=" col-md-1">
        
              <input type="int" name='price3'  placeholder='Enter Price' autoComplete='off' onChange={(e) => setEmployee({...employee, price3:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
            </div>
            
                    <div className=" col-md-1">
         
              <input type="int" name='total_price3' placeholder='Enter Total Price' value={employee.price3*employee.qty3 }  autoComplete='off' onKeyUp={(e) => setEmployee({...employee, total3:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" />
             </div>
   
    <div className="col-md-3">
  
              <input type="text" name='description3'  placeholder='describe product' autoComplete='off' onChange={(e) => setEmployee({...employee, description3:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
    </div>
  
   
  
    <div className="col-md-1">
    
              <input type="file" name='image' autoComplete='off' onChange={(e) => setEmployee({...employee, image3:e.target.files[0]})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
    </div>
   
    </div>


    <div id={styles.formContainer} className='col-md-12 p-1 '>
    


  <div className=" col-md-2 ">
            <input type="text" name='name4' placeholder='Enter Name' autoComplete='off' onChange={(e) => setEmployee({...employee, name4:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"/>     
  </div>


 
  <div className="col-md-1">

            <input type="text" name='qty4'  placeholder='Enter Qty' autoComplete='off' onChange={(e) => setEmployee({...employee, qty4:e.target.value})} className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp"  />     
  </div>
 
  
  <div className=" ">
   
            <select name='category4' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, category4:e.target.value})}>
             <option >-- Select --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className={styles.options} key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
          </div>



          <div className="">
  
            <select name='party4' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, party4:e.target.value})}>
             <option>-- Select --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
            </select>
          </div>


          <div className=" col-md-1">
      
            <input type="int" name='price4'  placeholder='Enter Price' autoComplete='off' onChange={(e) => setEmployee({...employee, price4:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
          </div>
          
                  <div className=" col-md-1">
       
            <input type="int" name='total_price4' placeholder='Enter Total Price' value={employee.price4*employee.qty4 }  autoComplete='off' onKeyUp={(e) => setEmployee({...employee, total4:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" />
           </div>
 
  <div className="col-md-3">

            <input type="text" name='description4'  placeholder='describe product' autoComplete='off' onChange={(e) => setEmployee({...employee, description4:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>

 

  <div className="col-md-1">
  
            <input type="file" name='image' autoComplete='off' onChange={(e) => setEmployee({...employee, image4:e.target.files[0]})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>
 
  </div>


  <div id={styles.formContainer} className='col-md-12 p-1 '>
    


  <div className=" col-md-2 ">
            <input type="text" name='name5' placeholder='Enter Name' autoComplete='off' onChange={(e) => setEmployee({...employee, name5:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"/>     
  </div>


 
  <div className="col-md-1">

            <input type="text" name='qty5'  placeholder='Enter Qty' autoComplete='off' onChange={(e) => setEmployee({...employee, qty5:e.target.value})} className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp"  />     
  </div>
 
  
  <div className=" ">
   
            <select name='category5' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, category5:e.target.value})}>
             <option >-- Select --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className={styles.options} key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
          </div>



          <div className="">
  
            <select name='party5' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, party5:e.target.value})}>
             <option>-- Select --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
            </select>
          </div>


          <div className=" col-md-1">
      
            <input type="int" name='price5'  placeholder='Enter Price' autoComplete='off' onChange={(e) => setEmployee({...employee, price5:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
          </div>
          
                  <div className=" col-md-1">
       
            <input type="int" name='total_price5' placeholder='Enter Total Price' value={employee.price5*employee.qty5 }  autoComplete='off' onKeyUp={(e) => setEmployee({...employee, total5:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" />
           </div>
 
  <div className="col-md-3">

            <input type="text" name='description5'  placeholder='describe product' autoComplete='off' onChange={(e) => setEmployee({...employee, description5:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>

 

  <div className="col-md-1">
  
            <input type="file" name='image' autoComplete='off' onChange={(e) => setEmployee({...employee, image5:e.target.files[0]})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>
 
  </div>


  <div id={styles.formContainer} className='col-md-12 p-1 '>
    


  <div className=" col-md-2 ">
            <input type="text" name='name6' placeholder='Enter Name' autoComplete='off' onChange={(e) => setEmployee({...employee, name6:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"/>     
  </div>


 
  <div className="col-md-1">

            <input type="text" name='qty6'  placeholder='Enter Qty' autoComplete='off' onChange={(e) => setEmployee({...employee, qty6:e.target.value})} className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp"  />     
  </div>
 
  
  <div className=" ">
   
            <select name='category6' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, category6:e.target.value})}>
             <option >-- Select --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className={styles.options} key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
          </div>



          <div className="">
  
            <select name='party6' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, party6:e.target.value})}>
             <option>-- Select --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
            </select>
          </div>


          <div className=" col-md-1">
      
            <input type="int" name='price6'  placeholder='Enter Price' autoComplete='off' onChange={(e) => setEmployee({...employee, price6:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
          </div>
          
                  <div className=" col-md-1">
       
            <input type="int" name='total_price6' placeholder='Enter Total Price' value={employee.price6*employee.qty6 }  autoComplete='off' onKeyUp={(e) => setEmployee({...employee, total6:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" />
           </div>
 
  <div className="col-md-3">

            <input type="text" name='description6'  placeholder='describe product' autoComplete='off' onChange={(e) => setEmployee({...employee, description6:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>

 

  <div className="col-md-1">
  
            <input type="file" name='image' autoComplete='off' onChange={(e) => setEmployee({...employee, image6:e.target.files[0]})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>
 
  </div>


  <div id={styles.formContainer} className='col-md-12 p-1 '>
    


  <div className=" col-md-2 ">
            <input type="text" name='name7' placeholder='Enter Name' autoComplete='off' onChange={(e) => setEmployee({...employee, name7:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"/>     
  </div>


 
  <div className="col-md-1">

            <input type="text" name='qty7'  placeholder='Enter Qty' autoComplete='off' onChange={(e) => setEmployee({...employee, qty7:e.target.value})} className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp"  />     
  </div>
 
  
  <div className=" ">
   
            <select name='category7' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, category7:e.target.value})}>
             <option >-- Select --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className={styles.options} key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
          </div>



          <div className="">
  
            <select name='party7' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, party7:e.target.value})}>
             <option>-- Select --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
            </select>
          </div>


          <div className=" col-md-1">
      
            <input type="int" name='price7'  placeholder='Enter Price' autoComplete='off' onChange={(e) => setEmployee({...employee, price7:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
          </div>
          
                  <div className=" col-md-1">
       
            <input type="int" name='total_price7' placeholder='Enter Total Price' value={employee.price7*employee.qty7 }  autoComplete='off' onKeyUp={(e) => setEmployee({...employee, total7:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" />
           </div>
 
  <div className="col-md-3">

            <input type="text" name='description7'  placeholder='describe product' autoComplete='off' onChange={(e) => setEmployee({...employee, description7:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>

 

  <div className="col-md-1">
  
            <input type="file" name='image' autoComplete='off' onChange={(e) => setEmployee({...employee, image7:e.target.files[0]})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>
 
  </div>


  <div id={styles.formContainer} className='col-md-12 p-1 '>
    


  <div className=" col-md-2 ">
            <input type="text" name='name8' placeholder='Enter Name' autoComplete='off' onChange={(e) => setEmployee({...employee, name8:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"/>     
  </div>


 
  <div className="col-md-1">

            <input type="text" name='qty8'  placeholder='Enter Qty' autoComplete='off' onChange={(e) => setEmployee({...employee, qty8:e.target.value})} className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp"  />     
  </div>
 
  
  <div className=" ">
   
            <select name='category8' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, category8:e.target.value})}>
             <option >-- Select --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className={styles.options} key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
          </div>



          <div className="">
  
            <select name='party8' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, party8:e.target.value})}>
             <option>-- Select --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
            </select>
          </div>


          <div className=" col-md-1">
      
            <input type="int" name='price8'  placeholder='Enter Price' autoComplete='off' onChange={(e) => setEmployee({...employee, price8:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
          </div>
          
                  <div className=" col-md-1">
       
            <input type="int" name='total_price8' placeholder='Enter Total Price' value={employee.price8*employee.qty8 }  autoComplete='off' onKeyUp={(e) => setEmployee({...employee, total8:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" />
           </div>
 
  <div className="col-md-3">

            <input type="text" name='description8'  placeholder='describe product' autoComplete='off' onChange={(e) => setEmployee({...employee, description8:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>

 

  <div className="col-md-1">
  
            <input type="file" name='image' autoComplete='off' onChange={(e) => setEmployee({...employee, image8:e.target.files[0]})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>
 
  </div>

  <div id={styles.formContainer} className='col-md-12 p-1 '>
    


  <div className=" col-md-2 ">
            <input type="text" name='name9' placeholder='Enter Name' autoComplete='off' onChange={(e) => setEmployee({...employee, name9:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"/>     
  </div>


 
  <div className="col-md-1">

            <input type="text" name='qty9'  placeholder='Enter Qty' autoComplete='off' onChange={(e) => setEmployee({...employee, qty9:e.target.value})} className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp"  />     
  </div>
 
  
  <div className=" ">
   
            <select name='category9' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, category9:e.target.value})}>
             <option >-- Select --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className={styles.options} key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
          </div>



          <div className="">
  
            <select name='party9' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, party9:e.target.value})}>
             <option>-- Select --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
            </select>
          </div>


          <div className=" col-md-1">
      
            <input type="int" name='price9'  placeholder='Enter Price' autoComplete='off' onChange={(e) => setEmployee({...employee, price9:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
          </div>
          
                  <div className=" col-md-1">
       
            <input type="int" name='total_price9' placeholder='Enter Total Price' value={employee.price9*employee.qty9 }  autoComplete='off' onKeyUp={(e) => setEmployee({...employee, total9:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" />
           </div>
 
  <div className="col-md-3">

            <input type="text" name='description9'  placeholder='describe product' autoComplete='off' onChange={(e) => setEmployee({...employee, description9:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>

 

  <div className="col-md-1">
  
            <input type="file" name='image' autoComplete='off' onChange={(e) => setEmployee({...employee, image9:e.target.files[0]})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>
 
  </div>


  <div id={styles.formContainer} className='col-md-12 p-1 '>
    


  <div className=" col-md-2 ">
            <input type="text" name='name10' placeholder='Enter Name' autoComplete='off' onChange={(e) => setEmployee({...employee, name10:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"/>     
  </div>


 
  <div className="col-md-1">

            <input type="text" name='qty10'  placeholder='Enter Qty' autoComplete='off' onChange={(e) => setEmployee({...employee, qty10:e.target.value})} className="form-control text-capital " id="exampleInputEmail1" aria-describedby="emailHelp"  />     
  </div>
 
  
  <div className=" ">
   
            <select name='category10' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, category10:e.target.value})}>
             <option >-- Select --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option className={styles.options} key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
          </div>



          <div className="">
  
            <select name='party10' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, party10:e.target.value})}>
             <option>-- Select --</option>
                {partyData.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.party_name}>{c.party_name}</option>
                    </>
                    )
                })}
            </select>
          </div>


          <div className=" col-md-1">
      
            <input type="int" name='price10'  placeholder='Enter Price' autoComplete='off' onChange={(e) => setEmployee({...employee, price10:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
          </div>
          
                  <div className=" col-md-1">
       
            <input type="int" name='total_price10' placeholder='Enter Total Price' value={employee.price10*employee.qty10 }  autoComplete='off' onKeyUp={(e) => setEmployee({...employee, total10:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" />
           </div>
 
  <div className="col-md-3">

            <input type="text" name='description10'  placeholder='describe product' autoComplete='off' onChange={(e) => setEmployee({...employee, description10:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>

 

  <div className="col-md-1">
  
            <input type="file" name='image' autoComplete='off' onChange={(e) => setEmployee({...employee, image10:e.target.files[0]})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp"  />
  </div>
 
  </div>


 



 <div className='d-flex justify-content-end my-2'>
  <button type="submit" className="btn btn-success mx-4 mb-3 my-5">Add Product</button>
  </div>
</form>




    </div>
    </div>
  
  )
}


//backend


//for add new product into received product table
router.post("/receivedproduct",upload.array('image',10) ,(req, res) => {

  
  
    const sql = "INSERT INTO `received_product`(`rcd_name`, `rcd_qty`, `rcd_category`,`rcd_party`, `rcd_price`,`rcd_total`, `rcd_description`,  `rcd_image`) VALUES (?)" //for multi input we use back tick for whole query
 
    const values = [
        [
            req.body.name,
            req.body.qty,
            req.body.category,
            req.body.party,
            req.body.price,
            req.body.total,
            req.body.description,
            req.files.filename
           
            
           
        ],
        [
            req.body.name2,
            req.body.qty2,
            req.body.category2,
            req.body.party2,
            req.body.price2,
            req.body.total2,
            req.body.description2,
            req.files.filename
         
        ],
        [
           
            req.body.name3,
            req.body.qty3,
            req.body.category3,
            req.body.party3,
            req.body.price3,
            req.body.total3,
            req.body.description3,
            req.files.filename

        
        ],
        [
            
            req.body.name4,
            req.body.qty4,
            req.body.category4,
            req.body.party4,
            req.body.price4,
            req.body.total4,
            req.body.description4,
            req.files.filename

        ],
       [
       
        req.body.name5,
        req.body.qty5,
        req.body.category5,
        req.body.party5,
        req.body.price5,
        req.body.total5,
        req.body.description5,
        req.files.filename
        
     
       ],
      [
       
        req.body.name6,
        req.body.qty6,
        req.body.category6,
        req.body.party6,
        req.body.price6,
        req.body.total6,
        req.body.description6,
        req.files.filename
       
      ],
       [
      
        req.body.name7,
        req.body.qty7,
        req.body.category7,
        req.body.party7,
        req.body.price7,
        req.body.total7,
        req.body.description7,
        req.files.filename
       
     
     
       ],
        
       [
        req.body.name8,
        req.body.qty8,
        req.body.category8,
        req.body.party8,
        req.body.price8,
        req.body.total8,
        req.body.description8,
        req.files.filename
       ],
       [
       
        req.body.name9,
        req.body.qty9,
        req.body.category9,
        req.body.party9,
        req.body.price9,
        req.body.total9,
        req.body.description9,
        req.files.filename
       
       ],
       [
       
        req.body.name10,
        req.body.qty10,
        req.body.category10,
        req.body.party10,
        req.body.price10,
        req.body.total10,
        req.body.description10,
        req.files.filename
       ]
       
      
    ]
   
    db.query(sql,[values],(err,result)=>{
if (err) {
    return res.json({Status:false, Error:"Network Error" + err})
} else {
  return res.json({Status:true ,Result:result})  
}
    })
       
}) 






// start backend

// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Connect to MySQL
connection.connect();

// Parse application/json
app.use(bodyParser.json());

// Route to handle insertion of multiple rows
app.post('/insertData', (req, res) => {
  const data = req.body.data; // Assuming data is an array of objects

  // SQL query to insert multiple rows
  const sql = 'INSERT INTO your_table (column1, column2) VALUES ?';

  const values = data.map(item => [item.column1, item.column2]); // Adjust columns accordingly

  // Execute the query
  connection.query(sql, [values], (error, results, fields) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Error inserting data');
      return;
    }

    console.log('Data inserted successfully');
    res.status(200).send('Data inserted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
//end backend







//start frontend

// Component.jsx

import React, { useState } from 'react';
import axios from 'axios';

function Component() {
  const [data, setData] = useState([]);

  const handleAddRow = () => {
    setData(prevData => [...prevData, { column1: '', column2: '' }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...data];
    newData[index][name] = value;
    setData(newData);
  };

  const handleSubmit = () => {
    axios.post('/insertData', { data })
      .then(response => {
        console.log(response.data);
        // Handle success
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
  };

  return (
    <div>
      {data.map((row, index) => (
        <div key={index}>
          <input type="text" name="column1" value={row.column1} onChange={e => handleInputChange(index, e)} />
          <input type="text" name="column2" value={row.column2} onChange={e => handleInputChange(index, e)} />
        </div>
      ))}
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Component;

//end backend