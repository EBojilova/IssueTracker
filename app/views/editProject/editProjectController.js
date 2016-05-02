app.controller('ProjectEditController', [
    '$scope', '$rootScope', '$routeParams', '$location', 'projectService', 'editProjectService', 'notifyService', 'autocompleteService','authService',
    function ($scope, $rootScope, $routeParams, $location, projectService, editProjectService, notifyService, autocompleteService,authService) {
        $rootScope.pageTitle = "Edit Project";

        projectService.getProjectById($routeParams.id,
            function success(data) {

                $scope.isProjectLeader = data.Lead.Id === authService.getCurrentUser().Id;

                $scope.project = {
                    Id: data.Id,
                    Description: data.Description,
                    Name: data.Name,
                    LeadId: data.Lead.Username
                };

                //needed for autocompleete controller
                $scope.tags = [];
                data.Labels.forEach(function (label) {
                    $scope.tags.push(label.Name);
                });
                $scope.joinedLabels = $scope.tags.join();

                //needed for priorities controller
                $scope.priorities = [];
                data.Priorities.forEach(function (priority) {
                    $scope.priorities.push(priority.Name);
                });
                $scope.joinedPriorities = $scope.priorities.join();
            });

        var convertToRequestData = function (project) {

            //set Name property
            project.labels = toObject($scope.tags);
            project.priorities = toObject($scope.priorities);

            function toObject(inputArray) {
                var outputArrayAsJson = [];
                inputArray.forEach(function (element) {
                    outputArrayAsJson.push({Name: element});
                });
                return outputArrayAsJson;
            }

            return project
        };

        $scope.submitProjectForEditing = function (project) {
            // TODO: ng-model is not updating on autocomplete
            autocompleteService.getUserByUserName($("#assignee").val(),
                function success(data) {
                    if (data[0]) {
                        project = convertToRequestData(project);
                        project.LeadId = data[0].Id;
                        editProjectService.editProject(project,
                            function (data) {
                                notifyService.showInfo("Project successfully edited.");
                                $location.path('projects/' + $scope.project.Id);
                            });
                    }
                    else {
                        notifyService.showError('Chosen Assigne does not exists! Please choose Assignee from the list provided.')
                    }
                })

        };
    }]);
