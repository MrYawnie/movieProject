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
const popularMovies = document.querySelector("#btn-movies-popular");
const topRatedMovies = document.querySelector("#btn-movies-top-rated");
const latestMovies = document.querySelector("#btn-movies-latest");
const popularTV = document.querySelector("#btn-tv-popular");
const topRatedTV = document.querySelector("#btn-tv-top-rated");
const latestTV = document.querySelector("#btn-tv-latest");

const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const movieType = document.querySelector("#btn-movies");

const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");
const page4 = document.querySelector("#page4");
const page5 = document.querySelector("#page5");

const filterButtons = [
    "btn-movies-latest",
    "btn-movies-popular",
    "btn-movies-top-rated",
    "btn-tv-latest",
    "btn-tv-popular",
    "btn-tv-top-rated",
];

searchButton.addEventListener("click", () => {
    search();
});

// add enter key listener to search input

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
                fetch("https://api.themoviedb.org/3/" + type + "/" + result.id + "?api_key=" + apiKey + "&language=" + language + "&append_to_response=credits,recommendations,seasons,videos")
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        const resultCard = createContentCard(data);
                        resultContainer.appendChild(resultCard);
                    });
            });
        });
}

const getRecommendations = (content) => {
    const tv = document.getElementById("btn-tv");
    const type = tv.checked ? "tv/" : "movie/";

    const language = document.querySelector("#language").value;
    fetch("https://api.themoviedb.org/3/" + type + content.id + "/recommendations" + "?api_key=" + apiKey + "&language=" + language)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const results = data.results;
            const resultContainer = document.querySelector(".card-container");
            resultContainer.innerHTML = "";
            results.forEach(result => {
                fetch("https://api.themoviedb.org/3/" + type + result.id + "?api_key=" + apiKey + "&language=" + language + "&append_to_response=credits,recommendations,seasons,videos")
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        const resultCard = createContentCard(data);
                        resultContainer.appendChild(resultCard);
                    });
            });
        });
}


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

// add event listeners to page buttons
page1.addEventListener("click", () => {
    getContent();
});

page2.addEventListener("click", () => {
    getContent();
});

page3.addEventListener("click", () => {
    getContent();
});

page4.addEventListener("click", () => {
    getContent();
});

page5.addEventListener("click", () => {
    getContent();
});


const getContent = () => {
    const tv = document.getElementById("btn-tv");
    const type = tv.checked ? "tv/" : "movie/";
    const category = type === "tv/" ? getTVCategory() : getMovieCategory();
    
    var page = 1;
    if (page1.checked) {
        page = 1;
    } else if (page2.checked) {
        page = 2;
    } else if (page3.checked) {
        page = 3;
    } else if (page4.checked) {
        page = 4;
    } else if (page5.checked) {
        page = 5;
    }
    console.log("Page: " + page);

    console.log("Category: " + category);
    const language = document.querySelector("#language").value;
    fetch("https://api.themoviedb.org/3/" + type + category + "?api_key=" + apiKey + "&language=" + language + "&page=" + page)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const movies = data.results;
            const movieContainer = document.querySelector(".card-container");
            movieContainer.innerHTML = "";
            movies.forEach(movie => {
                fetch("https://api.themoviedb.org/3/" + type + movie.id + "?api_key=" + apiKey + "&language=" + language + "&append_to_response=credits,recommendations,seasons,videos")
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        const movieCard = createContentCard(data);
                        movieContainer.appendChild(movieCard);
                    });
            });
        });
}



