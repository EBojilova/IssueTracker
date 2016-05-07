app.factory('issueService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {

        return {
            getIssueById: function getIssueById(issueId, success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'Issues/' + issueId,
                    headers: authService.getAuthHeaders()
                };
                $http(request).then(function(response){success(response.data);})
            },

            getIssuesWithParams: function getIssueById(params, success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'Issues',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                $http(request).then(function(response){success(response.data);})
            },

            changeIssueStatus: function changeIssueStatus(issueId, statusId, success) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + 'Issues/' + issueId + '/changestatus?statusid=' + statusId,
                    headers: authService.getAuthHeaders()
                };
                $http(request).then(function(response){success(response.data);})
            },

            getIssueComments: function getIssueComments(issueId, success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'Issues/' + issueId + '/comments',
                    headers: authService.getAuthHeaders()
                };
                $http(request).then(function(response){success(response.data);})
            },

            addCommentToIssue: function addComment(comment, issueId, success) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'Issues/' + issueId + '/comments',
                    headers: authService.getAuthHeaders(),
                    data: comment
                };
                $http(request).then(function(response){success(response.data);})
            }
        }
    }
]);