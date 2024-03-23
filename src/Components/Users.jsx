import { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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
      fetchUsers(); 
      setFormData({ id: 0, cedula: "", username: "", email: "", phone: "", address: "" }); 
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

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <h1>Create Users</h1>
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
      <br></br>
      <ul>
      <h1>List Users</h1>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user)} style={{ cursor: "pointer" }}>
            <p>Username: {user.username}</p>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h2>User Details</h2>
          <p>ID: {selectedUser.id}</p>
          <p>Cedula: {selectedUser.cedula}</p>
          <p>Username: {selectedUser.username}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone}</p>
          <p>Address: {selectedUser.address}</p>
          <button onClick={() => handleDelete(selectedUser.id)}>Delete User</button>
        </div>
      )}
    </div>
  );
}

export default Users;
