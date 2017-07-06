(function () {
    angular
        .module("moviepedia")
        .controller("tvshowDetailsController", tvshowDetailsController);

    function tvshowDetailsController($routeParams, apiService, $sce) {
        var model = this;
        model.tvshowId = $routeParams.tvshowId;

        function init() {
            getTvshowDetails();
            getTvshowTrailer();
            numberOfSeasons();
            getTvshowCredits();
            imdbId();
        } init();

        function getTvshowDetails() {
            apiService
                .getTvshowDetails(model.tvshowId)
                .then(function (tvshow) {
                    model.tvshow = tvshow;
                });
        }

        function getTvshowTrailer() {
            var link = 'https://www.youtube.com/embed/';
            apiService
                .getTvshowTrailer(model.tvshowId)
                .then(function (trailer) {
                    model.trailer = $sce.trustAsResourceUrl(link.concat(trailer.results[0].key));
                });
        }

        function numberOfSeasons() {
            var seasons = [];
            apiService
                .getTvshowDetails(model.tvshowId)
                .then(function (tvshow) {
                    for(var i=0;i<tvshow.number_of_seasons;i++){
                        seasons[i] = i+1;
                    }
                    model.seasons = seasons;
                });
        }

        function imdbId() {
            apiService
                .getImdbId(model.tvshowId)
                .then(function (tvshow) {
                   model.imdbId = tvshow.imdb_id;
                });
        }

        function getTvshowCredits() {
            apiService
                .getTvshowCredits(model.tvshowId)
                .then(function (credits) {
                    var tvshowCast = credits.cast;

                    var cast1 = [];
                    var cast2 = [];

                    for(var i = 0; i< tvshowCast.length; i++) {
                        if(i%2 == 0) {
                            cast1.push(tvshowCast[i]);
                        } else {
                            cast2.push(tvshowCast[i]);
                        }
                    }
                    model.cast1 = cast1;
                    model.cast2 = cast2;
                });
        }

    }
})();