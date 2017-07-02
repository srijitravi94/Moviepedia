(function () {
    angular
        .module("moviepedia")
        .controller("registerController", registerController);

    function registerController() {
        var model = this;
        model.register = register;

        function register(firstName, lastName, username, email,  password, verifyPassword) {

        }
    }
})();