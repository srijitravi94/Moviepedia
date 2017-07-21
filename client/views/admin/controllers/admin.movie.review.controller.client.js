(function () {
    angular
        .module("moviepedia")
        .controller("adminMovieReviewController", adminMovieReviewController);

    function adminMovieReviewController($routeParams, isLoggedIn, movieService) {
        var model = this;
        model.isLoggedIn = isLoggedIn;
        model.userId = $routeParams.userId;
        model.deleteReview = deleteReview;

        function init() {
            findAllMovieReviews();
        } init();

        function findAllMovieReviews() {
            movieService
                .findAllMovieReviews()
                .then(function (movieReviews) {
                    model.movieReviews = movieReviews;
                });
        }

        function deleteReview(reviewId, userId) {
            movieService
                .deleteReview(reviewId, userId)
                .then(findAllMovieReviews);
        }
    }
})();