//save items to local storage 
// https://www.omdbapi.com/ 

const apiKey = "a4deaecd"

const movieInput = document.getElementById('search-input')
const searchBtn = document.getElementById('submit-button')
const form = document.getElementById('search-bar')
const resultsGrid = document.getElementById('search-results-grid')
const savedMovieGrid = document.getElementById('saved-movie-list-grid')
 

let likedMoviesArray = []
 

form.addEventListener('submit', function(e) {
    e.preventDefault()
    
    if (movieInput.value) {
        
        let inputString =  movieInput.value.split(" ")
        let searchInput = inputString.map((word, i) => {
            if (i !== inputString.length - 1 ){
                return word + '+'
            } else {
                return word
            }

        }).join('')
       getMoviesArray(searchInput)
    } 
})

async function getMoviesArray(searchInput) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${searchInput}`)
  const data = await res.json()
  if (data.Response === 'True'){
    const moviesArray = data.Search
    const searchTitles = moviesArray.map(function(movie) {
       return movie.Title
    })
    getMoviesHtml(searchTitles)
  } 
  
  else {
    console.log('no movies!')
  }
   
}

async function getMoviesHtml(array){
    let movieHtml = ''
    for (let i = 0; i < array.length; i++) {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&t=${array[i]}`)
      const data = await res.json()
             //   console.log(data)
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
                        <button class="watchlist-btn" id=${data.imdbID} data-add-movie='${data.imdbID}'> watchlist</button>
                    </div>

                    <div class="summary">
                        <p>${data.Plot}.</p>
                    </div>
                </div>
            </div>`
    }
    resultsGrid.innerHTML = movieHtml
}











document.addEventListener('click', function(){
    console.log('click!')
})


//save movie to local storage and likedMoviesArray


document.addEventListener('click', (e) => {
    let selectedMovie = e.target.dataset.addMovie 
    if (selectedMovie) {
    
        if(!likedMoviesArray.includes(selectedMovie)) {
            
            likedMoviesArray.push(selectedMovie)
            localStorage.setItem('likedMoviesArray', JSON.stringify(likedMoviesArray));
            console.log(likedMoviesArray)
       }
       
    
    }})

    