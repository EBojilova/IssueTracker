app.factory('changePasswordService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {

        return {
            changePassword: function changePassword(user, success) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'api/Account/ChangePassword',
                    data: user,
                    headers: authService.getAuthHeaders()
                };

                $http(request).then(function (response) {
                    success(response.data);
                })
            }
        }
    }]);
