// TODO:
// - Add more info to cards
//     - Release date
//     - Genre
//     - season count
//     - episode count
//     - Runtime
//     - Rating
//     - Cast
//     - Crew
//     - Trailer
//     - Reviews
//     - Similar movies


const apiKey = "3fa16246d70211b92d1c182141c872fa";
const movieSection = document.querySelector("#movie-type-selector");
const tvSection = document.querySelector("#tv-type-selector");

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", () => {
    search();
});

// add enter key listener to search input
const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        search();
    }
});

const search = () => {
    const tv = document.getElementById("btn-tv");
    const type = tv.checked ? "tv" : "movie";

    const searchInput = document.querySelector("#search-input");
    const searchValue = searchInput.value;
    searchInput.value = "";


    const language = document.querySelector("#language").value;
    fetch("https://api.themoviedb.org/3/search/" + type + "?api_key=" + apiKey + "&language=" + language + "&query=" + searchValue + "&page=1&include_adult=false")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const results = data.results;
            const resultContainer = document.querySelector(".card-container");
            resultContainer.innerHTML = "";
            results.forEach(result => {
                const resultCard = createContentCard(result);
                resultContainer.appendChild(resultCard);
            });
        });
}


const movieType = document.querySelector("#btn-movies");
movieType.addEventListener("click", () => {
    getContent();
    tvSection.classList.add("display-none");
    movieSection.classList.remove("display-none");
});
const tvType = document.querySelector("#btn-tv");

tvType.addEventListener("click", () => {
    getContent();
    movieSection.classList.add("display-none");
    tvSection.classList.remove("display-none");
});


const getContent = () => {
    const tv = document.getElementById("btn-tv");
    const type = tv.checked ? "tv/" : "movie/";
    const category = type === "tv/" ? getTVCategory() : getMovieCategory();

    console.log("Category: " + category);
    const language = document.querySelector("#language").value;
    fetch("https://api.themoviedb.org/3/" + type + category + "?api_key=" + apiKey + "&language=" + language + "&page=1")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const movies = data.results;
            const movieContainer = document.querySelector(".card-container");
            movieContainer.innerHTML = "";
            movies.forEach(movie => {
                const movieCard = createContentCard(movie);
                movieContainer.appendChild(movieCard);
            });
        });
}

const filterButtons = [
    "btn-movies-latest",
    "btn-movies-popular",
    "btn-movies-top-rated",
    "btn-tv-latest",
    "btn-tv-popular",
    "btn-tv-top-rated",
];

filterButtons.forEach((buttonId) => {
    const button = document.querySelector(`#${buttonId}`);
    button.addEventListener("click", getContent);
});

const popularMovies = document.querySelector("#btn-movies-popular");
const topRatedMovies = document.querySelector("#btn-movies-top-rated");
const latestMovies = document.querySelector("#btn-movies-latest");
const popularTV = document.querySelector("#btn-tv-popular");
const topRatedTV = document.querySelector("#btn-tv-top-rated");
const latestTV = document.querySelector("#btn-tv-latest");


const getMovieCategory = () => {
    if (popularMovies.checked) {
        return "popular";
    } else if (topRatedMovies.checked) {
        return "top_rated";
    } else {
        return "now_playing";
    }
}

const getTVCategory = () => {
    if (popularTV.checked) {
        return "popular";
    } else if (topRatedTV.checked) {
        return "top_rated";
    } else {
        return "airing_today";
    }
}


