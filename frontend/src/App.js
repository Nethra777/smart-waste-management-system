import { useState } from "react";
import axios from "axios";
import {
  FaTrash,
  FaExclamationTriangle,
  FaCheckCircle,
  FaRecycle
} from "react-icons/fa";

function Dashboard() {

  const [message, setMessage] = useState("");

  const [bins, setBins] = useState([
    {
      binId: "BIN101",
      fillLevel: 80,
      gas: 12,
      location: "Block A"
    },
    {
      binId: "BIN102",
      fillLevel: 45,
      gas: 8,
      location: "Block B"
    }
  ]);

  const sendData = async () => {

    try {

      const randomFill = Math.floor(Math.random() * 100);

      const newData = {
        binId: `BIN${bins.length + 101}`,
        fillLevel: randomFill,
        location: "LPU Campus",
        gas: Math.floor(Math.random() * 20),
      };

      const response = await axios.post(
        "http://localhost:8081/api/bin-data",
        newData
      );

      setMessage(response.data);

      setBins((prevBins) => [...prevBins, newData]);

    } catch (error) {

      console.error("Error:", error);

    }
  };

  const getProgressColor = (level) => {

    if (level <= 50) return "#16a34a";
    if (level <= 80) return "#f59e0b";
    return "#dc2626";
  };

  const getStatus = (level) => {

    if (level <= 50) return "Normal";
    if (level <= 80) return "Warning";
    return "Critical";
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #e0f2fe, #f8fafc)",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      {/* Navbar */}
      <div
        style={{
          background: "#065f46",
          color: "white",
          padding: "18px",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
        }}
      >

        <h1>
          <FaRecycle /> Smart Waste Dashboard
        </h1>

        <button
          onClick={sendData}
          style={{
            padding: "12px 18px",
            background: "white",
            color: "#065f46",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Send Bin Data
        </button>

      </div>

      {/* Success Message */}
      <h3
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "25px"
        }}
      >
        {message}
      </h3>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px",
          justifyContent: "center"
        }}
      >

        <div style={statCardStyle}>
          <FaTrash size={30} color="#065f46" />
          <h2>{bins.length}</h2>
          <p>Total Bins</p>
        </div>

        <div style={statCardStyle}>
          <FaCheckCircle size={30} color="green" />
          <h2>
            {
              bins.filter((bin) => bin.fillLevel <= 50).length
            }
          </h2>
          <p>Normal Bins</p>
        </div>

        <div style={statCardStyle}>
          <FaExclamationTriangle size={30} color="red" />
          <h2>
            {
              bins.filter((bin) => bin.fillLevel > 80).length
            }
          </h2>
          <p>Critical Bins</p>
        </div>

      </div>

      {/* Bin Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px"
        }}
      >

        {bins.map((bin, index) => (

          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
              transition: "0.3s"
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px"
              }}
            >

              <h2 style={{ color: "#111827" }}>
                {bin.binId}
              </h2>

              <span
                style={{
                  background: getProgressColor(bin.fillLevel),
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px"
                }}
              >
                {getStatus(bin.fillLevel)}
              </span>

            </div>

            <p>
              <b>Location:</b> {bin.location}
            </p>

            <p>
              <b>Gas Level:</b> {bin.gas}
            </p>

            <p>
              <b>Fill Level:</b> {bin.fillLevel}%
            </p>

            {/* Progress Bar */}
            <div
              style={{
                width: "100%",
                height: "18px",
                background: "#e5e7eb",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "10px",
                marginBottom: "15px"
              }}
            >

              <div
                style={{
                  width: `${bin.fillLevel}%`,
                  height: "100%",
                  background:
                    getProgressColor(bin.fillLevel),
                  transition: "0.5s"
                }}
              ></div>

            </div>

            {/* Alert */}
            {bin.fillLevel > 80 && (

              <div
                style={{
                  background: "#fee2e2",
                  color: "#b91c1c",
                  padding: "10px",
                  borderRadius: "10px",
                  fontWeight: "bold"
                }}
              >
                ⚠ Bin Full Alert
              </div>

            )}

            {/* Prediction */}
            <p
              style={{
                marginTop: "15px",
                color: "#374151"
              }}
            >
              <b>Prediction:</b>{" "}
              {bin.fillLevel > 80
                ? "May overflow within 1 day"
                : bin.fillLevel > 50
                ? "May become full in 2 days"
                : "Bin is safe"}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

const statCardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "15px",
  width: "220px",
  textAlign: "center",
  boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
};

export default Dashboard;