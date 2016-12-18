define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {

    var ViewModel = function () {
	    console.log('ViewModel initiated...');
        var self = this;
	    var directorsUri = 'http://192.168.160.39/api/Directors/';
        self.director_info = ko.observableArray();
      	self.id = ko.observable();

	    var url = location.hash;
        self.id(url.split("/").pop());
        console.log(self.id());

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
       getAllInfo = function () {
            console.log('CALL: getAllInfo...');
            ajaxHelper(directorsUri+self.id(), 'GET').done(function (data) {
                self.director_info(data);
            });
        };
        getAllInfo();
    };
    return ViewModel;
});
