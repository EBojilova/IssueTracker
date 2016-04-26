app.controller('ProjectEditController', [
    '$scope', '$routeParams', '$location', 'projectService', 'notifyService',
    function ($scope, $routeParams, $location, projectService, notifyService) {
        //TODO
        //$scope.allUsers();

        $scope.editProject = function () {
            if (typeof $scope.currentLabels === 'string') {
                $scope.currentLabels = getArrayOfWords($scope.currentLabels);
            }
            if (typeof $scope.currentPriorities === 'string') {
                $scope.currentPriorities = getArrayOfWords($scope.currentPriorities);
            }

            var projectForEdit = {
                Id: $scope.project.Id,
                Description: $scope.project.Description,
                Labels: $scope.currentLabels,
                Priorities: $scope.currentPriorities,
                Name: $scope.project.Name,
                LeadId: $scope.project.Lead.Id
            };

            projectService.editProject(projectForEdit,
                function success() {
                    notifyService.showInfo('Project successfully edited');
                    $location.path('projects/' + $scope.project.Id);
                });
        };

        function getProjectById(id) {
            projectService.getProjectById(id,
                function success(project) {
                    $scope.project = project.data;
                    $scope.currentLabels = [];
                    $scope.currentPriorities = [];
                    $scope.project.Labels.forEach(function (label) {
                        $scope.currentLabels.push(label.Name);
                    });
                    $scope.project.Priorities.forEach(function (priority) {
                        $scope.currentPriorities.push(priority.Name);
                    })
                })
        }

        function getArrayOfWords(str) {
            return str.split(',');
        }

        getProjectById($routeParams.id);
    }]);
