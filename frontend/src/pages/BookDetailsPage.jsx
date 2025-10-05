import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById, addReview } from '../api/apiService';
import { AuthContext } from '../context/AuthContext';
import ReviewList from '../components/ReviewList';
import AddReviewForm from '../components/AddReviewForm';

const BookDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch book details
  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const { data } = await getBookById(id);
      setBook(data);
    } catch (err) {
      setError('Failed to fetch book details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  // Handler for adding a new review
  const handleReviewAdded = async (reviewData) => {
    try {
      await addReview(id, reviewData);
      // After successfully adding a review, refresh the book details to show the new review
      fetchBookDetails();
    } catch (err) {
      console.error('Failed to add review:', err);
      // Re-throw the error to be caught by the form component
      throw new Error(err.response?.data?.message || 'Failed to submit review.');
    }
  };

  if (loading) return <p className="text-center text-xl mt-10">Loading...</p>;
  if (error) return <p className="text-center text-xl mt-10 text-red-500">{error}</p>;
  if (!book) return <p className="text-center text-xl mt-10">Book not found.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 border rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
        <p className="text-xl text-gray-700 mb-4">by {book.author}</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 text-2xl mr-2">
            ★ {book.averageRating}
          </span>
          <span className="text-gray-600">
            ({book.reviews.length} reviews)
          </span>
        </div>
        <p className="text-gray-800 mb-2">{book.description}</p>
        <p className="text-sm text-gray-500">
          <strong>Genre:</strong> {book.genre} | <strong>Published:</strong> {book.publishedYear}
        </p>
      </div>

      <div className="mt-8">
        {user && <AddReviewForm bookId={id} onReviewAdded={handleReviewAdded} />}
        <ReviewList reviews={book.reviews} />
      </div>
    </div>
  );
};

export default BookDetailsPage;