 const savedMovies = localStorage.getItem('likedMoviesArray')
 const apiKey = "a4deaecd" 
 const savedAray = JSON.parse(savedMovies)
 const savedMovieGrid = document.getElementById('saved-movie-list-grid')
 let likedMoviesArray = []






document.addEventListener('DOMContentLoaded', function() {
    renderPickedMovies(savedAray)
})



async function renderPickedMovies(array){
    let movieHtml = ''
    for (let i = 0; i < array.length; i++) {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&i=${array[i]}`)
      const data = await res.json()
        movieHtml +=  `
             <div class="search-item">
                <div class="title-container flex">
                    <img src="${data.Poster}">
                    <div class="title-block desktop-block flex">
                        <h5>${data.Title}</h5>
                        <p class="rating">${data.imdbRating}</p>
                    </div>
                </div>

                <div class="details">
                    <div class="details-block flex">
                        <p class="length">${data.Runtime}</p>
                        <p class="category">${data.Genre}</p>
                        <button class="watchlist-btn" id=${data.imdbID} data-add-movie='${data.imdbID}'>Remove</button>
                    </div>

                    <div class="summary">
                        <p>${data.Plot}.</p>
                    </div>
                </div>
            </div>`
    }
    savedMovieGrid.innerHTML = movieHtml
}


console.log(savedAray)


//remove movie from local storage and likedMoviesArray


document.addEventListener('click', (e) => {
    let selectedMovie = e.target.dataset.addMovie 
    if (selectedMovie) {
    
            const index = savedAray.findIndex(item => item === selectedMovie)
            savedAray.splice(index, 1)
       

            localStorage.setItem('likedMoviesArray', JSON.stringify(savedAray));
            console.log(savedAray)
       
       renderPickedMovies(savedAray)
    
    }})