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
        autocompleteService.getAvailableLabels(function success(data) {
            $scope.availableLabels = [];
            data.forEach(function (element) {
                $scope.availableLabels.push(element.Name);
            });
        });

        $scope.autocompleteLabels = function () {
            $("#issueLabels").autocomplete({
                source: $scope.availableLabels
            });
        };
    }
]);