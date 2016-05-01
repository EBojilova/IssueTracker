app.controller('EditIssueController', [
    '$scope','$rootScope', '$routeParams', '$location', 'editIssueService', 'issueService', 'projectService', 'notifyService',
    function ($scope,$rootScope, $routeParams, $location, editIssueService, issueService, projectService, notifyService) {
        $rootScope.pageTitle = "Edit Issue";

        projectService.getProjectById($routeParams.id,
            function success(data) {
                $scope.project = data;
                $scope.projectPriorities = data.Priorities;
            });


        issueService.getIssueById($routeParams.id, function success(issue) {
            $scope.issue = {
                Title : issue.Title,
                Description : issue.Description,
                DueDate : new Date(issue.DueDate),
                ProjectId : parseInt(issue.Project.Id),
                AssigneeId : issue.Assignee.Username,
                PriorityId: issue.Priority.Id
            };

            $scope.today = new Date(issue.DueDate);
            $scope.maxDueDay = new Date().setMonth($scope.today.getMonth() + 6);

            var currentLabels = [];
            issue.Labels.forEach(function (label) {
                currentLabels.push(label.Name);
            });
            var jonedLabels=currentLabels.join();
            $('#labels').html(jonedLabels);

        });

        function convertLabelstoObject(inputArray) {
            var outputArrayAsJson = [];
            inputArray.forEach(function (element) {
                outputArrayAsJson.push({Name: element});
            });
            return outputArrayAsJson;
        }

        $scope.submitIssueForEditing = function () {

            // TODO: ng-model is not updating on autocomplete
            autocompleteService.getUserByUserName($("#assignee").val(),
                function success(data) {
                    if (data[0]) {
                        var labels = $("#labels").html().split(',');
                        issue.Labels = convertLabelstoObject(labels);
                        issue.AssigneeId = data[0].Id;
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