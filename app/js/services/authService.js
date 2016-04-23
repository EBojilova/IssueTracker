'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {
        return {
            // POST api/user/Login
            login: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/user/login',
                    data: userData
                };
                //{
                //    "access_token": "MkL4mpuBJWenF0VIJq7SpkGVZJPHEuFQ4OQUE0_xg67sJTdqiJ02ZLrQ6Lc0U_5Nzp6vdZLbRHncu13dvnNA4Onf3bW-uUA9BLfH63jMZxIMpszko9Ycs97PkLSNnQlz8BQw8g_325gbfkCVjpfZrQDMEIXG-8bCQ52I6n1M6udcYNYwMcTtjHVvAlNtOXagFYsmK-ZtVgZBo5y4nWE4IkFEJgON8PH1e0I-P6o5O9R-oHYDG1bW3z1rE-eZ6cyqzgtMTAkGy-apRs-H_29jloDAT2FLvhyT3laavx-pZUw6aOMTmBJl3GCJ5Pai-dnYZjMoJW8dgEfbj6K5vObLS_eR25Xcc6CWKAzr3jwvLmZ31FehK8gGEId9DFfmZrT-jZbElsHTQJ7_Hx40jRSbwgK9CjGRRP2gKxlA1ZiI2gMwtdxl4QV5B3jiELHs0myJKvzeEX8wAHv4UMsn5BcNLfMcJgBDUIw7Cgh87c4WLB0",
                //    "token_type": "bearer",
                //    "expires_in": 31535999,
                //    "username": "Helen",
                //    ".issued": "Sat, 16 Apr 2016 17:36:04 GMT",
                //    ".expires": "Sun, 16 Apr 2017 17:36:04 GMT"
                //}
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            // POST api/user/Register
            register: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/user/register',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            // POST api/user/Logout
            logout: function() {
                //var request = {
                //    method: 'POST',
                //    url: baseServiceUrl + '/api/user/logout'
                //    //data: userData
                //};
                //{
                //    "message": "Logout successful."
                //}
                //$http(request).success(function(data) {
                //    delete sessionStorage['currentUser'];
                //    success(data);
                //}).error(error);
                delete sessionStorage['currentUser'];
            },

            // PUT api/user/ChangePassword
            changeUserPassword: function(user, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/user/ChangePassword',
                    headers: this.getAuthHeaders(),
                    data: user
                };
                //{
                //    "message": "Password changed successfully."
                //}
                $http(request).success(success).error(error);
            },

            // GET api/user/Profile
            // TODO: I keep in session storage current user already, and I think I do not need this function
            getUserProfile: function( success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/user/Profile',
                    headers: this.getAuthHeaders()
                };
                //{
                //    "name": "EB",
                //    "email": "abv2003@yahoo.co.uk",
                //    "phoneNumber": "023456",
                //    "townId": 1
                //}
                $http(request).success(success).error(error);
            },

            // PUT api/user/Profile
            editUserProfile: function(userData, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/user/Profile',
                    headers: this.getAuthHeaders(),
                    data: userData
                };
                //{
                //    "message": "User profile edited successfully."
                //}
                $http(request).success(success).error(error);
            },

            getCurrentUser : function() {
                var userObject = sessionStorage['currentUser'];
                if (userObject) {
                    return JSON.parse(sessionStorage['currentUser']);
                }
            },

            isAnonymous : function() {
                return sessionStorage['currentUser'] == undefined;
            },

            isLoggedIn : function() {
                return sessionStorage['currentUser'] != undefined;
            },

            isNormalUser : function() {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (!currentUser.isAdmin);
            },

            isAdmin : function() {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (currentUser.isAdmin);
            },

            getAuthHeaders : function() {
                var headers = {};
                var currentUser = this.getCurrentUser();
                if (currentUser) {
                    headers['Authorization'] = 'Bearer ' + currentUser.access_token;
                }
                return headers;
            }
        }
    }
);
