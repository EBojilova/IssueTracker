'use strict';

app.factory('allProjectsService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {
        return {
            //[GET] /projects?filter=Lead.Username.Contains("helen")&pageSize=4&pageNumber=1
            getProjectsWithParams: function ( params,success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'projects',
                    headers: authService.getAuthHeaders(),
                    params: params
                };

                $http(request).success(success);
            },


            //[GET] projects
            getProjects: function ( params,success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'projects',
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(success);
            }
        }
    }]
);
