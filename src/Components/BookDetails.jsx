import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BookDetails = ({ book }) => {
  return (
    <div className="card">
      <img src=".AQUI VA LA IMAGEN DEL LIBRO." className="card-img-top" alt="Book Image" />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text"><strong>Author:</strong> {book.author}</p>
        <p className="card-text"><strong>Tematica:</strong> {book.tematica}</p>
        <p className="card-text"><strong>Publication Date:</strong> {book.publication_date}</p>
        <p className="card-text"><strong>Publisher:</strong> {book.publisher}</p>
        <p className="card-text"><strong>Number of Pages:</strong> {book.num_pages}</p>
        <p className="card-text"><strong>Price:</strong> {book.price}</p>
        <p className="card-text"><strong>State:</strong> {book.state}</p>
        <Link to="/booktransaction" className="btn btn-primary">Book Transaction</Link>
      </div>
    </div>
  );
}

// Definir la validación de los props
BookDetails.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    tematica: PropTypes.string.isRequired,
    publication_date: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    num_pages: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookDetails;
