(function () {
    angular
        .module("moviepedia")
        .controller("reviewsController", reviewsController);

    function reviewsController($routeParams, isLoggedIn, currentUser, userService, movieService, tvshowService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.isLoggedIn = isLoggedIn;
        model.currentUser = currentUser;
        var userMovieReviews = [];
        var userTvshowReviews = [];
        model.follow = follow;
        model.unfollow = unfollow;

        function init() {
            findMovieReviewsForUser();
            findTvshowReviewsForUser();
            isUserFollowed();
        } init();
        
        function findMovieReviewsForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    for(var r in user.reviews.movies) {
                        movieService
                            .findMovieReviewById(user.reviews.movies[r])
                            .then(function (movie) {
                                userMovieReviews.push(movie);
                            });
                        }
                    });
            model.userMovieReviews = userMovieReviews;
        }

        function findTvshowReviewsForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    for(var r in user.reviews.tvshows) {
                        tvshowService
                            .findTvshowReviewById(user.reviews.tvshows[r])
                            .then(function (movie) {
                                userTvshowReviews.push(movie);
                            });
                    }
                });
            model.userTvshowReviews = userTvshowReviews;
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