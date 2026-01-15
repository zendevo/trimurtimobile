import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm";
import ProductList from "../features/homepage/ProductList";
const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/products" element={<ProductList />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
