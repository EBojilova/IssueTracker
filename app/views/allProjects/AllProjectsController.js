'use strict';

app.controller('HomeController', ['$scope', '$rootScope', 'homeService', 'notifyService', 'pageSize',
    function ($scope, $rootScope, homeService, notifyService, pageSize) {
        $rootScope.pageTitle = "Dashboard";

        //PROJECTS
        // Params, moje da sadarjat 2 parametara:  pageSize={pageSize}&pageNumber={pageNumber}
        // promeniat se v taga pagination v htmla
        // default parameters
        $scope.projectsParams = {
            'pageNumber': 1,
            'pageSize': pageSize
        };

        $scope.reloadProjects = function () {
            // $scope.projectsLoaded is used for loading circle in home.html
            $scope.projectsLoaded=false;
            homeService.getUserProjects(
                $scope.projectsParams,
                function success(data) {
                    $scope.projects = data;
                    $scope.projectsLoaded=true;
                }
            );
        };

        //parvia pat ste se izpalni samo s default parameters
        $scope.reloadProjects();


        //ISSUES
        // Params, moje da sadarjat 2 parametara:  pageSize={pageSize}&pageNumber={pageNumber}
        // promeniat se v taga pagination v htmla
        // default parameters
        $scope.issuesParams = {
            'pageNumber': 1,
            'pageSize': pageSize
        };

        $scope.reloadIssues = function () {
            // $scope.issuesLoaded is used for loading circle in home.html
            $scope.issuesLoaded=false;
            homeService.getUserIssues(
                $scope.issuesParams,
                function success(data) {
                    $scope.issues = data;
                    $scope.issuesLoaded=true;
                    // TODO: there is bug in the REST service and always TotalCount is 0
                    $scope.issuesCount = data.TotalPages * $scope.issuesParams.pageSize;
                }
            );
        };

        //parvia pat ste se izpalni samo s default parameters
        $scope.reloadIssues();

    }]
);
