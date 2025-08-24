import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import AddOrderPage from "./pages/AddOrderPage";
import StockPage from "./pages/StockPage";
import BillPage from "./pages/BillPage";
import "./index.css";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app min-h-screen bg-gray-50 text-gray-900">
        <header className="header">
          <h1>Aashish Grocery Shop</h1>
        </header>

        <nav className="nav">
          <NavLink to="/" end className="nav-link">Dashboard</NavLink>
          <NavLink to="/products" className="nav-link">Products</NavLink>
          <NavLink to="/add-product" className="nav-link">Add Product</NavLink>
          <NavLink to="/add-order" className="nav-link">Add Order</NavLink>
          <NavLink to="/stock" className="nav-link">Stock</NavLink>
        </nav>

        <main className="main container mx-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/add-order" element={<AddOrderPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/bill/:id" element={<BillPage />} />
          </Routes>
        </main>

        <footer className="footer">© {new Date().getFullYear()} Aashish Grocery Shop</footer>
      </div>
    </Router>
  );
}
