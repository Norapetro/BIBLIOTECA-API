// COMPONENTE PRINCIPAL
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import BookCatalog from "./Components/BookCatalog";
import BookForm from "./Components/BookForm";
import BookTransaction from "./Components/BookTransaction";
import Users from "./Components/Users";
import PaymentForm from "./Components/PaymentForm";
import "../src/styles/nav.css"

const App = () => {
  const handleBookSubmit = (data) => {
    // respuesta del envío del libro
    console.log("Datos del libro enviado:", data);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookCatalog />} />
        <Route path="/bookform" element={<BookForm onBookSubmit={handleBookSubmit} />} />
        <Route path="/booktransaction" element={<BookTransaction />} />
        <Route path="/users/users" element={<Users />} />
        <Route path="/payment" element={<PaymentForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
