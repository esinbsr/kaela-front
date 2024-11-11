import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigation";
import Accessibility from "./components/utils/Accessibility";
import { Suspense, lazy } from "react";

// Lazy loading the pages/components for better performance
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const Contact = lazy(() => import("./pages/Contact"));
const EveningDresses = lazy(() => import("./pages/EveningDresses"));
const LatestCollection = lazy(() => import("./pages/LatestCollection"));
const Collection = lazy(() => import("./pages/Collection"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// Admin-related routes and pages (all lazy-loaded for performance)
const Admin = lazy(() => import("./pages/admin/Admin"));
const ProductManager = lazy(() =>
  import("./pages/admin/productsManagement/ProductManager")
);
const UpdateProduct = lazy(() =>
  import("./pages/admin/productsManagement/UpdateProduct")
);
const CategoryManager = lazy(() =>
  import("./pages/admin/categoriesManagement/CategoryManager")
);
const UpdateCategory = lazy(() =>
  import("./pages/admin/categoriesManagement/UpdateCategory")
);
const InformationManager = lazy(() =>
  import("./pages/admin/informationsManagement/InformationManager")
);
const UpdateInformation = lazy(() =>
  import("./pages/admin/informationsManagement/UpdateInformation")
);
const SocialNetworkManager = lazy(() =>
  import("./pages/admin/socialNetworksManagement/SocialNetworkManager")
);
const UpdateSocialNetwork = lazy(() =>
  import("./pages/admin/socialNetworksManagement/UpdateSocialNetwork")
);

// Protected routes component for admin access
const ProtectedRoutes = lazy(() => import("./components/ProtectedRoutes"));

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Accessibility />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
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
            <Route
              path="/productDetail/:productDetailId"
              element={<ProductDetail />}
            />

            {/* Admin Routes with Protected access */}
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
                  <UpdateProduct />
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
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
