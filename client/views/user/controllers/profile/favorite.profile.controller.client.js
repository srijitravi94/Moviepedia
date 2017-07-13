(function () {
    angular
        .module("moviepedia")
        .controller("favoriteController", favoriteController);

    function favoriteController($routeParams, isLoggedIn, currentUser, userService, apiService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.currentUser = currentUser;
        model.isLoggedIn = isLoggedIn;
        var movies = [];
        var tvshows = [];

        function init() {
            findFavoriteMoviesForUser();
            findFavoriteTvshowsForUser();
        } init();
        
        function findFavoriteMoviesForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    for(var f in user.favorites.movies) {
                        apiService
                            .getMovieDetails(user.favorites.movies[f])
                            .then(function (movie) {
                                movies.push(movie);
                            });
                    }
                });
            model.movies = movies;
        }

        function findFavoriteTvshowsForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    for(var f in user.favorites.tvshows) {
                        apiService
                            .getTvshowDetails(user.favorites.tvshows[f])
                            .then(function (tvshow) {
                                tvshows.push(tvshow);
                            });
                    }
                });
            model.tvshows = tvshows;
        }
        
    }
})();