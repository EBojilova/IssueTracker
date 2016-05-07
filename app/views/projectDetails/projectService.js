app.factory('projectService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {

        return {
            getProjectById: function getProjectById(id, success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'projects/' + id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).then(function (response) {
                    success(response.data);
                })
            },

            getProjectIssues: function getProjectIssues(projectId, success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'projects/' + projectId + '/Issues',
                    headers: authService.getAuthHeaders()
                };
                $http(request).then(function (response) {
                    success(response.data);
                })
            }
        }
    }
]);