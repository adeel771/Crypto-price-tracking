import React from 'react'
import Navebar from './components/Navbar/Navebar'
import { Routes,Route } from 'react-router-dom'
import Home from'./pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div className='app'>
      <Navebar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:coinid' element={<Coin/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
