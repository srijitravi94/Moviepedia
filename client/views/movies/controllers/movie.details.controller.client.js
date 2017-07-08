(function () {
    angular
        .module("moviepedia")
        .controller("movieDetailsController", movieDetailsController);

    function movieDetailsController($routeParams, userService, apiService, $sce, isLoggedIn) {
        var model = this;
        model.movieId = $routeParams.movieId;
        model.isLoggedIn = isLoggedIn;
        model.favoriteMovie = favoriteMovie;
        model.unFavoriteMovie = unFavoriteMovie;
        model.watchlistMovie = watchlistMovie;
        model.undoWatchlistMovie = undoWatchlistMovie;

        function init() {
            getMovieDetails();
            getMovieTrailer();
            getMovieCredits();
            isMovieFavorited();
            isMovieWatchlisted();
        } init();

        function getMovieDetails() {
            apiService
                .getMovieDetails(model.movieId)
                .then(function (movie) {
                    model.movie = movie;
                });
        }

        function getMovieTrailer() {
            var link = 'https://www.youtube.com/embed/';
            apiService
                .getMovieTrailer(model.movieId)
                .then(function (trailer) {
                    model.trailer = $sce.trustAsResourceUrl(link.concat(trailer.results[0].key));
                });
        }
        
        function getMovieCredits() {
            apiService
                .getMovieCredits(model.movieId)
                .then(function (credits) {
                    var movieCrew = credits.crew;
                    var movieCast = credits.cast;

                    for (var i = 0; i < movieCrew.length; i++) {
                        if (movieCrew[i].job == "Director") {
                            model.director = movieCrew[i];
                        }
                    }

                    var cast1 = [];
                    var cast2 = [];
                    for(var i = 0; i< movieCast.length; i++) {
                        if(i%2 == 0) {
                            cast1.push(movieCast[i]);
                        } else {
                            cast2.push(movieCast[i]);
                        }
                    }
                    model.cast1 = cast1;
                    model.cast2 = cast2;
                });
        }

        function favoriteMovie(movieId) {
            userService
                .favoriteMovie(movieId, isLoggedIn._id)
                .then(function (response) {
                    model.isFavorited = true;
                });
        }

        function unFavoriteMovie(movieId) {
            userService
                .unFavoriteMovie(movieId, isLoggedIn._id)
                .then(function (response) {
                    model.isFavorited = false;
                });
        }

        function isMovieFavorited() {
            userService
                .isMovieFavorited(model.movieId, isLoggedIn._id)
                .then(function (user) {
                    if (user) {
                        model.isFavorited = true;
                    }
                    else {
                        model.isFavorited = false;
                    }
                });
        }

        function watchlistMovie(movieId) {
            userService
                .watchlistMovie(movieId, isLoggedIn._id)
                .then(function (response) {
                    model.isWatchlisted = true;
                });
        }

        function undoWatchlistMovie(movieId) {
            userService
                .undoWatchlistMovie(movieId, isLoggedIn._id)
                .then(function (response) {
                    model.isWatchlisted = false;
                });
        }

        function isMovieWatchlisted() {
            userService
                .isMovieWatchlisted(model.movieId, isLoggedIn._id)
                .then(function (user) {
                    if (user) {
                        model.isWatchlisted = true;
                    }
                    else {
                        model.isWatchlisted = false;
                    }
                });
        }
    }
})();