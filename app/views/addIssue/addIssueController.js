app.controller('AddIssueController', [
    '$scope', '$routeParams', '$location', 'addIssueService', 'projectService',
    function ($scope, $routeParams, $location, addIssueService, projectService) {
        $scope.allUsers();

        projectService.getProjectById($routeParams.id,
            function success(data) {
                $scope.projectPriorities = data.Priorities;
            });

        $scope.addIssue = function () {
            var issueToAdd = {
                Title: $scope.addIssue.Title,
                Description: $scope.addIssue.Description,
                DueDate: $scope.addIssue.DueDate.toISOString(),
                ProjectId: $routeParams.id,
                AssigneeId: $scope.addIssue.AssigneeId,
                PriorityId: $scope.addIssue.PriorityId,
                Labels: $scope.addIssue.Labels.split(',')
            };
            addIssueService.addIssue(issueToAdd,
                function success() {
                    $location.path('projects/' + $routeParams.id)
                }
            )
        }
    }
]);