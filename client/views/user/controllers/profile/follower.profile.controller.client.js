(function () {
    angular
        .module("moviepedia")
        .controller("followerController", followerController);

    function followerController($routeParams, isLoggedIn, currentUser, userService, apiService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.currentUser = currentUser;
        model.isLoggedIn = isLoggedIn;
        model.follow = follow;
        model.unfollow = unfollow;
        var followers = [];

        function init() {
            findFollowersForUser();
            isUserFollowed();
        } init();

        function findFollowersForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    for(var f in user.followers) {
                        userService
                            .findUserById(user.followers[f])
                            .then(function (user) {
                                followers.push(user);
                            });
                    }
                });
            model.followers = followers;
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