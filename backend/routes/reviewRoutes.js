const express = require('express');
const { addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to add a review for a specific book
router.route('/:bookId').post(protect, addReview);

// Routes to update or delete a specific review by its ID
router
    .route('/review/:reviewId')
    .put(protect, updateReview)
    .delete(protect, deleteReview);

module.exports = router;