app.controller('ProjectController', [
    '$scope', '$routeParams', 'projectService', 'authService', 'notifyService',
    function ($scope, $routeParams, projectService, authService, notifyService) {

        function getProjectById(id) {
            projectService.getProjectById(id,
                function success(project) {
                    $scope.project = project.data;
                    //{
                    //    "Id": 2,
                    //    "Name": "new",
                    //    "ProjectKey": "1",
                    //    "Description": "new",
                    //    "Lead": {
                    //        "Id": "6f621bc0-dbad-4e1d-bc3b-c4e5b973ec1c",
                    //        "Username": "pesho_peshev@abv.bg",
                    //        "isAdmin": false
                    //},
                    //    "TransitionSchemeId": 1,
                    //    "Labels": [
                    //    {
                    //        "Id": 526, "Name": "pesho"
                    //    }
                    //],
                    //    "Priorities": [
                    //    {
                    //        "Id": 1, "Name": "Low"
                    //    }]}
                    //TODO:
                    authService.setProjectLeader($scope.project.Id,
                        function success() {
                            $scope.isProjectLeader = authService.isProjectLeader();
                        }
                    );
                })
        };

        getProjectIssues = function (projectId) {
            projectService.getProjectIssues(projectId)
                .then(
                    function success(issues) {
                        $scope.projectIssues = issues.data;
                        //console.log(issues.data);
                        $scope.authors = [];
                        $scope.assignees = [];
                        var hashAuthors = {};
                        var hashAssignee = {};
                        issues.data.forEach(function (issue) {
                            if (!hashAuthors[issue.Author.Username]) {
                                hashAuthors[issue.Author.Username] = true;
                                $scope.authors.push([issue.Author.Username, issue.Author.Id]);
                            }
                            if (!hashAssignee[issue.Assignee.Username]) {
                                hashAssignee[issue.Assignee.Username] = true;
                                $scope.assignees.push([issue.Assignee.Username, issue.Assignee.Id]);
                            }
                        });
                    },
                    function error(err) {
                        notifyService.showError('Cannot load issues for this project', err);
                    }
                )
        };

        getProjectById($routeParams.id);
        getProjectIssues($routeParams.id);
    }]);