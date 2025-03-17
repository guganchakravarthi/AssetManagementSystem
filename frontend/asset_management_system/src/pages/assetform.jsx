import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const AssetForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL (for editing)

  // Initial form data
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    count: "",
    date: "",
    status: "",
    price: "",
  });

  // Fetch asset data if editing (using new API)
  useEffect(() => {
    if (id) {
      const fetchAsset = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/asset/assetsbyid/${id}`, {
            withCredentials: true,
          });
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching asset:", error);
        }
      };
      fetchAsset();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(formData.date).toISOString().split("T")[0];
      const finalData = { ...formData, date: formattedDate };

      if (id) {
        await axios.put(`http://localhost:8080/asset/update/${id}`, finalData, {
          withCredentials: true,
        });
        alert("Asset updated successfully!");
      } else {
        await axios.post("http://localhost:8080/asset/insert", finalData, {
          withCredentials: true,
        });
        alert("Asset added successfully!");
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving asset:", error);
      alert("Failed to save asset.");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <h3 className="text-center mb-4">{id ? "Edit Asset" : "Add Asset"}</h3>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Asset Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Count</Form.Label>
                <Form.Control type="number" name="count" value={formData.count} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Price ($)</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100">
            {id ? "Update" : "Submit"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AssetForm;
