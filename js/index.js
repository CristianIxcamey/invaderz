
var app = angular.module('invaderz', ['ngRoute']);
app.config($routeProvider => {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })

        .when('/invaderz/:gameMode', {
            templateUrl: 'pages/game.html',
            controller: 'gameController'
        })

        .when('/instructions', {
            templateUrl: 'pages/instructions.html'
        })

        .when('/credits', {
            templateUrl: 'pages/credits.html'
        })
})

app.controller("homeController", function ($scope, $http, $window) {

});
app.controller('gameController', function ($scope, $http, $window, $routeParams) {
    let game;
    $scope.start = ()=>{
        game = new MainGame("normal");
    }
    $scope.$on("$destroy", ()=>{
        game.destroy();
        game = null;
    })

});
