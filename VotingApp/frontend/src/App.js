import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import RegistrationForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserNavbar from "./components/UserNavbar";
import Userpage from "./components/UserPage";
import EditProfileModal from "./components/EditProfileModal";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element= {<RegistrationForm/>}/>
        <Route path="/login" element = {<LoginForm/>}/>
        <Route path="/usernavbar" element = {<UserNavbar/>}/>
        <Route path = "/userpage" element={<Userpage/>} />
        <Route path = "/editProfile" element = {<EditProfileModal/>}/>
        <Route path ="/dashboard" element= {<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
