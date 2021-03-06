app.controller('IssueController', [
    '$scope', '$rootScope', '$routeParams', '$location', 'issueService', 'authService', 'projectService',
    function ($scope, $rootScope, $routeParams, $location, issueService, authService, projectService) {
        $rootScope.pageTitle = {title:"Issues's Details"};

        $scope.issueComment = {};

        function getIssue() {
            issueService.getIssueById($routeParams.id,
                function success(data) {
                    $scope.issue = data;
                    //{
                    //    "Id": 9,
                    //    "Title": "issue problem 6",
                    //    "IssueKey": "123adfj-9",
                    //    "Description": "na red 212",
                    //    "DueDate": "2015-05-23T00:00:00",
                    //    "Project": {"Id": 1, "Name": "viksataaa"},
                    //    "Author": {
                    //        "Id": "e0e672ee-9382-4860-98be-cfa68743a20a",
                    //        "Username": "admin@softuni.bg",
                    //        "isAdmin": true},
                    //    "Assignee": {
                    //        "Id": "e0e672ee-9382-4860-98be-cfa68743a20a",
                    //        "Username": "admin@softuni.bg",
                    //        "isAdmin": true},
                    //    "Priority": {"Id": 2,"Name": "Urgent"},
                    //    "Status": {"Id": 1,"Name": "Closed"},
                    //    "Labels": [],
                    //    "AvailableStatuses": []
                    //}
                    if (!authService.isAdmin()) {
                        $scope.isAssignee = $scope.issue.Assignee.Id === authService.getCurrentUser().Id;
                        if (!$scope.isAssignee) {
                            projectService.getProjectById($scope.issue.Project.Id,
                                function success(data) {
                                    $scope.project = data;
                                    $scope.isProjectLeader = $scope.project.Lead.Id === authService.getCurrentUser().Id;
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
                                    if (!$scope.isProjectLeader) {
                                        // proveriavam dali ima usera pone edno issue v proekta
                                        var issuesParams = {
                                            'filter': 'Assignee.Username== "' + authService.getCurrentUser().Username + '" and Project.Name=="' + $scope.project.Name + '"',
                                            'pageNumber': 1,
                                            'pageSize': 1
                                        };
                                        issueService.getIssuesWithParams(issuesParams,
                                            function success(data) {
                                                $scope.hasAnyIssueInProject = data.Issues.length > 0;
                                                console.log('anyIssue');
                                                console.log($scope.hasAnyIssueInProject);
                                            })
                                    }
                                });
                        }
                    }
                }
            );
        }

        function getComments() {
            $scope.commentsLoaded = false;
            issueService.getIssueComments($routeParams.id,
                function success(data) {
                    $scope.comments = data;
                    $scope.commentsLoaded = true;
                }
            );
            //[
            //{
            //    "Text": "golqm problem! Nqma SHTO",
            //    "CreatedOn": "2016-04-10T19:04:07.81",
            //    "Author": {
            //        "Id": "e0e672ee-9382-4860-98be-cfa68743a20a",
            //        "Username": "admin@softuni.bg",
            //        "isAdmin": true
            //    }
            //},.........]

        }

        $scope.addComment = function (comment) {
            issueService.addCommentToIssue(comment, $routeParams.id,
                function success(data) {
                    $scope.comments = data;
                    $scope.issueComment.Text = null;
                }
            );
            //    [
            //{
            //    "Text": "New issue to cheeck rest service feedback",
            //    "CreatedOn": "2016-04-27T09:16:09.5514897Z",
            //    "Author": {
            //        "Id": "e0e672ee-9382-4860-98be-cfa68743a20a",
            //        "Username": "admin@softuni.bg",
            //        "isAdmin": true
            //    }
            //}
            //    ]
        };

        $scope.changeStatus = function (status) {
            $scope.issue.Status = status;
            issueService.changeIssueStatus($scope.issue.Id, status.Id,
                function success(data) {
                    $scope.issue.AvailableStatuses = data;
                    //getIssue();
                }
            );
            //   [{"Id": 3,"Name": "InProgress"},{ "Id": 1, "Name": "Closed"}] }
        };

        getIssue();
        getComments();
    }]);