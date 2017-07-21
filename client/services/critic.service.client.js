(function () {
    angular
        .module("moviepedia")
        .factory("criticService", criticService);

    function criticService($http) {
        var api = {
            "submitApplication"  : submitApplication,
            "getAllCritics"      : getAllCritics,
            "deleteCritic"       : deleteCritic
        };

        return api;

        function submitApplication(critic) {
            var url = "/api/moviepedia/critic/application";
            return $http.post(url, critic)
                .then(function (response) {
                    return response.data;
                });
        }

        function getAllCritics() {
            var url = "/api/moviepedia/allCritics/application";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteCritic(criticId) {
            var url = "/api/moviepedia/critic/" +criticId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();