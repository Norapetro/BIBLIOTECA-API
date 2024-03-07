import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  // Función para obtener los libros del servidor
  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/books");
      console.log(response.data); // Verificar la respuesta del servidor en la consola
      setBooks(response.data.result);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks(); // Llama a la función para obtener los libros cuando el componente se monta
  }, []); // El segundo argumento del useEffect es un array vacío para asegurarse de que la función solo se ejecute una vez al montar el componente

  return (
    <>
      <div className="container">
        <h1>BOOK CATALOG</h1>
        <ul>
          {/* Mapea sobre el estado de los libros y muestra cada uno */}
          {books &&
            books.map((book) => (
              <li key={book.id}>
                <span>Title:</span> {book.title} <br />
                <span>Author:</span> {book.author} <br />
                <span>Description:</span> {book.description} <br />
                <span>Publication Date:</span> {book.publication_date} <br />
                <span>Publisher:</span> {book.publisher} <br />
                <span>Number of Pages:</span> {book.num_pages} <br />
                <span>Price:</span> {book.price} <br />
                <span>Estado:</span> {book.estado}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
