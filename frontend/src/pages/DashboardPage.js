import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function DashboardPage() {
  const [stats, setStats] = useState({ total_products: 0, total_orders: 0, total_revenue: 0 });

  useEffect(() => {
    axios.get(`${API}/getDashboardStats`)
      .then(res => setStats(res.data))
      .catch(err => console.error("Dashboard error:", err));
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="card">
        <h2 className="card-title">Total Products</h2>
        <p className="stat">{stats.total_products ?? 0}</p>
      </div>
      <div className="card">
        <h2 className="card-title">Total Orders</h2>
        <p className="stat">{stats.total_orders ?? 0}</p>
      </div>
      <div className="card">
        <h2 className="card-title">Total Revenue</h2>
        <p className="stat">₹{(stats.total_revenue ?? 0).toLocaleString()}</p>
      </div>

      {/* <div className="card md:col-span-3">
        <h3 className="card-subtitle">Quick Tips</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
          <li>Use <b>Add Product</b> to seed your catalog.</li>
          <li>Place an order via <b>Add Order</b> to see revenue grow.</li>
          <li>Check <b>Stock</b> and <b>Products</b> to verify DB reads.</li>
        </ul>
      </div> */}
    </div>
  );
}
