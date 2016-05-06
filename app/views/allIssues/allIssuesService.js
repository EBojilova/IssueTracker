'use strict';

app.factory('allIssuesService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {
        return {
            //[GET] /issues/?filter=Priority.Name == "In Progress" or DueDate.Day == 21&pageSize=2&pageNumber=1
            //[GET] issues/?filter=Assignee.Username.contains("helen")&pageSize=4&pageNumber=1
                        //?filter=Project.Id == 2
                        //?filter=DueDate.Day >= 20
                        //?filter=Project.Name == “SIT”
            getIssues: function (params, success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'issues/',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                //{
                //    "TotalPages": 1,
                //    "Issues": [],
                //    "TotalCount": 0
                //}

                $http(request).success(success);
            }
        }
    }]
);
