const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get initial movies  means initially all the movies are displayed in the screen
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  // console.log(res);

  const data = await res.json();
  // console.log(data);

  showMovies(data.results); // call the function to show the movies in the web page
  // console.log(data.results);
}

function showMovies(movies) {
  // console.log(movies);

  main.innerHTML = "";

  movies.forEach((movie) => {
    // console.log(movie);
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div"); // create a movieElement like div to show the single movie card
    movieEl.classList.add("movie"); // add the class means <div class="movie"></div>

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

    main.appendChild(movieEl); // to append the movieEl as a child to show the movie
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  // console.log(searchTerm);

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
