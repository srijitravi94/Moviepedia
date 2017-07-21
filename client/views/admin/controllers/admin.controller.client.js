(function () {
    angular
        .module("moviepedia")
        .controller("adminController", adminController);

    function adminController($routeParams, isLoggedIn) {
        var model = this;
        model.isLoggedIn = isLoggedIn;
        model.userId = $routeParams.userId;
    }
})();