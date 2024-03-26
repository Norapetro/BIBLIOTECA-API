// CATALOGO Y DETALLES DE LOS LIBROS

import { useState, useEffect } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails'; 
import "../Styles/BookCatalog.css"

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // Estado para almacenar los libros filtrados
  const [selectedBook, setSelectedBook] = useState(null); // Estado para el libro seleccionado
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

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

  // Función para filtrar los libros basados en el término de búsqueda
  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);

    // Actualizar el mensaje de búsqueda
    if (filtered.length === 0) {
      setSearchMessage('No se encontraron resultados.');
    } else {
      setSearchMessage('');
    }
  }, [books, searchTerm]);

  // manejar el cambio en el término de búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="container">
      <h1>BOOK CATALOG</h1>
      <form className="d-flex" 
      onSubmit={(e) => { e.preventDefault(); 
      handleSearch(e.target.elements.search.value) }}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search Book"
          aria-label="Search"
          name="search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <br />
      <p>{searchMessage}</p> {/* Mostrar mensaje de búsqueda */}
      <ul className="book-list-container">
        {filteredBooks.map((book) => (
          <li key={book.id} className="book-item">
            <div onClick={() => handleBookSelect(book)} className="book-title">
              {book.title}
            </div>
            <div className="book-author">
              Author: {book.author}
            </div>
            {/* Mostrar el detalle del libro seleccionado */}
            {selectedBook && selectedBook.id === book.id && (
              <BookDetails book={selectedBook} onDelete={deleteBook} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookCatalog;
