import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const load = () => {
    axios.get(`${API}/getProducts`)
      .then(res => setProducts(res.data || []))
      .catch(err => console.error("Products error:", err));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <h2 className="card-title">Products</h2>
      <div className="overflow-x-auto mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>UOM</th><th>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.product_id}>
                <td>{p.product_id}</td>
                <td>{p.name}</td>
                <td>{p.uom_name ?? p.uom_id}</td>
                <td>{Number(p.price_per_unit).toFixed(2)}</td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan="4" className="text-center text-gray-500 py-4">No products yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
