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
import BuyNow from './Containers/BuyNow/BuyNow';
import BuyBasket from './Containers/BuyBusket/BuyBusket';
import OrderHistory from './Containers/OrderHistory/OrderHistory';
import EditProfile from './Containers/EditProfile/EditProfile';
import EditEmail from './Containers/EditEmail/EditEmail';
import EditPassword from './Containers/EditPassword/EditPassword';
import {useSelector} from 'react-redux'
import NotFound from './Containers/NotFound/NotFound'

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state=>state.shopReducer.Auth)

  let routes = [
    <Route key = {1} path='/' element = { <Main/>}/>,
    <Route key = {2}  path='/about' element = { <About/>}/>,
    <Route key = {3}  path='/contacts' element = { <Contacts/>}/>,
    <Route key = {4}  path='/shop' element = { <Shop/>}/>,
    <Route key = {5}  path='/shop/:id' element = { <ProductCard/>}/>,
    <Route key = {6}  path='/buynow/:id' element = { <BuyNow/>}/>,
    <Route key = {7}  path='/auth' element = { <Auth/>}/>,
    <Route key = {8}  path='/registration' element = { <Registration/>}/>,
    <Route key = {9}  path='*' element = { <NotFound/>}/>,
]

 let authRouts = [
  <Route key = {10}  path='/' element = { <Main/>}/>,
  <Route key = {11}  path='/about' element = { <About/>}/>,
  <Route key = {12}  path='/contacts' element = { <Contacts/>}/>,
  <Route key = {13}  path='/shop' element = { <Shop/>}/>,
  <Route key = {14}  path='/shop/:id' element = { <ProductCard/>}/>,
  <Route key = {15}  path='/buynow/:id' element = { <BuyNow/>}/>,
  <Route key = {16}  path='/auth' element = { <Auth/>}/>,
  <Route key = {17}  path='/registration' element = { <Registration/>}/>,
  <Route key = {18}  path='/admin' element = { <Admin/>}/>,
  <Route key = {19}  path='/logout' element = { <Logout/>}/>, 
  <Route key = {20}  path='/profile' element = { <Profile/>}/>,
  <Route key = {21}  path='/basket' element = { <Basket/>}/>,
  <Route key = {22}  path='/basket/buy' element = { <BuyBasket/>}/>,
  <Route key = {23}  path='/orderhistory' element = { <OrderHistory/>}/>,
  <Route key = {24}  path='/profile/edit' element = { <EditProfile/>}/>,
  <Route key = {25}  path='/profile/edit_email' element = { <EditEmail/>}/>,
  <Route key = {26}  path='/profile/edit_password' element = { <EditPassword/>}/>,
  <Route key = {27}  path='*' element = { <NotFound/>}/>,
 ]

  useEffect(()=>{
    dispatch(autoLogin())
  },[auth])



  return (
    <div className="App">
        <Header/>
          <Routes>
            {auth?authRouts:routes}
          </Routes>
    </div>
  );
}

export default App;
