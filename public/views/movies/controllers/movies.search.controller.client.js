(function () {
    angular
        .module("moviepedia")
        .controller("movieSearchController", movieSearchController);

    function movieSearchController($routeParams, apiService, $location) {
        var model = this;
        model.movieName = $routeParams.movieName;
        model.searchMovie = searchMovie;

        function init() {
            searchMovieByMovieName();
        }
        init ();

        function searchMovieByMovieName() {
            apiService
                .searchMovieByMovieName(model.movieName)
                .then(function (movies) {
                   model.movies = movies.results;
                });
        }

        function searchMovie(movieName) {
            $location.url('/movies/search/' +movieName)
        }

    }
})();