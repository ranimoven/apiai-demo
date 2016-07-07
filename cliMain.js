var apiai = require('apiai');
var prompt = require('prompt')
var access_token = "721090d2c2694ab4a3d49369e0cd5d04"
var readlineSync = require('readline-sync');
var app = apiai(access_token);
var uuid = require('node-uuid');
var colors = require('colors');

var query = readlineSync.question("Please input your command: ");

run_main(query);

function run_main(query1) {
	var request = app.textRequest(query1);
	request.on('response', function(response) {
		if(response['result']['action'] === 'start-questions')
			startQuestion();

	    else if(response['result']['action'] === 'bill-delay'){
	    	delayBillCase();
	    	return;
	    }

	    else if(response['result']['fulfillment']['speech']){
	    	console.log(response['result']['fulfillment']['speech'].green);
	    }

	    else
	    	console.log("wrong input", response['result']);

	});
	 
	request.on('error', function(error) {
	    console.log(error);
	});
	 
	request.end()
}

function startQuestion(){
	console.log("Hello, it’s Moven! I’ve noticed you’ve got $500 in your account but have a $400 bill due tomorrow.".green +
		"You typically spend more than $100 in day on your ".green +
		"WANTS, so try to stay under that so you don’t run out of money.".green);
}

function delayBillCase(){
	var output = "Sure, I can do that, but your biller will bill you a $15 late fee. " + 
	    "How about I give you a $100 credit boost for only a $1 "
	    +"that can get you by before you get paid?";
	console.log(output.green);
	var query2 = readlineSync.question("")
	var request = app.textRequest(query2);
	request.on('response', function(response){
		acceptOrNot(response);
	})

	request.on('error', function(error) {
	    console.log(error);
	});
	 
	request.end()
}

function acceptOrNot(response){
	if(response['result']['contexts'][0]['name'] === 'accept-or-not' &&
	    	response['result']['metadata']['intentName'] === 'accept credit')
	    	console.log("Okay, I'll send in that credit boost. Your balance is now $599. ".green +
				"You can safely spend your dinner today!".green);

	else if(response['result']['contexts'][0]['name'] === 'accept-or-not' && 
	    	response['result']['metadata']['intentName'] === 'do not accept credit')
	    	console.log("Okay, I'll let you take that $15 late fee. I moved the bill payment, now your balance is now $485.".green
				+ "You can safely spend on your dinner today!".green);

	else 
		console.log("response called, doesn't fit" + response);
}
