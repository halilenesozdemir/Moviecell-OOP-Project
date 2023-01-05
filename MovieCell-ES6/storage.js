class LStorage {
  static addMovieToStorage(newMovie) {
    let movies = this.getMoviesFromStorage();
    movies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  static getMoviesFromStorage() {
    let movies;

    if (localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }
    return movies;
  }

  static deleteMovieFromStorage(movieName) {
    let movies = this.getMoviesFromStorage();

    movies.forEach(function (movie, index) {
      if (movie.name === movieName) {
        movies.splice(index, 1);
      }
    });

    localStorage.setItem('movies', JSON.stringify(movies));
  }

  static clearAllMoviesFromStorage() {
    localStorage.removeItem('movies');
    localStorage.removeItem('firstStart');
  }

  static editMovieStorage(oldValue, newValue) {
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
  }
}
