(function () {
    angular
        .module("moviepedia")
        .controller("tvshowSeasonsController", tvshowSeasonsController);

    function tvshowSeasonsController(apiService, $routeParams) {
        var model = this;
        model.tvshowId = $routeParams.tvshowId;
        model.seasonNumber = $routeParams.seasonNumber;

        function init() {
            getSeasonDetails();
        } init();
        
        function getSeasonDetails() {
            apiService
                .getSeasonDetails(model.tvshowId, model.seasonNumber)
                .then(function (seasons) {
                    model.seasons = seasons.episodes;
                });
        }
    }
})();