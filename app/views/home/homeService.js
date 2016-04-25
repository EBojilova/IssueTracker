'use strict';

app.factory('homeService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {
        return {
            //[GET] Issues/me?pageSize={pageSize}&pageNumber={pageNumber}&orderBy={by}
            getUserIssues: function (params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'issues/me?orderBy=DueDate desc',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                //{
                //    "TotalPages": 1,
                //    "Issues": [],
                //    "TotalCount": 0
                //}

                $http(request).success(success);
            },

            //[GET] projects?pageSize={pageSize}&pageNumber={pageNumber}&filter=Lead.Id={id}
            getUserProjects: function (params, success, error) {
                var id = authService.getCurrentUser().Id;
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'projects?filter=Lead.Id="' + id + '"',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                //{
                //    "TotalPages": 2,
                //    "Projects": [],
                //    "TotalCount": 8
                //}

                $http(request).success(success);
            }
        }
    }]
);
