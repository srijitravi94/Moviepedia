(function () {
    angular
        .module("moviepedia")
        .controller("peopleSearchController", peopleSearchController);

    function peopleSearchController($location, apiService, $routeParams, isLoggedIn) {
        var model = this;
        model.isLoggedIn = isLoggedIn;
        model.peopleName = $routeParams.peopleName;
        model.searchPeople = searchPeople;

        function init() {
            searchPeopleByPeopleName();
        } init();

        function searchPeopleByPeopleName() {
            apiService
                .searchPeopleByPeopleName(model.peopleName)
                .then(function (people) {
                   model.people = people.results;
                });
        }

        function searchPeople(peopleName) {
            $location.url('/people/search/' +peopleName);
        }
    }
})();
