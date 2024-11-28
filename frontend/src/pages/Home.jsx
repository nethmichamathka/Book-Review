import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios for API calls
import harrypotter1 from "../assets/harrypotter1.jpg";
import alice from "../assets/alice.jpg";
import peter from "../assets/peter.jpg";
import back from "../assets/back.jpg";
import hurricane from "../assets/hurricane.jpg";
import heart from "../assets/heart.jpg";
import stars from "../assets/stars.jpg";

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Mock book data with all images from assets
  const books = [
    { id: "1", title: "Harry Potter", author: "J.K. Rowling", image: harrypotter1, rating: 4.0 },
    { id: "2", title: "Alice in Wonderland", author: "Lewis Carroll", image: alice, rating: 4.0 },
    { id: "3", title: "Peter Pan", author: "J.M. Barrie", image: peter, rating: 4.0 },
    { id: "7", title: "Hurricane", author: "Unknown", image: hurricane, rating: 4.3 },
    { id: "8", title: "Heart of the Sea", author: "Unknown", image: heart, rating: 4.4 },
    { id: "9", title: "The Stars", author: "Unknown", image: stars, rating: 4.6 },
  ];

  const [reviews, setReviews] = useState([]); // State to store reviews

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewResponses = await Promise.all(
          books.map((book) => axios.get(`http://localhost:5001/reviews?bookId=${book.id}`))
        );
        // Combine all reviews into a single array
        const allReviews = reviewResponses.flatMap((response) => response.data);
        setReviews(allReviews); // Set the reviews state with combined reviews
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews(); // Fetch the reviews
  }, []); // Empty dependency array ensures it only runs once

  // Function to render stars based on rating
  const renderStars = (rating) => {
    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? "★" : "☆"; // Filled star for rating, empty star otherwise
    }
    return stars;
  };

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

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative text-center mb-8">
          <div>
            <img
              src={back}
              alt="back"
              className="object-cover rounded-xl shadow-2xl opacity-200 transition-transform duration-300 ease-in-out hover:scale-105"
              style={{
                width: "2000px",
                height: "400px",
                objectFit: "cover",
                borderRadius: "20px",
                boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
                opacity: "0.55",
                objectPosition: "center",
                transition: "opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "0.85")}
            />
            <div
              className="absolute inset-0 flex flex-col justify-center items-center"
              style={{
                color: "#D8D2C2",
              }}
            >
              <h1
                className="text-6xl font-bold mb-2 animate-welcome"
                style={{
                  textShadow: "4px 4px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                Welcome to Book Review Hub
              </h1>

              <p
                className="text-2xl text-center font-semibold"
                style={{
                  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                  animation: "fadeIn 2s ease-out",
                }}
              >
                Discover, explore, and share reviews of your favorite books! Join a community of passionate readers,
                dive into a world of literary adventures, and exchange insights on the books that inspire you.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section id="featured" className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Featured Books</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{
                  borderColor: "#D8D2C2",
                  borderWidth: "2px",
                  backgroundColor: "#D8D2C2",
                }}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-100 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800">{book.title}</h4>
                  <p className="text-gray-600">{book.author}</p>
                  <button
                    onClick={() => navigate(`/books/${book.id}`)} // Navigate to single book page
                    className="mt-4 px-4 py-2 rounded-md text-white font-medium transition-transform transform hover:scale-105"
                    style={{ backgroundColor: "#40A578" }}
                  >
                    Read More to see Reviews
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
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

export default Home;