filterButtons.forEach((buttonId) => {
    const button = document.querySelector(`#${buttonId}`);
    button.addEventListener("click", getContent);
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
    btnGroup.setAttribute("aria-label", "Card button group");

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
        const seasonsContainer = contentCard.querySelector(".season-container");
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
        const seasonsContainer = contentCard.querySelector(".season-container");
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
        btn3Label
        btn3Label.textContent = "Seasons";
    } else {
        btn3Label.textContent = "Something";
    }
    btn3Label.setAttribute("for", "radio3-" + content.id);

    // add listener to button
    btn3Label.addEventListener("click", () => {
        const descriptionContainer = contentCard.querySelector(".description-container");
        const castContainer = contentCard.querySelector(".cast-container");
        const seasonsContainer = contentCard.querySelector(".season-container");
        descriptionContainer.classList.add("display-none");
        castContainer.classList.add("display-none");
        seasonsContainer.classList.remove("display-none");
        btn1.removeAttribute("checked");
        btn2.removeAttribute("checked");
        btn3.setAttribute("checked", "");
    });

    if (type === "tv/") {
        btnGroup.append(
            btn1,
            btn1Label,
            btn2,
            btn2Label,
            btn3,
            btn3Label
        );
    } else {
        btnGroup.append(
            btn1,
            btn1Label,
            btn2,
            btn2Label
        );
    }

    body.appendChild(btnGroup);

    const titleElement = document.createElement("h4");
    titleElement.classList.add("card-title");
    titleElement.textContent = title;
    body.appendChild(titleElement);

    const descriptionContainer = createDescription(content);
    body.appendChild(descriptionContainer);

    const castContainer = createCast(content);
    body.appendChild(castContainer);

    if (type === "tv/") {
        const seasonsContainer = createSeasons(content);
        body.appendChild(seasonsContainer);
    } else {
        /* createGenres(content).then(genresContainer => {
            body.appendChild(genresContainer);
        }); */
    }

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    cardFooter.classList.add("d-flex");
    cardFooter.classList.add("justify-content-around");

    const footerBtnGroup = document.createElement("div");
    footerBtnGroup.classList.add("btn-group");
    footerBtnGroup.classList.add("btn-group-sm");
    footerBtnGroup.classList.add("footer-btn-group");
    footerBtnGroup.setAttribute("role", "group");
    footerBtnGroup.setAttribute("aria-label", "Footer Button Group");


    const recommendationsBtn = document.createElement("button");
    recommendationsBtn.classList.add("btn");
    recommendationsBtn.classList.add("btn-outline-warning");
    recommendationsBtn.classList.add("btn-sm");
    recommendationsBtn.textContent = "Similar content";
    recommendationsBtn.addEventListener("click", () => {
        getRecommendations(content);
    });

    const trailerBtn = document.createElement("button");
    trailerBtn.classList.add("btn");
    trailerBtn.classList.add("btn-outline-warning");
    trailerBtn.classList.add("btn-sm");
    trailerBtn.textContent = "Trailer";

    if (content.videos.results.length === 0) {
        trailerBtn.classList.add("disabled");
        trailerBtn.innerHTML = "No trailer";
    }

    trailerBtn.addEventListener("click", () => {

        for (let i = 0; i <= content.videos.results.length; i++) {
            if (content.videos.results[i].type === "Trailer" && content.videos.results[i].official === true) {
                window.open("https://www.youtube.com/watch?v=" + content.videos.results[i].key);
                return;
            }
        }
    });

    // create website button <-- removed, as I didn't like the look of it
    /* const websiteBtn = document.createElement("button");
    websiteBtn.classList.add("btn");
    websiteBtn.classList.add("btn-outline-primary");
    websiteBtn.classList.add("btn-sm");
    websiteBtn.textContent = "Website";

    if (content.homepage === "") {
        websiteBtn.classList.add("disabled");
        websiteBtn.innerHTML = "No website";
    }

    websiteBtn.addEventListener("click", () => {
        window.open(content.homepage);
    }); */

    footerBtnGroup.append(recommendationsBtn, trailerBtn);

    cardFooter.append(footerBtnGroup);

    // append body to content card
    contentCard.append(body, cardFooter);

    return contentCard;
}

