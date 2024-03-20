import { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: 0, 
    cedula: "",
    username: "",
    email: "",
    phone: "",
    address: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/users');
      setUsers(response.data.result);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/users/users/create', formData);
      fetchUsers(); // Actualizar la lista de usuarios después de agregar uno nuevo
      setFormData({ id: 0, cedula: "", username: "", email: "", phone: "", address: "" }); // Limpiar el formulario después de enviar
      setSuccessMessage("User created successfully.");
      setErrorMessage("");
    } catch (error) {
      console.error('Error creating user:', error);
      setSuccessMessage("");
      setErrorMessage("Failed to create user.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/users/users/delete/${userId}`);
      fetchUsers(); 
      setSuccessMessage("User deleted successfully.");
      setErrorMessage("");
    } catch (error) {
      console.error('Error deleting user:', error);
      setSuccessMessage("");
      setErrorMessage("Failed to delete user.");
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {successMessage && <h1 style={{ color: "green" }}>{successMessage}</h1>}
      {errorMessage && <h1 style={{ color: "red" }}>{errorMessage}</h1>}
      <form onSubmit={handleSubmit}>
        <input type="number" name="id" value={formData.id} onChange={handleChange} placeholder="ID" required />
        <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} placeholder="Cedula" required />
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
        <button type="submit">Create User</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>ID: {user.id}</p>
            <p>Cedula: {user.cedula}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>
            <button onClick={() => handleDelete(user.id)}>Delete User</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
