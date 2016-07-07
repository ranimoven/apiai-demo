angular.module('app.controllers', [])

.controller('myProfileCtrl', function($scope) {

})

.controller('talkToMovenCtrl', function($scope) {
  $scope.query = "0";
  $scope.botResponse = "You haven't asked me anything yet!";

  $scope.sendToBot = function(queryVal){
    $scope.query = queryVal
    //$scope.botResponse = $scope.query

      ApiAIPlugin.requestText({
        query: queryVal
      },
      function (response) {
        alert(JSON.stringify(response));
        $scope.botResponse = JSON.stringify(response['result'])
      },
      function (error) {
        alert("Error!\n" + error);
      });
  };

  $scope.textRequest = function(queryVal) {
    ApiAIPlugin.requestText({
        query: queryVal
      },
      function (response) {
        alert(JSON.stringify(response));
      },
      function (error) {
        alert("Error!\n" + error);
      });
  };


})
