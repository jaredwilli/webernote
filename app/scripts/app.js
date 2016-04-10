'use strict';

var app = window.app = angular.module('angApp', ['firebase']);

app.config([
    '$routeProvider',

    function($routeProvider) {
        $routeProvider.

        when('/', {
            /*templateUrl: 'views/login.html',*/
            controller: 'AuthCtrl'
        }).
        when('/user/:userId', {
            templateUrl: 'views/auth.html',
        }).
        when('/user/:userId/note/:noteId', {
            templateUrl: 'views/auth.html',
            controller: 'NoteCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
