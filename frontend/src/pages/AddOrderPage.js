import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function AddOrderPage() {
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState("Walk-in");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/getProducts`)
      .then(res => setProducts(res.data || []))
      .catch(err => console.error("Error loading products:", err));
  }, []);

  const addItem = () => {
    const product = products.find(p => String(p.product_id) === String(selectedProductId));
    if (!product) return alert("Please select a product");
    if (quantity < 1) return alert("Quantity must be at least 1");

    // Check if product already exists in order
    const existing = orderItems.find(i => i.product_id === product.product_id);
    if (existing) {
      existing.quantity += Number(quantity);
      existing.total_price = existing.quantity * existing.price_per_unit;
      setOrderItems([...orderItems]);
    } else {
      setOrderItems([...orderItems, {
        product_id: product.product_id,
        product_name: product.name,
        quantity: Number(quantity),
        price_per_unit: Number(product.price_per_unit),
        total_price: Number(quantity) * Number(product.price_per_unit)
      }]);
    }

    // Reset selection
    setSelectedProductId("");
    setQuantity(1);
  };

  const removeItem = (productId) => {
    setOrderItems(orderItems.filter(i => i.product_id !== productId));
  };

  const grandTotal = orderItems.reduce((sum, item) => sum + item.total_price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderItems.length) return alert("Add at least one product");

    const payload = {
      customer_name: customer.trim() || "Walk-in",
      grand_total: grandTotal,
      order_details: orderItems
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      const res = await axios.post(`${API}/insertOrder`, formData);
      const orderId = res.data?.order_id;
      if (orderId) {
        navigate(`/bill/${orderId}`);
      } else {
        alert("Order saved but no order_id returned.");
      }
    } catch (err) {
      console.error("Error saving order:", err);
      alert("❌ Failed to save order");
    }
  };

  return (
    <div className="card max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Add Order</h2>
      <div>
        <label className="block font-semibold mb-1">Customer</label>
        <input
          className="input w-full"
          value={customer}
          onChange={e => setCustomer(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 items-end">
        <div>
          <label className="block font-semibold mb-1">Product</label>
          <select
            className="input w-full"
            value={selectedProductId}
            onChange={e => setSelectedProductId(e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map(p => (
              <option key={p.product_id} value={p.product_id}>
                {p.name} — ₹{p.price_per_unit}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Quantity</label>
          <input
            className="input w-full"
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-add mt-6"
          onClick={addItem}
        >
          Add Item
        </button>
      </div>

      {orderItems.length > 0 && (
        <div className="order-summary space-y-2 mt-4">
          <h3 className="font-bold">Order Items</h3>
          <ul className="divide-y divide-gray-300">
            {orderItems.map(item => (
              <li key={item.product_id} className="flex justify-between py-2">
                <span>{item.product_name} x {item.quantity}</span>
                <span>₹{item.total_price.toFixed(2)}</span>
                <button
                  type="button"
                  className="text-red-500 ml-4"
                  onClick={() => removeItem(item.product_id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold mt-2">
            <span>Grand Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      <button className="btn btn-submit w-full mt-4" onClick={handleSubmit}>
        Save Order
      </button>
    </div>
  );
}
