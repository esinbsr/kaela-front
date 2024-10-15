import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";

import EveningDresses from "./pages/EveningDresses";
import LatestCollection from "./pages/LatestCollection";
import Collection from "./pages/Collection";
import Navigation from "./components/Navigation";
import AdminNavigation from "./pages/admin/AdminNavigation";
import AboutMe from "./pages/AboutMe";

import ProductDetail from "./pages/ProductDetail";
import Accessibility from "./components/utils/Accessibility";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoutes from "./components/ProtectedRoutes";


import AddCategory from "./pages/admin/categoriesManagement/AddCategory";
import DisplayCategory from "./pages/admin/categoriesManagement/DisplayCategory";
import UpdateCategory from "./pages/admin/categoriesManagement/UpdateCategory";

import AddInformation from "./pages/admin/informationsManagement/AddInformation";
import DisplayInformation from "./pages/admin/informationsManagement/DisplayInformation";
import UpdateInformation from "./pages/admin/informationsManagement/UpdateInformation";

import AddProduct from "./pages/admin/productsManagement/AddProduct";
import DisplayProduct from "./pages/admin/productsManagement/DisplayProduct";
import UpdateProduct from "./pages/admin/productsManagement/UpdateProduct";

import AddSocialNetwork from "./pages/admin/socialNetworksManagement/AddSocialNetwork";
import DisplaySocialNetwork from "./pages/admin/socialNetworksManagement/DisplaySocialNetwork";
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
                <AdminNavigation />
               </ProtectedRoutes>
            }
          />
          <Route
            path="/displayProduct"
            element={
              <ProtectedRoutes>
                <DisplayProduct />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addProduct"
            element={
              <ProtectedRoutes>
                <AddProduct />
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
            path="/displayInformation"
            element={
              <ProtectedRoutes>
                <DisplayInformation />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addInformation"
            element={
              <ProtectedRoutes>
                <AddInformation />
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
            path="/displayCategory"
            element={
              <ProtectedRoutes>
                <DisplayCategory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addCategory"
            element={
              <ProtectedRoutes>
                <AddCategory />
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
            path="/displaySocialNetwork"
            element={
              <ProtectedRoutes>
                <DisplaySocialNetwork />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addSocialNetwork"
            element={
              <ProtectedRoutes>
                <AddSocialNetwork />
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
    </div>
  );
};

export default App;