const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const enteryTextSection = document.getElementById('entry-text');

const movies = [];

const toggleBackdrop = function(){
    backdrop.classList.toggle("visible");
}

const closeMovieModal = function(){
    addMovieModal.classList.remove("visible");
    toggleBackdrop();
}

const showMovieModal = function(){
    addMovieModal.classList.add("visible")
    toggleBackdrop();
}

const updateUi = function(){
    if(movies.length === 0){
        enteryTextSection.style.display = "block";
    }else{
        enteryTextSection.style.display = "none";
    }
}

const clearMovieModal = function(){
    for(usrInput of userInputs){
        usrInput.value = ""
    }
    closeMovieModal();
}

const deleteMovie =  function(movieId){
    let movieIndex = -1;
    for(const movie of movies){
        console.log(movie.id);
        if(movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    console.log(movieIndex);
    movies.splice(movieIndex,1)
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);
}

const deleteMovieHandler = function(movieId){
    const deleteMovieModal = document.getElementById('delete-modal');
    deleteMovieModal.classList.add('visible');
    deleteMovie(movieId);
    toggleBackdrop();
}

const renderNewMovieElement = function(Id,title,image,rating){
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${image}" alt="${title}" />
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 star ★</p>
        </div>
    `
    newMovieElement.addEventListener('click',deleteMovieHandler.bind(null,Id))
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
}

const addMoviHandler = function(){
    const titleValue = userInputs[0].value;
    const imgUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    
    if(titleValue.trim() === "" || 
       imgUrlValue.trim() === "" || 
       ratingValue.trim() === "" ||
       +ratingValue <1 || 
       +ratingValue >5){
           alert('Please enter a valid rating or other value');
           return;
       }

      const newMovie = {
          Id : Math.random().toString(),
          title: titleValue,
          image: imgUrlValue,
          rating: ratingValue
      };
      movies.push(newMovie);
      console.log(movies);
      updateUi();
      renderNewMovieElement(newMovie.Id,newMovie.title, newMovie.image, newMovie.rating);
      clearMovieModal();
}

const cancelAddMovie = function(){
    // toggleMovieModal();
    clearMovieModal();
}
const backdropClickHandler = function(){
    closeMovieModal();
}

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', closeMovieModal);
confirmAddMovieButton.addEventListener('click', addMoviHandler);