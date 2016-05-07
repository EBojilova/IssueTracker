'use strict';

// The AppController holds the presentation logic for the entire app (common all screens)
app.controller('AppController',['$scope','$rootScope','$location','authService','notifyService',
    function ($scope,$rootScope, $location, authService, notifyService) {
		// Put the authService in the $scope to make it accessible from all screens from the templates
        $scope.authService = authService;

        $scope.logout = function() {
            authService.logout();
            //$rootScope.pageTitle = {title: "Register/Login"};
            notifyService.showInfo("Logout successful");
            $location.path('/');
        };
    }]
);
