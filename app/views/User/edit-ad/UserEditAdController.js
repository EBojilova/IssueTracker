'use strict';

app.controller('UserEditAdController', ['$scope', '$rootScope', '$routeParams', '$location', 'townsService', 'categoriesService', 'userService', 'notifyService',
    function ($scope, $rootScope, $routeParams, $location, townsService, categoriesService, userService, notifyService) {
        $rootScope.pageTitle = "Edit Ad";
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
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();

        $scope.fileSelected = function (fileInputField) {
            delete $scope.ad.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.ad.changeimage = true;
                    $scope.ad.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                //$(".image-box").html("<p>File type not supported!</p>");
                notifyService.showError("File type not supported!", err);
            }
        };

        $scope.deleteImage = function () {
            $scope.ad.changeimage = true;
            delete $scope.ad.imageDataUrl;
        };

        $scope.submitAdForEditing = function (ad) {
            userService.editAd(ad,
                function success() {
                    notifyService.showInfo("Ad edited. Don't forget to submit it for publishing.");
                    $location.path("/user/ads");
                },
                function error(err) {
                    notifyService.showError("Cannot edit your ad", err);
                }
            );
        };
    }]
);
