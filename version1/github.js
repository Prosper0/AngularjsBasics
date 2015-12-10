// GitHub service
(function(){
  
  // The service
  var github = function($http){
    
    var getUser = function(username){
      console.log('github.getUser:'+username);
      return $http.get("https://api.github.com/users/" + username)
        .then(function(response){
          return response.data;
        });
    };
    
    var getRepos = function(user){
      return $http.get(user.repos_url)
        .then(function(response){
          return response.data;
        });
    };
    
    return {
      getUser: getUser,
      getRepos: getRepos
    };
  };
  
  // Register the service
  var module = angular.module("myApp");
  module.factory("github", github);
  
}());