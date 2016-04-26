angular.module('issueTracker.projectView.service', [])
    .factory('projectService', ['$http', 'baseServiceUrl', 'authService',
        function ($http, baseServiceUrl, authService) {

            return {
                getProjectById: function getProjectById(id, success) {
                    var request = {
                        method: 'GET',
                        url: baseServiceUrl + 'projects/' + id,
                        headers: authService.getAuthHeaders()
                    };
                    $http(request).success(success);
                },

                getProjectIssues: function getProjectIssues(projectId) {
                    var request = {
                        method: 'GET',
                        url: baseServiceUrl + 'projects/' + projectId + '/Issues',
                        headers: authService.getAuthHeaders()
                    };
                    $http(request).success(success);
                },

                editProject: function editProject(project) {
                    var dataLabels = '';
                    project.Labels.forEach(function (label, index) {
                        dataLabels += '&labels[' + index + '].Name=' + label.trim();
                    });
                    var dataPriorities = '';
                    project.Priorities.forEach(function (priority, index) {
                        dataPriorities += '&priorities[' + index + '].Name=' + priority.trim();
                    });
                    var data = 'Name=' + project.Name +
                        '&Description=' + project.Description +
                        dataLabels + dataPriorities +
                        '&LeadId=' + project.LeadId;
                    var request = {
                        method: 'PUT',
                        url: baseServiceUrl + 'projects/' + project.Id,
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.access_token,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: data
                    };
                    $http(request).success(success);
                }
            }
        }
    ]);