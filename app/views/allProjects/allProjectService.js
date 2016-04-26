'use strict';

app.factory('allProjectsService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {
        return {
            //[GET] projects
            getUserProjects: function ( success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'projects',
                    headers: authService.getAuthHeaders()
                };
                //{
                //
                //}

                $http(request).success(success);
            }
        }
    }]
);
