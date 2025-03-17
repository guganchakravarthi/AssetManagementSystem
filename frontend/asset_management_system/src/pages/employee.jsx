import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Row, Col, Button, Table } from "react-bootstrap";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    domain: "",
    dateOfJoin: "",
    salary: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/employee/all", { withCredentials: true });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Failed to load employees.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`http://localhost:8080/employee/update/${formData.id}`, formData, { withCredentials: true });
        alert("Employee updated successfully!");
      } else {
        await axios.post("http://localhost:8080/employee/insert", formData, { withCredentials: true });
        alert("Employee added successfully!");
      }
      setFormData({ id: null, name: "", domain: "", dateOfJoin: "", salary: "" });
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee.");
    }
  };

  const handleEdit = (id) => {
    const employeeToEdit = employees.find((emp) => emp.id === id);
    setFormData(employeeToEdit);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/employee/delete/${id}`);
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
        <h3 className="text-center mb-4">{formData.id ? "Edit Employee" : "Add Employee"}</h3>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Domain</Form.Label>
                <Form.Control type="text" name="domain" value={formData.domain} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Date of Join</Form.Label>
                <Form.Control type="date" name="dateOfJoin" value={formData.dateOfJoin} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Salary</Form.Label>
                <Form.Control type="number" name="salary" value={formData.salary} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="w-100">{formData.id ? "Update" : "Submit"}</Button>
        </Form>
      </Card>

      <Card className="shadow p-4 mt-5">
        <h3 className="text-center mb-4">Employee List</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Domain</th>
              <th>Date of Join</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.domain}</td>
                <td>{emp.dateOfJoin}</td>
                <td>{emp.salary}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(emp.id)} className="me-2">Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(emp.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default EmployeeManagement;
