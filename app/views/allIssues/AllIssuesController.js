'use strict';

app.controller('AllIssuesController', ['$scope', '$rootScope', 'allIssuesService', 'notifyService', 'pageSize', 'authService',
    function ($scope, $rootScope, allIssuesService, notifyService, pageSize, authService) {
        $rootScope.pageTitle = {title:"All Issues"};

        //[GET] /issues/?filter=Priority.Title == "In Progress" or DueDate.Day == 21&pageSize=2&pageNumber=1
        //[GET] issues/?filter=Assignee.Username.contains("helen")&pageSize=4&pageNumber=1
        //?filter=Project.Id == 2
        //?filter=DueDate.Day >= 20
        //?filter=Project.Title == “SIT”
        // default parameters
        $scope.multipleFilter = {};
        $scope.multipleFilter.Title = '';
        $scope.multipleFilter.Description = '';
        $scope.multipleFilter.Project = '';
        $scope.multipleFilter.Assignee = '';
        $scope.multipleFilter.Author = '';
        $scope.multipleFilter.Priority = '';
        $scope.multipleFilter.Status = '';
        $scope.multipleFilter.DueDate = '';

        $scope.issuesParams = {
            'filter': '',
            'orderBy': 'DueDate desc',
            'pageNumber': 1,
            'pageSize': 13
        };

        $scope.reloadIssues = function () {
            // $scope.issuesLoaded is used for loading circle in home.html
            $scope.issuesLoaded = false;

            // FILTERS
            var filterComponents = [];
            if ($scope.multipleFilter.Title) {
                filterComponents.push('Title.Contains("' + $scope.multipleFilter.Title + '")')
            }
            if ($scope.multipleFilter.Description) {
                filterComponents.push('Description.Contains("' + $scope.multipleFilter.Description + '")')
            }
            if ($scope.multipleFilter.Project) {
                filterComponents.push('Project.Name.Contains("' + $scope.multipleFilter.Project + '")')
            }
            if ($scope.multipleFilter.Assignee) {
                filterComponents.push('Assignee.Username.Contains("' + $scope.multipleFilter.Assignee + '")')
            }
            if ($scope.multipleFilter.Author) {
                filterComponents.push('Author.Username.Contains("' + $scope.multipleFilter.Author + '")')
            }
            if ($scope.multipleFilter.Priority) {
                filterComponents.push('Priority.Name.Contains("' + $scope.multipleFilter.Priority + '")')
            }
            if ($scope.multipleFilter.Status) {
                filterComponents.push('Status.Name.Contains("' + $scope.multipleFilter.Status + '")')
            }
            if ($scope.multipleFilter.DueDate) {
                //?filter=DueDate.Day >= 20
                //TODO: rest service only filters by Day
                var date=new Date($scope.multipleFilter.DueDate.toISOString());
                filterComponents.push('DueDate.Day==' + date.getDate());
            }
            if (filterComponents.length > 0) {
                $scope.issuesParams.filter = filterComponents.join(' and ');
            }

            allIssuesService.getIssues(
                $scope.issuesParams,
                function success(data) {
                    $scope.issuesLoaded = true;
                    $scope.issues = data;
                    //{
                    //    "TotalPages": 86,
                    //    "Issues": [],
                    //    "TotalCount": 342
                    //}
                }
            );
        };

        //parvia pat ste se izpalni samo s default parameters
        $scope.reloadIssues();

        $scope.showAllIssues = function () {
            $scope.multipleFilter.Title = '';
            $scope.multipleFilter.Description = '';
            $scope.multipleFilter.Project = '';
            $scope.multipleFilter.Assignee = '';
            $scope.multipleFilter.Author = '';
            $scope.multipleFilter.Priority = '';
            $scope.multipleFilter.Status = '';
            $scope.multipleFilter.DueDate = '';
            $scope.issuesParams.filter = '';
            $scope.reloadIssues();
        }
    }]
);
