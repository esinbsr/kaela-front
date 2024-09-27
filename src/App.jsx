import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import AdminProduct from "./pages/admin/products/AdminProduct";
import AdminAddProduct from "./pages/admin/products/AdminAddProduct";
import AdminUpdateProduct from "./pages/admin/products/AdminUpdateProduct";
import AdminInformation from "./pages/admin/informations/AdminInformation";
import AdminAddInformation from "./pages/admin/informations/AdminAddInformation";
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
import AdminUpdateSocialNetwork from "./pages/admin/socialNetworks/AdminUpdateSocialNetwork";
import ProductDetail from "./pages/ProductDetail";
import Accessibility from "./components/utils/Accessibility";
import AdminUpdateInformation from "./pages/admin/informations/AdminUpdateInformation";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Logout from "./components/Logout";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Accessibility />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/eveningDresses" element={<EveningDresses />} />
          <Route path="/latestCollection" element={<LatestCollection />} />
          <Route path="/aboutMe" element={<AboutMe />} />
          <Route path="/legalNotice" element={<LegalNotice />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/productDetail/:productDetailId" element={<ProductDetail />}/>

          {/* Routes Admin protégées */}
          <Route
            path="/admin"
            element={
              <ProtectedRoutes>
                <AdminNavigation />
               </ProtectedRoutes>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoutes>
                <AdminProduct />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addProduct"
            element={
              <ProtectedRoutes>
                <AdminAddProduct />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/updateProduct/:productId"
            element={
              <ProtectedRoutes>
                <AdminUpdateProduct />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/adminInformation"
            element={
              <ProtectedRoutes>
                <AdminInformation />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/adminAddInformation"
            element={
              <ProtectedRoutes>
                <AdminAddInformation />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/adminUpdateInformation/:informationId"
            element={
              <ProtectedRoutes>
                <AdminUpdateInformation />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/adminCategory"
            element={
              <ProtectedRoutes>
                <AdminCategory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/adminAddCategory"
            element={
              <ProtectedRoutes>
                <AdminAddCategory />
               </ProtectedRoutes>
            }
          />
          <Route
            path="/adminUpdateCategory/:categoryId"
            element={
              <ProtectedRoutes>
                <AdminUpdateCategory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/adminSocialNetwork"
            element={
              <ProtectedRoutes>
                <AdminSocialNetwork />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/adminAddSocialNetwork"
            element={
              <ProtectedRoutes>
                <AdminAddSocialNetwork />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/adminUpdateSocialNetwork/:socialNetworkId"
            element={
              <ProtectedRoutes>
                <AdminUpdateSocialNetwork />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;