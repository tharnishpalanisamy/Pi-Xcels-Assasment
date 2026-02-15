import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListMovies from './ListMovies';
import MovieDetails from './MovieDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ListMovies} />
          <Route path="/movie/:id" component={MovieDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
