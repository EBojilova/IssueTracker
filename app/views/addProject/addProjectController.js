app.controller('AddProjectController', [
    '$scope', '$rootScope', '$location', 'addProjectService', 'notifyService', 'autocompleteService',
    function ($scope, $rootScope, $location, addProjectService, notifyService, autocompleteService) {
        $rootScope.pageTitle = {title: "Add Project"};

        // needed for autocomplete controller
        $scope.tags = [];
        $scope.joinedLabels = $scope.tags.join();

        // needed for priorities controller
        $scope.priorities = [];
        $scope.joinedPriorities = $scope.priorities.join();

        var convertToRequestData = function (project) {

            //produce projectKey
            var str = project.Name;
            var words = str.split(' ').filter(function (n) {
                return n;
            });
            var acronym = '';
            if (words.length < 2) {
                acronym = str.slice(0, 2)
            }
            else {
                words.forEach(function (word) {
                    acronym += word.charAt(0);
                });
            }
            project.ProjectKey = acronym.toUpperCase();

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

        $scope.submitProjectForAdding = function (project) {
            // TODO: ng-model is not updating on autocomplete
            autocompleteService.getUserByUserName($("#assignee").val(),
                function success(data) {
                    if (data[0]) {
                        project = convertToRequestData(project);
                        project.LeadId = data[0].Id;
                        addProjectService.addProject(project,
                            function (data) {
                                notifyService.showInfo("Project successfully added.");
                                $location.path('/projects');
                            });
                    }
                    else {
                        notifyService.showError('Chosen Assigne does not exists! Please choose Assignee from the list provided.')
                    }
                })

        };

    }]);