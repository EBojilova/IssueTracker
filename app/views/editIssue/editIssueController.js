app.controller('EditIssueController', [
    '$scope', '$rootScope', '$routeParams', '$location', 'editIssueService', 'issueService', 'projectService', 'notifyService','autocompleteService',
    function ($scope, $rootScope, $routeParams, $location, editIssueService, issueService, projectService, notifyService,autocompleteService) {
        $rootScope.pageTitle = "Edit Issue";

        issueService.getIssueById($routeParams.id, function success(issue) {
            $scope.oldIssueId=issue.Id;
            $scope.issue = {
                Title: issue.Title,
                Description: issue.Description,
                DueDate: new Date(issue.DueDate),
                ProjectId: parseInt(issue.Project.Id),
                AssigneeId: issue.Assignee.Username,
                PriorityId: issue.Priority.Id
            };

            $scope.today = new Date();
            $scope.maxDueDay = new Date().setMonth($scope.today.getMonth() + 12);

            // needed for autocomplete controller
            $scope.tags = [];
            issue.Labels.forEach(function (label) {
                $scope.tags.push(label.Name);
            });
            $scope.joinedLabels = $scope.tags.join();

            projectService.getProjectById($scope.issue.ProjectId,
                function success(data) {
                    $scope.project = data;
                    $scope.projectPriorities = data.Priorities;
                });

        });


        function convertLabelstoObject(inputArray) {
            var outputArrayAsJson = [];
            inputArray.forEach(function (element) {
                outputArrayAsJson.push({Name: element});
            });
            return outputArrayAsJson;
        }

        $scope.submitIssueForEditing = function (issue) {
            console.log('here');
            // TODO: ng-model is not updating on autocomplete
            autocompleteService.getUserByUserName($("#assignee").val(),
                function success(data) {
                    if (data[0]) {
                        issue.Labels = convertLabelstoObject( $scope.tags);
                        issue.AssigneeId = data[0].Id;
                        issue.PriorityId=$("#priority").val();
                        editIssueService.editIssue(issue, $routeParams.id,
                            function success(data) {
                                notifyService.showInfo("Issue successful edited!");
                                $location.path('issues/' + data.Id);
                            })
                    }
                    else {
                        notifyService.showError('Chosen Assigne does not exists! Please choose Assignee from the list provided.')
                    }
                })
        }
    }]);