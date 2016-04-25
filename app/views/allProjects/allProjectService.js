'use strict';

app.factory('allProjectsService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {
        return {
            //[GET] projects?filter=&pageSize=4&pageNumber=1
            getUserProjects: function (params, success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'projects?filter=',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                //{
                //    "TotalPages": 86,
                //    "Projects": [],
                //    "TotalCount": 342
                //}

                $http(request).success(success);
            }
        }
    }]
);
