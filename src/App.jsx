import { useEffect,createContext,useState} from 'react';
import './App.css'
import{ Admin }from './component/Admin/Admin'
import {Login} from './component/Login/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Home} from './component/Home/Home';
import {Profile} from './component/Profile/Profile';
import{ Category} from './component/Category/Category';
import{ Party } from './component/PartyName/Party';
import { Addcategory } from './component/Category/Addcategory';
import { Addparty } from './component/PartyName/Addparty';
//import { Addemployee } from './component/Employee/Addemployee';
import { Editemployee } from './component/Employee/Editemployee';
import { Editcategory } from './component/Category/Editcategory';
import { Editparty } from './component/PartyName/Editparty';
import { StartLogin } from './component/StartLogin/StartLogin';
import { UserLogin } from './component/UserLogin/UserLogin';
import EmployeeDetails from './EmployeeDetails/EmployeeDetails';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import { Register } from './component/Register/Register';
import { GivenProduct } from './component/Employee/GivenProduct';
import { GiveThisProduct } from './component/Employee/GiveThisProduct';
import{ AllProductRecord} from './component/Employee/AllProductRecord';
import { ReceivedProduct } from './component/Employee/RecievedProduct';
import { EditReceivedProduct } from './component/Employee/EditReceivedProduct';
import Aos from "aos";
import "aos/dist/aos.css"
import { OutOfStock } from './component/Employee/OutOfStock';
import Order from './Order/Order';
import GetOrder from './Order/GetOrder';
import DirectPurchase from './Order/DirectPurchase';
import MaintananceAndRepair from './component/MaintananceAndRepair/MaintananceAndRepair';
import GetRepairDataReport from './component/MaintananceAndRepair/GetRepairDataReport';
import { EditOrder } from './Order/EditOrder';
import { AvlProduct } from './component/Employee/AvlProduct';
import CompleteOrder from './Order/CompleteOrder';
import CompleteRepairOrder from './component/MaintananceAndRepair/CompleteRepairOrder';
import ReceivedRepairOrder from './component/MaintananceAndRepair/ReceivedRepairOrder';

//do it out side of component
const UserContext = createContext();


function App() {


  const [userAdminId, setUserAdminId] = useState();
  


  useEffect(()=>{
    Aos.init()
    },[])
  
  return (
      <BrowserRouter>
    <div className="app">
      <UserContext.Provider value={{userAdminId,setUserAdminId}}>
      
  
    <Routes>
          <Route path='/loginpage' element={<StartLogin />} />
         
          <Route path="/" element={
           <Login />}></Route>
          <Route path='/user' element={<UserLogin />} />
          <Route path='/registration' element={<Register/>} />
          {/*here we are protecting our component */}
          <Route path="/employee_details/:id" element={<PrivateRoute><EmployeeDetails /></PrivateRoute>} /> 
          {/*here we are protecting our component */}
          
          {/*all qoulet starts */ }
          <Route path="/auth/admin/dashboard" element={ <PrivateRoute><Admin /></PrivateRoute>}>
            <Route path="/auth/admin/dashboard" element={<Home />} /> 
            <Route path="/auth/admin/dashboard/avl_product" element={<AvlProduct/>} />
            <Route path="/auth/admin/dashboard/givenproduct" element={<GivenProduct/>} />
            <Route path="/auth/admin/dashboard/category" element={<Category />}></Route>
            <Route path="/auth/admin/dashboard/profile" element={<Profile />} />
              <Route path="/auth/admin/dashboard/addcategory" element={<Addcategory/>} />  
            {/* <Route path="/auth/admin/dashboard/addemployee/:id" element={<Addemployee/>} /> */}
            <Route path="/auth/admin/dashboard/editemployee/:id" element={<Editemployee />} />
            <Route path="/auth/admin/dashboard/editreceivedproduct/:id" element={<EditReceivedProduct/>} />
              <Route path="/auth/admin/dashboard/givethisproduct/:id" element={<GiveThisProduct/>} /> 
            <Route path="/auth/admin/dashboard/editcategory/:id" element={<Editcategory />} /> 
           <Route path="/auth/admin/dashboard/allproductrecord" element={<AllProductRecord />} /> 
            <Route path="/auth/admin/dashboard/receivedproduct" element={<ReceivedProduct/>} /> 
            <Route path="/auth/admin/dashboard/outofstockproduct" element={<OutOfStock/>} />
            <Route path="/auth/admin/dashboard/party" element={<Party/>} />  
            <Route path="/auth/admin/dashboard/editparty/:id" element={<Editparty/>} /> 
            <Route path="/auth/admin/dashboard/addparty" element={<Addparty/>} /> 
            <Route path="/auth/admin/dashboard/addorder" element={<Order />} /> 
              <Route path="/auth/admin/dashboard/getorder" element={<GetOrder/>} /> 
              <Route path="/auth/admin/dashboard/direct_purchase" element={<DirectPurchase/>} /> 
              <Route path="/auth/admin/dashboard/repair" element={<MaintananceAndRepair/>} />
            <Route path="/auth/admin/dashboard/repair_process" element={<GetRepairDataReport />} /> 
            <Route path="/auth/admin/dashboard/repair_process_complete" element={<CompleteRepairOrder/>} /> 
            <Route path="/auth/admin/dashboard/received_repair_order" element={<ReceivedRepairOrder/>} /> 
            <Route path="/auth/admin/dashboard/edit_order/:id" element={<EditOrder />} /> 
            <Route path="/auth/admin/dashboard/completed_order" element={<CompleteOrder/>} /> 
          </Route>
             {/*all outlet ends */ }
          
    </Routes>
    
  
    </UserContext.Provider>

    </div>
 </BrowserRouter>
  )
}     

export default App;
export{UserContext};