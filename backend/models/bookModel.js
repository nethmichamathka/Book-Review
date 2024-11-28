import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        rating: {
            type: Number, // Changed to `Number` for ratings
            required: true,
            min: 1,
            max: 5, // Valid range for ratings
        },
        review: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    }
);

export const Book = mongoose.model("Book", reviewSchema);
