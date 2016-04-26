app.factory('editProjectService', ['$http', 'baseServiceUrl',
    function ($http, baseServiceUrl) {

        return {

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