import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import AdminDeleteInformation from "./components/admin/informations/AdminDeleteInformation";
import AdminProduct from "./pages/admin/products/AdminProduct";
import AdminAddProduct from "./pages/admin/products/AdminAddProduct";
import AdminUpdateProduct from "./pages/admin/products/AdminUpdateProduct";
import AdminInformation from "./pages/admin/informations/AdminInformation";
import AdminAddInformation from "./pages/admin/informations/AdminAddInformation";
import AdminInformationModify from "./pages/admin/informations/AdminInformationModify";
import EveningDresses from "./pages/EveningDresses";
import LatestCollection from "./pages/LatestCollection";
import Collection from "./pages/Collection";
import Navigation from "./components/Navigation";
import AdminNavigation from "./pages/admin/AdminNavigation";
import AboutMe from "./pages/AboutMe";
import AdminCategory from "./pages/admin/categories/AdminCategory";
import AdminAddCategory from "./pages/admin/categories/AdminAddCategory";
import AdminUpdateCategory from "./pages/admin/categories/AdminUpdateCategory";
import AdminSocialNetwork from "./pages/admin/socialNetworks/AdminSocialNetwork";
import AdminAddSocialNetwork from "./pages/admin/socialNetworks/AdminAddSocialNetwork";
import Logout from "./components/Logout";
import AdminUpdateSocialNetwork from "./pages/admin/socialNetworks/AdminUpdateSocialNetwork";
import ProductDetail from "./pages/ProductDetail";


const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem("role");

  console.log("User role:", userRole); // Debug log
  return userRole === "admin" ? children : <Navigate to="/" />; //Si la condition est vraie, le composant retourne children, donc les composants enfants sont rendus
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="*" element={<Home/>} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/eveningDresses" element={<EveningDresses />} />
          <Route path="/latestCollection" element={<LatestCollection />} />
          <Route path="/aboutMe" element={<AboutMe />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/productDetail/:productDetailId" element={<ProductDetail/>} />

          {/* Routes Admin protégées */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminNavigation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminProduct" 
            element={
              <ProtectedRoute>
                <AdminProduct />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminAddProduct" 
            element={
              <ProtectedRoute>
                <AdminAddProduct />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminUpdateProduct/:productId" 
            element={
              <ProtectedRoute>
                <AdminUpdateProduct />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminInformation" 
            element={
              <ProtectedRoute>
                <AdminInformation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminAddInformation" 
            element={
              <ProtectedRoute>
                <AdminAddInformation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminInformationModify/:informationId" 
            element={
              <ProtectedRoute>
                <AdminInformationModify />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminDeleteInformation/:informationId" 
            element={
              <ProtectedRoute>
                <AdminDeleteInformation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminCategory" 
            element={
              <ProtectedRoute>
                <AdminCategory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminAddCategory" 
            element={
              <ProtectedRoute>
                <AdminAddCategory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminUpdateCategory/:categoryId" 
            element={
              <ProtectedRoute>
                <AdminUpdateCategory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminSocialNetwork" 
            element={
              <ProtectedRoute>
                <AdminSocialNetwork />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminAddSocialNetwork" 
            element={
              <ProtectedRoute>
                <AdminAddSocialNetwork />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminUpdateSocialNetwork/:socialNetworkId" 
            element={
              <ProtectedRoute>
                <AdminUpdateSocialNetwork />
              </ProtectedRoute>
            } 
          />


        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;