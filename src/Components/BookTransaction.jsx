// PRESTAMO Y DEVOLUCIONES DE LIBROS

import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const BookTransaction = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialBookId = queryParams.get('bookId');
  const initialBookTitle = queryParams.get('bookTitle');
  const [transaction, setTransaction] = useState({
    book_id: initialBookId || "",
    book_title: initialBookTitle || "",
    user_id: "",
    username: "",
    date_transaction: "",
    type_transaction: "",
  });

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      date_transaction: currentDate,
    }));
  }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente
  

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
      const response = await axios.post(
        "http://localhost:8000/transaction/book",
        transaction
      );
      console.log(response.data); // Manejar la respuesta según sea necesario
    } catch (error) {
      console.error("Error creating book transaction:", error);
    }
  };

  return (
    <div>
      <h2>Book Transaction (Prestamo de Libros)</h2>
      <form onSubmit={handleSubmit}>
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