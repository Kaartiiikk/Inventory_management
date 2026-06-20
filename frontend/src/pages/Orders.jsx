import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
const [products, setProducts] = useState([]);
const [formData, setFormData] = useState({
customerId: "",
  productId: "",
quantity: "",
});

const fetchData = async () => {
const [ordersRes, customersRes, productsRes] = await Promise.all([
api.get("/orders"),
api.get("/customers"),
  api.get("/products"),
]);
setOrders(ordersRes.data);
setCustomers(customersRes.data);
setProducts(productsRes.data);
};

  useEffect(() => {
fetchData();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/orders", formData);
      setFormData({
        customerId: "",
        productId: "",
        quantity: "",
      });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="page-section">
        <h2>Create New Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Select Customer</label>
              <select
                value={formData.customerId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customerId: e.target.value,
                  })
                }
                required
              >
                <option value="">-- Choose a customer --</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Select Product</label>
              <select
                value={formData.productId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    productId: e.target.value,
                  })
                }
                required
              >
                <option value="">-- Choose a product --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.price})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: e.target.value,
                  })
                }
                min="1"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-success">
            Create Order
          </button>
        </form>
      </div>

      <div className="page-section">
        <h2>Orders List</h2>
        {orders.length > 0 ? (
        <table>
        <thead>
           <tr>
               <th>Customer Name</th>
             <th>Product Name</th>
          <th>Quantity</th>
               <th>Action</th>
           </tr>
           </thead>
          <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.customer?.name}</td>
           <td>{order.product?.name}</td>
              <td>{order.quantity} units</td>
            <td>
                 <button 
              onClick={() => handleDelete(order.id)}
                className="btn-danger"
                   style={{ padding: "6px 12px", fontSize: "13px" }}
                  >
                    Delete
                </button>
                 </td>
          </tr>
            ))}
            </tbody>
        </table>
       ) : (
        <div className="empty-state">
          <h3>No Orders Yet</h3>
          <p>Create your first order using the form above to get started.</p>
         </div>
      )}
      </div>
    </div>
  );
}

export default Orders;
