console.log('Heöllo');

var myApp = angular.module('myApp', []);
 
// controller
myApp.controller('MainController', [
  '$scope', 'github', '$interval', '$anchorScroll', '$location', 
  function($scope, github, $interval, $anchorScroll, $location) {
  
  // model
  var person = {
    firstName: "Alien",
    lastName: "I am",
    imageSrc: "http://icons.iconseeker.com/png/fullsize/sd-ultraman--monsters/alien-chibul-blue.png"
  };
  
  $scope.message = "Hello controller";
  $scope.alsoMessage = "This is also a message from the controller. Kitchen-sink test.";
  
  $scope.person = person;
  $scope.username = "angular";
  
  var onError = function(reason) {
    $scope.error = "Error connecting API!";
  };
  
  var onUserComplete = function(data) {
    console.log('onUserComplete');
    $scope.user = data;
    github.getRepos($scope.user).then(onRepos, onError);
    /*$http.get($scope.user.repos_url)
      .then(onRepos, onError);*/
  };
  
  var onRepos = function(data) {
    console.log('onRepos');
    $scope.repos = data;
    $location.hash("userDetails");
    $anchorScroll();
  };
  
  var onErrorUserComplete = function(reason) {
    $scope.error = "Error connecting to GitHub-API";
  };
  
  $scope.search = function(username) {
    //$http.get("https://api.github.com/users/" + userName)
    console.log('search:'+username);
    github.getUser(username)
      .then(onUserComplete, onErrorUserComplete);
    
    if(countdownIntervalObj) {
      $interval.cancel(countdownIntervalObj);
      $scope.countdown = null;
    }
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
  
  $scope.repoSortOrder = "-stargazers_count";
  $scope.countdown = 5;
  startCountdown();
  
}]);
