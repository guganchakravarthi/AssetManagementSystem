import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [assets, setAssets] = useState([]);
  const [counts, setCounts] = useState({ asset: 0, onprocess: 0, fixed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch Asset Data and Counts
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/asset/assets", {
          withCredentials: true,
        });
        setAssets(response.data || []);
      } catch (error) {
        setError("Failed to load assets. Please try again.");
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCounts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/home/", {
          withCredentials: true,
        });
        setCounts(response.data || { asset: 0, onprocess: 0, fixed: 0 });
      } catch (error) {
        setError("Failed to load asset counts.");
        console.error("Error fetching asset counts:", error);
      }
    };

    fetchAssets();
    fetchCounts();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed. Please try again.");
    }
  };

  // Sidebar Menu Items
  const menuItems = [
    { name: "Asset", path: "/assets" },
    { name: "Maintenance", path: "/maintenance" },
    { name: "Employee", path: "/employee-list" },
    { name: "Assign Asset", path: "/assign-asset" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark" style={{ height: "50px", padding: "5px 10px" }}>
        <div className="container-fluid">
          <span className="navbar-brand text-white" style={{ fontSize: "1rem" }}>
            Asset Management
          </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">
                  Profile
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar & Main Content */}
      <div className="d-flex">
        {/* Sidebar */}
        <div className="bg-dark text-white p-3" style={{ width: "250px", height: "90vh" }}>
          <h4>Menu</h4>
          <ul className="nav flex-column">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link className="nav-link text-white" to={item.path}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="container-fluid p-4">
          <div className="container-fluid">
            {/* Stats Cards */}
            <div className="row my-4">
              <div className="col-md-4 mb-3">
                <div className="card text-white bg-primary">
                  <div className="card-body">
                    <h5 className="card-title">Total Asset Count</h5>
                    <p className="card-text display-4">{counts.asset}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card text-white bg-warning">
                  <div className="card-body">
                    <h5 className="card-title">Maintenance Count</h5>
                    <p className="card-text display-4">{counts.onprocess}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card text-white bg-success">
                  <div className="card-body">
                    <h5 className="card-title">Fixed Count</h5>
                    <p className="card-text display-4">{counts.fixed}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Table */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Asset Details</h5>

                    {loading ? (
                      <p>Loading assets...</p>
                    ) : error ? (
                      <p className="text-danger">{error}</p>
                    ) : assets.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Asset ID</th>
                              <th scope="col">Asset Name</th>
                              <th scope="col">Type</th>
                              <th scope="col">Status</th>
                              <th scope="col">Purchase Date</th>
                              <th scope="col">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {assets.map((asset) => (
                              <tr key={asset.id}>
                                <td>{asset.id}</td>
                                <td>{asset.name}</td>
                                <td>{asset.type}</td>
                                <td>{asset.status}</td>
                                <td>{asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString() : "N/A"}</td>
                                <td>${asset.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center">No Assets Found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  );
}
