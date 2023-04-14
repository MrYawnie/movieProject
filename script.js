const apiKey = "3fa16246d70211b92d1c182141c872fa";

const nowPlayingMovies = document.querySelector("#btn-movies-latest");
nowPlayingMovies.addEventListener("click", () => {
    getMovies();
});
const popularMovies = document.querySelector("#btn-movies-popular");
popularMovies.addEventListener("click", () => {
    getMovies();
});
const topRatedMovies = document.querySelector("#btn-movies-top-rated");
topRatedMovies.addEventListener("click", () => {
    getMovies();
});

const getMovieCategory = () => {
    if (popularMovies.checked) {
        return "popular";
    } else if (topRatedMovies.checked) {
        return "top_rated";
    } else {
        return "now_playing";
    }
}

const getMovies = () => {
    const category = getMovieCategory();
    console.log("Category: " + category);
    const language = document.querySelector("#language").value;
    fetch("https://api.themoviedb.org/3/movies/" + category + "?api_key=" + apiKey + "&language=" + language + "&page=1")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const movies = data.results;
            const movieContainer = document.querySelector(".card-container");
            movieContainer.innerHTML = "";
            movies.forEach(movie => {
                const movieCard = createMovieCard(movie);
                movieContainer.appendChild(movieCard);
            });
        });
}


const createMovieCard = (movie) => {
    
    const movieCard = document.createElement("div");
    movieCard.classList.add("card");
    movieCard.classList.add("m-2");
    movieCard.style.width = "16rem";
    
    const poster = document.createElement("img");
    poster.classList.add("card-img-top");
    poster.src = 'https://image.tmdb.org/t/p/w400' + movie.poster_path;
    poster.alt = movie.title;
    movieCard.appendChild(poster);
    
    const body = document.createElement("div");
    body.classList.add("card-body");
    
    const releaseDate = document.createElement("p");
    releaseDate.classList.add("card-text");
    releaseDate.textContent = movie.release_date;
    body.appendChild(releaseDate);
    
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");
    btnGroup.classList.add("btn-group-sm");
    btnGroup.setAttribute("role", "group");
    btnGroup.setAttribute("aria-label", "Basic example");
    
    const btn1 = document.createElement("input");
    btn1.classList.add("btn-check");
    btn1.setAttribute("type", "radio");
    btn1.setAttribute("name", "radio-" + movie.id);
    btn1.setAttribute("id", "radio1-" + movie.id);
    btn1.setAttribute("autocomplete", "off");
    btn1.setAttribute("checked", "");

    const btn1Label = document.createElement("label");
    btn1Label.classList.add("btn");
    btn1Label.classList.add("btn-outline-primary");
    btn1Label.textContent = "Info";
    btn1Label.setAttribute("for", "radio1-" + movie.id);

    btn1Label.addEventListener("click", () => {
        description.classList.remove("display-none");
        const castTable = movieCard.querySelector(".cast-table");
        castTable.classList.add("display-none");
        btn1.setAttribute("checked", "");
        btn2.removeAttribute("checked");
        btn3.removeAttribute("checked");
    });
    
    const btn2 = document.createElement("input");
    btn2.classList.add("btn-check");
    btn2.setAttribute("type", "radio");
    btn2.setAttribute("name", "radio-" + movie.id);
    btn2.setAttribute("id", "radio2-" + movie.id);
    btn2.setAttribute("autocomplete", "off");

    const btn2Label = document.createElement("label");
    btn2Label.classList.add("btn");
    btn2Label.classList.add("btn-outline-primary");
    btn2Label.textContent = "Cast";
    btn2Label.setAttribute("for", "radio2-" + movie.id);

    // add listener to button
    btn2Label.addEventListener("click", () => {
        const castTable = movieCard.querySelector(".cast-table");
        castTable.classList.remove("display-none");
        description.classList.add("display-none");
        btn1.removeAttribute("checked");
        btn2.setAttribute("checked", "");
        btn3.removeAttribute("checked");

    });
    
    const btn3 = document.createElement("input");
    btn3.classList.add("btn-check");
    btn3.setAttribute("type", "radio");
    btn3.setAttribute("name", "radio-" + movie.id);
    btn3.setAttribute("id", "radio3-" + movie.id);
    btn3.setAttribute("autocomplete", "off");

    const btn3Label = document.createElement("label");
    btn3Label.classList.add("btn");
    btn3Label.classList.add("btn-outline-primary");
    btn3Label.textContent = "Something";
    btn3Label.setAttribute("for", "radio3-" + movie.id);

    // add listener to button
    btn3Label.addEventListener("click", () => {
        description.classList.add("display-none");
        const castTable = movieCard.querySelector(".cast-table");
        castTable.classList.add("display-none");
        btn1.removeAttribute("checked");
        btn2.removeAttribute("checked");
        btn3.setAttribute("checked", "");
    });
    
    btnGroup.appendChild(btn1);
    btnGroup.appendChild(btn1Label);
    btnGroup.appendChild(btn2);
    btnGroup.appendChild(btn2Label);
    btnGroup.appendChild(btn3);
    btnGroup.appendChild(btn3Label);
    body.appendChild(btnGroup);
    
    const title = document.createElement("h4");
    title.classList.add("card-title");
    title.textContent = movie.title;
    body.appendChild(title);
    
    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = movie.overview;
    body.appendChild(description);
    
    movieCard.appendChild(body);
    
    // get cast list and append to body
    getCast(movie).then(castContainer => {
        body.appendChild(castContainer);
    });
    
    return movieCard;
}

const getCast = (movie) => {
    return fetch("https://api.themoviedb.org/3/movie/" + movie.id + "/credits?api_key=" + apiKey)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const cast = data.cast;
        // only count up to 10 cast members
        const castCount = cast.length > 12 ? 12 : cast.length;
        const castContainer = document.createElement("table");
        castContainer.classList.add("cast-table");
        castContainer.classList.add("display-none");
        const castHeader = document.createElement("tr");
        const castNameHeader = document.createElement("th");
        castNameHeader.classList.add("cast-name");
        castNameHeader.textContent = "Name";
        const castCharacterHeader = document.createElement("th");
        castCharacterHeader.classList.add("cast-character");
        castCharacterHeader.textContent = "Character";
        castHeader.appendChild(castNameHeader);
        castHeader.appendChild(castCharacterHeader);
        castContainer.appendChild(castHeader);

        for (let i = 0; i < castCount; i++) {
          const castMember = cast[i];
          const castRow = createCastCard(castMember);
          castContainer.appendChild(castRow);
        }
        return castContainer;
      });
  }
  

const createCastCard = (castMember) => {
    
    const castRow = document.createElement("tr");
    const castName = document.createElement("td");
    castName.classList.add("cast-name");
    castName.textContent = castMember.name;
    const castCharacter = document.createElement("td");
    castCharacter.classList.add("cast-character");
    castCharacter.textContent = castMember.character;
    
    castRow.appendChild(castName);
    castRow.appendChild(castCharacter);
    
    return castRow;
}

const changeLanguage = () => {
    const movieContainer = document.querySelector(".card-container");
    movieContainer.innerHTML = "";
    getMovies();
}

getMovies();