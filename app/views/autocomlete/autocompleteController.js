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
        var availableLabels = $("#labels").html();
        if (availableLabels) {
            $scope.tags = availableLabels.split(',').filter(function (e) {
                return e
            });
        }
        else {
            $scope.tags = [];
        }
        $scope.joinedLabels = $scope.tags.join();

        autocompleteService.getAvailableLabels(function success(data) {
            $scope.allTags = [];
            data.forEach(function (element) {
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
            var tag = $('#newLabel').val();
            if (tag && $scope.tags.indexOf(tag) == -1) {
                $scope.tags.push(tag);
                $scope.joinedLabels = $scope.tags.join();
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