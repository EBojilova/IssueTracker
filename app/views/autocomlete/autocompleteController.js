app.controller('AutocompleteController', ['$scope', 'autocompleteService',
    function ($scope, autocompleteService) {

        // USERS autocomplete
        autocompleteService.getAllUsers(function success(data) {
            $scope.users = [];
            data.forEach(function (element) {
                $scope.users.push(element.Username);
            });
        });

        $scope.autocompleteAssignees = function () {
            $("#assignee").autocomplete({
                source: $scope.users
            });
        };

        // LABELS autocomplete
        //http://www.bootply.com/346BqhKUJy
        $scope.tags = [];
        autocompleteService.getAvailableLabels(function success(data) {
            //$scope.availableLabels = [];
            $scope.allTags = [];
            data.forEach(function (element) {
                //$scope.availableLabels.push(element.Name);
                $scope.allTags.push(element.Name);
            });
        });

        $scope.autocompleteLabels = function () {
            $("#newLabel").autocomplete({
                //source: $scope.availableLabels
                source: $scope.allTags
            });
        };

        // adds the new tag to the array
        $scope.add = function () {
            // if not dupe, add it
            if ($scope.tags.indexOf($scope.newValue) == -1) {
                $scope.tags.push($('#newLabel').val());
                $scope.joinedLabels = $scope.tags.join();
                console.log($scope.joinedLabels);
            }
            $scope.newValue = "";
        };

        // remove an item
        $scope.remove = function (idx) {
            $scope.tags.splice(idx, 1);
            $scope.joinedLabels = $scope.tags.join();
        };
    }
]);