const createContentCard = (content) => {

    const tv = document.getElementById("btn-tv");
    const type = tv.checked ? "tv/" : "movie/";
    const title = type === "tv/" ? content.name : content.title;

    const contentCard = document.createElement("div");
    contentCard.classList.add("card");
    contentCard.classList.add("m-2");
    contentCard.style.width = "16rem";

    const poster = document.createElement("img");
    poster.classList.add("card-img-top");
    poster.src = 'https://image.tmdb.org/t/p/w400' + content.poster_path;
    poster.alt = title;
    contentCard.appendChild(poster);

    const body = document.createElement("div");
    body.classList.add("card-body");


    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");
    btnGroup.classList.add("btn-group-sm");
    btnGroup.classList.add("card-btn-group");
    btnGroup.setAttribute("role", "group");
    btnGroup.setAttribute("aria-label", "Basic example");

    const btn1 = document.createElement("input");
    btn1.classList.add("btn-check");
    btn1.setAttribute("type", "radio");
    btn1.setAttribute("name", "radio-" + content.id);
    btn1.setAttribute("id", "radio1-" + content.id);
    btn1.setAttribute("autocomplete", "off");
    btn1.setAttribute("checked", "");

    const btn1Label = document.createElement("label");
    btn1Label.classList.add("btn");
    btn1Label.classList.add("btn-outline-primary");
    btn1Label.textContent = "Info";
    btn1Label.setAttribute("for", "radio1-" + content.id);

    btn1Label.addEventListener("click", () => {
        const descriptionContainer = contentCard.querySelector(".description-container");
        const castContainer = contentCard.querySelector(".cast-container");
        const seasonsContainer = contentCard.querySelector(".seasons-container");
        descriptionContainer.classList.remove("display-none");
        castContainer.classList.add("display-none");
        seasonsContainer.classList.add("display-none");
        btn1.setAttribute("checked", "");
        btn2.removeAttribute("checked");
        btn3.removeAttribute("checked");
    });

    const btn2 = document.createElement("input");
    btn2.classList.add("btn-check");
    btn2.setAttribute("type", "radio");
    btn2.setAttribute("name", "radio-" + content.id);
    btn2.setAttribute("id", "radio2-" + content.id);
    btn2.setAttribute("autocomplete", "off");

    const btn2Label = document.createElement("label");
    btn2Label.classList.add("btn");
    btn2Label.classList.add("btn-outline-primary");
    btn2Label.textContent = "Cast";
    btn2Label.setAttribute("for", "radio2-" + content.id);

    // add listener to button
    btn2Label.addEventListener("click", () => {
        const descriptionContainer = contentCard.querySelector(".description-container");
        const castContainer = contentCard.querySelector(".cast-container");
        const seasonsContainer = contentCard.querySelector(".seasons-container");
        castContainer.classList.remove("display-none");
        descriptionContainer.classList.add("display-none");
        seasonsContainer.classList.add("display-none");
        btn1.removeAttribute("checked");
        btn2.setAttribute("checked", "");
        btn3.removeAttribute("checked");

    });

    const btn3 = document.createElement("input");
    btn3.classList.add("btn-check");
    btn3.setAttribute("type", "radio");
    btn3.setAttribute("name", "radio-" + content.id);
    btn3.setAttribute("id", "radio3-" + content.id);
    btn3.setAttribute("autocomplete", "off");

    const btn3Label = document.createElement("label");
    btn3Label.classList.add("btn");
    btn3Label.classList.add("btn-outline-primary");
    if (type === "tv/") {
        btn3Label.textContent = "Seasons";
    } else {
        btn3Label.textContent = "Something";
    }
    btn3Label.setAttribute("for", "radio3-" + content.id);

    // add listener to button
    btn3Label.addEventListener("click", () => {
        const descriptionContainer = contentCard.querySelector(".description-container");
        const castContainer = contentCard.querySelector(".cast-container");
        const seasonsContainer = contentCard.querySelector(".seasons-container");
        descriptionContainer.classList.add("display-none");
        castContainer.classList.add("display-none");
        seasonsContainer.classList.remove("display-none");
        btn1.removeAttribute("checked");
        btn2.removeAttribute("checked");
        btn3.setAttribute("checked", "");
    });

    btnGroup.append(
        btn1,
        btn1Label,
        btn2,
        btn2Label,
        btn3,
        btn3Label
    );

    body.appendChild(btnGroup);

    const titleElement = document.createElement("h4");
    titleElement.classList.add("card-title");
    titleElement.textContent = title;
    body.appendChild(titleElement);

    // get description and append to body
    createDescription(content).then(descriptionContainer => {
        body.appendChild(descriptionContainer);
    });
    
    // get cast list and append to body
    getCast(content).then(castContainer => {
        body.appendChild(castContainer);
    });

    if (type === "tv/") {
        getSeasonList(content).then(seasonsContainer => {
            body.appendChild(seasonsContainer);
        });
    } else {
        /* createGenres(content).then(genresContainer => {
            body.appendChild(genresContainer);
        }); */
    }

    // append body to content card
    contentCard.appendChild(body);
    
    return contentCard;
}

const createDescription = async (content) => {
    const language = document.querySelector("#language").value;
    const tv = document.getElementById("btn-tv");
    const type = tv.checked ? "tv/" : "movie/";
    const response = await fetch("https://api.themoviedb.org/3/" + type + content.id + "?api_key=" + apiKey + "&language=" + language);
    const data = await response.json();

    
    const container = document.createElement("div");
    container.classList.add("description-container");
    
    const descTable = document.createElement("table");
    descTable.classList.add("desc-table");
    const imdbRating = document.createElement("tr");
    imdbRating.innerHTML = "<td class='align-left'>IMDB Rating</td><td class='align-right'>" + data.vote_average + "</td>";
    
    if (type == "movie/") {
        const releaseDate = document.createElement("tr");
        releaseDate.innerHTML = "<td class='align-left'>Release Date</td><td class='align-right'>" + data.release_date + "</td>";
        const runtime = document.createElement("tr");
        runtime.innerHTML = "<td class='align-left'>Runtime</td><td class='align-right'>" + data.runtime + " minutes</td>";
        descTable.append(imdbRating, releaseDate, runtime);
    } else {
        const firstAirDate = document.createElement("tr");
        firstAirDate.innerHTML = "<td class='align-left'>First Air Date</td><td class='align-right'>" + data.first_air_date + "</td>";
        const lastAirDate = document.createElement("tr");
        lastAirDate.innerHTML = "<td class='align-left'>Last Air Date</td><td class='align-right'>" + data.last_air_date + "</td>";
        const episodeRuntime = document.createElement("tr");
        episodeRuntime.innerHTML = "<td class='align-left'>Episode Runtime</td><td class='align-right'>" + data.episode_run_time[0] + " minutes</td>";
        descTable.append(imdbRating, firstAirDate, lastAirDate, episodeRuntime);
    }
    
    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = content.overview;
    container.append(descTable, description);

    return container;
}

