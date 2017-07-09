(function () {
    angular
        .module("moviepedia")
        .controller("mainController", mainController);

    function mainController(isLoggedIn) {
        var model = this;
        model.isLoggedIn = isLoggedIn;
    }
})();
