app.controller('ChangePasswordCtrl', ['$scope', '$rootScope', 'changePasswordService', 'notifyService',
    function ($scope, $rootScope, changePasswordService, notifyService) {
        $rootScope.pageTitle = "Change Password";

        $scope.submitChanges = function (user) {
            changePasswordService.changePassword(user, function success() {
                    notifyService.showInfo('Password successfully changed.');
                }
            )
        };
    }]);