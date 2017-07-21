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
            })

            //route for user favorites page
            .when('/profile/:userId/favorites', {
                templateUrl : 'views/user/templates/profile/favorite.profile.view.client.html',
                controller : 'favoriteController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkLoggedIn,
                    isLoggedIn : isLoggedIn
                }
            })

            //route for user watchlist page
            .when('/profile/:userId/watchlist', {
                templateUrl : 'views/user/templates/profile/watchlist.profile.view.client.html',
                controller : 'watchlistController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkLoggedIn,
                    isLoggedIn : isLoggedIn
                }
            })

            //route for user reviews page
            .when('/profile/:userId/reviews', {
                templateUrl : 'views/user/templates/profile/reviews.profile.view.client.html',
                controller : 'reviewsController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkLoggedIn,
                    isLoggedIn : isLoggedIn
                }
            })

            //route for user followers page
            .when('/profile/:userId/followers', {
                templateUrl : 'views/user/templates/profile/followers.profile.view.client.html',
                controller : 'followerController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkLoggedIn,
                    isLoggedIn : isLoggedIn
                }
            })

            //route for user following page
            .when('/profile/:userId/following', {
                templateUrl : 'views/user/templates/profile/following.profile.view.client.html',
                controller : 'followingController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkLoggedIn,
                    isLoggedIn : isLoggedIn
                }
            })

            //route for search user page
            .when('/profile/:userId/search/users', {
                templateUrl : 'views/user/templates/profile/search.users.profile.view.client.html',
                controller : 'searchUsersController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkLoggedIn,
                    isLoggedIn : isLoggedIn
                }
            })

            //route for admin landing page
            .when('/profile/:userId/admin', {
                templateUrl : 'views/admin/templates/admin.view.client.html',
                controller : 'adminController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkAdmin,
                    isLoggedIn : isLoggedIn
                }
            })

            //route for admin users page
            .when('/profile/:userId/admin/users', {
                templateUrl : 'views/admin/templates/admin.users.view.client.html',
                controller : 'adminUserController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkAdmin,
                    isLoggedIn : isLoggedIn
                }
            })

            //route for admin critic application page
            .when('/profile/:userId/admin/critics', {
                templateUrl : 'views/admin/templates/admin.critic.view.client.html',
                controller : 'adminCriticController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkAdmin,
                    isLoggedIn : isLoggedIn
                }
            })

            //route for admin movie reviews page
            .when('/profile/:userId/admin/movie/reviews', {
                templateUrl : 'views/admin/templates/admin.movie.reviews.view.client.html',
                controller : 'adminMovieReviewController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkAdmin,
                    isLoggedIn : isLoggedIn
                }
            })

            //route for admin tvshow reviews page
            .when('/profile/:userId/admin/tvshow/reviews', {
                templateUrl : 'views/admin/templates/admin.tvshow.reviews.view.client.html',
                controller : 'adminTvshowReviewController',
                controllerAs : 'model',
                resolve  : {
                    currentUser : checkAdmin,
                    isLoggedIn : isLoggedIn
                }
            })

            //route for critic application
            .when("/profile/:userId/critic/application", {
                templateUrl : "views/critic/templates/critic.view.client.html",
                controller : "criticController",
                controllerAs : "model",
                resolve : {
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

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkAdmin()
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

})();