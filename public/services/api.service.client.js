(function () {
    angular
        .module("moviepedia")
        .factory("apiService", apiService);

    function apiService($http) {

        var api = {
            "getPopularMovies"         : getPopularMovies,
            "getMovieDetails"          : getMovieDetails,
            "getMovieTrailer"          : getMovieTrailer,
            "getMovieCredits"          : getMovieCredits,
            "searchMovieByMovieName"   : searchMovieByMovieName,
            "getPopularTvshows"        : getPopularTvshows,
            "getTvshowDetails"         : getTvshowDetails,
            "getTvshowTrailer"         : getTvshowTrailer,
            "getImdbId"                : getImdbId,
            "getTvshowCredits"         : getTvshowCredits,
            "searchTvshowByTvshowName" : searchTvshowByTvshowName,
            "getSeasonDetails"         : getSeasonDetails,
            "getPopularPeople"         : getPopularPeople,
            "searchPeopleByPeopleName" : searchPeopleByPeopleName,
            "getPeopleDetails"         : getPeopleDetails,
            "getPeopleExternalIds"     : getPeopleExternalIds,
            "getPeopleMovieCredits"    : getPeopleMovieCredits,
            "getPeopleTvCredits"       : getPeopleTvCredits
        };

        var baseUrl = "https://api.themoviedb.org/3/";
        var apikey = "?api_key=c5f78035f0fd4e485f1e504b08e7855e";

        return api;


        function getPopularMovies() {
            var movies = [];
            for(var i=1;i<=25;i++){
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
        
        function getPopularTvshows() {
            var tvshows = [];
            for(var i=1;i<=25;i++){
                var url = baseUrl + "tv/popular" + apikey + "&page=" + i;
                $http.get(url)
                    .then(function (response) {
                        for(var j=0;j<20;j++){
                            tvshows.push(response.data.results[j]);
                        }
                    });
            }
            return tvshows;
        }

        function getTvshowDetails(tvshowId) {
            var url = baseUrl + "tv/" + tvshowId + apikey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getTvshowTrailer(tvshowId) {
            var url = baseUrl + "tv/" + tvshowId + "/videos" + apikey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getImdbId(tvshowId) {
            var url = baseUrl + "tv/" + tvshowId + "/external_ids" + apikey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getTvshowCredits(tvshowId) {
            var url = baseUrl + "tv/" + tvshowId + "/credits" +apikey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchTvshowByTvshowName(tvshowName) {
            var url = baseUrl + "search/tv" + apikey + "&query=" + tvshowName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getSeasonDetails(tvshowId, seasonNumber) {
            var url = baseUrl + "tv/" + tvshowId + "/season/" + seasonNumber + apikey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function getPopularPeople() {
            var people = [];
            for(var i=1;i<=25;i++){
                var url = baseUrl + "person/popular" + apikey + "&page=" + i;
                $http.get(url)
                    .then(function (response) {
                        for(var j=0;j<20;j++){
                            people.push(response.data.results[j]);
                        }
                    });
            }
            return people;
        }

        function searchPeopleByPeopleName(peopleName) {
            var url = baseUrl + "search/person" + apikey + "&query=" + peopleName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getPeopleDetails(peopleId) {
            var url = baseUrl + "person/" + peopleId + apikey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getPeopleExternalIds(peopleId) {
            var url = baseUrl + "person/" + peopleId + "/external_ids"  + apikey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getPeopleMovieCredits(peopleId) {
            var url = baseUrl + "person/" + peopleId + "/movie_credits"  + apikey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getPeopleTvCredits(peopleId) {
            var url = baseUrl + "person/" + peopleId + "/tv_credits"  + apikey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();