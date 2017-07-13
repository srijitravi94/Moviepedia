(function () {
    angular
        .module("moviepedia")
        .factory("tvshowService", tvshowService);

    function tvshowService($http) {
        var api = {
            "createReview"          :  createReview,
            "findReviewsForTvshows" : findReviewsForTvshows
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
    }
})();