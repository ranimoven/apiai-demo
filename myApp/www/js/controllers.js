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


  $scope.$on("$ionicView.afterEnter",function(){
    console.log("AFTER enter");

  });
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

  $scope.voiceRequest = function() {
    $scope.progressVal = "starting";
    try {
      ApiAIPlugin.requestVoice({},
        function (response) {
          $scope.voiceReply = JSON.stringify(response['result']['speech']);
          $timeout(function(){
            $scope.speakText(JSON.stringify(response['result']['speech']));
            $scope.progressVal = "done";
          }, 1000);

        },
        function (error) {
          alert("Error!\n" + error);
        });
      ApiAIPlugin.levelMeterCallback(function(level) {
        console.log("LISTENING to voice:" + level);
        $scope.progressVal="recording..."
        // add visualization code here
      });
    } catch(e){
      alert(e);
    }

  }

  /*$scope.voiceRequest = function() {
    ApiAIPlugin.requestVoice({ },
      function (response) {
        $scope.voiceReply = "got a result" + JSON.stringify(response['result']);
        //$scope.speakText($scope.voiceReply);
        console.log('received request');
        alert(JSON.stringify(response));
      },
      function (error) {
        console.log(error);
        alert("Error!\n" + error);
      });
  }*/

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
  }


}]);
