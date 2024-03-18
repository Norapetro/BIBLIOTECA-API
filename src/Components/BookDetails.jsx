// DETALLES DE LOS LIBROS

import PropTypes from 'prop-types';

const BookDetails = ({ book }) => {
  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Tematica:</strong> {book.tematica}</p>
      <p><strong>Publication Date:</strong> {book.publication_date}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Number of Pages:</strong> {book.num_pages}</p>
      <p><strong>Price:</strong> {book.price}</p>
      <p><strong>Estado:</strong> {book.estado}</p>
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
    estado: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookDetails;