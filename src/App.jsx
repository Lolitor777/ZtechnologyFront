import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/molcules/NavBar/NavBar'
import User from './page/user/index';
import Customer from './page/customer';
import Product from './page/products';
import Quote from './page/quotes';
import Login from './page/auth/Login';

function App() {
  
  const user = useSelector(state => state.auth.user)
  console.log(user);

  return ( 
     <Router>
     {user &&
      <NavBar />
     }
        <Routes>
          <Route path='/usuarios' element={<User />}></Route>
          <Route path='/clientes' element={<Customer />}></Route>
          <Route path='/productos' element={<Product />}></Route>
          <Route path='/cotizaciones' element={<Quote />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Router>  
  )
}

export default App
