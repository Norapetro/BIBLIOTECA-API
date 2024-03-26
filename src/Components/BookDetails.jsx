import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../Styles/BookDetails.css";

const BookDetails = ({ book, onDelete }) => {
  return (
    <div className="card">
      <img
        src=".AQUI VA LA IMAGEN DEL LIBRO."
        className="card-img-top"
        alt="Book Image"
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">
          <strong>Id:</strong> {book.id}
        </p>
        <p className="card-text">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="card-text">
          <strong>Tematica:</strong> {book.tematica}
        </p>
        <p className="card-text">
          <strong>Publication Date:</strong> {book.publication_date}
        </p>
        <p className="card-text">
          <strong>Publisher:</strong> {book.publisher}
        </p>
        <p className="card-text">
          <strong>Number of Pages:</strong> {book.num_pages}
        </p>
        <p className="card-text">
          <strong>State:</strong> {book.state}
        </p>
        <div className="buttons-container">
          <Link
            to={`/booktransaction?bookId=${book.id}&bookTitle=${encodeURIComponent(
              book.title
            )}`}
            className="btn btn-primary"
          >
            Book Transaction
          </Link>
          <button className="btn btn-danger" onClick={() => onDelete(book.id)}>
            Eliminar libro
          </button>
        </div>
      </div>
    </div>
  );
};

// Definir la validación de los props
BookDetails.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    tematica: PropTypes.string.isRequired,
    publication_date: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    num_pages: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookDetails;
