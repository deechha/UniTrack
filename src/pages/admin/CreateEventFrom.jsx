import { useState } from "react";
import axios from "axios";

export default function CreateEventForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    location: "",
    createdAt: new Date().toISOString(),
    faculty: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7123/api/Event", formData); // Update to match your backend
      alert("Event created successfully!");
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event.");
    }
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold"
  };

  const buttonStyle = {
    backgroundColor: "#0d0d0dff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Create Event</h2>

      <label style={labelStyle}>Title</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required style={inputStyle} />

      <label style={labelStyle}>Description</label>
      <textarea name="description" value={formData.description} onChange={handleChange} style={inputStyle} rows="4" />

      <label style={labelStyle}>Start Date</label>
      <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required style={inputStyle} />

      <label style={labelStyle}>End Date</label>
      <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required style={inputStyle} />

      <label style={labelStyle}>Status</label>
      <input type="text" name="status" value={formData.status} onChange={handleChange} required style={inputStyle} />

      <label style={labelStyle}>Location</label>
      <input type="text" name="location" value={formData.location} onChange={handleChange} required style={inputStyle} />

      <label style={labelStyle}>Faculty</label>
      <input type="text" name="faculty" value={formData.faculty} onChange={handleChange} required style={inputStyle} />

      <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  );
}
