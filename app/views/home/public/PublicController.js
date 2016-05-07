'use strict';

app.controller('PublicController', ['$scope', '$rootScope', '$location', 'authService', 'notifyService',
    function ($scope, $rootScope, $location, authService, notifyService) {
        //tozi kontroler e parent za HomeController i zatova tuka definirame pageTitle
        if(authService.isAnonymous()){
            $rootScope.pageTitle = {title: "Register/Login"};
        }
        else if(authService.isLoggedIn()){
            $rootScope.pageTitle = {title: "Dashboard"};
        }

        $scope.register = function (user) {
            authService.register(user,
                function success() {
                    notifyService.showInfo("User registered successfully.");
                    //After registration, the user is automatically logged in and is redirected to the dashboard.
                    var userLoginData = {'username': user.email, 'password': user.password};
                    authService.login(userLoginData,
                        function success() {
                            //notifyService.showInfo("Login successful");
                            authService.setCurrentUser(function success() {
                                notifyService.showInfo("Login successful");
                                //notifyService.showInfo("Current user saved");
                                $location.path("/");
                            });
                        })
                }
                // we have global error handling in app.js
            )
        };

        $scope.login = function (user) {
            authService.login(user,
                function success() {
                    //notifyService.showInfo("Login successful");
                    authService.setCurrentUser(function success() {
                        notifyService.showInfo("Login successful");
                        //notifyService.showInfo("Current user saved");
                        $location.path("/");
                    });
                }
                // we have global error handling in app.js
            );
        };
    }]
);

