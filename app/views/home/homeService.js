'use strict';

app.factory('homeService',[]
    function ($http, baseServiceUrl, authService) {
        return {
            //[GET] Issues/me?pageSize={pageSize}&pageNumber={pageNumber}&orderBy={by}
            getUserIssues: function (params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'issues/me?orderBy=DueDate des',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                //{
                //    "TotalPages": 1,
                //    "Issues": [
                //    {
                //        "Id": 565,
                //        "Title": "Test issue",
                //        "IssueKey": "123adfj-90",
                //        "Description": "Test issue description",
                //        "DueDate": "2016-05-28T01:00:00",
                //        "Project": {
                //            "Id": 1,
                //            "Name": "new Projfsdfsd"
                //        },
                //        "Author": {
                //            "Id": "e0e672ee-9382-4860-98be-cfa68743a20a",
                //            "Username": "admin@softuni.bg",
                //            "isAdmin": true
                //        },
                //        "Assignee": {
                //            "Id": "aab01e5d-4233-4feb-9cde-9aa3f72c2e34",
                //            "Username": "helen@abv.bg",
                //            "isAdmin": false
                //        },
                //        "Priority": {
                //            "Id": 6,
                //            "Name": "High"
                //        },
                //        "Status": {
                //            "Id": 2,
                //            "Name": "Open"
                //        },
                //        "Labels": [
                //            {
                //                "Id": 1,
                //                "Name": "Label1"
                //            }
                //        ],
                //        "AvailableStatuses": [
                //            {
                //                "Id": 1,
                //                "Name": "Closed"
                //            },
                //            {
                //                "Id": 3,
                //                "Name": "InProgress"
                //            }
                //        ]
                //    }
                //],
                //    "TotalCount": 0
                //}

                $http(request).success(success).error(error);
            },

            // POST api/user/Ads
            createNewAd: function (adData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/user/ads',
                    headers: authService.getAuthHeaders(),
                    data: adData
                };
                //{
                //    "message": "Advertisement created successfully.",
                //    "adId": 10534
                //}
                $http(request).success(success).error(error);
            },



            // PUT api/user/Ads/Deactivate/{id}
            deactivateAd: function (id, success, error) {
                // TODO
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/user/ads/Deactivate/' + id,
                    headers: authService.getAuthHeaders()
                };
                //{
                //    "message": "Advertisement #10533 deactivated."
                //}
                $http(request).success(success).error(error);
            },

            // PUT api/user/Ads/PublishAgain/{id}
            publishAgainAd: function (id, success, error) {
                // TODO
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/user/ads/PublishAgain/' + id,
                    headers: authService.getAuthHeaders()
                };
                //{
                //    "message": "Advertisement #10533 submitted for approval."
                //}
                $http(request).success(success).error(error);
            },

            // GET api/user/Ads/{id}
            getUserAdById: function (id, success, error) {
                // TODO
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/user/ads/' + id,
                    headers: authService.getAuthHeaders()
                };
                //{
                //    "id": 10533,
                //    "title": "Softuni in Plovdiv",
                //    "text": "Very soon!",
                //    "date": "2016-04-14T09:45:46.3070000",
                //    "imageDataUrl": "data:image/jpeg;base64,iVBORw0KGgo...",
                //    "categoryId": 5,
                //    "categoryName": "Education",
                //    "townId": 2,
                //    "townName": "Plovdiv",
                //    "status": "Inactive"
                //}
                $http(request).success(success).error(error);
            },

            // PUT api/user/Ads/{id}
            editAd: function (ad, success, error) {
                // TODO
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/user/ads/' + ad.id,
                    headers: authService.getAuthHeaders(),
                    data: ad
                };
                //{
                //    "message": "Advertisement #10533 edited successfully."
                //}
                $http(request).success(success).error(error);
            },

            // DELETE api/user/Ads/{id}
            deleteAd: function (id, success, error) {
                // TODO
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/user/ads/' + id,
                    headers: authService.getAuthHeaders()
                };
                //{
                //    "message": "Advertisement #10534 deleted successfully."
                //}
                $http(request).success(success).error(error);
            }
        }
    }
);
