import React, { useState } from "react";
import axios from "axios";

const Maintenance = () => {
  const [formData, setFormData] = useState({
    empId: "",
    dateOfService: "",
    issue: "",
    status: "Pending",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { empId, ...requestBody } = formData; // Extract empId separately

      const response = await axios.post(`http://localhost:8080/api/maintenance/${empId}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response.data);
      alert("Maintenance Record Submitted Successfully!");

      // Reset the form after submission
      setFormData({
        empId: "",
        dateOfService: "2025-03-14", // Default value as requested
        issue: "string", // Placeholder default
        status: "string", // Placeholder default
      });
    } catch (error) {
      console.error("Error submitting maintenance record:", error);
      alert("Failed to submit maintenance record.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Maintenance Form</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        {/* Employee ID */}
        <div className="mb-3">
          <label className="form-label">Employee ID</label>
          <input
            type="text"
            className="form-control"
            name="empId"
            value={formData.empId}
            onChange={handleChange}
            placeholder="Enter Employee ID"
            required
          />
        </div>

        {/* Date of Service */}
        <div className="mb-3">
          <label className="form-label">Date of Service</label>
          <input
            type="date"
            className="form-control"
            name="dateOfService"
            value={formData.dateOfService}
            onChange={handleChange}
            required
          />
        </div>

        {/* Issue Description */}
        <div className="mb-3">
          <label className="form-label">Issue Description</label>
          <textarea
            className="form-control"
            name="issue"
            rows="3"
            value={formData.issue}
            onChange={handleChange}
            placeholder="Describe the issue..."
            required
          ></textarea>
        </div>

        {/* Status Dropdown */}
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Maintenance;
