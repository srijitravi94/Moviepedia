(function () {
    angular
        .module("moviepedia")
        .controller("popularTvshowsController", popularTvshowsController);

    function popularTvshowsController(apiService, $location, isLoggedIn) {
        var model = this;
        model.isLoggedIn = isLoggedIn;
        model.searchTvshow = searchTvshow;

        function init() {
            getPopularTvshows();
        }
        init ();

        function getPopularTvshows() {
            model.tvshows =
                apiService
                    .getPopularTvshows();
        }

        function searchTvshow(tvshowName) {
            $location.url('/tvshows/search/' +tvshowName)
        }
    }
})();