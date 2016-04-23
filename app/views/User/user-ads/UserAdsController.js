'use strict';

app.controller('UserAdsController', ['$scope', '$rootScope', 'userService', 'notifyService', 'pageSize',
    function ($scope, $rootScope, userService, notifyService, pageSize) {
        $rootScope.pageTitle = "My Ads";

        // addParams, moje da sadarjat 3 parametara: status, startPage, pageSize
        // GET api/user/Ads?Status={Status}&StartPage={StartPage}&PageSize={PageSize}
        // default parameters
        $scope.adsParams = {
            'startPage': 1,
            'pageSize': pageSize
        };

        $scope.reloadAds = function () {
            // $scope.ready is used for loading circle in user-ads.html
            $scope.ready=false;
            userService.getUserAds(
                $scope.adsParams,
                function success(data) {
                    $scope.ads = data;
                    $scope.ready=true;
                },
                function error(err) {
                    notifyService.showError("Cannot load your ads", err);
                }
            );
        };

        $scope.submitForDeactivateAd = function (ad) {
            userService.deactivateAd(
                ad.id,
                function success(data) {
                    notifyService.showInfo("Ad deactivated");
                    // smenia avtomatichno i vav front-enda
                    ad.status='Inactive';
                },
                function error(err) {
                    notifyService.showError("Cannot deactivate your ad", err);
                }
            );
        };

        $scope.submitForPublishAgainAd = function (ad) {
            userService.publishAgainAd(
                ad.id,
                function success(data) {
                    notifyService.showInfo("Ad published again for approval");
                    // smenia avtomatichno i vav front-enda
                    ad.status='WaitingApproval';
                },
                function error(err) {
                    notifyService.showError("Cannot publish again your ad", err);
                }
            );
        };

        //parvia pat ste se izpalni samo s default parameters-vij naj-otogre
        $scope.reloadAds();

        // parametrite se promeniat kakto sledva:

        // pageSize e constant v app.js ,i.e      app.constant('pageSize', 4);

        // ng-model="adsParams.startPage" se izvarshva promainata na startPage v user-ads.html v pegination taga

        // Status parameter- change by event:
        // This event is sent by RightSideBarController when the current status is changed
        $scope.$on("statusSelectionChanged", function (event, status) {
            $scope.adsParams.status = status;
            $scope.adsParams.startPage = 1;
            $scope.reloadAds();
        });
    }]
);
