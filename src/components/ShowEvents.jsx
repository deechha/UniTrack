import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5226/api/Events");
      const eventList = response.data?.data;

      if (Array.isArray(eventList)) {
        setEvents(eventList);
      } else {
        console.warn("Unexpected response format:", response.data);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to load events.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid event ID.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await axios.delete(`http://localhost:5226/api/Events/${id}`);
      console.log("Delete response:", response.data);

      if (response.data?.success) {
        setEvents(events.filter((e) => e.id !== id));
        alert("Event deleted successfully.");
      } else {
        alert(response.data?.message || "Delete failed.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete event.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>All Events</h1>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} style={styles.card}>
            <div style={styles.statusContainer}>
              <div style={getStatusStyle(event.eventStatus)}>{event.eventStatus}</div>
            </div>
            <h2 style={styles.title}>{event.title}</h2>
            <p style={styles.description}>{event.description || "No description"}</p>
            <p style={styles.text}>
              <strong>Start:</strong> {formatDate(event.startDate)}
            </p>
            <p style={styles.text}>
              <strong>End:</strong> {formatDate(event.endDate)}
            </p>
            <p style={styles.text}>
              <strong>Location:</strong> {event.location || "N/A"}
            </p>
            <p style={styles.text}>
              <strong>Faculty:</strong> {event.faculty || "N/A"}
            </p>
            <p style={styles.text}>
              <strong>Scope:</strong> {event.eventScope || "N/A"}
            </p>
            <p style={styles.text}>
              <strong>Type:</strong> {event.eventType || "N/A"}
            </p>
            <p style={styles.smallText}>
              Created At: {event.createdAt ? formatDate(event.createdAt) : "N/A"}
            </p>
            <button style={styles.deleteButton} onClick={() => handleDelete(event.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleString();
}

function getStatusStyle(status) {
  const base = {
    padding: "6px 12px",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    display: "inline-block",
  };

  switch (status?.toLowerCase()) {
    case "ongoing":
    case "active":
      return { ...base, backgroundColor: "#4caf50" };
    case "completed":
      return { ...base, backgroundColor: "#2196f3" };
    case "planned":
      return { ...base, backgroundColor: "#c94394" };
    case "upcoming":
      return { ...base, backgroundColor: "#ff9800" };
    case "cancelled":
      return { ...base, backgroundColor: "#f44336" };
    default:
      return { ...base, backgroundColor: "#9e9e9e" };
  }
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "80px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "black",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "15px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    // position: "relative",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#2563eb",
  },
  description: {
    fontSize: "16px",
    fontStyle: "italic",
    marginBottom: "10px",
    color: "#333",
  },
  text: {
    marginBottom: "6px",
    fontSize: "16px",
    color: "#444",
  },
  smallText: {
    fontSize: "12px",
    color: "#888",
    marginTop: "10px",
  },
  statusContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "6px",
  },
  deleteButton: {
    // position: "absolute",
      bottom: "20px",
    right: "20px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "900px",
  },
};
