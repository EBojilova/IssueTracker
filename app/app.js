'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net/');
app.constant('pageSize', 4);

app.config(function ($routeProvider) {
    // paths are given from index.html, not from app.js
    $routeProvider.when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'views/register/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/user/ads/publish', {
        templateUrl: 'views/User/publish-new-ad/publish-new-ad.html',
        controller: 'UserPublishNewAdController'
    });

    $routeProvider.when('/user/ads', {
        templateUrl: 'views/User/user-ads/user-ads.html',
        controller: 'UserAdsController'
    });

    $routeProvider.when('/user/ads/edit/:id', {
        templateUrl: 'views/User/edit-ad/edit-ad.html',
        controller: 'UserEditAdController'
    });

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

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        // httpProvider pozvoliava da konfigurirame samoto http
        $httpProvider.interceptors.push(['$q','notifyService', function($q, notifyService) {
            // tova e global error handling, vmesto na vsiakade da ia obrabotvame s notifier
            return {
                'responseError': function(rejection) {
                    if (rejection.data && rejection.data['error_description']) {
                        notifyService.showError(rejection.data['error_description']);
                    }
                    else if (rejection.data && rejection.data.modelState && rejection.data.ModelState['']){
                        var errors = rejection.data.ModelState[''];
                        for (var err in errors){
                            notifyService.showError(err);
                        }
                    }

                    return $q.reject(rejection);
                }
            }
        }]);
    }])

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
