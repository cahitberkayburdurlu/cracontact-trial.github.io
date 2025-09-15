// TMDb API Key
const apiKey = '69a6237ce6938d2fb74092f8ff3a8f16';

// Movie Suggestions
function getMovieSuggestions() {
    const movieName = document.getElementById('movieName').value.trim();
    const movieSuggestionsList = document.getElementById('movieSuggestions');

    if (!movieName) {
        clearMovieSuggestions();
        return;
    }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`)
        .then(response => response.json())
        .then(data => {
            movieSuggestionsList.innerHTML = '';

            if (data.results && data.results.length > 0) {
                data.results.slice(0, 10).forEach((result, index) => {
                    const listItem = document.createElement('li');
                    const posterPath = result.poster_path
                        ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
                        : 'https://via.placeholder.com/40x60?text=?';

                    listItem.innerHTML = `
                        <img src="${posterPath}" alt="${result.title}" />
                        <span>${result.title}</span>
                    `;

                    // Güncellenmiş: Her liste elemanına tıklanabilir işlev ekliyoruz
                    listItem.onclick = function () {
                        document.getElementById('movieName').value = result.title; // Tıklanan filmi input'a yazıyoruz
                        clearMovieSuggestions();
                        searchMovie(result.id); // Tıklanan filmi ID ile arıyoruz
                    };

                    movieSuggestionsList.appendChild(listItem);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching movie suggestions:', error);
            clearMovieSuggestions();
        });
}

function clearMovieSuggestions() {
    document.getElementById('movieSuggestions').innerHTML = '';
}

// Movie Search
async function searchMovie(movieId) {
    const movieResultElement = document.getElementById('movieResult');

    if (!movieId) {
        alert('Please select a movie!');
        return;
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const movie = await response.json();

        if (movie) {
            const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500';
            document.getElementById('moviePoster').src = posterPath;
            document.getElementById('movieTitle').textContent = movie.title;
            document.getElementById('movieResult').style.display = 'block';
            window.generatedMovieUrl = `https://vidsrc.in/embed/movie/${movie.id}`;
        } else {
            document.getElementById('movieResult').innerHTML = 'Movie not found.';
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}


// Movie Search
async function searchMovie(movieId) {
    const movieResultElement = document.getElementById('movieResult');

    if (!movieId) {
        alert('Please select a movie!');
        return;
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const movie = await response.json();

        if (movie) {
            const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500';
            document.getElementById('moviePoster').src = posterPath;
            document.getElementById('movieTitle').textContent = movie.title;
            document.getElementById('movieResult').style.display = 'block';
            window.generatedMovieUrl = `https://vidsrc.in/embed/movie/${movie.id}`;
        } else {
            document.getElementById('movieResult').innerHTML = 'Movie not found.';
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}


// Series Suggestions
function getSeriesSuggestions() {
    const seriesName = document.getElementById('seriesName').value.trim();
    const seriesSuggestionsList = document.getElementById('seriesSuggestions');

    if (!seriesName) {
        clearSeriesSuggestions();
        return;
    }

    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(seriesName)}`)
        .then(response => response.json())
        .then(data => {
            seriesSuggestionsList.innerHTML = '';

            if (data.results && data.results.length > 0) {
                data.results.slice(0, 10).forEach(result => {
                    const listItem = document.createElement('li');
                    const posterPath = result.poster_path
                        ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
                        : 'https://via.placeholder.com/40x60?text=?';

                    listItem.innerHTML = `
                        <img src="${posterPath}" alt="${result.name}" />
                        <span>${result.name}</span>
                    `;

                    listItem.onclick = function () {
                        document.getElementById('seriesName').value = result.name; // Tıklanan diziyi input'a yazıyoruz
                        clearSeriesSuggestions();
                        searchSeries(); // Tıklanan diziyi hemen aratıyoruz
                    };
                    

                    seriesSuggestionsList.appendChild(listItem);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching series suggestions:', error);
            clearSeriesSuggestions();
        });
}


function clearSeriesSuggestions() {
    document.getElementById('seriesSuggestions').innerHTML = '';
}


// Series Search
async function searchSeries() {
    const seriesName = document.getElementById('seriesName').value.trim();
    const seriesResultElement = document.getElementById('seriesResult');

    if (!seriesName) {
        alert('Please enter a series name!');
        return;
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(seriesName)}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const series = data.results[0];
            const posterPath = series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : 'https://via.placeholder.com/500';
            document.getElementById('seriesPoster').src = posterPath;
            document.getElementById('seriesTitle').textContent = series.name;
            document.getElementById('seriesResult').style.display = 'block';
            window.generatedSeriesUrl = `https://vidsrc.in/embed/tv/${series.id}`;
        } else {
            document.getElementById('seriesResult').innerHTML = 'Series not found.';
        }
    } catch (error) {
        console.error('Error fetching series data:', error);
    }
}

// Film İzle Butonu İşlevi
function watchMovie() {
    const movieUrl = window.generatedMovieUrl;
    if (!movieUrl) {
        alert('No movie URL to watch!');
        return;
    }
    window.open(movieUrl, '_blank');
}

// Dizi İzle Butonu İşlevi
function watchSeries() {
    const seriesUrl = window.generatedSeriesUrl;
    if (!seriesUrl) {
        alert('No series URL to watch!');
        return;
    }
    window.open(seriesUrl, '_blank');
}

function copyMovieToClipboard() {
    const movieUrl = window.generatedMovieUrl;
    if (!movieUrl) {
        alert('No movie URL to copy!');
        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = movieUrl;
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        alert('Movie URL copied to clipboard!');
    } catch (error) {
        console.error('Error copying URL to clipboard:', error);
    } finally {
        document.body.removeChild(textarea);
    }
}
