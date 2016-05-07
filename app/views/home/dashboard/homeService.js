'use strict';

app.factory('homeService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {
        return {
            //[GET] Issues/me?pageSize={pageSize}&pageNumber={pageNumber}&orderBy={by}
            getUserIssues: function (params, success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'issues/me',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                //{
                //    "TotalPages": 1,
                //    "Issues": [],
                //    "TotalCount": 0
                //}

                $http(request).then(function (response) {
                    success(response.data);
                })
            },

            //[GET] projects?pageSize={pageSize}&pageNumber={pageNumber}&filter=Lead.Id={id}
            getProjectsWithParams: function (params, success) {
                var id = authService.getCurrentUser().Id;
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'projects',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                //{
                //    "TotalPages": 2,
                //    "Projects": [],
                //    "TotalCount": 8
                //}

                $http(request).then(function (response) {
                    success(response.data);
                })
            }
        }
    }]
);
