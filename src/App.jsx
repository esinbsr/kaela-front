import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignupLogin from "./pages/SignupLogin";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Admin from "./pages/admin/Admin";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminModifyProduct from "./pages/admin/AdminModifyProduct";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminInformation from "./pages/admin/AdminInformation";
import AdminAddInformation from "./pages/admin/AdminAddInformation";



const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signupLogin" element={<SignupLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminProduct" element={<AdminProduct />} />
          <Route path="/adminAddProduct" element={<AdminAddProduct />} />
          <Route path="/adminModifyProduct/:productId" element={<AdminModifyProduct />} />
          <Route path="/AdminInformation" element={<AdminInformation />} />
          <Route path="/adminAddInformation" element={<AdminAddInformation />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
