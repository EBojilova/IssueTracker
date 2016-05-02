'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net/');
app.constant('pageSize', 8);

app.config(function ($routeProvider) {
    // paths are given from index.html path, not from app.js path
    $routeProvider.when('/', {
        templateUrl: 'views/public/templates/public.html',
        controller: 'PublicController'
    });

    $routeProvider.when('/dashboard', {
        templateUrl: 'views/home/templates/home.html',
        controller: 'HomeController',
        access: {
            requiresLoggedUser: true
        }
    });

    $routeProvider.when('/projects', {
        templateUrl: 'views/allProjects/templates/all-projects.html',
        controller: 'AllProjectsController',
        access: {
            requiresLoggedUser: true,
            requiresAdmin: true
        }
    });


    $routeProvider.when('/issues/:id', {
        controller: 'IssueController',
        templateUrl: 'views/issueDetails/templates/issue.html',
        access: {
            requiresLoggedUser: true
        }
    });

    $routeProvider.when('/projects/add-issue/:id', {
        controller: 'AddIssueController',
        templateUrl: 'views/addIssue/templates/add-issue.html',
        access: {
            requiresLoggedUser: true
        }
    });

    $routeProvider.when('/issues/edit/:id', {
        controller: 'EditIssueController',
        templateUrl: 'views/editIssue/templates/edit-issue.html',
        access: {
            requiresLoggedUser: true
        }
    });

    $routeProvider.when('/projects/add-project', {
        controller: 'AddProjectController',
        templateUrl: 'views/addProject/templates/add-project.html',
        access: {
            requiresAdmin: true
        }
    });

    $routeProvider.when('/projects/:id', {
        controller: 'ProjectController',
        templateUrl: 'views/projectDetails/templates/project.html',
        access: {
            requiresLoggedUser: true
        }
    });

    $routeProvider.when('/projects/edit/:id', {
        controller: 'ProjectEditController',
        templateUrl: 'views/editProject/templates/project-edit.html',
        access: {
            requiresLoggedUser: true
        }
    });

    //TODO: remove old code
    $routeProvider.when('/user/ads/delete/:id', {
        templateUrl: 'views/User/delete-ad/delete-ad.html',
        controller: 'UserDeleteAdController'
    });

    $routeProvider.when('/user/profile', {
        templateUrl: 'views/User/edit-profile/edit-profile.html',
        controller: 'UserEditProfileController'
    });

    $routeProvider.otherwise(
        {redirectTo: '/'}
    );

});

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    // httpProvider pozvoliava da konfigurirame samoto http
    $httpProvider.interceptors.push(['$q', 'notifyService', function ($q, notifyService) {
        // tova e global error handling, vmesto na vsiakade da ia obrabotvame s notifier
        return {
            'responseError': function (rejection) {
                if (rejection.data) {
                    notifyService.showError('Error!', rejection.data);
                }

                return $q.reject(rejection);
            }
        }
    }]);
}]);

app.run(['$rootScope', '$location', 'authService',
    function ($rootScope, $location, authService) {
        $rootScope.$on('$routeChangeStart', function (event, route, prev) {
            if (route.access) {
                if (route.access.requiresLoggedUser && !authService.isLoggedIn()) {
                    $location.path(prev.$$route.originalPath);
                }
                if (route.access.requiresAdmin && !authService.isAdmin()) {
                    $location.path(prev.$$route.originalPath);
                }
            } else {
                $location.path('/');
            }
        });
    }]);