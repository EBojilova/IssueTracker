'use strict';

app.factory('userService',
    function ($http, baseServiceUrl, authService) {
        return {
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

            // GET api/user/Ads?Status={Status}&StartPage={StartPage}&PageSize={PageSize}
            getUserAds: function (params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/user/ads',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                //{
                //    "numItems": 3,
                //    "numPages": 1,
                //    "ads": [
                //    {
                //    "id": 10533,
                //    "title": "Softuni in Plovdiv",
                //    "text": "Very soon!",
                //    "date": "2016-04-14T09:45:46.3070000",
                //    "imageDataUrl": "data:image/jpeg;base64,iVBORw0KGgo...",
                //    "categoryName": "Education",
                //    "townName": "Plovdiv",
                //    "status": "Inactive"
                //    }
                //    ]
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
