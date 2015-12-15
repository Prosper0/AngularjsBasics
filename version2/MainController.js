console.log('Heöllo MainController');

var myApp = angular.module('myApp');
 
// controller
myApp.controller('MainController', [
  '$scope', '$interval', '$location', 
  function($scope, $interval, $location) {
  
  // model
  var person = {
    firstName: "Alien",
    lastName: "I am",
    imageSrc: "http://icons.iconseeker.com/png/fullsize/sd-ultraman--monsters/alien-chibul-blue.png"
  };
  
  $scope.message = "Hello controller";
  $scope.alsoMessage = "This is also a message from the controller. Kitchen-sink test.";
  
  $scope.person = person;

  $scope.search = function(username) {
    console.log('search:'+username);

    if(countdownIntervalObj) {
      $interval.cancel(countdownIntervalObj);
      $scope.countdown = null;
    }
    $location.path("/user/" + username);
  };
  
  var decrementCountdown = function() {
    $scope.countdown -= 1;
    if($scope.countdown < 1) {
      $scope.search($scope.username);
    }
  };
  
  var countdownIntervalObj = null;
  var startCountdown = function() {
    countdownIntervalObj = $interval(decrementCountdown, 1000, 5);
  };

  $scope.username = "angular";  
  $scope.countdown = 5;
  startCountdown();
  
}]);
