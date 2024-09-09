import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import MyNavbar from "./components/Navbar";
import Dashboard from "./components/DashBoard";
import AddCategory from "./components/category/AddCategory";
import AddProduct from "./components/product/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="category" element={<AddCategory />} />
          <Route path= "products" element= {<AddProduct/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
