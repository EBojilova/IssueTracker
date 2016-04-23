'use strict';

app.controller('HomeController', ['$scope', '$rootScope', 'adsService', 'notifyService', 'pageSize',
    function ($scope, $rootScope, adsService, notifyService, pageSize) {
        $rootScope.pageTitle = "Home";

        // addParams, moje da sadarjat 4 parametara: categoryID, townId, startPage, pageSize
        // api/Ads?CategoryId={CategoryId}&TownId={TownId}&StartPage={StartPage}&PageSize={PageSize}
        // default parameters
        $scope.adsParams = {
            'startPage': 1,
            'pageSize': pageSize
        };

        $scope.reloadAds = function () {
            // $scope.ready is used for loading circle in home.html
            $scope.ready=false;
            adsService.getAds(
                $scope.adsParams,
                function success(data) {
                    $scope.ads = data;
                    $scope.ready=true;
                },
                function error(err) {
                    notifyService.showError("Cannot load ads", err);
                }
            );
        };

        //parvia pat ste se izpalni samo s default parameters-vij naj-otogre
        $scope.reloadAds();

        // parametrite se promeniat kakto sledva:

        // pageSize e constant v app.js ,i.e      app.constant('pageSize', 4);

        // ng-model="adsParams.startPage" se izvarshva promainata na startPage v home.html v pegination taga

        // This event is sent by RightSideBarController when the current category is changed
        $scope.$on("categorySelectionChanged", function (event, selectedCategoryId) {
            $scope.adsParams.categoryId = selectedCategoryId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAds();
        });

        // This event is sent by RightSideBarController when the current town is changed
        $scope.$on("townSelectionChanged", function (event, selectedTownId) {
            $scope.adsParams.townId = selectedTownId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAds();
        });
    }]
);
