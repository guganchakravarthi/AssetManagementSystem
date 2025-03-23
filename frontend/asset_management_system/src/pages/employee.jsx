import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    dateOfJoin: "",
    salary: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
  }, [id]);

  const fetchEmployee = async (empId) => {
    setFetching(true);
    try {
      const response = await axios.get(`http://localhost:8080/employee/${empId}`, { withCredentials: true });
      if (response.data) {
        setFormData(response.data);
      } else {
        alert("No employee data found.");
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
      alert("Failed to load employee details.");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await axios.put(`http://localhost:8080/employee/update/${id}`, formData, { withCredentials: true });
        alert("Employee updated successfully!");
      } else {
        await axios.post("http://localhost:8080/employee/insert", formData, { withCredentials: true });
        alert("Employee added successfully!");
      }
      // navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to save employee.";
      console.error("Error saving employee:", errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => navigate("/employee-list");

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <h3 className="text-center mb-4">{id ? "Edit Employee" : "Add Employee"}</h3>

        {fetching ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading employee details...</p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Domain</Form.Label>
                  <Form.Control
                    type="text"
                    name="domain"
                    value={formData.domain || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Date of Join</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfJoin"
                    value={formData.dateOfJoin || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    value={formData.salary || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : id ? "Update" : "Submit"}
            </Button>
          </Form>
        )}

        <Button variant="secondary" className="mt-3 w-100" onClick={goBack}>
          Back to Employee List
        </Button>
      </Card>
    </Container>
  );
};

export default EmployeeForm;
