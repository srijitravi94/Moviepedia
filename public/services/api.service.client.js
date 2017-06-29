(function () {
    angular
        .module("moviepedia")
        .factory("apiService", apiService);

    function apiService($http) {

        var api = {
            "getPopularMovies"       : getPopularMovies,
            "getMovieDetails"        : getMovieDetails,
            "getMovieTrailer"        : getMovieTrailer,
            "getMovieCredits"        : getMovieCredits,
            "searchMovieByMovieName" : searchMovieByMovieName
        };

        var baseUrl = "https://api.themoviedb.org/3/";
        var apikey = "?api_key=c5f78035f0fd4e485f1e504b08e7855e";

        return api;


        function getPopularMovies() {
            var movies = [];
            for(var i=1;i<=50;i++){
                var url = baseUrl + "movie/popular" + apikey + "&page=" + i;
                $http.get(url)
                    .then(function (response) {
                        for(var j=0;j<20;j++){
                            movies.push(response.data.results[j]);
                        }
                    });
            }
            return movies;
        }

        function getMovieDetails(movieId) {
            var url = baseUrl + "movie/" + movieId + apikey;
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }

        function getMovieTrailer(movieId) {
            var url = baseUrl + "movie/" + movieId + "/videos" + apikey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getMovieCredits(movieId) {
            var url = baseUrl + "movie/" + movieId + "/credits" + apikey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchMovieByMovieName(movieName) {
            var url = baseUrl + "search/movie" + apikey + "&query=" +movieName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();