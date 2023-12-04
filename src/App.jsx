import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '@components/molcules/NavBar/NavBar'
import User from '@page/user/index';
import Customer from '@page/customer';
import Product from '@page/products';
import Quote from '@page/quotes';
import Login from '@page/auth/Login';
import { fetchValidateToken } from '@lib/slice/authSlice';
import { Graphic } from '@components/molcules/Graphic/Graphic';
import Profile from '@page/profile';


function App() {
  
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchValidateToken())
    }
    fetchData();
  }, [])

  return ( 
     <Router>
     {user &&
      <NavBar />
     }
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/perfil' element={<Profile />}></Route>
          <Route path='/grafica' element={<Graphic/>}></Route>
          <Route path='/usuarios' element={<User />}></Route>
          <Route path='/clientes' element={<Customer />}></Route>
          <Route path='/productos' element={<Product />}></Route>
          <Route path='/cotizaciones' element={<Quote />}></Route>
        </Routes>
      </Router>  
  )
}

export default App
