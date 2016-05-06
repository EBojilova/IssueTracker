'use strict';

app.controller('AllProjectsController', ['$scope', '$rootScope', 'allProjectsService', 'notifyService', 'pageSize',
    function ($scope, $rootScope, allProjectsService, notifyService, pageSize) {
        $rootScope.pageTitle = {title:"All Projects"};

        $scope.multipleFilter = {};
        $scope.multipleFilter.Name = '';
        $scope.multipleFilter.Description = '';
        $scope.multipleFilter.Lead = '';

        $scope.projectsParams = {
            'filter': '',
            'orderBy': 'Name',
            'pageNumber': 1,
            'pageSize': 9
        };

        $scope.reloadProjects = function () {
            // $scope.projectsLoaded is used for loading circle in allProjects.html
            $scope.projectsLoaded = false;

            // FILTERS
            var filterComponents = [];
            if ($scope.multipleFilter.Name) {
                filterComponents.push('Name.Contains("' + $scope.multipleFilter.Name + '")')
            }
            if ($scope.multipleFilter.Description) {
                filterComponents.push('Description.Contains("' + $scope.multipleFilter.Description + '")')
            }
            if ($scope.multipleFilter.Lead) {
                filterComponents.push('Lead.Username.Contains("' + $scope.multipleFilter.Lead + '")')
            }

            if (filterComponents.length > 0) {
                $scope.projectsParams.filter = filterComponents.join(' and ');
            }

            allProjectsService.getProjectsWithParams($scope.projectsParams,
                function success(data) {
                    $scope.projects = data;
                    $scope.projectsLoaded = true;
                }
            );
        };

        //parvia pat ste se izpalni samo s default parameters
        $scope.reloadProjects();

        $scope.showAll = function () {
            $scope.multipleFilter.Name = '';
            $scope.multipleFilter.Description = '';
            $scope.multipleFilter.Lead = '';
            $scope.projectsParams.filter = '';
            $scope.reloadProjects();
        }
    }]
);
