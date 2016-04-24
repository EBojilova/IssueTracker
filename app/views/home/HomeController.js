'use strict';

app.controller('HomeController', ['$scope', '$rootScope', 'homeService', 'notifyService', 'pageSize',
    function ($scope, $rootScope, homeService, notifyService, pageSize) {
        $rootScope.pageTitle = "Home";

        // Params, moje da sadarjat 4 parametara: categoryID, townId, startPage, pageSize
        // api/Ads?CategoryId={CategoryId}&TownId={TownId}&StartPage={StartPage}&PageSize={PageSize}
        // default parameters
        $scope.issuesParams = {
            'startPage': 1,
            'pageSize': pageSize
        };

        $scope.reloadAds = function () {
            // $scope.ready is used for loading circle in home.html
            $scope.ready=false;
            homeService.getAds(
                $scope.issuesParams,
                function success(data) {
                    $scope.issues = data;
                    $scope.ready=true;
                },
                function error(err) {
                    notifyService.showError("Cannot load issues", err);
                }
            );
        };

        //parvia pat ste se izpalni samo s default parameters-vij naj-otogre
        $scope.reloadAds();

        // parametrite se promeniat kakto sledva:

        // pageSize e constant v app.js ,i.e      app.constant('pageSize', 4);

        // ng-model="issuesParams.startPage" se izvarshva promainata na startPage v home.html v pegination taga

        // This event is sent by RightSideBarController when the current category is changed
        $scope.$on("categorySelectionChanged", function (event, selectedCategoryId) {
            $scope.issuesParams.categoryId = selectedCategoryId;
            $scope.issuesParams.startPage = 1;
            $scope.reloadAds();
        });

        // This event is sent by RightSideBarController when the current town is changed
        $scope.$on("townSelectionChanged", function (event, selectedTownId) {
            $scope.issuesParams.townId = selectedTownId;
            $scope.issuesParams.startPage = 1;
            $scope.reloadAds();
        });
    }]
);
