import "./App.css";
import CategoryPage from './Pages/CateogryPage/CategoryPage'
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import OrderSuccess from "./Pages/OrderSuccess/OrderSucccess";
import Cart from "./Pages/Cart/Cart";
import LoginPage from "./Pages/LoginPage";
import Footer from "./Components/Footer/Footer";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/Admin/Dashboard";
import AddProduct from "./Pages/Admin/AddProduct";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import SignupPage from "./Pages/SignupPage/SignupPage";
import Contactus from "./Pages/ContactUs/Contactus";
import Orders from "./Pages/Orders/Orders";
import AdminOrders from './Pages/Admin/Orders/Orders'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/add-product/:id" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route
            path="/new"
            element={<CategoryPage slug="New" />}
          />
          <Route
            path="/makeup"
            element={
              <CategoryPage slug="Makeup Product" />
            }
          />
          <Route
            path="/skin-care"
            element={<CategoryPage slug="Skin Care" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
