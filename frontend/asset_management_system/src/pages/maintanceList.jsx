import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MaintenanceList = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMaintenanceRecords();
  }, []);

  const fetchMaintenanceRecords = async () => {
    try {
      const response = await axios.get("http://localhost:8080/maintance/get",{ withCredentials: true });
      setMaintenanceRecords(response.data);
    } catch (error) {
      console.error("Error fetching maintenance records:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Maintenance Records</h2>

      {/* New Button */}
      <button className="btn btn-success mb-3" onClick={() => navigate("/maintenance-form")}>
        New Maintenance
      </button>

      {/* Maintenance Records Table */}
      <div className="card p-4 shadow-lg">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Employee ID</th>
              <th>Date</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceRecords.length > 0 ? (
              maintenanceRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.empId}</td>
                  <td>{record.dateOfService}</td>
                  <td>{record.issue}</td>
                  <td>{record.status}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/maintenance-edit/${record.id}`)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceList;
