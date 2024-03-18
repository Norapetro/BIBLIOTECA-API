// CATALOGO Y DETALLES DE LOS LIBROS

import { useState, useEffect } from 'react';
import axios from 'axios';
import BookDetail from './BookDetails'; 

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

  return (
    <div className="container">
      <h1>BOOK CATALOG</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} onClick={() => handleBookSelect(book)}>
            {book.title}
          </li>
        ))}
      </ul>
      {/* Mostrar el detalle del libro seleccionado */}
      {selectedBook && <BookDetail book={selectedBook} />}
    </div>
  );
}

export default BookCatalog;












































































// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import BookDetail from './BookDetails'; 

// const BookCatalog = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null); // Estado para el libro seleccionado

//   // Función para obtener los libros del servidor
//   const getBooks = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/books");
//       setBooks(response.data.result);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   useEffect(() => {
//     getBooks();
//   }, []);

//   // Función para la selección de un libro
//   const handleBookSelect = (book) => {
//     setSelectedBook(book);
//   };

//   return (
//     <div className="container">
//       <h1>BOOK CATALOG</h1>
//       <ul>
//         {books.map((book) => (
//           <li key={book.id} onClick={() => handleBookSelect(book)}>
//             {book.title}
//           </li>
//         ))}
//       </ul>
//       {/* Mostrar el detalle del libro seleccionado */}
//       {selectedBook && <BookDetail book={selectedBook} />}
//     </div>
//   );
// }

// export default BookCatalog;