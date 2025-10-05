import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="book-card"> 
      <h3>{book.title}</h3>
      <p className="author">by {book.author}</p>
      <p className="genre">{book.genre}</p>
      <Link to={`/book/${book._id}`} className="btn btn-primary"> 
        View Details
      </Link>
    </div>
  );
};

export default BookCard;