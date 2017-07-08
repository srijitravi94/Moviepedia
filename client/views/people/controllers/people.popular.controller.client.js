(function () {
    angular
        .module("moviepedia")
        .controller("popularPeopleController", popularPeopleController);

    function popularPeopleController($location, apiService, isLoggedIn) {
        var model = this;
        model.isLoggedIn = isLoggedIn;
        model.searchPeople = searchPeople;

        function init() {
            getPopularPeople();
        } init();

        function getPopularPeople() {
            model.people = apiService
                .getPopularPeople();
        }

        function searchPeople(peopleName) {
            $location.url('/people/search/' +peopleName);
        }
    }
})();
