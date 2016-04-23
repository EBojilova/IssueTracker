'use strict';

app.controller('LoginController', ['$scope', '$rootScope', '$location', 'authService', 'notifyService',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $rootScope.pageTitle = "Login";
        $scope.login = function (userData) {
            authService.login(userData,
                function success() {
                    notifyService.showInfo("Login successful");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("Login failed", err);
                }
            );
        };
    }]
);

