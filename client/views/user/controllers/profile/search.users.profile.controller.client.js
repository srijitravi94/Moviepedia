(function () {
    angular
        .module("moviepedia")
        .controller("searchUsersController", searchUsersController);

    function searchUsersController($routeParams, isLoggedIn, currentUser, userService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.currentUser = currentUser;
        model.isLoggedIn = isLoggedIn;
        model.searchUsers = searchUsers;

        function searchUsers(name) {
            userService
                .findUserByName(name)
                .then(function (users) {
                    if(users) {
                        model.users = users;
                    } else {
                        model.error = true;
                        console.log(model.error);
                    }
                });
        }
        
    }
})();