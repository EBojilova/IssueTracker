app.factory('autocompleteService', ['$http', 'baseServiceUrl', 'authService',
    function ($http, baseServiceUrl, authService) {

        return {

            getAllUsers: function getAllUsers(success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'Users/',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success);
            },

            getUserByUserName: function getAllUsers(username,success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'Users/?filter=Username.Contains("'+username+'")',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success);
            },

            getAvailableLabels: function (success) {

                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'labels/?filter=',
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(success);
            }
        }
    }
]);