const getCast = async (movie) => {
    const tv = document.getElementById("btn-tv");
    const type = tv.checked ? "tv/" : "movie/";
    console.log(type);

    const response = await fetch("https://api.themoviedb.org/3/" + type + movie.id + "/credits?api_key=" + apiKey);
    const data_1 = await response.json();
    console.log(data_1);
    const cast = data_1.cast;
    // only count up to 10 cast members
    const castCount = cast.length > 12 ? 12 : cast.length;
    const castContainer = document.createElement("div");
    castContainer.classList.add("cast-container");
    castContainer.classList.add("display-none");
    const castTable = document.createElement("table");
    castTable.classList.add("cast-table");
    const castHeader = document.createElement("tr");
    const castNameHeader = document.createElement("th");
    castNameHeader.classList.add("cast-name");
    castNameHeader.classList.add("align-left");
    castNameHeader.textContent = "Name";
    const castCharacterHeader = document.createElement("th");
    castCharacterHeader.classList.add("cast-character");
    castCharacterHeader.classList.add("align-right");
    castCharacterHeader.textContent = "Character";
    castHeader.appendChild(castNameHeader);
    castHeader.appendChild(castCharacterHeader);
    castTable.appendChild(castHeader);
    for (let i = 0; i < castCount; i++) {
        const castMember = cast[i];
        const castRow = createCastCard(castMember);
        castTable.appendChild(castRow);
    }
    castContainer.appendChild(castTable);
    return castContainer;
}

const createCastCard = (castMember) => {

    const castRow = document.createElement("tr");
    const castName = document.createElement("td");
    castName.classList.add("cast-name");
    castName.classList.add("align-left");
    castName.textContent = castMember.name;
    const castCharacter = document.createElement("td");
    castCharacter.classList.add("cast-character");
    castCharacter.classList.add("align-right");
    castCharacter.textContent = castMember.character;

    castRow.appendChild(castName);
    castRow.appendChild(castCharacter);

    return castRow;
}

const getSeasonList = async (tv) => {
    const response = await fetch("https://api.themoviedb.org/3/tv/" + tv.id + "?api_key=" + apiKey);
    const data_1 = await response.json();
    console.log(data_1);
    const seasonsContainer = document.createElement("div");
    seasonsContainer.classList.add("seasons-container");
    seasonsContainer.classList.add("display-none");
    const seasonsTable = document.createElement("table");
    seasonsTable.classList.add("seasons-table");
    const seasonsHeader = document.createElement("tr");
    const seasonNumberHeader = document.createElement("th");
    seasonNumberHeader.classList.add("season-number");
    seasonNumberHeader.textContent = "Season";
    const seasonEpisodesHeader = document.createElement("th");
    seasonEpisodesHeader.classList.add("season-episodes");
    seasonEpisodesHeader.textContent = "Episodes";
    seasonsHeader.appendChild(seasonNumberHeader);
    seasonsHeader.appendChild(seasonEpisodesHeader);
    seasonsTable.appendChild(seasonsHeader);
    for (let i = 1; i <= data_1.number_of_seasons; i++) {
        const season = i;
        console.log(season);
        const response = await fetch("https://api.themoviedb.org/3/tv/" + tv.id + "/season/" + season + "?api_key=" + apiKey);
        const data_2 = await response.json();
        console.log(data_2);

        const seasonRow = createSeasonCard(data_2);
        seasonsTable.appendChild(seasonRow);
    }
    seasonsContainer.appendChild(seasonsTable);
    return seasonsContainer;
}

const createSeasonCard = (season) => {
    const seasonRow = document.createElement("tr");
    const seasonNumber = document.createElement("td");
    seasonNumber.classList.add("season-number");
    seasonNumber.textContent = season.season_number;
    const seasonEpisodes = document.createElement("td");
    seasonEpisodes.classList.add("season-episodes");
    seasonEpisodes.textContent = season.episodes.length;

    seasonRow.appendChild(seasonNumber);
    seasonRow.appendChild(seasonEpisodes);

    return seasonRow;
}

const changeLanguage = () => {
    const movieContainer = document.querySelector(".card-container");
    movieContainer.innerHTML = "";
    getContent();
}

getContent();