app.factory('addIssueService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {

        return {

            addIssue: function addIssue(issue, success) {

                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'issues/',
                    headers: authService.getAuthHeaders(),
                    data: issue
                };

                $http(request).then(function (response) {
                    success(response.data);
                })
            }
        }
    }
]);