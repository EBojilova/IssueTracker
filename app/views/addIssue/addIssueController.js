app.controller('AddIssueController', [
    '$scope', '$rootScope', '$routeParams', '$location', 'addIssueService', 'projectService',
    function ($scope, $rootScope, $routeParams, $location, addIssueService, projectService) {
        $rootScope.pageTitle = "Add Issue";

        authService.getAllUsers( function success(data) {
            $scope.users = data;
        });

        projectService.getProjectById($routeParams.id,
            function success(data) {
                $scope.projectPriorities = data.Priorities;
            });

        function convertLabelstoObject(inputArray) {
            var outputArrayAsJson = [];
            inputArray.forEach(function (element) {
                outputArrayAsJson.push({Name: element});
            });
            return outputArrayAsJson;
        }

        $scope.sumbitIssueForAdding = function addIssue(issue) {
            issue.ProjectId = $routeParams.id;
            issue.Labels = convertLabelstoObject(issue.Labels);

            addIssueService.addIssue(issue)
                .then(function success() {
                    notifyService.showInfo("Issue successful added!");
                    $location.path('/projects/' + $routeParams.id);
                })
        };
    }
]);