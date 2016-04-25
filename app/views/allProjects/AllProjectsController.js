'use strict';

app.controller('AllProjectsController', ['$scope', '$rootScope', 'allProjectsService', 'notifyService', 'pageSize',
    function ($scope, $rootScope, allProjectsService, notifyService, pageSize) {
        $rootScope.pageTitle = "All Projects";

        //PROJECTS
        // Params, moje da sadarjat 2 parametara:  pageSize={pageSize}&pageNumber={pageNumber}
        // promeniat se v taga pagination v htmla
        // default parameters
        $scope.projectsParams = {
            'pageNumber': 1,
            'pageSize': pageSize
        };

        $scope.reloadProjects = function () {
            // $scope.projectsLoaded is used for loading circle in allProjects.html
            $scope.projectsLoaded=false;
            allProjectsService.getUserProjects(
                $scope.projectsParams,
                function success(data) {
                    console.log(data);
                    $scope.projects = data;
                    $scope.projectsLoaded=true;
                }
            );
        };

        //parvia pat ste se izpalni samo s default parameters
        $scope.reloadProjects();

    }]
);
