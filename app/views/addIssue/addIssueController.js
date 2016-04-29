app.controller('AddIssueController', [
    '$scope', '$rootScope', '$routeParams', '$location', 'addIssueService', 'projectService', 'authService','notifyService',
    function ($scope, $rootScope, $routeParams, $location, addIssueService, projectService, authService, notifyService) {
        $rootScope.pageTitle = "Add Issue";

        $scope.today=new Date();
        $scope.maxDueDay=new Date().setMonth($scope.today.getMonth()+6);
        $scope.usersLoaded=false;
        authService.getAllUsers(function success(data) {
            $scope.users = data;
            $scope.usersLoaded=true;
        });

        projectService.getProjectById($routeParams.id,
            function success(data) {
                $scope.project=data;
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

            addIssueService.addIssue(issue,
                function success() {
                    notifyService.showInfo("Issue successful added!");
                    $location.path('/projects/' + $routeParams.id);
                })
        };
    }
]);