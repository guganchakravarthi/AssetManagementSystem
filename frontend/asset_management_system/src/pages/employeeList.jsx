import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/employee/all", { withCredentials: true });

      if (Array.isArray(response.data)) {
        setEmployees(response.data);
      } else {
        console.error("Invalid API response:", response.data);
        alert("Unexpected response format.");
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Failed to load employees.");
      setEmployees([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/employee/delete/${id}`, { withCredentials: true });
      alert("Employee deleted successfully!");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <h3 className="text-center mb-4">Employee List</h3>
        <Button variant="success" className="mb-3" onClick={() => navigate("/employee-add")}>
          Add New Employee
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Domain</th>
              <th>Date of Join</th>
              <th>Salary</th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Asset Status</th>
              <th>Purchase Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name || "N/A"}</td>
                  <td>{emp.domain || "N/A"}</td>
                  <td>{emp.dateOfJoin ? new Date(emp.dateOfJoin).toLocaleDateString() : "N/A"}</td>
                  <td>{emp.salary ? `$${emp.salary}` : "N/A"}</td>
                  <td>{emp.assetModel?.name || "N/A"}</td>
                  <td>{emp.assetModel?.type || "N/A"}</td>
                  <td>{emp.assetModel?.status || "N/A"}</td>
                  <td>{emp.assetModel?.purchaseDate ? new Date(emp.assetModel.purchaseDate).toLocaleDateString() : "N/A"}</td>
                  <td>{emp.assetModel?.price ? `$${emp.assetModel.price}` : "N/A"}</td>
                  <td>
                    <Button variant="warning" onClick={() => navigate(`/employee-form/${emp.id}`)} className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(emp.id)}>Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default EmployeeList;
