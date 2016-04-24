'use strict';

app.controller('UserEditProfileController', ['$scope', '$rootScope', '$location', 'townsService', 'authService', 'notifyService',
    function ($scope, $rootScope, $location, townsService, authService, notifyService) {
        $rootScope.pageTitle = "Edit User Profile";

        //window.scrollTo(0, 0);
        authService.setCurrentUser(function success(data) {
            $scope.user = data;
        }, function error(err) {
            notifyService.showError("Cannot load your profile", err);
        });


        $scope.towns = townsService.getTowns();

        $scope.submitForEditProfile = function (user) {
            authService.editUserProfile(user,
                function success() {
                    notifyService.showInfo("User profile successfully updated.");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("User profile updating failed", err);
                }
            );
        };

        $scope.submitForPasswordChange = function (user) {
            authService.changeUserPassword(user,
                function success() {
                    notifyService.showInfo("User password successfully updated.");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("User password updating failed", err);
                }
            );
        };
    }]
);
