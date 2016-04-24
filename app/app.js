'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net/');
app.constant('pageSize', 4);

app.config(function ($routeProvider) {
    // paths are given from index.html path, not from app.js path
    $routeProvider.when('/', {
        templateUrl: 'views/public/public.html',
        controller: 'PublicController'
    });

    $routeProvider.when('/dashboard', {
        //templateUrl: 'views/User/publish-new-ad/publish-new-ad.html',
        //controller: 'UserPublishNewAdController'
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

app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if ($location.path().indexOf("/user/") != -1 && !authService.isLoggedIn()) {
            // Authorization check: anonymous site visitors cannot access user routes
            $location.path("/");
        }
    });
});
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