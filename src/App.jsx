import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignupLogin from "./pages/SignupLogin";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminAddProduct from "./pages/AdminAddProduct";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signupLogin" element={<SignupLogin/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/adminAddProduct" element={<AdminAddProduct/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
};

export default App;