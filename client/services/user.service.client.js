(function () {
    angular
        .module("moviepedia")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByUsername"    : findUserByUsername,
            "register"              : register,
            "findUserById"          : findUserById,
            "findUserByCredentials" : findUserByCredentials,
            "login"                 : login,
            "loggedin"              : loggedin,
            "logout"                : logout
        };

        return api;

        function findUserByUsername(username) {
            var url = "/api/moviepedia/user?username=" +username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(newUser) {
            var url = "/api/moviepedia/register";
            return $http.post(url, newUser)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/moviepedia/user?username=" +username+ "&password=" +password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url ="/api/moviepedia/user/" +userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/moviepedia/login";
            var credentials = {
                username : username,
                password : password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/moviepedia/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function loggedin() {
            var url = "/api/moviepedia/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();