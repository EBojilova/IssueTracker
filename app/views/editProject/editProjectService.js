app.factory('editProjectService', ['$http', 'baseServiceUrl','authService',
    function ($http, baseServiceUrl, authService) {

        return {

            editProject: function editProject(project, success) {

                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + 'projects/' + project.Id,
                    headers: authService.getAuthHeaders(),
                    data: project
                };
                $http(request).success(success);
            }
        }
    }
]);