'use strict';

app.controller('RightSidebarController', ['$scope', '$rootScope', '$location', 'categoriesService', 'townsService',
    function ($scope, $rootScope, $location, categoriesService, townsService) {

        $rootScope.showRightSidebarMenu=true;
        $rootScope.showStatuses = false;
        //$scope.categories = categoriesService.getCategories();
        //$scope.towns = townsService.getTowns();
        //Predpochitam da e s promisi
        categoriesService.getCategories().$promise.then(function (data) {
            $scope.categories = data;
        });
        townsService.getTowns().$promise.then(function (data) {
            $scope.towns = data;
        });

        // This event is sent to UserAdsController when the current status is changed
        $scope.statusClicked = function (status) {
            $scope.selectedStatus = status;
            $rootScope.$broadcast("statusSelectionChanged", status);
        };

        // This event is sent to HomeController when the current category is changed
        $scope.categoryClicked = function (clickedCategoryId) {
            $scope.selectedCategoryId = clickedCategoryId;
            $rootScope.$broadcast("categorySelectionChanged", clickedCategoryId);
        };
        // This event is sent to HomeController when the current category is changed
        $scope.townClicked = function (clickedTownId) {
            $scope.selectedTownId = clickedTownId;
            // hvarliame eventa chrez rootScope
            $rootScope.$broadcast("townSelectionChanged", clickedTownId);
        };
    }]
);
