(function () {
    angular
        .module("moviepedia")
        .factory("movieService", movieService);

    function movieService($http) {
        var api = {
            "createReview"         :  createReview,
            "findReviewsForMovies" : findReviewsForMovies,
            "findMovieReviewById"  : findMovieReviewById,
            "updateReview"         : updateReview,
            "deleteReview"         : deleteReview,
            "findAllMovieReviews"  : findAllMovieReviews
        };
        return api;

        function createReview(review, userId) {
            var url = "/api/moviepedia/" +userId+ "/movie/review";
            return $http.post(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewsForMovies(movieId) {
            var url = "/api/moviepedia/movie/" +movieId+ "/review";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findMovieReviewById(reviewId) {
            var url = "/api/moviepedia/movie/review/" +reviewId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateReview(review, reviewId) {
            var url = "/api/moviepedia/movie/review/" +reviewId;
            return $http.put(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteReview(reviewId, userId) {
            var url = "/api/moviepedia/" +userId+ "/movie/review/" +reviewId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllMovieReviews() {
            var url = "/api/moviepedia/movie/review";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();