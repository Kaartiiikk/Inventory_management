import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
name: "",
sku: "",
price: "",
stock: "",
  });

const fetchProducts = async () => {
try {
const res = await api.get("/products");
setProducts(res.data);
  } catch (error) {
console.log(error);
}
};

  useEffect(() => {
fetchProducts();
  }, []);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

  const handleSubmit = async (e) => {
e.preventDefault();
if(!formData.name.trim()){
alert("Please enter the name first")
    }
if(!formData.sku.trim()){
alert("Please enter valid sku")
}
    try {
await api.post("/products", formData);
setFormData({
name: "",
sku: "",
price: "",
stock: "",
});
fetchProducts();
    } catch (error) {
console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      const message =
       "Deletion failed";
      alert(message);
      console.error(error);
    }
  };

  return (
    <div>
      <div className="page-section">
      <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-row">
        <div className="form-group">
          <label>Product Name</label>
             <input
                type="text"
          name="name"
                placeholder="Enter product name"
              value={formData.name}
           onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
      <label>SKU</label>
            <input
         type="text"
              name="sku"
          placeholder="Enter SKU"
            value={formData.sku}
                onChange={handleChange}
              required
              />
            </div>
           <div className="form-group">
              <label>Price</label>         <input
                type="number"
          name="price"
                placeholder="Enter price"
                value={formData.price}
         onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
            type="number"
                name="stock"
          placeholder="Enter stock"
                value={formData.stock}
             onChange={handleChange}
         min="1"
                required
              />
            </div>
         </div>
            <button type="submit" className="btn-primary">
        Add Product
           </button>
          </form>
 </ div>
<div className="page-section">
  <h2>Products List</h2>
  {products.length > 0 ? (
   <table>
  <thead>
   <tr>
  <th>Product Name</th>
 <th>SKU</th>
  <th>Price</th>
    <th>Stock</th>
   <th>Action</th>
     </tr>
    </thead>
    <tbody>
     {products.map((product) => (
     <tr key={product.id}>
     <td>{product.name}</td>
     <td>{product.sku}</td>
    <td>${product.price}</td>
     <td>{product.stock} units</td>
     <td>
     <button 
    onClick={() => handleDelete(product.id)}
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
    <h3>No Products Yet</h3>
     <p>Add your first product using the form above to get started.</p>
       </div>
      )}
      </div>
    </div>
  );
}

export default Products;
