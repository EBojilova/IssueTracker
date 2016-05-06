app.controller('AllUsersController', ['$scope', 'autocompleteService', 'allUsersService',
    function ($scope, autocompleteService, allUsersService) {

        $scope.usersLoaded=false;
        autocompleteService.getAllUsers(function success(data) {
            $scope.usersLoaded=true;
            $scope.users = data;
        });

        $scope.makeAdmin = function makeAdmin(id) {
            allUsersService.makeAdmin(id, function (data) {
                    notifyService.showInfo("User was made as admin!", data);
                }
            );
            //   [ {
            //        "Id": "00040d32-9769-4c9a-909f-5d0773e77ee5",
            //        "Username": "gosho.vitkov1@gmail.com",
            //        "isAdmin": true
            //    },....]
        };
    }
]);