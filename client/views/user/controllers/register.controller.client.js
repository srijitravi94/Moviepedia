(function () {
    angular
        .module("moviepedia")
        .controller("registerController", registerController);

    function registerController(userService, $location, isLoggedIn) {
        var model = this;
        model.isLoggedIn = isLoggedIn;
        model.register = register;

        function register(firstName, lastName, username, email,  password, verifyPassword) {
            if(firstName === null || firstName === '' || typeof firstName === 'undefined') {
                model.error = "First Name is required";
                return;
            }

            if(lastName === null || lastName === '' || typeof lastName === 'undefined') {
                model.error = "Last Name is required";
                return;
            }

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = "Username is required";
                return;
            }

            if(password === null || password ==='' || typeof password === 'undefined') {
                model.error = "Password is required";
                return;
            }

            if(password !== verifyPassword) {
                model.error = "Sorry, passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(ifFound, ifNotFound);

            function ifFound() {
                model.error = "Sorry, that Username is taken";
            }

            function ifNotFound() {
                var newUser = {
                    firstName : firstName,
                    lastName : lastName,
                    username : username,
                    password : password
                };

                return userService
                    .register(newUser)
                    .then(function (user) {
                        $location.url('profile/' +user._id);
                    });
            }
        }
    }
})();