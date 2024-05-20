import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import styles from './Party.module.css';
import Swal from 'sweetalert2';

export const Party = () => {

  const [party, setParty] = useState([]);

  const {id} = useParams()

useEffect(()=>{

  axios.get("http://localhost:8000/auth/party").then(result=>{
    if (result.data.Status) {

      setParty((result.data.Result))
    }else{
      alert(result.data.Error)
    }

  }).catch(err => console.log(err))
},[])

 
  const handleDelete = (id) => {
     
    axios.delete("http://localhost:8000/auth/delete_party/"+id).then(result => {
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
            location.reload()
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

    <div className='px-5 mt-5 border bg-light'>
          <div className='d-flex justify-content-between my-3 w-100 p-2'  id={styles.party_head}>
          <h5 className='mx-2 my-2'>PARTY NAME</h5>
           <Link to="/auth/admin/dashboard/addparty" className='btn btn-info'>Add Party</Link>
          </div>
         
          <div className='mt-1 '>
            <table className='table table-striped table-bordered'>
              <thead>
                <tr id={styles.tbl_party_head_row}>
                <th>
                    Sr.No.
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
{party.map((c,id)=>{
  return(<>
<tr key={id}>

  <td className='w-25'>
  {id+1} 
  </td>
  <td >
  {c.party_name}
  </td>
  <td >
  <Link to={`/auth/admin/dashboard/editparty/`+ c.id } className='btn btn-primary btn-sm'>Edit</Link>
  <button className='btn btn-danger btn-sm mx-3' onClick={()=>handleDelete(c.id)}>Delete</button>
  </td>
</tr>
</>
)
})}
              </tbody>
            </table>
          </div>
    </div>
    
    </div>
  )
}

 
