// COMPONENTE PRINCIPAL
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookCatalog from "./Components/BookCatalog";
import BookForm from "./Components/BookForm";
import BookTransaction from "./Components/BookTransaction";
import Users from "./Components/Users";

const App = () => {
  const handleBookSubmit = (data) => {
    // respuesta del envío del libro
    console.log("Datos del libro enviado:", data);
  };

  // Define the routes
  const router = createBrowserRouter([
    { path: "/", element: <BookCatalog /> }, // ME MUESTRA TODOS LOS LIBROS EN EL CATALOGO 🤩
    {path: "/bookform", element: <BookForm onBookSubmit={handleBookSubmit} />}, //CREAR LIBROS 🤩
    { path: "/booktransaction", element: <BookTransaction /> }, //PRESTAMO DE LIBROS 🤩
    { path: "/users/users", element: <Users /> }, //ME TRAE TODOS LOS USUARIOS 🤩
    
  ]);

  return <RouterProvider router={router} />;
};

export default App;
