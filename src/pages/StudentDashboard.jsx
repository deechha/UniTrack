

const StudentDashboard = () => {
  const semester = localStorage.getItem("semester");

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Semester: {semester}</p>

    </div>
  );
};

export default StudentDashboard;

