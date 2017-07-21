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
        model.follow = follow;
        model.unfollow = unfollow;

        function init() {
            findFavoriteMoviesForUser();
            findFavoriteTvshowsForUser();
            isUserFollowed();
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

        function follow(followUserId) {
            userService
                .followUsers(model.currentUser._id, followUserId)
                .then(function (user) {
                    model.isFollow = true;
                }, function (err) {
                    console.log(err);
                });
        }

        function unfollow(unfollowUserId) {
            userService
                .unfollowUsers(model.currentUser._id, unfollowUserId)
                .then(function (user) {
                    model.isFollow = false;
                }, function (err) {
                    console.log(err);
                });
        }

        function isUserFollowed() {
            userService
                .isUserFollowed(model.currentUser._id, model.userId)
                .then(function (user) {
                    if(user) {
                        model.isFollow = true;
                    } else {
                        model.isFollow = false;
                    }
                });
        }
        
    }
})();