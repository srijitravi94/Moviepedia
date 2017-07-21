(function () {
    angular
        .module("moviepedia")
        .factory("tvshowService", tvshowService);

    function tvshowService($http) {
        var api = {
            "createReview"          :  createReview,
            "findReviewsForTvshows" : findReviewsForTvshows,
            "findTvshowReviewById"  : findTvshowReviewById,
            "updateReview"          : updateReview,
            "deleteReview"          : deleteReview,
            "findAllTvshowReviews"  : findAllTvshowReviews
        };
        return api;

        function createReview(review, userId) {
            var url = "/api/moviepedia/" +userId+ "/tvshow/review";
            return $http.post(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewsForTvshows(tvshowId) {
            var url = "/api/moviepedia/tvshow/" +tvshowId+ "/review";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateReview(review, reviewId) {
            var url = "/api/moviepedia/tvshow/review/" +reviewId;
            return $http.put(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteReview(reviewId, userId) {
            var url = "/api/moviepedia/" +userId+ "/tvshow/review/" +reviewId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findTvshowReviewById(reviewId) {
            var url = "/api/moviepedia/tvshow/review/" +reviewId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllTvshowReviews() {
            var url = "/api/moviepedia/tvshow/review";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();