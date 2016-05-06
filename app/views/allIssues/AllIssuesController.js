'use strict';

app.controller('AllIssuesController', ['$scope', '$rootScope', 'allIssuesService', 'notifyService', 'pageSize', 'authService',
    function ($scope, $rootScope, allIssuesService, notifyService, pageSize, authService) {
        $rootScope.pageTitle = "All Issues";

        //[GET] /issues/?filter=Priority.Title == "In Progress" or DueDate.Day == 21&pageSize=2&pageNumber=1
        //[GET] issues/?filter=Assignee.Username.contains("helen")&pageSize=4&pageNumber=1
        //?filter=Project.Id == 2
        //?filter=DueDate.Day >= 20
        //?filter=Project.Title == “SIT”
        // default parameters
        var userId = authService.getCurrentUser().Id;
        $scope.multipleFilter = {};
        $scope.multipleFilter.Search ='';

        $scope.issuesParams = {
            'filter': '',
            'orderBy': 'DueDate desc',
            'pageNumber': 1,
            'pageSize': pageSize
        };

        $scope.reloadIssues = function () {
            // $scope.issuesLoaded is used for loading circle in home.html
            $scope.issuesLoaded = false;
            if($scope.multipleFilter.Search){
                var filterComponents=[
                    'Title.Contains("' + $scope.multipleFilter.Search + '")',
                    'Description.Contains("' + $scope.multipleFilter.Search + '")',
                    'Project.Name.Contains("' + $scope.multipleFilter.Search + '")',
                    'Author.Username.Contains("' + $scope.multipleFilter.Search + '")',
                    'Assignee.Username.Contains("' + $scope.multipleFilter.Search + '")',
                    'Priority.Name.Contains("' + $scope.multipleFilter.Search + '")',
                    'Status.Name.Contains("' + $scope.multipleFilter.Search + '")'
                ];
                $scope.issuesParams.filter = filterComponents.join(' or ');
            }
            //if($scope.multipleFilter.Description){
            //    $scope.issuesParams.filter = 'Assignee.Id="' + userId + '"' + ' and Description.Contains("' + $scope.multipleFilter.Description + '")';
            //}
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

            $scope.showAllIssues=function(){
                $scope.multipleFilter.Search ='';
                $scope.issuesParams.filter = '';
                $scope.reloadIssues();
            }
        };

        //parvia pat ste se izpalni samo s default parameters
        $scope.reloadIssues();
        
    }]
);
