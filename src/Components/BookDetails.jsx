import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../Styles/BookDetails.css";

const BookDetails = ({ book, onDelete }) => {
  return (
    <div>
      <div className="page-title-contenedor">
        <h1 className="page-title">
          BOOK <span className="catalog-title">DETAILS</span>
        </h1>
      </div>
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
              to={`/booktransaction?bookId=${
                book.id
              }&bookTitle=${encodeURIComponent(book.title)}`}
              className="btn btn-primary"
            >
              Book Transaction
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(book.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>{" "}
            </button>
          </div>
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
