const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Load movie data from local JSON file
// Since this is a small assignment, we don't need a database
const moviesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "movies_metadata.json"), "utf8")
);

app.get("/api/ping", (request, response) => {
  response.send("pong!");
});

app.get("/api/movies", (request, response) => {
  response.json(moviesData);
});

app.get("/api/movies/:id", (request, response) => {
  const movieId = parseInt(request.params.id);
  const movie = moviesData.find(m => m.id === movieId);

  if (movie) {
    response.json(movie);
  } else {
    response.status(404).json({ error: "Movie not found" });
  }
});

// Serve static files in production, use port 3001 in development
const port = process.env.NODE_ENV === "production"
  ? process.env.PORT || 3000
  : 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

app.listen(port);
