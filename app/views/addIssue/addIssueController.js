app.controller('AddIssueController', [
    '$scope', '$rootScope', '$routeParams', '$location', 'addIssueService', 'projectService', 'autocompleteService', 'notifyService','authService',
    function ($scope, $rootScope, $routeParams, $location, addIssueService, projectService, autocompleteService, notifyService,authService) {
        $rootScope.pageTitle = "Add Issue";

        $scope.today = new Date();
        $scope.maxDueDay = new Date().setMonth($scope.today.getMonth() + 12);

        projectService.getProjectById($routeParams.id,
            function success(data) {
                $scope.project = data;
                $scope.projectPriorities = data.Priorities;
                $scope.isProjectLeader = data.Lead.Id === authService.getCurrentUser().Id;
                // needed for autocomplete controller
                $scope.tags = [];
                $scope.joinedLabels = $scope.tags.join();
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

            // TODO: ng-model is not updating on autocomplete
            autocompleteService.getUserByUserName($("#assignee").val(),
                function success(data) {
                    if (data[0]) {
                        issue.Labels = convertLabelstoObject($scope.tags);
                        issue.AssigneeId = data[0].Id;
                        addIssueService.addIssue(issue,
                            function success() {
                                notifyService.showInfo("Issue successfully added!");
                                $location.path('/projects/' + $routeParams.id);
                            })
                    }
                    else {
                        notifyService.showError('Chosen Assigne does not exists! Please choose Assignee from the list provided.')
                    }
                })
        };
    }
]);