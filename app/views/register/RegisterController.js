'use strict';

app.controller('RegisterController', ['$scope', '$rootScope', '$location', 'townsService', 'authService', 'notifyService',
    function ($scope, $rootScope, $location, townsService, authService, notifyService) {
        $rootScope.pageTitle = "Register";

        $scope.user = {townId: null};
        $scope.towns = townsService.getTowns();

        $scope.register = function (user) {
            authService.register(user,
                function success() {
                    notifyService.showInfo("User registered successfully");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("User registration failed", err);
                }
            );
        };
    }]
);
