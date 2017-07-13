(function () {
    angular
        .module("moviepedia")
        .controller("tvshowDetailsController", tvshowDetailsController);

    function tvshowDetailsController($routeParams, userService, tvshowService, apiService, $sce, isLoggedIn) {
        var model = this;
        model.isLoggedIn = isLoggedIn;
        model.tvshowId = $routeParams.tvshowId;
        model.favoriteTvshow = favoriteTvshow;
        model.unFavoriteTvshow = unFavoriteTvshow;
        model.watchlistTvshow = watchlistTvshow;
        model.undoWatchlistTvshow = undoWatchlistTvshow;
        model.createReview = createReview;
        model.selectReview = selectReview;

        function init() {
            getTvshowDetails();
            getTvshowTrailer();
            numberOfSeasons();
            getTvshowCredits();
            imdbId();
            isTvshowFavorited();
            isTvshowWatchlisted();
            findReviewsForTvshows();
        } init();

        function getTvshowDetails() {
            apiService
                .getTvshowDetails(model.tvshowId)
                .then(function (tvshow) {
                    model.tvshow = tvshow;
                });
        }

        function getTvshowTrailer() {
            var link = 'https://www.youtube.com/embed/';
            apiService
                .getTvshowTrailer(model.tvshowId)
                .then(function (trailer) {
                    model.trailer = $sce.trustAsResourceUrl(link.concat(trailer.results[0].key));
                });
        }

        function numberOfSeasons() {
            var seasons = [];
            apiService
                .getTvshowDetails(model.tvshowId)
                .then(function (tvshow) {
                    for(var i=0;i<tvshow.number_of_seasons;i++){
                        seasons[i] = i+1;
                    }
                    model.seasons = seasons;
                });
        }

        function imdbId() {
            apiService
                .getImdbId(model.tvshowId)
                .then(function (tvshow) {
                   model.imdbId = tvshow.imdb_id;
                });
        }

        function getTvshowCredits() {
            apiService
                .getTvshowCredits(model.tvshowId)
                .then(function (credits) {
                    var tvshowCast = credits.cast;

                    var cast1 = [];
                    var cast2 = [];

                    for(var i = 0; i< tvshowCast.length; i++) {
                        if(i%2 == 0) {
                            cast1.push(tvshowCast[i]);
                        } else {
                            cast2.push(tvshowCast[i]);
                        }
                    }
                    model.cast1 = cast1;
                    model.cast2 = cast2;
                });
        }

        function favoriteTvshow(tvshowId) {
            userService
                .favoriteTvshow(tvshowId, isLoggedIn._id)
                .then(function (response) {
                    model.isFavorited = true;
                });
        }

        function unFavoriteTvshow(tvshowId) {
            userService
                .unFavoriteTvshow(tvshowId, isLoggedIn._id)
                .then(function (response) {
                    model.isFavorited = false;
                });
        }

        function isTvshowFavorited() {
            userService
                .isTvshowFavorited(model.tvshowId, isLoggedIn._id)
                .then(function (user) {
                    if (user) {
                        model.isFavorited = true;
                    }
                    else {
                        model.isFavorited = false;
                    }
                });
        }

        function watchlistTvshow(tvshowId) {
            userService
                .watchlistTvshow(tvshowId, isLoggedIn._id)
                .then(function (response) {
                    model.isWatchlisted = true;
                });
        }

        function undoWatchlistTvshow(tvshowId) {
            userService
                .undoWatchlistTvshow(tvshowId, isLoggedIn._id)
                .then(function (response) {
                    model.isWatchlisted = false;
                });
        }

        function isTvshowWatchlisted() {
            userService
                .isTvshowWatchlisted(model.tvshowId, isLoggedIn._id)
                .then(function (user) {
                    if (user) {
                        model.isWatchlisted = true;
                    }
                    else {
                        model.isWatchlisted = false;
                    }
                });
        }

        function findReviewsForTvshows() {
            tvshowService
                .findReviewsForTvshows(model.tvshowId)
                .then(renderReviews);

            function renderReviews(tvshowReview) {
                var reviews= [];
                for(r in tvshowReview){
                    reviews.push(tvshowReview[r]);
                }
                model.reviews = reviews;
            }
        }

        function createReview(summary, description) {

            var review = {
                tvshowId       : model.tvshowId,
                tvshowName     : model.tvshow.original_name,
                tvshowImage    : model.tvshow.poster_path,
                userId         : model.isLoggedIn._id,
                firstName      : model.isLoggedIn.firstName,
                lastName       : model.isLoggedIn.lastName,
                image          : model.isLoggedIn.image,
                summary        : summary,
                description    : description
            };

            tvshowService
                .createReview(review, model.isLoggedIn._id)
                .then(findReviewsForTvshows);

        }

        function selectReview(review) {
            model.review = angular.copy(review);
        }

    }
})();