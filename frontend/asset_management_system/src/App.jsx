import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Signup from './pages/signup';
import AssetForm from './pages/assetform';
import Home from './pages/home';
import EmployeeAsign from './pages/asign';
import AssetTable from './pages/assetTable';

import EmployeeList from './pages/employeeList'; 
import EmployeeForm from './pages/employee';
import MaintenanceForm from './pages/maintanceForm';
import MaintenanceList from './pages/maintanceList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard/Home */}
        <Route path="/home" element={<Home />} />

        {/* Assets Management */}
        <Route path="/assets" element={<AssetTable />} />
        <Route path="/add-asset" element={<AssetForm />} />
        <Route path="/edit-asset/:id" element={<AssetForm />} />
        <Route path="//maintenance" element={<MaintenanceList />} />
        <Route path="/maintenance-form" element={<MaintenanceForm />} />
        <Route path="/maintenance-edit/:id" element={<MaintenanceForm />} />

        {/* Employee Management */}
        <Route path="/employee-list" element={<EmployeeList />} /> 
        <Route path="/employee-edit/:id" element={<EmployeeForm />} />
        <Route path="/employee-add" element={<EmployeeForm />} /> 
        <Route path="/assign-asset" element={<EmployeeAsign />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
