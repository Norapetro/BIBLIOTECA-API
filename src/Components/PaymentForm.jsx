import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/PaymentForm.css";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    username: "",
    book_id: "",
    book_title: "",
    payment_date: "", 
    amount: "",
    observation: "",
  });

  useEffect(() => {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({
      ...prevData,
      payment_date: currentDate,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/payment/", formData);
      alert("Payment submitted successfully!");
      setFormData({
        user_id: "",
        username: "",
        book_id: "",
        book_title: "",
        payment_date: "",
        amount: "",
        observation: "",
      });
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };

  return (
    <div>
      <h1 className="centered-h2"><span style={{color: '#f4978e'}}>Payment</span> <span style={{color: '#00afb9'}}>Book</span></h1>
      <form className="form-container13" onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input
          type="number"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          required
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Book ID:</label>
        <input
          type="number"
          name="book_id"
          value={formData.book_id}
          onChange={handleChange}
          required
        />

        <label>Book Title:</label>
        <input
          type="text"
          name="book_title"
          value={formData.book_title}
          onChange={handleChange}
          required
        />

        <label>Payment Date:</label>
        <input
          type="date"
          name="payment_date"
          value={formData.payment_date}
          onChange={handleChange}
          required
        />

        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          required
        />

        <label>Observation:</label>
        <textarea
          name="observation"
          value={formData.observation}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Send Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
