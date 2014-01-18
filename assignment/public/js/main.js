
/* 

SeekTime/Duration * width = Xpos 

Xpos / Width * duraction = Seektime
*/
var playToggle = true;

// replaces $(document).ready function
var flashReady = function(){

	// INITS
	// bootstrap sliders
	$('.slider').slider();
	// initialize both sliders with value of 0
	$(".player-slider").slider("setValue", 0);
	$(".volume-slider").slider("setValue", 0);
	// auto hide icons
	// pause 
	$(".glyphicon-pause").hide();
	// volume icons
	$(".glyphicon-volume-off").hide();
	$(".glyphicon-volume-down").hide();

	// Declaring Vars
	var url = "rtmp://localhost/SMSServer";
	
	// Play Button
	$(".glyphicon-play").click(function(){
		console.log("play Clicked");
		// swap icons
		$(".glyphicon-play").hide();
		$(".glyphicon-pause").show();

		// Connect to Server
		console.log(playToggle);

		// Play toggle bool check
		// checks to see if the video has already been started or not
		if (playToggle){
			flash.connect(url);
			playToggle = false;
		}else{
			flash.playPause();
		}
	});// end play button
	// ====================================
	// Pause Button 
	$(".glyphicon-pause").click(function(){
		console.log("pause Clicked");
		// swap icons
		$(".glyphicon-pause").hide();
		$(".glyphicon-play").show();

		// pause the video 
		flash.playPause();
	});// end pause button
	// ====================================



}

// Flash Call Back Functions
//===========================================
//===========================================

// Connected Function
//=======================================
var connected = function(success, error){
	// Video name
	var video = "startrekintodarkness_vp6";
	// setting volume to 0
	var volume = 0;

	console.log("Connected Is Running");
	console.log(success);
	console.log(error);
	if(success){
		flash.startPlaying(video);
		flash.setVolume(volume);
	}else{
		console.log(error);
	}
}// end connected

// seekTimer Function
//============================
var eliminator = 0;
var minutes = 0;
var seekTime = function(time){
	// show timer

	// helper function 
	// adds a 0 for non double digits
	function minTwoDigits(n) {
  		return (n < 10 ? '0' : '') + n;
	}	
	// Math.floor current time to cut the decimal
	var seekTime = Math.floor(time);

	// var durMinutes = $(".minutes-total").text();
	// var durSeconds = $(".seconds-total").text();
	// var duration= (durMinutes*60)+durSeconds;

	var currentTime = Math.floor(time) - eliminator;
	// console.log(currentTime);
	// Counter Logic
	if (currentTime >= 60){
		eliminator += 60;
		minutes += 1;
	}
	// console.log(eliminator);
	$(".seconds").text(minTwoDigits(currentTime));
	$(".minutes").text(minutes);

	// animating the slider 
	// LEFT OFF HERE ANIMATING THE SLIDER
	// SLIDER IS WORKING BUT NOT CORRECTLY 
	$(".player-slider").slider('setValue', seekTime);

}// end seek Time

// Get Duration Function
//=======================================
var getDuration = function(duration){
	// console.log(duration);

	// adds a 0 for non double digits
	function minTwoDigits(n) {
  		return (n < 10 ? '0' : '') + n;
	}	

	var videoDuration = Math.floor(Math.round(duration * 100)/100);
	// console.log("video Duration");
	// console.log(videoDuration);

	var minutes = Math.floor(videoDuration/60);
	// console.log("video minutes");
	// console.log(minutes);

	// minutes minus seconds
	seconds = videoDuration-minutes*60;
	// console.log("video seconds");
	// console.log(seconds);

	//Setting totals for timer
	$(".minutes-total").text(minutes);
	$(".seconds-total").text(minTwoDigits(seconds));
	// $(".seconds").text(0);
	$(".minutes").text(0);

	// setting the max value of the slider 
	// NOT SURE IF THESE ARE WORKING 
	// HAVE TO FIX THIS 
	$(".player-slider").slider(min, 0);
	$(".player-slider").slider(max, videoDuration);

}// end get Duration

// Global Error Function
//=================================
var globalError = function(message)
{
	console.log('message',message);
}// end Global Error
