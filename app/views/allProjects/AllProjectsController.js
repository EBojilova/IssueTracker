'use strict';

app.controller('AllProjectsController', ['$scope', '$rootScope', 'allProjectsService', 'notifyService', 'pageSize',
    function ($scope, $rootScope, allProjectsService, notifyService, pageSize) {
        $rootScope.pageTitle = "All Projects";


        $scope.reloadProjects = function () {
            // $scope.projectsLoaded is used for loading circle in allProjects.html
            $scope.projectsLoaded=false;
            allProjectsService.getUserProjects(
                function success(data) {
                    console.log(data.length);
                    $scope.projects = data;
                    $scope.projectsLoaded=true;
                }
            );
        };

        //parvia pat ste se izpalni samo s default parameters
        $scope.reloadProjects();

    }]
);
