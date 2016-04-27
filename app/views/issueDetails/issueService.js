app.factory('issuePageService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {

        return {
            getIssueById: function getIssueById(issueId) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'Issues/' + issueId,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success);
            },

            changeIssueStatus: function changeIssueStatus(issueId, statusId) {
                var deferred = $q.defer();
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + 'Issues/' + issueId + '/changestatus?statusid=' + statusId,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success);
            },

            getIssueComments: function getIssueComments(issueId) {
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'Issues/' + issueId + '/comments',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success);
            },

            addComment: function addComment(comment, issueId) {
                var deferred = $q.defer();
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'Issues/' + issueId + '/comments',
                    headers: authService.getAuthHeaders(),
                    data: {'Text': comment}
                };
                $http(request).success(success);
            }
        }
    }
]);