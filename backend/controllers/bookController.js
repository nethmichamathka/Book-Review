import { Book } from "../models/bookModel.js";

// Create a new review
export const createReview = async (req, res) => {
    console.log("Request Body:", req.body); // Log request data
    const { name, author, rating, review } = req.body;

    try {
        const newBook = new Book({
            name,
            author,
            rating,
            review,
        });

        const savedBook = await newBook.save();
        console.log("Saved Review:", savedBook); // Log saved data
        res.status(201).json({ message: "Review saved successfully", book: savedBook });
    } catch (error) {
        console.error("Error saving review:", error.message);
        res.status(500).json({ message: "Failed to save the review", error: error.message });
    }
};


// Get all reviews for a specific book
export const getAllReviews = async (req, res) => {
    const { bookId } = req.params;  // Get bookId from URL parameter

    try {
        // Assuming the reviews are stored inside the Book model, use bookId to fetch reviews
        const reviews = await Book.find({ bookId });  // You might need to adjust this query if needed

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this book." });
        }

        res.status(200).json(reviews);  // Send the reviews as response
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
    }
};

// Get all reviews for a specific book
export const getReviewsByBookId = async (req, res) => {
    const { bookId } = req.params;

    try {
        const reviews = await Review.find({ bookId }); // Find all reviews for the given bookId
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    const { id } = req.params;
    const { name, review, rating } = req.body;

    try {
        const updatedReview = await Book.findByIdAndUpdate(
            id,
            { name, review, rating },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: "Failed to update the review", error: error.message });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    const { reviewId } = req.params;  // Extract reviewId from URL params

    try {
        const deletedReview = await Book.findByIdAndDelete(reviewId);  // Delete the review by ID

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete review", error: error.message });
    }
};