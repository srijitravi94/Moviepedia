(function () {
    angular
        .module("moviepedia")
        .controller("popularPeopleController", popularPeopleController);

    function popularPeopleController($location, apiService) {
        var model = this;
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
