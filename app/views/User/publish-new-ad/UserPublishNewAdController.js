'use strict';

app.controller('UserPublishNewAdController', ['$scope', '$rootScope', '$location', 'townsService', 'categoriesService', 'userService', 'notifyService',
    function ($scope, $rootScope, $location, townsService, categoriesService, userService, notifyService) {
        $rootScope.pageTitle = "Publish New Ad";
        $scope.ad = {townId: null, categoryId: null};
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();

        $scope.fileSelected = function (fileInputField) {
            delete $scope.ad.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.ad.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                //$(".image-box").html("<p>File type not supported!</p>");
                notifyService.showError("File type not supported!", err);
            }
        };

        $scope.publishAd = function (ad) {
            userService.createNewAd(ad,
                function success() {
                    notifyService.showInfo("Advertisement submitted for approval. Once approved, it will be published.");
                    $location.path("/user/ads");
                },
                function error(err) {
                    notifyService.showError("Publish ad failed", err);
                }
            );
        };
    }]
);
