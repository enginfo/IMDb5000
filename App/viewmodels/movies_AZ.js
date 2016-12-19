define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {

    var ViewModel = function () {
        console.log('ViewModel initiated...');
        var self = this;
        var searchMoviesUri = 'http://192.168.160.39/api/Movies/Search/';
        var moviesUri = 'http://192.168.160.39/api/Movies';
        var moviesCountUri = 'http://192.168.160.39/api/Movies/Count';
        self.searchText = ko.observable("");
        self.movies = ko.observableArray();
        self.moviesCount = ko.observable(null);
        self.searchTextGood = ko.computed(function () {
            return (self.searchText().length < 3);
        }, self);

        function ajaxHelper(uri, method, data) {
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                }
            });
        }
        getAllMovies = function () {
            console.log('CALL: getAllMovies...');
            ajaxHelper(moviesCountUri, 'GET').done(function (data) {
                self.moviesCount(data);
            });
            ajaxHelper(moviesUri, 'GET').done(function (data) {
                self.movies(data);
            });
        };
        clearMovies = function () {
            getAllMovies();
            self.searchText("");
        };
        searchMovies = function () {
            console.log('CALL: searchMovies...');
            ajaxHelper(searchMoviesUri + self.searchText(), 'GET').done(function (data) {
                self.movies(data);
            });
        };
        getAllMovies();
    };
    return ViewModel;
});
