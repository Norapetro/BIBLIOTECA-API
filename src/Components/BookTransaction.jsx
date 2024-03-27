// PRESTAMO Y DEVOLUCIONES DE LIBROS

import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../Styles/BookTransaction.css";

const BookTransaction = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialBookId = queryParams.get("bookId");
  const initialBookTitle = queryParams.get("bookTitle");

  const [transaction, setTransaction] = useState({
    book_id: initialBookId || "",
    book_title: initialBookTitle || "",
    user_id: "",
    username: "",
    date_transaction: "",
    type_transaction: "",
    book_state: "",
  });

  const [alertMessage, setAlertMessage] = useState(""); // Estado para manejar el mensaje de alerta
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      date_transaction: currentDate,
    }));
  }, []);

  useEffect(() => {
    if (initialBookId) {
      fetchBookState(initialBookId);
    }
  }, [initialBookId]); // Ejecutar cuando initialBookId cambie

  const fetchBookState = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:8000/books/${bookId}`);
      const bookState = response.data.state;
      setTransaction((prevTransaction) => ({
        ...prevTransaction,
        book_state: bookState,
      }));
    } catch (error) {
      console.error("Error fetching book state:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificar si el tipo de transacción es devolución y el libro está en estado ACTIVE
      if (
        transaction.type_transaction === "devolucion" &&
        transaction.book_state === "ACTIVE"
      ) {
        setAlertMessage(
          "No se puede devolver un libro que no ha sido prestado."
        );
        return;
      }

      // Verificar si el tipo de transacción es préstamo y el libro está en estado BORROWED
      if (
        transaction.type_transaction === "prestamo" &&
        transaction.book_state === "BORROWED"
      ) {
        setAlertMessage(
          "El libro ya está en préstamo y no se puede prestar nuevamente hasta que sea devuelto."
        );
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/transaction/book",
        transaction
      );
      setSuccessMessage("¡Transacción exitosa!");
      console.log(response.data); // Manejar la respuesta según sea necesario
    } catch (error) {
      console.error("Error creating book transaction:", error);
    }
  };

  return (
    <div>
      <h2>
      <i className="bi bi-pen"></i> {/* Icono de pluma */}
      <span style={{color: '#f4978e'}}>Book</span> <span style={{color: '#00afb9'}}>Transaction</span></h2>
      {alertMessage && <div style={{ color: "red" }}>{alertMessage}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <form className="form-container12" onSubmit={handleSubmit}>
        <div>
          <label>Book ID:</label>
          <input
            type="text"
            name="book_id"
            value={transaction.book_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Book Title:</label>
          <input
            type="text"
            name="book_title"
            value={transaction.book_title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="user_id"
            value={transaction.user_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="username"
            value={transaction.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date Transaction:</label>
          <input
            type="text"
            name="date_transaction"
            value={transaction.date_transaction}
            onChange={handleChange}
            readOnly // Hace que el campo sea de solo lectura
          />
        </div>
        <div>
          <label>Type Transaction:</label>
          <select
            name="type_transaction"
            value={transaction.type_transaction}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="prestamo">Prestamo</option>
            <option value="devolucion">Devolucion</option>
          </select>
        </div>
        <button type="submit">Send Transaction</button>
      </form>
    </div>
  );
};

export default BookTransaction;
