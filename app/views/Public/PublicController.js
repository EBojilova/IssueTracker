'use strict';

app.controller('PublicController', ['$scope', '$rootScope', '$location', 'authService', 'notifyService',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $rootScope.pageTitle = "Register/Login";

        $scope.register = function (user) {
            authService.register(user,
                function success() {
                    notifyService.showInfo("User registered successfully.");
                    //After registration, the user is automatically logged in and is redirected to the dashboard.
                    var userLoginData = {'username': user.email, 'password': user.password};
                    this.login(userLoginData);
                }
                // we have global error handling in app.js
                //function error(err) {
                //    notifyService.showError("User registration failed", err);
                //}
            )
        };

        $scope.login = function (user) {
            authService.login(user,
                function success() {
                    notifyService.showInfo("Login successful");
                    $location.path("/dashboard");
                }
                // we have global error handling in app.js
                //function error(err) {
                //    notifyService.showError("Login failed", err);
                //}
            );
        };
    }]
);

