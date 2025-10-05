const express = require('express');
const { getBooks, getBookById, addBook , updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getBooks).post(protect, addBook);
router
    .route('/:id')
    .get(getBookById)
    .put(protect, updateBook)
    .delete(protect, deleteBook);

module.exports = router;