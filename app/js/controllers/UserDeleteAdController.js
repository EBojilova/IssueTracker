'use strict';

app.controller('UserDeleteAdController', ['$scope', '$rootScope', '$routeParams', '$location', 'userService', 'notifyService',
    function ($scope, $rootScope, $routeParams, $location, userService, notifyService) {
        $rootScope.pageTitle = "Delete Ad";
        window.scrollTo(0, 0);
        userService.getUserAdById(
            $routeParams.id,
            function success(data) {
                $scope.ad = data;
            },
            function error(err) {
                notifyService.showError("Cannot load your ad", err);
            }
        );

        $scope.submitAdForDeleting = function (ad) {
            userService.deleteAd(ad,
                function success() {
                    notifyService.showInfo("Ad deleted.");
                    $location.path("/user/ads");
                },
                function error(err) {
                    notifyService.showError("Cannot delete your ad", err);
                }
            );
        };
    }]
);
