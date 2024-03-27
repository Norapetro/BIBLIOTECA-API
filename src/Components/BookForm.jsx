// AGREGAR LIBROS AL CATALOGO

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../Styles/BookForm.css";

const BookForm = ({ onBookSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tematica, setTematica] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [publisher, setPublisher] = useState("");
  const [numPages, setNumPages] = useState("");
  const [price, setPrice] = useState("");
  const [estado, setEstado] = useState("ACTIVE");

  useEffect(() => {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0];
    setPublicationDate(currentDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      tematica,
      publication_date: publicationDate,
      publisher,
      num_pages: numPages,
      price,
      state: estado,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/books/create",
        bookData
      );
      if (typeof onBookSubmit === "function") {
        onBookSubmit(response.data); // Llamar a la función proporcionada por el componente padre
        alert("Libro creado satisfactoriamente");
      } else {
        console.error("onBookSubmit no es una función");
      }
    } catch (error) {
      console.error("Error al enviar los datos del libro:", error);
    }
  };

  return (
    <div>
      <h2><span style={{color: '#f4978e'}}>Create</span> <span style={{color: '#00afb9'}}>Book</span></h2>
      <form className="form-container11" onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Autor:</label>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <label>Tematica:</label>
      <input
        type="text"
        value={tematica}
        onChange={(e) => setTematica(e.target.value)}
      />

      <label>Publication date:</label>
      <input
        type="date"
        value={publicationDate}
        onChange={(e) => setPublicationDate(e.target.value)}
      />

      <label>Publisher:</label>
      <input
        type="text"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
      />

      <label>Number of Pages:</label>
      <input
        type="text"
        value={numPages}
        onChange={(e) => setNumPages(e.target.value)}
      />

      <label>Price:</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label>State:</label>
      <input
        type="text"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      />

      <button type="submit">Create Book</button>
    </form>
    </div>
  );
};

BookForm.propTypes = {
  onBookSubmit: PropTypes.func.isRequired,
};

export default BookForm;
