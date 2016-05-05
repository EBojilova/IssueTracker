'use strict';

app.controller('HomeController', ['$scope', '$rootScope', 'homeService', 'notifyService', 'pageSize', 'authService',
    function ($scope, $rootScope, homeService, notifyService, pageSize, authService) {
        $rootScope.pageTitle = "Dashboard";


        //PROJECTS, I am Lead
        // Params, triabva da sadarjat 3 parametara:  ?pageSize={pageSize}&pageNumber={pageNumber}&filter=Lead.Id={id}
        // promeniat se v taga pagination v htmla
        // default parameters
        var userId = authService.getCurrentUser().Id;
        $scope.projectsParams = {
            'filter': 'Lead.Id="' + userId + '"',
            'pageNumber': 1,
            'pageSize': pageSize
        };

        $scope.reloadProjects = function () {
            // $scope.projectsLoaded is used for loading circle in home.html
            $scope.projectsLoaded = false;
            homeService.getUserProjects(
                $scope.projectsParams,
                function success(data) {
                    $scope.projects = data;
                    $scope.projectsLoaded = true;
                    //{
                    //    "TotalPages": 86,
                    //    "Projects": [],
                    //    "TotalCount": 342
                    //}
                }
            );
        };

        //parvia pat ste se izpalni samo s default parameters
        $scope.reloadProjects();


        //ISSUES
        // Params, moje da sadarjat 3 parametara:  ?pageSize={pageSize}&pageNumber={pageNumber}&orderBy={by}
        // promeniat se v taga pagination v htmla
        // default parameters
        $scope.issuesParams = {
            'orderBy':'DueDate desc',
            'pageNumber': 1,
            'pageSize': pageSize
        };

        $scope.reloadIssues = function () {
            // $scope.issuesLoaded is used for loading circle in home.html
            $scope.issuesLoaded = false;
            homeService.getUserIssues(
                $scope.issuesParams,
                function success(data) {
                    $scope.issues = data;
                    $scope.issuesLoaded = true;
                    // TODO: there is bug in the REST service and always TotalCount is 0
                    $scope.issuesCount = data.TotalPages * $scope.issuesParams.pageSize;
                    //{
                    //    "TotalPages": 0,
                    //    "Issues": [],
                    //    "TotalCount": 0
                    //}
                }
            );
        };

        //parvia pat ste se izpalni samo s default parameters
        $scope.reloadIssues();
    }]
);
