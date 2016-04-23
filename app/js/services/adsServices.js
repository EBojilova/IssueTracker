'use strict';

app.factory('adsService',
    function ($resource, baseServiceUrl) {
        // api/Ads?CategoryId={CategoryId}&TownId={TownId}&StartPage={StartPage}&PageSize={PageSize}
        var adsResource = $resource(
            baseServiceUrl + '/api/ads',
            null,
            {
                'getAll': {method: 'GET'}
            }
        );

        return {
            // tuka podavame parametrite ot HomeCotroller
            getAds: function (params, success, error) {
                return adsResource.getAll(params, success, error);
            }
        }
    }
);


app.factory('categoriesService', ['$resource', 'baseServiceUrl',
    function ($resource, baseServiceUrl) {
        // GET api/Categories
        var categoriesResource = $resource(baseServiceUrl + '/api/categories');
        // GET api/Categories/{id}
        var categoryByIdResource = $resource(baseServiceUrl + '/api/categories/:categoryId', {categoryId: '@id'});

        return {
            getCategories: function (success, error) {
                //savpada s categoriesResource.get(success, error);
                return categoriesResource.query(success, error);
            },
            getCategoryById: function (id, success, error) {
                return categoryByIdResource.get({categoryId: id}, success, error);
            }
        }
    }]
);


app.factory('townsService', ['$resource', 'baseServiceUrl',
    function ($resource, baseServiceUrl) {
        // GET api/Towns
        var townsResource = $resource(baseServiceUrl + '/api/towns');

        // GET api/Towns/{id}
        var townByIdResource = $resource(baseServiceUrl + '/api/towns/:townId', {townId: '@id'});

        return {
            getTowns: function (success, error) {
                // savpada s townsResource.get(success, error);
                return townsResource.query(success, error);
            },
            getTownById: function (id, success, error) {
                return townByIdResource.get({townId: id}, success, error);
            }
        }
    }
]);
