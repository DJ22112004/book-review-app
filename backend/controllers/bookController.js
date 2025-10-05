const Book = require('../models/bookModel');
const Review = require('../models/reviewModel');

// @desc    Get all books with pagination
// @route   GET /api/books
exports.getBooks = async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.page) || 1;

    try {
        const count = await Book.countDocuments();
        const books = await Book.find()
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        
        res.json({ books, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single book with reviews and average rating
// @route   GET /api/books/:id
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('addedBy', 'name');
        const reviews = await Review.find({ book: req.params.id }).populate('user', 'name');

        if (book) {
            const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
            const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

            res.json({ ...book.toObject(), reviews, averageRating: averageRating.toFixed(1) });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add a book
// @route   POST /api/books
exports.addBook = async (req, res) => {
    const { title, author, description, genre, publishedYear } = req.body;
    try {
        const book = new Book({
            title, author, description, genre, publishedYear,
            addedBy: req.user._id, // from authMiddleware
        });
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// ... other CRUD functions (updateBook, deleteBook) with authorization checks
// ... (keep getBooks, getBookById, addBook functions)

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // 🔑 Check if the user is the one who added the book
        if (book.addedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const { title, author, description, genre, publishedYear } = req.body;
        book.title = title || book.title;
        book.author = author || book.author;
        book.description = description || book.description;
        book.genre = genre || book.genre;
        book.publishedYear = publishedYear || book.publishedYear;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // 🔑 Check if the user is the one who added the book
        if (book.addedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        
        // Before deleting the book, delete all its reviews
        await Review.deleteMany({ book: req.params.id });

        await book.deleteOne();
        res.json({ message: 'Book and associated reviews removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};