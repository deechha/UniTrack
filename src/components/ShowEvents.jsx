import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5226/api/Events");
        setEvents(response.data.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5226/api/Events/${eventId}`);
      setEvents(events.filter(event => event.eventId !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "80px auto 40px auto",
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
      position: "relative",
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
    statusBadge: {
      padding: "6px 12px",
      borderRadius: "8px",
      color: "#fff",
      fontWeight: "bold",
      display: "inline-block",
    },
    deleteButton: {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      backgroundColor: "#f44336",
      color: "#fff",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    }
  };

  const getStatusStyle = (status) => {
    const base = { ...styles.statusBadge };
    switch (status?.toLowerCase()) {
      case "ongoing":
      case "active":
        return { ...base, backgroundColor: "#4caf50" };
      case "completed":
        return { ...base, backgroundColor: "#2196f3" };
      case "planned":
        return { ...base, backgroundColor: "#c94394ff" };
      case "upcoming":
        return { ...base, backgroundColor: "#ecf235ff" };
      case "cancelled":
        return { ...base, backgroundColor: "#f44336" };
      default:
        return { ...base, backgroundColor: "#9e9e9e" };
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Events</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event.eventId} style={styles.card}>
            <div style={styles.statusContainer}>
              <div style={getStatusStyle(event.eventStatus)}>
                {event.eventStatus}
              </div>
            </div>
            <h2 style={styles.title}>{event.title}</h2>
            <p style={styles.description}>
              {event.description || "No description provided."}
            </p>
            <p style={styles.text}><strong>Objective:</strong> {event.objective || "N/A"}</p>
            <p style={styles.text}><strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()}</p>
            <p style={styles.text}><strong>End Date:</strong> {new Date(event.endDate).toLocaleString()}</p>
            <p style={styles.text}><strong>Location:</strong> {event.location || "N/A"}</p>
            <p style={styles.text}><strong>Faculty:</strong> {event.faculty || "N/A"}</p>
            <p style={styles.text}><strong>Scope:</strong> {event.eventScope || "N/A"}</p>
            <p style={styles.text}><strong>Type of Event:</strong> {event.eventType || "N/A"}</p>
            <p style={styles.smallText}>
              Created At: {event.createdAt ? new Date(event.createdAt).toLocaleString() : "N/A"}
            </p>
            <button
              style={styles.deleteButton}
              onClick={() => handleDelete(event.eventId)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