const createDescription = (content) => {
    const tv = document.getElementById("btn-tv");
    const type = tv.checked ? "tv/" : "movie/";

    const container = document.createElement("div");
    container.classList.add("description-container");

    const descTable = document.createElement("table");
    descTable.classList.add("desc-table");
    const imdbRating = document.createElement("tr");
    imdbRating.innerHTML = "<td class='align-left'>IMDB Rating</td><td class='align-right'>" + content.vote_average + "</td>";

    if (type == "movie/") {
        const releaseDate = document.createElement("tr");
        releaseDate.innerHTML = "<td class='align-left'>Release Date</td><td class='align-right'>" + content.release_date + "</td>";
        const runtime = document.createElement("tr");
        runtime.innerHTML = "<td class='align-left'>Runtime</td><td class='align-right'>" + content.runtime + " minutes</td>";
        descTable.append(imdbRating, releaseDate, runtime);
    } else {
        const firstAirDate = document.createElement("tr");
        firstAirDate.innerHTML = "<td class='align-left'>First Air Date</td><td class='align-right'>" + content.first_air_date + "</td>";
        const lastAirDate = document.createElement("tr");
        lastAirDate.innerHTML = "<td class='align-left'>Last Air Date</td><td class='align-right'>" + content.last_air_date + "</td>";
        const episodeRuntime = document.createElement("tr");
        episodeRuntime.innerHTML = "<td class='align-left'>Episode Runtime</td><td class='align-right'>" + content.episode_run_time[0] + " minutes</td>";
        descTable.append(imdbRating, firstAirDate, lastAirDate, episodeRuntime);
    }

    const genresContainer = document.createElement("div");
    genresContainer.classList.add("genres-container");
    genresContainer.classList.add("d-flex");
    genresContainer.classList.add("justify-content-center");
    genresContainer.classList.add("gap-1");
    genresContainer.classList.add("flex-wrap");
    genresContainer.classList.add("mt-2");

    const genres = content.genres;
    genres.forEach(genre => {
        const genreElement = document.createElement("span");
        genreElement.classList.add("badge", "rounded-pill", "genre-badge");
        genreElement.textContent = genre.name;

        switch (genre.name) {
            case "Action":
                genreElement.classList.add("bg-danger");
                break;
            case "Adventure":
                genreElement.classList.add("bg-info");
                break;
            case "Animation":
                genreElement.classList.add("bg-warning");
                break;
            case "Comedy":
                genreElement.classList.add("bg-warning");
                break;
            case "Crime":
                genreElement.classList.add("bg-dark");
                break;
            case "Documentary":
                genreElement.classList.add("bg-secondary");
                break;
            case "Drama":
                genreElement.classList.add("bg-danger");
                break;
            case "Family":
                genreElement.classList.add("bg-primary");
                break;
            case "Fantasy":
                genreElement.classList.add("bg-success");
                break;
            case "History":
                genreElement.classList.add("bg-light");
                break;
            case "Horror":
                genreElement.classList.add("bg-dark");
                break;
            case "Music":
                genreElement.classList.add("bg-secondary");
                break;
            case "Mystery":
                genreElement.classList.add("bg-info");
                break;
            case "Romance":
                genreElement.classList.add("bg-danger");
                break;
            case "Science Fiction":
                genreElement.classList.add("bg-info");
                break;
            case "Thriller":
                genreElement.classList.add("bg-dark");
                break;
            case "TV Movie":
                genreElement.classList.add("bg-secondary");
                break;
            case "War":
                genreElement.classList.add("bg-dark");
                break;
            case "Western":
                genreElement.classList.add("bg-light");
                break;
            case "Action & Adventure":
                genreElement.classList.add("bg-info");
                break;
            case "Kids":
                genreElement.classList.add("bg-success");
                break;
            case "News":
                genreElement.classList.add("bg-danger");
                break;
            case "Reality":
                genreElement.classList.add("bg-warning");
                break;
            case "Sci-Fi & Fantasy":
                genreElement.classList.add("bg-info");
                break;
            case "Soap":
                genreElement.classList.add("bg-light");
                break;
            case "Talk":
                genreElement.classList.add("bg-secondary");
                break;
            case "War & Politics":
                genreElement.classList.add("bg-dark");
                break;
            default:
                console.log(`Invalid genre entered: ${genre.name}`);
        }

        genresContainer.appendChild(genreElement);
    });

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = content.overview;
    container.append(descTable, genresContainer, description);

    return container;
}

const createCast = (movie) => {
    const tv = document.getElementById("btn-tv");
    const type = tv.checked ? "tv/" : "movie/";
    console.log(type);

    const cast = movie.credits.cast;
    console.log(cast);
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

const createSeasons = (content) => {
    const season = content.seasons;
    console.log(season);

    const seasonContainer = document.createElement("div");
    seasonContainer.classList.add("season-container");
    seasonContainer.classList.add("display-none");
    const seasonTable = document.createElement("table");
    seasonTable.classList.add("season-table");
    const seasonHeader = document.createElement("tr");
    const seasonNameHeader = document.createElement("th");
    seasonNameHeader.classList.add("season-name");
    seasonNameHeader.classList.add("align-left");
    seasonNameHeader.textContent = "Name";
    const seasonEpisodeHeader = document.createElement("th");
    seasonEpisodeHeader.classList.add("season-episode");
    seasonEpisodeHeader.classList.add("align-right");
    seasonEpisodeHeader.textContent = "Episodes";
    seasonHeader.appendChild(seasonNameHeader);
    seasonHeader.appendChild(seasonEpisodeHeader);
    seasonTable.appendChild(seasonHeader);
    for (let i = 0; i < season.length; i++) {
        const seasonMember = season[i];
        const seasonRow = createSeasonCard(seasonMember);
        seasonTable.appendChild(seasonRow);
    }

    seasonContainer.appendChild(seasonTable);


    return seasonContainer;
}

const createSeasonCard = (seasonMember) => {
    const seasonRow = document.createElement("tr");
    const seasonName = document.createElement("td");
    seasonName.classList.add("season-name");
    seasonName.classList.add("align-left");
    seasonName.textContent = seasonMember.name;
    const seasonEpisode = document.createElement("td");
    seasonEpisode.classList.add("season-episode");
    seasonEpisode.classList.add("align-right");
    seasonEpisode.textContent = seasonMember.episode_count;

    seasonRow.appendChild(seasonName);
    seasonRow.appendChild(seasonEpisode);

    return seasonRow;
}

const changeLanguage = () => {
    const movieContainer = document.querySelector(".card-container");
    movieContainer.innerHTML = "";
    getContent();
}

getContent();