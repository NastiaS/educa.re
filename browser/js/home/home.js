'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, $state, DocumentFactory, Upload, AuthService, $rootScope){

    $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };

    $scope.createDocument = function(){
        DocumentFactory.createDocument().then(function(doc){
            $state.go('editor', {docId: doc._id});
        });
    };

});
