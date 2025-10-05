const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');

// @desc    Add a review to a book
// @route   POST /api/reviews/:bookId
// @access  Private
exports.addReview = async (req, res) => {
    const { rating, reviewText } = req.body;
    const bookId = req.params.bookId;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if user already reviewed this book
        const alreadyReviewed = await Review.findOne({
            book: bookId,
            user: req.user._id,
        });

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'Book already reviewed' });
        }

        const review = new Review({
            rating,
            reviewText,
            user: req.user._id,
            book: bookId,
        });

        const createdReview = await review.save();
        res.status(201).json(createdReview);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a user's own review
// @route   PUT /api/reviews/:reviewId
// @access  Private
exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // 🔑 Check if the user is the one who wrote the review
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const { rating, reviewText } = req.body;
        review.rating = rating || review.rating;
        review.reviewText = reviewText || review.reviewText;

        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a user's own review
// @route   DELETE /api/reviews/:reviewId
// @access  Private
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        // 🔑 Check if the user is the one who wrote the review
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        
        await review.deleteOne();
        res.json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};