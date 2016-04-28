app.controller('IssueController', [
    '$scope', '$rootScope', '$routeParams', '$location', 'issueService', 'authService', 'projectService',
    function ($scope, $rootScope, $routeParams, $location, issueService, authService, projectService) {
        $rootScope.pageTitle = "Issues's Details";

        $scope.issueComment = {};

        function getIssue() {
            issueService.getIssueById($routeParams.id,
                function success(data) {
                    $scope.issue = data;
                    $scope.isAssignee = $scope.issue.Assignee.Id === authService.getCurrentUser().Id;
                    //$scope.currentIssueLabels = [];
                    //data.Labels.forEach(function (label) {
                    //    $scope.currentIssueLabels.push(label.Name);
                    //});
                    projectService.getProjectById($scope.issue.Project.Id,
                        function success(data) {
                            $scope.project = data;
                            // TODO: check parse JSON for ===
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
                        })
                }
            );
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

        $scope.changeStatus = function (statusId) {
            issueService.changeIssueStatus($scope.issue.Id, statusId,
                function success() {
                    getIssue();
                }
            );
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
            //    "Status": {"Id": 4,"Name": "StoppedProgress"},
            //    "Labels": [{ "Id": 293,"Name": "Label103",.....}],
            //    "AvailableStatuses": [{"Id": 3,"Name": "InProgress"},{ "Id": 1, "Name": "Closed"}] }
        };

        getIssue();
        getComments();
    }]);