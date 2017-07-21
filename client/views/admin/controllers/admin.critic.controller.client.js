(function () {
    angular
        .module("moviepedia")
        .controller("adminCriticController", adminCriticController);
    
    function adminCriticController($routeParams, criticService, isLoggedIn, userService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.isLoggedIn = isLoggedIn;
        model.acceptApplication = acceptApplication;
        model.deleteApplication = deleteApplication;

        function init() {
            getAllCritics();
        } init();

        function getAllCritics() {
            criticService
                .getAllCritics()
                .then(function (critics) {
                    model.critics = critics;
                });
        }


        function acceptApplication(critic) {

            criticService
                .deleteCritic(critic._id)
                .then(function (response) {
                });

            userService
                .addCriticToUser(critic.userId)
                .then(function (user) {
                    getAllCritics();
                });
        }

        function deleteApplication(critic) {
            criticService
                .deleteCritic(critic._id)
                .then(function (response) {
                    getAllCritics();
                });
        }
    }
})();