import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [uom, setUom] = useState("");
  const [price, setPrice] = useState("");
  const [uoms, setUoms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API}/getUOM`)
      .then(res => setUoms(res.data || []))
      .catch(err => console.error("UOM error:", err));
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({
        name: name.trim(),
        uom_id: uom,
        price_per_unit: Number(price)
      }));
      await axios.post(`${API}/insertProduct`, formData);
      setName(""); setPrice(""); setUom("");
      alert("✅ Product added");
    } catch (err) {
      console.error("Add product error:", err);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-xl">
      <h2 className="card-title">Add Product</h2>
      <form onSubmit={handleAddProduct} className="grid gap-4 mt-4">
        <div>
          <label className="label">Name</label>
          <input className="input" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div>
          <label className="label">Unit of Measure</label>
          <select className="input" value={uom} onChange={e => setUom(e.target.value)} required>
            <option value="">Select UOM</option>
            {uoms.map(u => (
              <option key={u.uom_id} value={u.uom_id}>{u.uom_name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Price per Unit (₹)</label>
          <input className="input" type="number" min="0" step="0.01"
                 value={price} onChange={e => setPrice(e.target.value)} required />
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
