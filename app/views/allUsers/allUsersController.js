app.controller('AllUsersController', ['$scope', 'autocompleteService', 'allUsersService', 'notifyService', '$rootScope',
    function ($scope, $rootScope, autocompleteService, allUsersService, notifyService) {
        $rootScope.pageTitle = "All Users";

        $scope.usersLoaded = false;
        autocompleteService.getAllUsers(function success(data) {
            $scope.users = data;
            $scope.usersLoaded = true;
        });

        $scope.submitUserToMakeAdmin = function makeAdmin(user) {
            allUsersService.makeAdmin(user.Id, function (data) {
                    user.isAdmin = true;
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