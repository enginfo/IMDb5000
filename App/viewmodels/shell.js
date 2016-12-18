define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
                {route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: false, menu : 'Home', has_dropdown:false },
                {route: 'directors', nav: true, menu: 'Directors <span class="caret"></span>', has_dropdown: true, content: [{ link: '_AZ', value: 'A-Z&nbsp;&nbsp;&nbsp;&nbsp;<i style="color: blue" class="fa fa-sort-alpha-asc"></i>' }, { link: '_FB', value: 'Likes&nbsp;<i style="color: blue" class="fa fa-thumbs-o-up"></i>' }] },
                {route: 'directors_AZ', moduleId: 'viewmodels/directors_AZ', nav: false, has_dropdown: false },
		        {route: 'directors_FB', moduleId: 'viewmodels/directors_FB', nav: false, has_dropdown: false },
		        {route: 'actors', nav: true, menu: 'Actors <span class="caret"></span>', has_dropdown: true, content: [{ link: '_AZ', value: 'A-Z&nbsp;&nbsp;&nbsp;&nbsp;<i style="color: blue" class="fa fa-sort-alpha-asc"></i>' }, { link: '_FB', value: 'Likes&nbsp;<i style="color: blue" class="fa fa-thumbs-o-up"></i>' }] },
		        {route: 'actors_AZ', moduleId: 'viewmodels/actors_AZ', nav: false, has_dropdown:false},
		        {route: 'actors_FB', moduleId: 'viewmodels/actors_FB', nav: false, has_dropdown:false},
	            {route: 'movies', moduleId: 'viewmodels/movies', nav: true, menu: 'Movies',has_dropdown:false},
	            {route: 'genres', moduleId: 'viewmodels/genres', nav: true, menu: 'Genres',has_dropdown:false},
               	{route: 'languages', moduleId: 'viewmodels/languages', nav: true, menu: 'Languages',has_dropdown:false},
		        {route: 'random', moduleId: 'viewmodels/random', nav: true, menu: 'Random', has_dropdown:false},
               	{route: 'actordetails/:id', moduleId: 'viewmodels/actordetails', nav: false,has_dropdown:false},
                {route: 'moviedetails/:id', moduleId: 'viewmodels/moviedetails', nav: false,has_dropdown:false},
                {route: 'directordetails/:id', moduleId: 'viewmodels/directordetails', nav: false,has_dropdown:false},
                {route: 'languagedetails/:id', moduleId: 'viewmodels/languagedetails', nav: false,has_dropdown:false},
                {route: 'countrydetails/:id', moduleId: 'viewmodels/countrydetails', nav: false,has_dropdown:false},
                {route: 'genredetails/:id', moduleId: 'viewmodels/genredetails', nav: false,has_dropdown:false}
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});
