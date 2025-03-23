import React, { useState } from "react";

const EmployeeAsign = () => {
  const [formData, setFormData] = useState({ empId: "", assetId: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const apiUrl = `http://localhost:8080/employee/update/${formData.empId}/asign/${formData.assetId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        withCredentials: true ,
      });

      if (!response.ok) {
        throw new Error("Failed to update employee asset record.");
      }

      const data = await response.json();
      alert("Employee Asset Record Updated Successfully!");
      console.log("Response:", data);
      setFormData({ empId: "", assetId: "" });
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Employee Asset Form</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        {/* Employee ID Field */}
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

        {/* Asset ID Field */}
        <div className="mb-3">
          <label className="form-label">Asset ID</label>
          <input
            type="text"
            className="form-control"
            name="assetId"
            value={formData.assetId}
            onChange={handleChange}
            placeholder="Enter Asset ID"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeAsign;
