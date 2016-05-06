app.controller('AllUsersController', ['$scope', 'autocompleteService', 'allUsersService', 'notifyService',
    function ($scope, autocompleteService, allUsersService, notifyService) {

        $scope.usersLoaded = false;
        autocompleteService.getAllUsers(function success(data) {
            $scope.usersLoaded = true;
            $scope.users = data;
        });

        $scope.submitUserToMakeAdmin = function makeAdmin(user) {
            allUsersService.makeAdmin(user.Id, function (data) {
                    user.isAdmin=true;
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