(function () {
    angular
        .module("moviepedia")
        .controller("popularMoviesController", popularMoviesController);

    function popularMoviesController(apiService, $location, isLoggedIn) {
        var model = this;
        model.searchMovie = searchMovie;
        model.isLoggedIn = isLoggedIn;

        function init() {
            getPopularMovies();
        }
        init();

        function getPopularMovies() {
            model.movies =
                apiService
                    .getPopularMovies();
        }

        function searchMovie(movieName) {
            $location.url('/movies/search/' +movieName)
        }
    }
})();