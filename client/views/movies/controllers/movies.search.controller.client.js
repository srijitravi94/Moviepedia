(function () {
    angular
        .module("moviepedia")
        .controller("movieSearchController", movieSearchController);

    function movieSearchController($routeParams, apiService, $location, isLoggedIn) {
        var model = this;
        model.movieName = $routeParams.movieName;
        model.isLoggedIn = isLoggedIn;
        model.searchMovie = searchMovie;

        function init() {
            searchMovieByMovieName();
        }
        init();

        function searchMovieByMovieName() {
            apiService
                .searchMovieByMovieName(model.movieName)
                .then(function (movies) {
                    model.movies = movies.results;
                    console.log(model.movies)
                });
        }

        function searchMovie(movieName) {
            $location.url('/movies/search/' +movieName)
        }

    }
})();