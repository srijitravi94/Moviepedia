(function () {
    angular
        .module("moviepedia")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location, isLoggedIn, currentUser, $timeout) {
        var model = this;
        model.userId = $routeParams.userId;
        model.logout = logout;
        model.currentUser = currentUser;
        model.isLoggedIn = isLoggedIn;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        
        
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

        function updateUser(user) {
            userService
                .updateUser(user, model.userId)
                .then(updateSuccess, updateError);

            function updateSuccess() {
                model.successMessage = "Profile updated successfully";
            }

            function updateError() {
                model.errorMessage = "Unable to update profile";
            }
        }

        function deleteUser() {
            userService
                .deleteUser(model.userId)
                .then(deleteSuccess, deleteError);

            function deleteSuccess() {
                model.successMessage = "Profile deleted successfully. Please wait while we're redirecting ....";
                $timeout( function() {
                    $location.url('/login');
                }, 3000);
            }

            function deleteError() {
                model.errorMessage = "Unable to delete profile";
            }

        }
    }
})();