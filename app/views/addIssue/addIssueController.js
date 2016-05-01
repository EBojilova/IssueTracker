app.controller('AddIssueController', [
    '$scope', '$rootScope', '$routeParams', '$location', 'addIssueService', 'projectService', 'autocompleteService', 'notifyService',
    function ($scope, $rootScope, $routeParams, $location, addIssueService, projectService, autocompleteService, notifyService) {
        $rootScope.pageTitle = "Add Issue";

        $scope.today = new Date();
        $scope.maxDueDay = new Date().setMonth($scope.today.getMonth() + 6);

        projectService.getProjectById($routeParams.id,
            function success(data) {
                $scope.project = data;
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

            // TODO: ng-model is not updating on outocomplete
            autocompleteService.getUserByUserName($("#assignee").val(),
                function success(data) {
                    if (data[0]) {
                        var labels = $("#labels").html().split(',');
                        issue.Labels = convertLabelstoObject(labels);
                        issue.AssigneeId = data[0].Id;
                        addIssueService.addIssue(issue,
                            function success() {
                                notifyService.showInfo("Issue successful added!");
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