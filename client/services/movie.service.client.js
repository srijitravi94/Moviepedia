(function () {
    angular
        .module("moviepedia")
        .factory("movieService", movieService);

    function movieService($http) {
        var api = {
            "createReview"         :  createReview,
            "findReviewsForMovies" : findReviewsForMovies
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
    }
})();