import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AssetTable = () => {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/asset/assets", {
          withCredentials: true,
        });
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
        alert("Failed to load assets.");
      }
    };
    fetchAssets();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/asset/delete/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200 || response.status === 204) {
        alert("Asset deleted successfully!");
        setAssets(assets.filter(asset => asset.id !== id)); // Remove asset from table
      } else {
        alert("Failed to delete asset.");
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
      alert("Failed to delete asset.");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <h3 className="text-center mb-4">Asset List</h3>
        <Button variant="success" className="mb-3" onClick={() => navigate("/add-asset")}>
          + New Asset
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Count</th>
              <th>Date</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.count}</td>
                <td>{asset.date}</td>
                <td>{asset.status}</td>
                <td>{asset.price}</td>
                <td>
                  <Button variant="warning" onClick={() => navigate(`/edit-asset/${asset.id}`)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(asset.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default AssetTable;
