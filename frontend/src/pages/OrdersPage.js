import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/getAllOrders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="card">
      <h2 className="title">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.order_id} className="box">
            <p><b>Order ID:</b> {order.order_id}</p>
            <p><b>Customer:</b> {order.customer_name}</p>
            <p><b>Total:</b> ₹{order.total}</p>
            <p><b>Date:</b> {order.datetime}</p>

            <h4>Items:</h4>
            <ul>
              {order.order_details.map((item, idx) => (
                <li key={idx}>
                  {item.product_name} — {item.quantity} x ₹{item.price_per_unit} = ₹{item.total_price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
