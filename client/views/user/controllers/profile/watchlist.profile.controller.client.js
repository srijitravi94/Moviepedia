(function () {
    angular
        .module("moviepedia")
        .controller("watchlistController", watchlistController);

    function watchlistController($routeParams, isLoggedIn, currentUser, userService, apiService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.currentUser = currentUser;
        model.isLoggedIn = isLoggedIn;
        var movies = [];
        var tvshows = [];

        function init() {
            findWatchlistMoviesForUser();
            findWatchlistTvshowsForUser();
        } init();
        
        function findWatchlistMoviesForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    for(var f in user.watchlist.movies) {
                        apiService
                            .getMovieDetails(user.watchlist.movies[f])
                            .then(function (movie) {
                                movies.push(movie);
                            });
                    }
                });
            model.movies = movies;
        }

        function findWatchlistTvshowsForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    for(var f in user.watchlist.tvshows) {
                        apiService
                            .getTvshowDetails(user.watchlist.tvshows[f])
                            .then(function (tvshow) {
                                tvshows.push(tvshow);
                            });
                    }
                });
            model.tvshows = tvshows;
        }
        
    }
})();