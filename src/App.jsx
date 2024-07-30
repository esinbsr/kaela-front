import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";

import AdminDeleteInformation from "./components/admin/informations/AdminDeleteInformation";


import AdminProduct from "./pages/admin/products/AdminProduct";
import AdminAddProduct from "./pages/admin/products/AdminAddProduct";
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
import AdminUpdateProduct from "./pages/admin/products/AdminUpdateProduct";
import AdminSocialNetwork from "./pages/admin/socialNetworks/AdminSocialNetwork";
import AdminAddSocialNetwork from "./pages/admin/socialNetworks/AdminAddSocialNetwork";
import AdminUpdateSocialNetwork from "./pages/admin/socialNetworks/AdminUpdateSocialNetwork";



const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />

          <Route path="/eveningDresses" element={<EveningDresses/>} />
          <Route path="/latestCollection" element={<LatestCollection/>} />
          <Route path="/aboutMe" element={<AboutMe/>} />
          
          <Route path="/admin" element={<AdminNavigation/>} />


          <Route path="/adminProduct" element={<AdminProduct />} />
          <Route path="/adminAddProduct" element={<AdminAddProduct />} />
          <Route path="/adminUpdateProduct/:productId" element={<AdminUpdateProduct/>} />

          <Route path="/adminInformation" element={<AdminInformation />} />
          <Route path="/adminAddInformation" element={<AdminAddInformation />} />
          <Route path="/adminInformationModify/:informationId" element={<AdminInformationModify />} /> 
          {/* défini une route avec un paramètre dynamique :informationId. */}
          <Route path="/adminDeleteInformation/:informationId" element={<AdminDeleteInformation/>} />

          <Route path="/adminCategory" element={<AdminCategory/>} />
          <Route path="/adminAddCategory" element={<AdminAddCategory/>} />
          <Route path="/adminUpdateCategory/:categoryId" element={<AdminUpdateCategory/>} />

          <Route path="/adminSocialNetwork" element={<AdminSocialNetwork/>} />
          <Route path="/adminAddSocialNetwork" element={<AdminAddSocialNetwork/>} />
          <Route path="/adminUpdateSocialNetwork/:socialNetworkId" element={<AdminUpdateSocialNetwork/>} />




        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
