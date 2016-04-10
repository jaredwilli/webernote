'use strict';

app.

// TODO: Should rename MainCtrl to AuthCtrl at some point
controller('SideNavCtrl', [
    '$scope',
    '$location',
    'angularFire',
    'fireFactory',
    'noteFactory',
    'notebookFactory',
    'tagFactory',

    function SideNavCtrl($scope, $location, angularFire, fireFactory, noteFactory, notebookFactory, tagFactory) {
        var baseurl = 'https://webernote.firebaseio.com',
            usersurl = baseurl + '/users/',
            usersRef = angularFire(usersurl, $scope, 'users', {});

        console.log('sidenavctrl: ', noteFactory);

    }
]);
