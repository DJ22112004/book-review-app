import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'; // Import Link
import { addBook, getBookById, updateBook } from '../api/apiService';

const AddEditBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchBook = async () => {
        setLoading(true);
        try {
          const { data } = await getBookById(id);
          setFormData({
            title: data.title,
            author: data.author,
            description: data.description,
            genre: data.genre,
            publishedYear: data.publishedYear,
          });
        } catch (err) {
          setError('Failed to fetch book data.');
        } finally {
          setLoading(false);
        }
      };
      fetchBook();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEditMode) {
        await updateBook(id, formData);
      } else {
        await addBook(formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditMode ? 'Edit Book' : 'Add a New Book'}</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: '#b91c1c', background: '#fee2e2', padding: '1rem', borderRadius: '0.25rem', marginBottom: '1rem' }}>{error}</p>}
        
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text" name="title" id="title" value={formData.title} onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text" name="author" id="author" value={formData.author} onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description" id="description" rows="5" value={formData.description} onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="genre">Genre</label>
            <input
              type="text" name="genre" id="genre" value={formData.genre} onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="publishedYear">Published Year</label>
            <input
              type="number" name="publishedYear" id="publishedYear" value={formData.publishedYear} onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <button
          type="submit" disabled={loading}
          className="btn btn-primary" // Use primary button style
          style={{ backgroundColor: '#22c55e', width: '100%' }} // Green color for add/edit
        >
          {loading ? 'Saving...' : (isEditMode ? 'Update Book' : 'Add Book')}
        </button>
      </form>
    </div>
  );
};

export default AddEditBookPage;