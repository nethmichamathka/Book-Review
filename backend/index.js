import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for frontend-backend communication
app.use(cors());

// Connect to MongoDB
connectDB();

// Register routes
app.use("/reviews", bookRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the MERN Stack Review API!");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
