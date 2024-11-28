import express from "express";
import {
    createReview,
    getAllReviews,
    getReviewsByBookId,
    updateReview,
    deleteReview,
} from "../controllers/bookController.js"; // Import the controllers

const router = express.Router();

// Routes for reviews
router.post("/", createReview); // Create a review
router.get("/", getAllReviews); // Get all reviews
router.get('/reviews/:bookId', getReviewsByBookId);
router.put("/:id", updateReview); // Update a review
// Delete a review by reviewId
router.delete('/reviews/:reviewId', deleteReview);  // Added the delete route
export default router;
