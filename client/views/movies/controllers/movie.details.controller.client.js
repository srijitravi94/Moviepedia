(function () {
    angular
        .module("moviepedia")
        .controller("movieDetailsController", movieDetailsController);

    function movieDetailsController($routeParams, apiService, $sce) {
        var model = this;
        model.movieId = $routeParams.movieId;

        function init() {
            getMovieDetails();
            getMovieTrailer();
            getMovieCredits();
        } init();

        function getMovieDetails() {
            apiService
                .getMovieDetails(model.movieId)
                .then(function (movie) {
                    model.movie = movie;
                });
        }

        function getMovieTrailer() {
            var link = 'https://www.youtube.com/embed/';
            apiService
                .getMovieTrailer(model.movieId)
                .then(function (trailer) {
                    model.trailer = $sce.trustAsResourceUrl(link.concat(trailer.results[0].key));
                });
        }
        
        function getMovieCredits() {
            apiService
                .getMovieCredits(model.movieId)
                .then(function (credits) {
                    var movieCrew = credits.crew;
                    var movieCast = credits.cast;

                    for (var i = 0; i < movieCrew.length; i++) {
                        if (movieCrew[i].job == "Director") {
                            model.director = movieCrew[i];
                        }
                    }

                    var cast1 = [];
                    var cast2 = [];
                    for(var i = 0; i< movieCast.length; i++) {
                        if(i%2 == 0) {
                            cast1.push(movieCast[i]);
                        } else {
                            cast2.push(movieCast[i]);
                        }
                    }
                    model.cast1 = cast1;
                    model.cast2 = cast2;
                });
        }
    }
})();