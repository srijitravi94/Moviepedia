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
            "updateUser"            : updateUser,
            "deleteUser"            : deleteUser,
            "login"                 : login,
            "loggedin"              : loggedin,
            "checkAdmin"            : checkAdmin,
            "logout"                : logout,
            "favoriteMovie"         : favoriteMovie,
            "unFavoriteMovie"       : unFavoriteMovie,
            "isMovieFavorited"      : isMovieFavorited,
            "watchlistMovie"        : watchlistMovie,
            "undoWatchlistMovie"    : undoWatchlistMovie,
            "isMovieWatchlisted"    : isMovieWatchlisted,
            "favoriteTvshow"        : favoriteTvshow,
            "unFavoriteTvshow"      : unFavoriteTvshow,
            "isTvshowFavorited"     : isTvshowFavorited,
            "watchlistTvshow"       : watchlistTvshow,
            "undoWatchlistTvshow"   : undoWatchlistTvshow,
            "isTvshowWatchlisted"   : isTvshowWatchlisted,
            "followUsers"           : followUsers,
            "unfollowUsers"         : unfollowUsers,
            "isUserFollowed"        : isUserFollowed,
            "findUserByName"        : findUserByName,
            "adminFindAllUsers"     : adminFindAllUsers,
            "adminCreateUser"       : adminCreateUser,
            "adminDeleteUser"       : adminDeleteUser,
            "adminUpdateUser"       : adminUpdateUser,
            "addCriticToUser"       : addCriticToUser
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

        function updateUser(user, userId) {
            var url = "/api/moviepedia/user/" +userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/moviepedia/user/" +userId;
            return $http.delete(url)
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

        function checkAdmin() {
            var url = "/api/moviepedia/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function favoriteMovie(movieId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/movie/favorite/" +movieId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unFavoriteMovie(movieId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/movie/unFavorite/" +movieId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function isMovieFavorited(movieId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/movie/favorite/" +movieId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function watchlistMovie(movieId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/movie/watchlist/" +movieId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function undoWatchlistMovie(movieId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/movie/undoWatchlist/" +movieId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function isMovieWatchlisted(movieId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/movie/watchlist/" +movieId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function favoriteTvshow(tvshowId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/tvshow/favorite/" +tvshowId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unFavoriteTvshow(tvshowId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/tvshow/unFavorite/" +tvshowId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function isTvshowFavorited(tvshowId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/tvshow/favorite/" +tvshowId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function watchlistTvshow(tvshowId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/tvshow/watchlist/" +tvshowId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function undoWatchlistTvshow(tvshowId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/tvshow/undoWatchlist/" +tvshowId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function isTvshowWatchlisted(tvshowId, userId) {
            var url = "/api/moviepedia/user/" +userId+ "/tvshow/watchlist/" +tvshowId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function followUsers(currentUserId, followUserId) {
            var url = "/api/moviepedia/user/" +currentUserId+ "/follow/" +followUserId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unfollowUsers(currentUserId, unfollowUserId) {
            var url = "/api/moviepedia/user/" +currentUserId+ "/unfollow/" +unfollowUserId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function isUserFollowed(currentUserId, followUserId) {
            var url = "/api/moviepedia/user/" + currentUserId + "/follow/" + followUserId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByName(name) {
            var url = "/api/moviepedia/searchUser?name=" +name;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function adminFindAllUsers() {
            var url = "/api/moviepedia/checkAdmin/user";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function adminCreateUser(newUser) {
            var url = "/api/moviepedia/checkAdmin";
            return $http.post(url, newUser)
                .then(function (response) {
                    return response.data;
                });
        }

        function adminDeleteUser(userId) {
            var url = "/api/moviepedia/checkAdmin/" +userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function adminUpdateUser(user, userId) {
            var url = "/api/moviepedia/checkAdmin/" +userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function addCriticToUser(userId) {
            var url = "/api/moviepedia/critic/" +userId+ "/addRole";
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        }
})();