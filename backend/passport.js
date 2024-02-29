const express = require("express");
const passport = require("passport");
const WindowsAuthStrategy = require("passport-windowsauth");

const app = express();

// Configure Windows authentication strategy
passport.use(new WindowsAuthStrategy());

// Initialize Passport
app.use(passport.initialize());

// Middleware to protect routes
app.use((req, res, next) => {
  // Check if the request is authenticated
  if (req.isAuthenticated()) {
    return next();
  } else {
    // Handle unauthenticated requests
    return res.status(401).send("Unauthorized");
  }
});

// Example protected route
app.get("/api/data", (req, res) => {
  // Access authenticated user info using req.user
  res.json({ user: req.user });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
