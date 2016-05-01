app.controller('PrioritiesController', ['$scope',
    function ($scope) {

        // adds the new tag to the array
        $scope.add = function (priority) {
            // if not dupe, add it
            if (priority && $scope.priorities.indexOf(priority) == -1) {
                $scope.priorities.push(priority);
                $scope.joinedPriorities = $scope.priorities.join();
            }
        };

        // remove an item
        $scope.remove = function (priority) {
            var index = $scope.priorities.indexOf(priority);    // <-- Not supported in <IE9
            if (index !== -1) {
                $scope.priorities.splice(index, 1);
            }
            $scope.joinedLabels = $scope.priorities.join();
        };
    }
]);