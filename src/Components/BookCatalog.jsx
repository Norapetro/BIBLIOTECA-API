// CATALOGO Y DETALLES DE LOS LIBROS

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails'; 
import "../Styles/BookCatalog.css"

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); 
  const [selectedBook, setSelectedBook] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const bookListRef = useRef(null);

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
    scrollToTop();
  };

  // Función para eliminar un libro
  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8000/books/delete/${bookId}`);
      getBooks();
      setSelectedBook(null);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);

    if (filtered.length === 0) {
      setSearchMessage('No se encontraron resultados.');
    } else {
      setSearchMessage('');
    }
  }, [books, searchTerm]);

  // Manejar el cambio en el término de búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Función para desplazar la vista hacia arriba
  const scrollToTop = () => {
    if (bookListRef.current) {
      bookListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="contenedor">
      <div className="book-list-contenedor" ref={bookListRef}>
        <div className="page-title-contenedor">
          <h1 className="page-title">BOOK <span className="catalog-title">CATALOG</span></h1>
        </div>
        <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(e.target.elements.search.value) }}>
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
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id} className="book-item" onClick={() => handleBookSelect(book)}>
              <div className="book-title">
                {book.title}
              </div>
              <div className="book-author">
                Author: {book.author}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedBook && (
        <div className="book-details-contenedor">
          <BookDetails book={selectedBook} onDelete={deleteBook} />
        </div>
      )}
    </div>
  );
}

export default BookCatalog;