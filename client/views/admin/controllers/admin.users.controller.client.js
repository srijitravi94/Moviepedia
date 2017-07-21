(function () {
    angular
        .module("moviepedia")
        .controller("adminUserController", adminUserController);

    function adminUserController($routeParams, isLoggedIn, userService) {
        var model = this;
        model.isLoggedIn = isLoggedIn;
        model.userId = $routeParams.userId;
        model.createUser = createUser;
        model.deleteUser = deleteUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;

        function init() {
            findAllUsers();
        } init ();

        function findAllUsers() {
            userService
                .adminFindAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

        function createUser(user) {

            if(user.username === null || user.username === '' || typeof user.username === 'undefined') {
                model.error = "Username is required";
                return;
            }

            userService
                .adminCreateUser(user)
                .then(findAllUsers);
        }

        function deleteUser(user) {
            userService
                .adminDeleteUser(user._id)
                .then(findAllUsers);
        }

        function selectUser(user) {
            model.user = angular.copy(user);
        }

        function updateUser(user) {

            if(user.username === null || user.username === '' || typeof user.username === 'undefined') {
                model.error = "Username is required";
                return;
            }

            userService
                .adminUpdateUser(user, user._id)
                .then(function () {
                    findAllUsers();
                    model.updateButton = false;
                });
        }
    }
})();