(function () {
    angular
        .module('moviepedia')
        .config(configuration);

    function configuration($routeProvider,$locationProvider, $qProvider) {

        $qProvider.errorOnUnhandledRejections(false);
        $locationProvider.hashPrefix("");

        $routeProvider

            //route for landing page
            .when('/', {
                templateUrl : 'views/main/templates/main.view.client.html'
            })

            //route for popular movies page
            .when('/movies', {
                templateUrl : 'views/movies/templates/movies.popular.view.client.html',
                controller : 'popularMoviesController',
                controllerAs : 'model'
            })

            //route for movie search page
            .when('/movies/search/:movieName', {
                templateUrl : 'views/movies/templates/movies.search.view.client.html',
                controller : 'movieSearchController',
                controllerAs : 'model'
            })

            //route for movie details page
            .when('/movies/:movieId', {
                templateUrl : 'views/movies/templates/movie.details.view.client.html',
                controller : 'movieDetailsController',
                controllerAs : 'model'
            })

    }
})();