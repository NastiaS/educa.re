app.config(function($stateProvider) {

    $stateProvider.state('userProfile.userDocuments', {
        url: '/userDocuments',
        controller: 'UserDocsController',
        templateUrl: 'js/userProfile/userDocuments/userDocuments.html',
        resolve: {
            user: function(AuthService){
                return AuthService.getLoggedInUser()
            }
        }
    });

});

app.controller('UserDocsController', function($scope, Socket, UserFactory, user, $state){
    $scope.documents = '';

    UserFactory.getUserDocuments(user._id).then(function(docs){
        $scope.documents = docs;
    });

    Socket.on('successfulMerge', function(data){
        $scope.documents.forEach(function(doc){
            if(doc.branchedFrom === data.author){
                doc.hasChanged = true;
                console.log(doc);
                $scope.$digest();
            }
        })
    });

})