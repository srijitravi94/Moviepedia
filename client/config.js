(function () {
    angular
        .module('moviepedia')
        .config(configuration);

    function configuration($routeProvider, $locationProvider, $qProvider) {

        $qProvider.errorOnUnhandledRejections(false);
        $locationProvider.hashPrefix("");

        $routeProvider

            //route for landing page
            .when('/', {
                templateUrl : 'views/main/templates/main.view.client.html',
                controller : 'mainController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for popular movies page
            .when('/movies', {
                templateUrl : 'views/movies/templates/movies.popular.view.client.html',
                controller : 'popularMoviesController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for movie search page
            .when('/movies/search/:movieName/', {
                templateUrl : 'views/movies/templates/movies.search.view.client.html',
                controller : 'movieSearchController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for movie details page
            .when('/movies/:movieId', {
                templateUrl : 'views/movies/templates/movie.details.view.client.html',
                controller : 'movieDetailsController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for popular tvshows page
            .when('/tvshows', {
                templateUrl : 'views/tvshows/templates/tvshows.popular.view.client.html',
                controller : 'popularTvshowsController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for tvshows search page
            .when('/tvshows/search/:tvshowName', {
                templateUrl : 'views/tvshows/templates/tvshows.search.view.client.html',
                controller : 'tvshowSearchController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for tvshow details page
            .when('/tvshows/:tvshowId', {
                templateUrl : 'views/tvshows/templates/tvshow.details.view.client.html',
                controller : 'tvshowDetailsController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for tvshow details page
            .when('/tvshows/:tvshowId/season/:seasonNumber', {
                templateUrl : 'views/tvshows/templates/tvshow.seasons.view.client.html',
                controller : 'tvshowSeasonsController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for popular people page
            .when('/people', {
                templateUrl : 'views/people/templates/people.popular.view.client.html',
                controller : 'popularPeopleController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for people search page
            .when('/people/search/:peopleName', {
                templateUrl : 'views/people/templates/people.search.view.client.html',
                controller : 'peopleSearchController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for people details page
            .when('/people/:peopleId', {
                templateUrl : 'views/people/templates/people.details.view.client.html',
                controller : 'peopleDetailsController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for login page
            .when('/login', {
                templateUrl : 'views/user/templates/login.view.client.html',
                controller : 'loginController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for register page
            .when('/register', {
                templateUrl : 'views/user/templates/register.view.client.html',
                controller : 'registerController',
                controllerAs : 'model',
                resolve : {
                    isLoggedIn : isLoggedIn
                }
            })

            //route for profile page
            .when('/profile/:userId', {
                templateUrl : 'views/user/templates/profile/profile.view.client.html',
                controller : 'profileController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkLoggedIn,
                    isLoggedIn : isLoggedIn
                }
            });
    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function isLoggedIn(userService, $q) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

})();