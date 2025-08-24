import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function StockPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/getProducts`)
      .then(res => setProducts(res.data || []))
      .catch(err => console.error("Stock error:", err));
  }, []);

  return (
    <div className="card">
      <h2 className="card-title">Stock</h2>
      <ul className="divide-y divide-gray-200 mt-3">
        {products.map(p => (
          <li key={p.product_id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">
                UOM: {p.uom_name ?? p.uom_id}
              </div>
            </div>
            <div className="font-semibold">₹{Number(p.price_per_unit).toFixed(2)}</div>
          </li>
        ))}
        {products.length === 0 && (
          <li className="py-6 text-center text-gray-500">No stock to show.</li>
        )}
      </ul>
    </div>
  );
}
