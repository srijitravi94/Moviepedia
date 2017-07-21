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
        model.follow = follow;
        model.unfollow = unfollow;
        
        
        function init() {
            findUserById();
            isUserFollowed();
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

        function follow(followUserId) {
            userService
                .followUsers(model.currentUser._id, followUserId)
                .then(function (user) {
                    model.isFollow = true;
                }, function (err) {
                    console.log(err);
                });
        }

        function unfollow(unfollowUserId) {
            userService
                .unfollowUsers(model.currentUser._id, unfollowUserId)
                .then(function (user) {
                    model.isFollow = false;
                }, function (err) {
                    console.log(err);
                });
        }

        function isUserFollowed() {
            userService
                .isUserFollowed(model.currentUser._id, model.userId)
                .then(function (user) {
                    if(user) {
                        model.isFollow = true;
                    } else {
                        model.isFollow = false;
                    }
                });
        }
    }
})();