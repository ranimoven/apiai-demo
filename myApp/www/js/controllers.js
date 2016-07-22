angular.module('app.controllers', [])

.controller('myProfileCtrl', function($scope) {

})

.controller('talkToMovenCtrl', ['$scope', '$timeout',
  function($scope, $timeout) {
  $scope.queryModel = {
    'text': ""
  };
  $scope.botResponse = "You haven't asked me anything yet!";
  $scope.voiceReply = "";
  $scope.progressVal = "hasn't started";
  $scope.volume="0%";
  console.log($scope.queryModel.text);

  $scope.sendToBot = function(){
      console.log("TEXT IS : " + $scope.queryModel.text);

      ApiAIPlugin.requestText({
        query: $scope.queryModel.text
      },
      function (response) {
        $scope.botResponse = JSON.stringify(response['result']['fulfillment']['speech']);
        $timeout(function(){
          $scope.queryModel.text = "";
        }, 1000);

      },
      function (error) {
        alert("Error!\n" + error);
      });

  };


  $scope.startHello = function(){
    console.log("hello is asked");
    ApiAIPlugin.requestText({
      query: "hello"
    },
    function (response) {
      $scope.botResponse = JSON.stringify(response['result']['fulfillment']['speech']);
      $timeout(function(){
        //$scope.queryModel.text = "";
      }, 1000);

    },
    function (error) {
      alert("Error!\n" + error);
    });
  };


  $scope.voiceRequest = function() {
    $scope.progressVal = "starting";
    ApiAIPlugin.requestVoice({},
      function (response) {
        console.log(JSON.stringify(response['result']['resolvedQuery']));
        $timeout(function () {
          $scope.voiceReply = JSON.stringify(response['result']['fulfillment']['speech']);
          $scope.speakText($scope.voiceReply);
        }, 1000);
      },
      function (error) {
        alert("Error!\n" + error);
      });
  };



  $scope.speakText = function(inputText){
    TTS
      .speak({
        text: inputText,
        locale: 'en-US',
        rate: 1.6
      }, function () {
      }, function (reason) {
        alert(reason);
      });
  };


}]);
