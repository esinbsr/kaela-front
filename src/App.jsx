import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";

import EveningDresses from "./pages/EveningDresses";
import LatestCollection from "./pages/LatestCollection";
import Collection from "./pages/Collection";
import Navigation from "./components/Navigation";
import AboutMe from "./pages/AboutMe";

import ProductDetail from "./pages/ProductDetail";
import Accessibility from "./components/utils/Accessibility";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoutes from "./components/ProtectedRoutes";


import Admin from "./pages/admin/Admin";

import ProductManager from "./pages/admin/productsManagement/ProductManager";
import UpdateProduct from "./pages/admin/productsManagement/UpdateProduct";

import CategoryManager from "./pages/admin/categoriesManagement/CategoryManager";
import UpdateCategory from "./pages/admin/categoriesManagement/UpdateCategory";

import InformationManager from "./pages/admin/informationsManagement/InformationManager";
import UpdateInformation from "./pages/admin/informationsManagement/UpdateInformation";

import SocialNetworkManager from "./pages/admin/socialNetworksManagement/SocialNetworkManager";
import UpdateSocialNetwork from "./pages/admin/socialNetworksManagement/UpdateSocialNetwork";


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
                <Admin />
               </ProtectedRoutes>
            }
          />
          <Route
            path="/productManager"
            element={
              <ProtectedRoutes>
                <ProductManager />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/updateProduct/:productId"
            element={
              <ProtectedRoutes>
                <UpdateProduct/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/informationManager"
            element={
              <ProtectedRoutes>
                <InformationManager />
              </ProtectedRoutes>
            }
          />
      
          <Route
            path="/updateInformation/:informationId"
            element={
              <ProtectedRoutes>
                <UpdateInformation />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/categoryManager"
            element={
              <ProtectedRoutes>
                <CategoryManager />
              </ProtectedRoutes>
            }
          />
    
          <Route
            path="/updateCategory/:categoryId"
            element={
              <ProtectedRoutes>
                <UpdateCategory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/socialNetworkManager"
            element={
              <ProtectedRoutes>
                <SocialNetworkManager />
              </ProtectedRoutes>
            }
          />
     
          <Route
            path="/updateSocialNetwork/:socialNetworkId"
            element={
              <ProtectedRoutes>
                <UpdateSocialNetwork />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
};

export default App;