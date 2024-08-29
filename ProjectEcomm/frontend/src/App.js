import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from "./components/Register";
import "react-toastify/dist/ReactToastify.css"
import Login from "./components/Login";
import DashBoard from './components/DashBoard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;