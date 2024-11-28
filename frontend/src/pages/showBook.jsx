import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import harrypotter1 from "../assets/harrypotter1.jpg";
import alice from "../assets/alice.jpg";
import peter from "../assets/peter.jpg";

const ShowBook = () => {
  const { id } = useParams(); // Book ID from URL
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", author: "", review: "", rating: 5 });
  const [notification, setNotification] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null); // Track the review being edited

  // Mock book data
  const mockBooks = [
    { id: "1", title: "Harry Potter", author: "J.K. Rowling", description: "A young wizard's journey.", publishYear: "1997", image: harrypotter1 },
    { id: "2", title: "Alice in Wonderland", author: "Lewis Carroll", description: "A magical journey.", publishYear: "1865", image: alice },
    { id: "3", title: "Peter Pan", author: "J.M. Barrie", description: "The boy who never grew up.", publishYear: "1911", image: peter },
  ];

  // Fetch Book Details and Reviews
  useEffect(() => {
    const selectedBook = mockBooks.find((b) => b.id === id);
    setBook(selectedBook || null);

    // Fetch all reviews from the backend for the specific book
    axios.get(`http://localhost:5001/reviews?bookId=${id}`)
      .then((response) => setReviews(response.data))
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, [id]);

  // Handle Review Submission (Create or Update)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { ...newReview, bookId: id };

    if (editingReviewId) {
      // Update review if editing
      try {
        const response = await axios.put(`http://localhost:5001/reviews/${editingReviewId}`, reviewData);
        
        // Update the review in the list after successful edit
        setReviews(reviews.map(review => (review._id === editingReviewId ? response.data.review : review)));
        setEditingReviewId(null); // Clear editing state
        setNotification("Review updated successfully!");

        // Reset the form
        setNewReview({ name: "", author: "", review: "", rating: 5 });

        // Reset notification after 3 seconds
        setTimeout(() => setNotification(""), 3000);

      } catch (err) {
        console.error("Failed to update review:", err);
        setNotification("Failed to update review. Please try again.");
      }
    } else {
      // Create new review if not editing
      try {
        const response = await axios.post("http://localhost:5001/reviews", reviewData);
        setReviews([...reviews, response.data.review]); // Add new review to the list
        setNotification("Review submitted successfully!");

        // Reset form
        setNewReview({ name: "", author: "", review: "", rating: 5 });

        // Reset notification after 3 seconds
        setTimeout(() => setNotification(""), 3000);

      } catch (err) {
        console.error("Failed to submit review:", err);
        setNotification("Failed to submit review. Please try again.");
      }
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? "★" : "☆"; // Filled star for rating, empty star otherwise
    }
    return stars;
  };

  // Handle Review Deletion
  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5001/reviews/${reviewId}`); // DELETE request to backend
      setReviews(reviews.filter((review) => review._id !== reviewId)); // Remove review from the list
      setNotification("Review deleted successfully!");

      // Clear notification after 3 seconds
      setTimeout(() => setNotification(""), 3000);
    } catch (err) {
      console.error("Failed to delete review:", err);
      setNotification("Failed to delete review. Please try again.");
    }
  };

  // Handle Edit Button Click
  const handleEditReview = (review) => {
    setEditingReviewId(review._id); // Set the review id as the one being edited
    setNewReview({
      name: review.name,
      author: review.author,
      review: review.review,
      rating: review.rating,
    });
  };

  if (!book) return <p>Book not found!</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#ffffff] via-[#4B70F5] to-[#3DC2EC]">
      {/* Header */}
      <header className="shadow-md h-16" style={{ backgroundColor: "#402E7A" }}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center text-white h-full">
          <h1 className="text-2xl font-bold">Book Review Hub</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#featured" className="hover:text-gray-300">
                  Featured Books
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-300">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className="bg-blue-100 text-blue-700 px-4 py-3 rounded-md shadow-md mx-auto w-1/2 mt-4">
          {notification}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Book Details */}
        <div
          className="rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center"
          style={{ backgroundColor: "#D8D2C2" }}
        >
          <img
            src={book.image}
            alt={book.title}
            className="w-64 h-auto object-cover rounded-lg shadow-lg mb-6 md:mb-0 md:mr-6"
          />
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{book.title}</h1>
            <h2 className="text-xl font-medium mb-2 text-gray-600">By {book.author}</h2>
            <p className="text-gray-700 mb-2 font-semibold">Published: {book.publishYear}</p>
            <p className="text-gray-600">{book.description}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Reviews of All Books</h2>
          {reviews.length > 0 ? (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review._id} className="p-4 border rounded-lg shadow-md bg-white">
                  <p className="font-semibold">Book Title: {review.name}</p>
                  <p className="font-semibold text-gray-600">Author: {review.author}</p>
                  <p className="text-yellow-500">{renderStars(review.rating)}</p>
                  <p>{review.review}</p>
                  <button
                    onClick={() => handleEditReview(review)}  // Edit Button
                    className="mt-2 text-blue-500 hover:text-blue-700"
                  >
                    Edit Review
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review)}  // Delete Button
                    className="mt-2 text-red-500 hover:text-red-700"
                  >
                    Delete Review
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          )}
        </div>

        {/* Add or Edit Review Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{editingReviewId ? "Edit (you will be able to edit only the review)" : "Add"} a Review</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">Book Title</label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Author</label>
              <input
                type="text"
                value={newReview.author}
                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Rating</label>
              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: parseInt(e.target.value) })
                }
                className="w-full border rounded-lg px-4 py-2"
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} Stars
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Your Review</label>
              <textarea
                value={newReview.review}
                onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              {editingReviewId ? "Update Review" : "Submit Review"}
            </button>
          </form>
        </div>
      </main>
      
      {/* Footer */}
      <footer
        id="contact"
        className="py-6 text-center"
        style={{ backgroundColor: "#402E7A", color: "#FAF7F0" }}
      >
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Book Review Hub. All rights reserved.</p>
          <p>
            Contact us at:{" "}
            <a
              href="mailto:support@bookreviewhub.com"
              className="underline"
              style={{ color: "#B17457" }}
            >
              support@bookreviewhub.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ShowBook;
