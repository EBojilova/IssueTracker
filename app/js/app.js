'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net');
app.constant('pageSize', 4);

app.config(function ($routeProvider) {
    // paths are given from index.html, not from app.js
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/user/ads/publish', {
        templateUrl: 'templates/user/publish-new-ad.html',
        controller: 'UserPublishNewAdController'
    });

    $routeProvider.when('/user/ads', {
        templateUrl: 'templates/user/user-ads.html',
        controller: 'UserAdsController'
    });

    $routeProvider.when('/user/ads/edit/:id', {
        templateUrl: 'templates/user/edit-ad.html',
        controller: 'UserEditAdController'
    });

    $routeProvider.when('/user/ads/delete/:id', {
        templateUrl: 'templates/user/delete-ad.html',
        controller: 'UserDeleteAdController'
    });

    $routeProvider.when('/user/profile', {
        templateUrl: 'templates/user/edit-profile.html',
        controller: 'UserEditProfileController'
    });

    $routeProvider.otherwise(
        {redirectTo: '/'}
    );

});

app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if ($location.path().indexOf("/user/") != -1 && !authService.isLoggedIn()) {
            // Authorization check: anonymous site visitors cannot access user routes
            $location.path("/");
        }
        if ($location.path().indexOf("/user/ads/edit") != -1 ||
            $location.path().indexOf("/user/ads/delete") != -1 ||
            $location.path().indexOf("/user/ads/publish") != -1 ||
            $location.path().indexOf("/user/profile") != -1) {
            $rootScope.showRightSidebarMenu = false;
        }
        else {
            $rootScope.showRightSidebarMenu = true;

            if ($location.path().indexOf("/user/ads") != -1) {
                $rootScope.showStatuses = true;
            }
            else {
                $rootScope.showStatuses = false;
            }
        }
    });
});
