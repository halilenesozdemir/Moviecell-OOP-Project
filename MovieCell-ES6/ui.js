class UI {
  static addFormUI() {
    const form = document.getElementById('movie-form');
    form.innerHTML += `

    <div class="row">
              <div class=" col-md-6  mb-3 mb-md-3">
                <input class="form-control" type="text" name="name" id="name" placeholder="Movie Name" />
                </div>
              <div class=" col-md-6  mb-3 mb-md-3">
                <input class="form-control" type="text" name="director" id="director" placeholder="Director" />
              </div>
              <div class="col-md-6 mb-3 mb-md-4">
                <input class="form-control" type="text" name="url" id="url" placeholder="Poster URL" />
              </div>
              <div class=" col-md-6 mb-3 mb-md-4">
                <input class="form-control" type="text" name="release" id="release" placeholder="Release Date (YYYY-AA-GG)" />
              </div>

              <div class="d-flex justify-content-center align-items-center flex-column gap-3">
                <button type="submit" id="add-movie-submit" class="btn btn-danger px-3 py-1 btn-block ">Add Movie</button> 
                <button type="submit" id="clear-all" class="btn btn-dark px-3 py-1">Clear All</button> 
             </div>
            </div>

  `;
  }

  static addMovieToList(newMovie) {
    const album = document.querySelector('#album');
    album.innerHTML += `
                        <div class="col-lg-4 col-md-6 col-sm-10-auto mb-3 ancestor">
                          <div class="card shadow-sm">
                                <img class="card-img-top" width="100%" height="400" src="${newMovie.url}"></img>
                                <div class="card-body">
                                        <h4 class="text-center name">${newMovie.name}</h4>
                                        <p class="card-text">Director: ${newMovie.director}</p>
                                        <p class="card-text">Release Year: ${newMovie.release}</p>
                                      <div class="d-flex space-between  justify-content-between mt-2">
                                         <button type="button" class="btn btn-sm btn-outline-primary fs-6 py-1 px-4" id="edit-movie">Edit</button>
                                         <button type="button" class="btn btn-sm btn-outline-danger fs-6 py-1 px-4" id="delete-movie">Delete</button>
                                       </div>

                                </div>
                        </div>
                </div>`;
  }

  static clearFields(field1, field2, field3, field4) {
    field1.value = '';
    field2.value = '';
    field3.value = '';
    field4.value = '';
  }

  static showAlert(msg, type) {
    const section = document.getElementById('section');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = msg;

    section.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 1500);
  }

  static deleteMovieFromList(element) {
    element.remove();
  }

  static clearAllMoviesFromList(e) {
    if (localStorage.getItem('movies') === null) {
      ui.showAlert('Movie collection is empty.', 'warning');
    } else {
      while (album.firstChild !== null) {
        album.removeChild(album.firstChild);
      }
      localStorage.removeItem('movies');
    }
    e.preventDefault();
  }

  static removeAddMovieButton() {
    addMovieButton.remove();
  }

  static editMovieUI(e) {
    const oldName = e.target.parentElement.parentElement.children[0].textContent;
    const oldDirector = e.target.parentElement.parentElement.children[1].innerHTML.split(': ')[1];
    const oldURL = e.target.parentElement.parentElement.parentElement.children[0].src;
    const oldRelease = e.target.parentElement.parentElement.children[2].textContent.split(': ')[1];

    const newName = prompt("Yeni film ismini giriniz.(Movies.json'dan yararlanabilirsiniz 😉)");
    const newDirector = prompt('Yeni yönetmen adını giriniz.');
    const newURL = prompt("Yeni film URL'ini giriniz.");
    const newRelease = prompt('Film çıkış tarihini giriniz.(YYYY-AA-GG formatında)');

    const oldValues = [oldName, oldDirector, oldRelease, oldURL];
    const newValues = [newName, newDirector, newRelease, newURL];

    if (newURL == null || newName == null || newDirector == null || newRelease == null) {
      return;
    } else {
      LStorage.editMovieStorage(oldValues, newValues);

      e.target.parentElement.parentElement.parentElement.innerHTML = `

              <img class='card-img-top' width='100%' height='400' src='${newURL}'></img>
              <div class='card-body'>
                <h4 class='text-center name'>${newName}</h4>
                <p class='card-text'>Director: ${newDirector}</p>
                <p class='card-text'>Release Year: ${newRelease}</p>
                <div class='d-flex space-between  justify-content-between mt-2'>
                  <button type='button' class='btn btn-sm btn-outline-primary fs-6 py-1 px-4' id='edit-movie'>
                    Edit
                  </button>
                  <button type='button' class='btn btn-sm btn-outline-danger fs-6 py-1 px-4' id='delete-movie'>
                    Delete
                  </button>
                </div>
              </div>
  `;
    }
  }
}
