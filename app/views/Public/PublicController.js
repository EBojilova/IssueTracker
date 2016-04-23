'use strict';

app.controller('PublicController', ['$scope', '$rootScope', '$location', 'authService', 'notifyService',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $rootScope.pageTitle = "Register/Login";

        $scope.register = function (user) {
            authService.register(user,
                function success() {
                    notifyService.showInfo("User registered successfully.Please login!");
                    $location.path("/");
                }
                // we have global error handling in app.js
                //function error(err) {
                //    notifyService.showError("User registration failed", err);
                //}
            );
        };
        
        $scope.login = function (user) {
            authService.login(user,
                function success() {
                    notifyService.showInfo("Login successful");
                    $location.path("/");
                }
                // we have global error handling in app.js
                //function error(err) {
                //    notifyService.showError("Login failed", err);
                //}
            );
        };
    }]
);

