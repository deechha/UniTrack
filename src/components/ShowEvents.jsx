import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://localhost:7123/api/Event"); // Adjust URL if needed
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Style definitions
  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "40px auto",
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
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#2563eb",
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
    statusBadge: {
      padding: "6px 12px",
      borderRadius: "8px",
      color: "#fff",
      fontWeight: "bold",
      display: "inline-block",
      marginBottom: "6px",
    },
  };

  // Helper function to get status color
  const getStatusStyle = (status) => {
    const base = { ...styles.statusBadge };
    switch (status.toLowerCase()) {
      case "ongoing":
        return { ...base, backgroundColor: "#4caf50" }; // Green
      case "completed":
        return { ...base, backgroundColor: "#2196f3" }; // Blue
      case "pending":
        return { ...base, backgroundColor: "#ffc107", color: "#000" }; // Yellow
      case "cancelled":
        return { ...base, backgroundColor: "#f44336" }; // Red
      default:
        return base;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Events</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} style={styles.card}>
            <h2 style={styles.title}>{event.title}</h2>
            <p style={styles.text}><strong>Description:</strong> {event.description}</p>
            <p style={styles.text}><strong>Start Date:</strong> {event.startDate}</p>
            <p style={styles.text}><strong>End Date:</strong> {event.endDate}</p>

            <div style={getStatusStyle(event.status)}>
              {event.status}
            </div>

            <p style={styles.text}><strong>Location:</strong> {event.location}</p>
            <p style={styles.text}><strong>Faculty:</strong> {event.faculty}</p>
            <p style={styles.text}><strong>Scope:</strong> {event.scope}</p>
            <p style={styles.text}><strong>Type of Event:</strong> {event.typeOfEvent}</p>
            <p style={styles.text}><strong>Objective:</strong> {event.objective}</p>
            <p style={styles.smallText}>Created At: {new Date(event.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}


