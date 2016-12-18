define(function () {
    lista_img = ["img1.jpg","img2.jpg","img3.jpg"];
    var i = 1;
    setInterval(function() {
        if (i == 3) {
            i = 0;
        }
        document.getElementById("carrousel").style.backgroundImage = "url('images/"+lista_img[i]+"')";
        i++;
    }, 10000);

    ViewModel = function () {
        console.log('ViewModel initiated...');
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

        var moviesCountUri = 'http://192.168.160.39/api/Movies/Count';
        var actorsCountUri = 'http://192.168.160.39/api/Actors/Count';
        var directorsCountUri = 'http://192.168.160.39/api/Directors/Count';
        var genresCountUri = 'http://192.168.160.39/api/Genres/Count';
        var languagesCountUri = 'http://192.168.160.39/api/Languages/Count';
        var countriesCountUri = 'http://192.168.160.39/api/Countries/Count';

        getCounts = function () {
            console.log('CALL: Counters...');
            ajaxHelper(actorsCountUri, 'GET').done(function (data) { self.actorsCount(data); });
            ajaxHelper(moviesCountUri, 'GET').done(function (data) { self.moviesCount(data); });
            ajaxHelper(directorsCountUri, 'GET').done(function (data) { self.directorsCount(data); });
            ajaxHelper(countriesCountUri, 'GET').done(function (data) { self.countriesCount(data); });
            ajaxHelper(languagesCountUri, 'GET').done(function (data) { self.languagesCount(data); });
            ajaxHelper(genresCountUri, 'GET').done(function (data) { self.genresCount(data); });
        };

        self.actorsCount = ko.observable(0);
        self.moviesCount = ko.observable(0);
        self.directorsCount = ko.observable(0);
        self.countriesCount = ko.observable(0);
        self.languagesCount = ko.observable(0);
        self.genresCount = ko.observable(0);
        self.Stats = ko.observable(null);
        self.btnvisible = ko.observable(true);
        self.textvisible = ko.observable(false);
        getCounts();

        data = function () {
            self.textvisible(true);
            self.btnvisible(false);
            self.Stats("IMDb 5000+ Statistics");
		    google.charts.load("visualization", "1", { 'packages': ['corechart'] });
        	google.charts.setOnLoadCallback(drawChart);
        	function drawChart() {
            	var data1 = google.visualization.arrayToDataTable([
                	['Type', 'Number', { role: "style" }],
                	['Actors', self.actorsCount(), "#3b5998"],
                	['Movies', self.moviesCount(), "#8b9dc3"],
                	['Directors', self.directorsCount(), "#dfe3ee"],
            	]);
            	var data2 = google.visualization.arrayToDataTable([
                	['Type', 'Number', { role: "style" }],
                	['Countries', self.countriesCount(), "#777777"],
                	['Languages', self.languagesCount(), "#555555"],
                	['Genres', self.genresCount(), "#333333"]
            	]);

            	var options1 = {
                	width: 980,
                	height: 250,
                	bar: { groupWidth: "95%" },
                	legend: { position: "none" },
            	};
            	var options2 = {
            	    width: 735,
            	    height: 250,
            	    bar: { groupWidth: "95%" },
            	    legend: { position: "none" },
            	}

            	var chart1 = new google.visualization.BarChart(document.getElementById('chart1'));
            	var chart2 = new google.visualization.BarChart(document.getElementById('chart2'));
            	var chart3 = new google.visualization.BarChart(document.getElementById('chart3'));
            	var chart4 = new google.visualization.BarChart(document.getElementById('chart4'));

            	chart1.draw(data1, options1);
            	chart2.draw(data2, options1);
            	chart3.draw(data1, options2);
            	chart4.draw(data2, options2);
        	}
	    };
    };
    return ViewModel;
});