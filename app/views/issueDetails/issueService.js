app.factory('issueService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {

        return {
            getIssueById: function getIssueById(issueId, success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'Issues/' + issueId,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success);
            },

            getIssuesWithParams: function getIssueById(params, success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'Issues',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                $http(request).success(success);
            },

            changeIssueStatus: function changeIssueStatus(issueId, statusId, success) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + 'Issues/' + issueId + '/changestatus?statusid=' + statusId,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success);
            },

            getIssueComments: function getIssueComments(issueId, success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'Issues/' + issueId + '/comments',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success);
            },

            addCommentToIssue: function addComment(comment, issueId, success) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'Issues/' + issueId + '/comments',
                    headers: authService.getAuthHeaders(),
                    data: comment
                };
                $http(request).success(success);
            }
        }
    }
]);