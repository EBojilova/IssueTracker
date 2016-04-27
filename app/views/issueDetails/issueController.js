app.controller('IssuePageController', [
    '$scope', '$routeParams', '$location', 'issuePageService', 'authService',
    function ($scope, $routeParams, $location, issuePageService, authService) {
        //$scope.newComment = {};

        function getIssue() {
            issuePageService.getIssueById($routeParams.id,
                function success(data) {
                    $scope.issue = data;
                    $scope.isAssignee = $scope.issue.Assignee.Id === authService.getCurrentUser().Id;
                    //$scope.currentIssueLabels = [];
                    //data.Labels.forEach(function (label) {
                    //    $scope.currentIssueLabels.push(label.Name);
                    //});
                }
            );
        }

        function getComments() {
            issuePageService.getIssueComments($routeParams.id,
                function success(data) {
                    $scope.comments = data;
                }
            )
        }

        $scope.addComment = function (comment) {
            issuePageService.addComment(comment, $routeParams.id,
                function success(data) {
                    //$scope.newComment = {};
                    $scope.comments = data;
                }
            )
        };

        $scope.changeStatus = function (statusId) {
            issuePageService.changeIssueStatus($scope.issue.Id, statusId,
                function success() {
                    getIssue();
                }
            )
        };

        getIssue();
        getComments();
    }]);