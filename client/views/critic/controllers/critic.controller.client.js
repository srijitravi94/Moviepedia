(function () {
    angular
        .module("moviepedia")
        .controller("criticController", criticController);

    function criticController($routeParams, currentUser, isLoggedIn, criticService, $timeout, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.currentUser = currentUser;
        model.isLoggedIn = isLoggedIn;
        model.submitApplication = submitApplication;

        function submitApplication(experience) {

            var critic = {
                userId     : currentUser._id,
                firstName  : currentUser.firstName,
                lastName   : currentUser.lastName,
                username   : currentUser.username,
                experience : experience
            };

            criticService
                .submitApplication(critic)
                .then(function (critic) {
                    model.success = "Application submitted successfully. Redirecting ...";
                    $timeout(function () {
                        $location.url('/profile/' +currentUser._id);
                    },2000);
                });

        }
    }
})();