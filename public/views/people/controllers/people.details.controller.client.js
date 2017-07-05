(function () {
    angular
        .module("moviepedia")
        .controller("peopleDetailsController", peopleDetailsController);

    function peopleDetailsController($routeParams, apiService) {
        var model = this;
        model.peopleId = $routeParams.peopleId;

        function init() {
            getPeopleDetails();
            getPeopleExternalIds();
            getPeopleMovieCredits();
            getPeopleTvCredits();
        } init();

        function getPeopleDetails() {
            apiService
                .getPeopleDetails(model.peopleId)
                .then(function (peopleDetails) {
                   model.peopleDetails = peopleDetails;
                });
        }
        
        function getPeopleExternalIds() {
            apiService
                .getPeopleExternalIds(model.peopleId)
                .then(function (peopleIds) {
                    model.peopleIds = peopleIds;
                });
        }

        function getPeopleMovieCredits() {
            apiService
                .getPeopleMovieCredits(model.peopleId)
                .then(function (peopleMovieCredits) {
                    model.peopleMovieCredits = peopleMovieCredits.cast;
                });
        }

        function getPeopleTvCredits() {
            apiService
                .getPeopleTvCredits(model.peopleId)
                .then(function (peopleTvCredits) {
                    model.peopleTvCredits = peopleTvCredits.cast;
                });
        }

    }
})();
