import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Header from './Component/Header'
import Footer from './Component/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'
import UserListScreen from './Screens/UserListScreen'
import UserEditScreen from './Screens/UserEditScreen'
import ProductListScreen from './Screens/ProductListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import OrderListScreen from './Screens/OrderListScreen'

const App = () => {
  return (
    <Router>
      <Header/>
        <main>
          <Container>
             <Route path='/' component={HomeScreen} exact/>
             <Route path='/product/:id' component={ProductScreen} exact/>
             <Route path='/cart/:id?' component={CartScreen} exact/>
             <Route path='/login' component={LoginScreen} exact/>
             <Route path='/register' component={RegisterScreen} exact/>
             <Route path='/profile' component={ProfileScreen} exact/>
             <Route path='/shipping' component={ShippingScreen} exact/>
             <Route path='/payment' component={PaymentScreen} exact/>
             <Route path='/placeorder' component={PlaceOrderScreen} exact/>
             <Route path='/order/:id' component={OrderScreen} exact/>
             <Route path='/admin/userlist' component={UserListScreen} exact/>
             <Route path='/admin/user/:id/edit' component={UserEditScreen} exact/>
             <Route path='/admin/productlist' component={ProductListScreen} exact/>
             <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact/>
             <Route path='/admin/product/:id/edit' component={ProductEditScreen} exact/>
             <Route path='/admin/orderlist' component={OrderListScreen} exact/>
             <Route path='/search/:keyword' component={HomeScreen} exact/>
             <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact/>
             <Route path='/page/:pageNumber' component={HomeScreen} exact/>

          </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
