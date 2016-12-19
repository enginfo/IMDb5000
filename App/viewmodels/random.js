define(function() {
	var ViewModel = function () {
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
		self.moviesCount = ko.observable(0);
		ajaxHelper('http://192.168.160.39/api/Movies/Count', 'GET').done(function(data) {
			console.log("__init__");
			self.moviesCount(data);
		});
		setTimeout(function() {
			window.location.href = "#moviedetails/"+Math.floor((Math.random() * moviesCount()) + 1);
		}, 200);
	};
	return ViewModel;
});
