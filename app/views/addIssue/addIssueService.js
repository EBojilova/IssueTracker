app.factory('addIssueService', ['$http', 'baseServiceUrl',
    function ($http, baseServiceUrl) {

        return {
            addIssue: function addIssue(issue) {
                var dataLabels = '';
                issue.Labels.forEach(function (l, index) {
                    dataLabels += '&labels[' + index + '].Name=' + l.trim();
                });

                var data = 'Title=' + issue.Title +
                    '&Description=' + issue.Description +
                    '&DueDate=' + issue.DueDate +
                    '&ProjectId=' + issue.ProjectId +
                    '&AssigneeId=' + issue.AssigneeId +
                    '&PriorityId=' + issue.PriorityId +
                    dataLabels;

                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'issues/',
                    data: data,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.access_token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                $http(request).success(success);
            }
        }
    }
]);