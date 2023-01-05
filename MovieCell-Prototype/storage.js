function LStorage() {}

LStorage.prototype.addMovieToStorage = function (newMovie) {
  let movies = this.getMoviesFromStorage();
  movies.push(newMovie);
  localStorage.setItem('movies', JSON.stringify(movies));
};

LStorage.prototype.getMoviesFromStorage = function () {
  let movies;

  if (localStorage.getItem('movies') === null) {
    movies = [];
  } else {
    movies = JSON.parse(localStorage.getItem('movies'));
  }
  return movies;
};

LStorage.prototype.deleteMovieFromStorage = function (movieName) {
  let movies = this.getMoviesFromStorage();

  movies.forEach(function (movie, index) {
    if (movie.name === movieName) {
      movies.splice(index, 1);
    }
  });

  localStorage.setItem('movies', JSON.stringify(movies));
};

LStorage.prototype.clearAllMoviesFromStorage = function () {
  localStorage.removeItem('movies');
  localStorage.removeItem('firstStart');
};

LStorage.prototype.editMovieStorage = function (oldValue, newValue) {
  let movies = this.getMoviesFromStorage();
  movies.forEach(function (mov) {
    for (const property in mov) {
      oldValue.forEach((old, i) => {
        if (mov[property] == old) {
          mov[property] = newValue[i];
        }
      });
    }
  });
  localStorage.setItem('movies', JSON.stringify(movies));
};
