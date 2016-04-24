'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {
        return {
            //POST api/Account/Register
            register: function (user, success) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'api/Account/Register',
                    data: {
                        'Name': user.name,
                        'Email': user.email,
                        'Password': user.password,
                        'ConfirmPassword': user.confirmPassword
                    },
                    headers: {
                        ContentType: "application/x-www-form-urlencoded"
                    }
                };
                // 200 OK
                $http(request).success(function (data) {
                    sessionStorage['access_token'] = JSON.stringify(data);
                    success(data);
                });
            },

            //[POST] api/Token
            login: function (user, success) {
                var loginData = "grant_type=password&username=" + user.username + "&password=" + user.password;
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'api/Token',
                    data: loginData,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };
                //{
                //    "access_token": "MkL4mpuBJWenF0VIJq7SpkGVZJPHEuFQ4OQUE0_xg67sJTdqiJ02ZLrQ6Lc0U_5Nzp6vdZLbRHncu13dvnNA4Onf3bW-uUA9BLfH63jMZxIMpszko9Ycs97PkLSNnQlz8BQw8g_325gbfkCVjpfZrQDMEIXG-8bCQ52I6n1M6udcYNYwMcTtjHVvAlNtOXagFYsmK-ZtVgZBo5y4nWE4IkFEJgON8PH1e0I-P6o5O9R-oHYDG1bW3z1rE-eZ6cyqzgtMTAkGy-apRs-H_29jloDAT2FLvhyT3laavx-pZUw6aOMTmBJl3GCJ5Pai-dnYZjMoJW8dgEfbj6K5vObLS_eR25Xcc6CWKAzr3jwvLmZ31FehK8gGEId9DFfmZrT-jZbElsHTQJ7_Hx40jRSbwgK9CjGRRP2gKxlA1ZiI2gMwtdxl4QV5B3jiELHs0myJKvzeEX8wAHv4UMsn5BcNLfMcJgBDUIw7Cgh87c4WLB0",
                //    "token_type": "bearer",
                //    "expires_in": 31535999,
                //    "username": "Helen",
                //    ".issued": "Sat, 16 Apr 2016 17:36:04 GMT",
                //    ".expires": "Sun, 16 Apr 2017 17:36:04 GMT"
                //}
                $http(request).success(function (data) {
                    sessionStorage['access_token'] = data.access_token;
                    success(data);
                });
            },

            // POST 'api/Account/Logout'
            logout: function () {
                //var request = {
                //    method: 'POST',
                //    url: baseServiceUrl + 'api/Account/Logout',
                //    headers: this.getAuthHeaders()
                //};
                //200 OK
                //$http(request).success(function(data) {
                //    delete sessionStorage['access_token'];
                //    success(data);
                //}).error(error);
                delete sessionStorage['access_token'];
                delete sessionStorage['current_user'];
            },

            // GET 'users/me'
            setCurrentUser: function (success) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'users/me',
                    headers: this.getAuthHeaders()
                };
                //{
                //    "Id": "e0e672ee-9382-4860-98be-cfa68743a20a",
                //    "Username": "admin@softuni.bg",
                //    "isAdmin": true
                //}
                $http(request).success(function (data) {
                    sessionStorage['current_user'] = JSON.stringify(data);
                    success(data);
                });
            },

            getCurrentUser: function () {
                var userObject = sessionStorage['current_user'];
                if (userObject) {
                    return JSON.parse(sessionStorage['current_user']);
                }
            },

            isAnonymous: function () {
                return sessionStorage['access_token'] == undefined;
            },

            isLoggedIn: function () {
                return sessionStorage['access_token'] != undefined;
            },

            isNormalUser: function () {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (!currentUser.isAdmin);
            },

            isAdmin: function () {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (currentUser.isAdmin);
            },

            getAuthHeaders: function () {
                var headers = {};
                if (this.isLoggedIn()) {
                    headers['Authorization'] = 'Bearer ' + sessionStorage['access_token'];
                }
                return headers;
            },
            //TODO:
            // PUT api/user/Profile
            editUserProfile: function (user, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/user/Profile',
                    headers: this.getAuthHeaders(),
                    data: user
                };
                //{
                //    "message": "User profile edited successfully."
                //}
                $http(request).success(success).error(error);
            },

            // PUT api/user/ChangePassword
            changeUserPassword: function (user, success, error) {
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
            }
        }
    }
);
