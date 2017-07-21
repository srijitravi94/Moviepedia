(function () {
    angular
        .module("moviepedia")
        .controller("adminTvshowReviewController", adminTvshowReviewController);

    function adminTvshowReviewController($routeParams, isLoggedIn, tvshowService) {
        var model = this;
        model.isLoggedIn = isLoggedIn;
        model.userId = $routeParams.userId;
        model.deleteReview = deleteReview;

        function init() {
            findAllTvshowReviews();
        } init();

        function findAllTvshowReviews() {
            tvshowService
                .findAllTvshowReviews()
                .then(function (tvshowReviews) {
                    model.tvshowReviews = tvshowReviews;
                });
        }

        function deleteReview(reviewId, userId) {
            tvshowService
                .deleteReview(reviewId, userId)
                .then(findAllTvshowReviews);
        }
    }
})();