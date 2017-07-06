(function () {
    angular
        .module("moviepedia")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.logout = logout;
        
        
        function init() {
            findUserById();
        } init();
        
        function findUserById() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                   model.user = user;
                });
        }
        
        function logout() {
            userService
                .logout()
                .then(function () {
                        $location.url('/login');
                    });
                }
    }
})();