
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/admin/Dashboard";
import Reports from "./pages/admin/Reports";
import CreateEvent from "./components/CreateEvent";
import Budget from "./pages/admin/Budget";
import Calender from "./pages/admin/Calender";
import Volunteer from "./pages/admin/Volunteer";
import Notification from "./pages/admin/Notification";
import CreateVolunteer from "./components/CreateVolunteer";
import CreateVTeam from "./components/CreateVTeam";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/student-dashboard" element={<StudentDashboard/>} />
        {/* <Route path="/admin-dashboard/*" element={<AdminDashboard/>} /> */}
            <Route path="/admin" element={<AdminDashboard/>}>
          <Route index element={<Dashboard/>} /> 
          <Route path="reports" element={<Reports/>} />
          <Route path="budget" element={<Budget/>}/>
          <Route  path="calendar" element={<Calender/>}/>
          <Route  path="volunteer" element={<Volunteer/>}/>
          <Route path="notifications" element={<Notification/>}/>


           <Route path="/admin/create-event" element={<CreateEvent/>} />
           <Route path="/admin/create-volunteer" element={<CreateVolunteer/>}/>
           <Route path="/admin/create-team" element={<CreateVTeam/>}/>


        </Route>
        <Route path="/coordinator-dashboard" element={<CoordinatorDashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;

