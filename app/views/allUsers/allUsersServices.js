app.factory('allUsersService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {

        return {

            makeAdmin: function getAllUsers(id,success) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + 'Users/makeadmin',
                    data : {
                        'UserId' : id
                    },
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(success);
            }
        }
    }
]);