
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Signup from './pages/signup'
import AssetForm from './pages/assetform'
import Home from './pages/home'
import EmployeeManagement from './pages/employee'
import EmployeeAsign from './pages/asign'
import AssetTable from './pages/assetTable'
import Maintenance from './pages/maintance'

function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route element={<Login/>} path='/'/>
          <Route element={<Signup/>} path='/signup' />
          <Route path="/home" element={<Home />} />
        <Route path="/assets" element={<AssetTable />} /> 
        <Route path="/add-asset" element={<AssetForm />} />
        <Route path="/edit-asset/:id" element={<AssetForm />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/employees" element={<EmployeeManagement />} />
        <Route path="/assign-asset" element={<EmployeeAsign />} />
          

          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
