'use strict';

app.controller('HomeController', ['$scope', '$rootScope', 'homeService', 'notifyService', 'pageSize', 'authService',
    function ($scope, $rootScope, homeService, notifyService, pageSize, authService) {
        //tozi kontroler e parent za HomeController i zatova tuka definirame pageTitle
        if (authService.isAnonymous()) {
            $rootScope.pageTitle = {title: "Register/Login"};
        }
        else if (authService.isLoggedIn()) {
            $rootScope.pageTitle = {title: "Dashboard"};
        }

        $scope.register = function (user) {
            authService.register(user,
                function success() {
                    notifyService.showInfo("User registered successfully.");
                    //After registration, the user is automatically logged in and is redirected to the dashboard.
                    var userLoginData = {'username': user.email, 'password': user.password};
                    $scope.login(userLoginData);
                }
                // we have global error handling in app.js
            )
        };

        $scope.multipleFilter = {};
        $scope.multipleFilter.Name = '';
        $scope.multipleFilter.Description = '';
        $scope.projectsParams = {
            'filter': '',
            'orderBy': 'Name',
            'pageNumber': 1,
            'pageSize': pageSize
        };

        $scope.login = function (user) {
            authService.login(user,
                function success() {
                    //notifyService.showInfo("Login successful");
                    authService.setCurrentUser(function success() {
                        //PROJECTS, I am Lead
                        // Params, triabva da sadarjat 3 parametara:  ?pageSize={pageSize}&pageNumber={pageNumber}&filter=Lead.Id={id}
                        // promeniat se v taga pagination v htmla
                        // default parameters
                        // TODO: rest service do not support OrderBy with pagination
                        $rootScope.pageTitle = {title: "Dashboard"};
                        //parvia pat ste se izpalni samo s default parameters
                        $scope.reloadProjects();
                        //parvia pat ste se izpalni samo s default parameters
                        $scope.reloadIssues();
                        notifyService.showInfo("Login successful");
                        //notifyService.showInfo("Current user saved");
                    });
                }
                // we have global error handling in app.js
            );
        };


        $scope.reloadProjects = function () {
            // $scope.projectsLoaded is used for loading circle in home.html
            $scope.projectsLoaded = false;
            var userId = authService.getCurrentUser().Id;
            $scope.projectsParams.filter = 'Lead.Id="' + userId + '"';

            // FILTERS
            var filterComponents = ['Lead.Id="' + userId + '"'];
            if ($scope.multipleFilter.Name) {
                filterComponents.push('Name.Contains("' + $scope.multipleFilter.Name + '")')
            }
            if ($scope.multipleFilter.Description) {
                filterComponents.push('Description.Contains("' + $scope.multipleFilter.Description + '")')
            }

            if (filterComponents.length > 1) {
                $scope.projectsParams.filter = filterComponents.join(' and ');
            }

            homeService.getProjectsWithParams(
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

        $scope.showAll = function () {
            $scope.multipleFilter.Name = '';
            $scope.multipleFilter.Description = '';
            $scope.reloadProjects();
        };


        //ISSUES
        // Params, moje da sadarjat 3 parametara:  ?pageSize={pageSize}&pageNumber={pageNumber}&orderBy={by}
        // promeniat se v taga pagination v htmla
        // default parameters
        //TODO: filter is not supported from Rest  with pagination
        $scope.issuesParams = {
            'filter': '',
            'orderBy': 'DueDate desc',
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

        if (authService.getCurrentUser()) {
            //parvia pat ste se izpalni samo s default parameters
            $scope.reloadProjects();
            //parvia pat ste se izpalni samo s default parameters
            $scope.reloadIssues();
        }
    }]
);
