const apiKey = "3fa16246d70211b92d1c182141c872fa";

const getMovies = () => {
    const language = document.querySelector("#language").value;
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&language=" + language + "&page=1")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const movies = data.results;
            const movieContainer = document.querySelector(".card-container");
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
    
    const btn1 = document.createElement("button");
    btn1.classList.add("btn");
    btn1.classList.add("btn-primary");
    btn1.textContent = "Info";
    btn1.addEventListener("click", () => {
        description.classList.remove("display-none");
        const castTable = movieCard.querySelector(".cast-table");
        castTable.classList.add("display-none");
    });
    
    const btn2 = document.createElement("button");
    btn2.classList.add("btn");
    btn2.classList.add("btn-primary");
    btn2.textContent = "Cast";
    // add listener to button
    btn2.addEventListener("click", () => {
        const castTable = movieCard.querySelector(".cast-table");
        castTable.classList.remove("display-none");
        description.classList.add("display-none");
    });
    
    const btn3 = document.createElement("button");
    btn3.classList.add("btn");
    btn3.classList.add("btn-primary");
    btn3.textContent = "Button 3";
    
    btnGroup.appendChild(btn1);
    btnGroup.appendChild(btn2);
    btnGroup.appendChild(btn3);
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
        const castCount = cast.length > 10 ? 10 : cast.length;
        const castContainer = document.createElement("table");
        castContainer.classList.add("cast-table");
        castContainer.classList.add("display-none");
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