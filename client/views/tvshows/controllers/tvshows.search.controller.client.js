(function () {
    angular
        .module("moviepedia")
        .controller("tvshowSearchController", tvshowSearchController);

    function tvshowSearchController(apiService, $routeParams, $location) {
        var model = this;
        model.tvshowName = $routeParams.tvshowName;
        model.searchTvshow = searchTvshow;

        function init() {
            searchTvshowByTvshowName();
        }
        init ();

        function searchTvshowByTvshowName() {
            apiService
                .searchTvshowByTvshowName(model.tvshowName)
                .then(function (tvshows) {
                   model.tvshows = tvshows.results;
                   console.log(model.tvshows);
                });
        }

        function searchTvshow(tvshowName) {
            $location.url('/tvshows/search/' +tvshowName)
        }
    }
})();