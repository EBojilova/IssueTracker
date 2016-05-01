app.factory('editIssueService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {

        return {
            editIssue: function editIssue(issue, id, success) {

                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + 'issues/' + id,
                    data: issue,
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(success);
            }
        }
    }
]);