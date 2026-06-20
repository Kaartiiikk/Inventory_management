import { useEffect, useState } from "react";
import api from "../services/api";
function Customers() {
const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({name: "",email: "",});

const fetchCustomers = async () => {
const res = await api.get("/customers");
  setCustomers(res.data);
};

useEffect(() => {
fetchCustomers();
  }, []);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (!formData.name.trim()) {
    alert("Name is required");
    return;
  }

  if (!formData.email.trim()) {
    alert("Email is required");
    return;
  }
 if (!formData.email.endsWith("@gmail.com")) {
    alert("Please provide a valid email id ");
    return;
  }
    await api.post("/customers", formData);
    setFormData({
      name: "",
      email: "",
    });
    fetchCustomers();
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Delete failed";
      alert(message);
      console.error(error);
    }
  };

  return (
    <div>
      <div className="page-section">
      <h2>Add New Customer</h2>
    <form onSubmit={handleSubmit}>
     <div className="form-row">
     <div className="form-group">
      <label>Customer Name</label>
       <input
      name="name"
       placeholder="Enter full name"
      value={formData.name}
     onChange={handleChange}
      required
         />
          </div>
          <div className="form-group">
          <label>Email Address</label>
          <input
              name="email"
               type="email"
               placeholder="Enter email address"
               value={formData.email}
            onChange={handleChange}
            required 
           />
           </div>
           </div>
        <button type="submit" className="btn-primary">
          Add Customer
        </button>
       </form>
    </div>

     <div className="page-section">
      <h2>Customers List</h2>
    {customers.length > 0 ? (
         <table>
           <thead>
         <tr>
       <th>Customer Name</th>
       <th>Email Address</th>
                <th>Action</th>
         </tr>
          </thead>
            <tbody>
           {customers.map((customer) => (
          <tr key={customer.id}>
           <td>{customer.name}</td>
         <td>{customer.email}</td>
           <td>
         <button 
           onClick={() => handleDelete(customer.id)}
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
     <h3>No Customers Yet</h3>
     <p>Add your first customer using the form above to get started.</p>
    </div>
        )}
      </div>
    </div>
  );
}

export default Customers;
