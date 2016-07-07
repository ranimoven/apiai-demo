
var apiai = require('apiai');
 
var access_token = "721090d2c2694ab4a3d49369e0cd5d04"
 
var app = apiai(access_token);
console.log("Write your thing!");


var request = app.textRequest("Move my bill");
 
request.on('response', function(response) {
    console.log(response['result']);
});
 


request.on('error', function(error) {
    console.log(error);
});
 
request.end()

var request2 = app.textRequest("No");

request2.on('response', function(response) {
    console.log(response['result']);
    console.log
});
 
request2.on('error', function(error) {
    console.log(error);
});
 
request2.end()
