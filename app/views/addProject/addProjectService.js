app.factory('addProjectService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {

        return {
            addProject: function addProject(project, success) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'projects',
                    headers: authService.getAuthHeaders(),
                    data: project
                };
                $http(request).then(function (response) {
                    success(response.data);
                })
            }
        }
    }
]);