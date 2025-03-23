import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MaintenanceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    empId: "",
    dateOfService: new Date().toISOString().split("T")[0],
    issue: "",
    status: "Pending",
  });

  useEffect(() => {
    if (isEditing) {
      fetchMaintenanceRecord();
    }
  }, [id]);

  const fetchMaintenanceRecord = async () => {
    try {
      const response = await axios.get("http://localhost:8080/maintance/get" ,{ withCredentials: true });
      const record = response.data.find((r) => r.id.toString() === id);
      if (record) setFormData(record);
    } catch (error) {
      console.error("Error fetching maintenance record:", error);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/maintance/update/${id}`, formData,{ withCredentials: true });
        alert("Maintenance record updated successfully!");
      } else {
        await axios.post(`http://localhost:8080/maintance/insert/${formData.empId}`, formData ,{ withCredentials: true });
        alert("Maintenance record added successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving maintenance record:", error);
      alert("Failed to save maintenance record.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{isEditing ? "Edit Maintenance Record" : "New Maintenance Record"}</h2>
      
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        <div className="mb-3">
          <label className="form-label">Employee ID</label>
          <input type="text" className="form-control" name="empId" value={formData.empId} onChange={handleChange} required />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Date of Service</label>
          <input type="date" className="form-control" name="dateOfService" value={formData.dateOfService} onChange={handleChange} required />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Issue Description</label>
          <textarea className="form-control" name="issue" rows="3" value={formData.issue} onChange={handleChange} required></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select className="form-select" name="status" value={formData.status} onChange={handleChange} required>
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">{isEditing ? "Update" : "Submit"}</button>
        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
};

export default MaintenanceForm;
