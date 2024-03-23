// CATALOGO Y DETALLES DE LOS LIBROS

import { useState, useEffect } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails'; 
import "../styles/Catalog.css";

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // Estado para el libro seleccionado

  // Función para obtener los libros del servidor
  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/books");
      setBooks(response.data.result);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  // Función para la selección de un libro
  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  // Función para eliminar un libro
  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8000/books/delete/${bookId}`);
      // Actualizar la lista de libros después de la eliminación
      getBooks();
      // Limpiar el libro seleccionado después de la eliminación
      setSelectedBook(null);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container">
      <h1>BOOK CATALOG</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <div onClick={() => handleBookSelect(book)}>
              {book.title}
            </div>
            {/* Mostrar el detalle del libro seleccionado */}
            {selectedBook && selectedBook.id === book.id && (
              <div>
                <BookDetails book={selectedBook} />
                {/* Botón para eliminar el libro */}
                <button onClick={() => deleteBook(selectedBook.id)}>Eliminar libro</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookCatalog;
