app.controller('ProjectController', [
    '$scope', '$routeParams', 'projectService',
    function ($scope, $routeParams, projectService) {

        function getProjectById(id) {
            projectService.getProjectById(id,
                function success(data) {
                    $scope.project = data;
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

        function getProjectIssues(projectId) {
            projectService.getProjectIssues(projectId,
                function success(data) {
                        $scope.projectIssues = data;
                    //[{
                    //        "Id": 31,
                    //        "Title": "hopes up",
                    //        "IssueKey": "1-1",
                    //        "Description": "work work",
                    //        "DueDate": "2016-04-23T00:00:00",
                    //        "Project": {"Id": 2, "Name": "new"},
                    //        "Author": {
                    //            "Id": "13410e44-e9c9-456f-a58d-4e2815db856e",
                    //            "Username": "echo@eee",
                    //            "isAdmin": true
                    //        },
                    //        "Assignee": {
                    //            "Id": "1cf0c4f9-73a3-4344-b4a5-1d3ad8d33abf",
                    //            "Username": "saivanov@mail.bg",
                    //            "isAdmin": false
                    //        },
                    //        "Priority": {"Id": 130,"Name": "Urgent3"},
                    //        "Status": {"Id": 1,"Name": "Closed"  },
                    //        "Labels": [],
                    //        "AvailableStatuses": []
                    //    }, ....]
                    }
                )
        }

        getProjectById($routeParams.id);
        getProjectIssues($routeParams.id);
    }]);