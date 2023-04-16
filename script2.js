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

    const releaseDate = document.createElement("p");
    releaseDate.classList.add("card-text");
    releaseDate.textContent = content.release_date;
    body.appendChild(releaseDate);

    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");
    btnGroup.classList.add("btn-group-sm");
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
        description.classList.remove("display-none");
        const castTable = contentCard.querySelector(".cast-table");
        castTable.classList.add("display-none");
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
        const castTable = contentCard.querySelector(".cast-table");
        castTable.classList.remove("display-none");
        description.classList.add("display-none");
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
    btn3Label.textContent = "Something";
    btn3Label.setAttribute("for", "radio3-" + content.id);

    // add listener to button
    btn3Label.addEventListener("click", () => {
        description.classList.add("display-none");
        const castTable = contentCard.querySelector(".cast-table");
        castTable.classList.add("display-none");
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

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = content.overview;
    body.appendChild(description);

    contentCard.appendChild(body);

    // get cast list and append to body
    getCast(content).then(castContainer => {
        body.appendChild(castContainer);
    });

    return contentCard;
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
    getContent();
}

getContent();