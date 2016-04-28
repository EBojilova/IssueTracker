app.directive('ngCommentsFilters', [function () {
    return {
        restrict: 'A',
        templateUrl: 'views/issueDetails/templates/commentsFilters.html'
    }
}]);
app.directive('ngCommentsTable', [function () {
    return {
        restrict: 'A',
        templateUrl: 'views/issueDetails/templates/commentsTable.html'
    }
}]);
app.directive('ngIssueDetails', [function () {
    return {
        restrict: 'A',
        templateUrl: 'views/issueDetails/templates/issueDetails.html'
    }
}]);
