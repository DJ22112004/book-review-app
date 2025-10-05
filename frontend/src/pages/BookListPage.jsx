import React, { useState, useEffect } from 'react';
import { getBooks } from '../api/apiService';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await getBooks(page);
        setBooks(data.books);
        setTotalPages(data.pages);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page]); // Re-run this effect whenever the 'page' state changes

  if (loading) {
    return <p className="text-center text-xl mt-10">Loading books...</p>;
  }

  if (error) {
    return <p className="text-center text-xl mt-10 text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Explore Our Library
      </h1>
      {books.length > 0 ? (
        <>
          <div className="book-grid">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          <Pagination
            page={page}
            pages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      ) : (
        <p className="text-center text-xl mt-10">No books found.</p>
      )}
    </div>
  );
};

export default BookListPage;