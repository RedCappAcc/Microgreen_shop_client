import './App.css';
import Header from './Containers/Header/Header';
import Main from './Containers/Main/Main';
import Footer from './Containers/Footer/Footer'
import {Routes, Route} from 'react-router-dom'
import About from './Containers/About/About'
import Contacts from './Containers/Contacts/Contacts';
import Shop from './Containers/Shop/Shop';
import Admin from './Containers/Admin/Admin';
import ProductCard from './Containers/ProductCard/ProductCard';
import Auth from './Containers/Auth/Auth';
import Registration from './Containers/Registration/Registration';
import { useEffect } from 'react';
import { autoLogin } from './store/actions/shop';
import {useDispatch} from 'react-redux'
import Logout from './Containers/Logout/Logout';
import Profile from './Containers/Profile/Profile'
import Basket from './Containers/Basket/Basket';
import { transitions, positions, Provider as AlertProvider, types } from 'react-alert'
import BuyNow from './Containers/BuyNow/BuyNow';
import BuyBasket from './Containers/BuyBusket/BuyBusket';
import OrderHistory from './Containers/OrderHistory/OrderHistory';
import EditProfile from './Containers/EditProfile/EditProfile';
import EditEmail from './Containers/EditEmail/EditEmail';
import EditPassword from './Containers/EditPassword/EditPassword';

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(autoLogin())
  },[])

  const options = {
    position: positions.BOTTOM_RIGHT,
    type: types.SUCCESS,
    timeout: 5000,
    offset: '100px',
    transition: transitions.SCALE,
    containerStyle: {}
  }

  const AlertTemplate = ({message}) => (
    <div style={{color:'black',
                  marginRight:'20px', 
                  marginBottom:'20px',
                  fontSize:'16px', 
                  minWidth:'200px', 
                  height:'50px',
                  backgroundColor:'#51AE76',
                  borderRadius:'10px',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'}}>
      <div style={{ padding:'5px' }}>{message}</div>
    </div>
  )

  return (
    <div className="App">
       <AlertProvider template={AlertTemplate} {...options}>
        <Header/>
          <Routes>
            <Route  path='/' element = { <Main/>}/>
            <Route  path='/about' element = { <About/>}/>
            <Route  path='/contacts' element = { <Contacts/>}/>
            <Route  path='/shop' element = { <Shop/>}/>
            <Route  path='/shop/:id' element = { <ProductCard/>}/>
            <Route  path='/admin' element = { <Admin/>}/>
            <Route  path='/auth' element = { <Auth/>}/>
            <Route  path='/registration' element = { <Registration/>}/>
            <Route  path='/logout' element = { <Logout/>}/>
            <Route  path='/profile' element = { <Profile/>}/>
            <Route  path='/basket' element = { <Basket/>}/>
            <Route  path='/buynow/:id' element = { <BuyNow/>}/>
            <Route  path='/basket/buy' element = { <BuyBasket/>}/>
            <Route  path='/orderhistory' element = { <OrderHistory/>}/>
            <Route  path='/profile/edit' element = { <EditProfile/>}/>
            <Route  path='/profile/edit_email' element = { <EditEmail/>}/>
            <Route  path='/profile/edit_password' element = { <EditPassword/>}/>
          </Routes>
        <Footer/>
      </AlertProvider>
    </div>
  );
}

export default App;
