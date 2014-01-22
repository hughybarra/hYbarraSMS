/* 

Formulas 
SeekTime / duration  * width  = Xpos

Xpos /  Width  * duration = seektime
*/

var flashReady = function(){


	// Slider Init 
	playerControllers();
}

// Player Controllers
// ===========================================
// ===========================================
//duration/ time * width - posx 
var _mouseDown 		= false;
var _playerMouseDown = false;
var _soundMouseDown = false;
var _firstClick 	= true;
var _serverUrl 		= "rtmp://localhost/SMSServer";
var _videoTitle 	= "startrekintodarkness_vp6";
var _volume 		= 0;
var _totalMinutes 	= $('.minutes-total').val();
var _minutes 		= $('.minutes').val();
var _seekTime 		= 0;
var _duration		= 0;


var playerControllers = function(){
	/* 
		Player controllers Constructer function
		builds all controller asstes 
	*/
	// declaring vars
	var mouseX = 0;
	var mouseY = 0;
	var offset = 0;
	var handle = $('.slider-handle');
	var track = $('.slider-track');
	var sliderType = '';

	// auto hide pause button
	$('.glyphicon-pause').hide();
	// icon toggle 

	// Pause 
	$('.glyphicon-pause').click(function(){
		pauseVideo();
	})// end pause click functions

	//Play
	$('.glyphicon-play').click(function(){
		playVideo();
	});// end click function

	// handle slider functionality
	$('.slider-handle').mousedown( function(e){
		// get mousedow
		console.log('video');
		_playerMouseDown = true;

		// _mouseDown = true;
		// handleManager('video');
		e.preventDefault();
		// return false;
	});// end mouse down function
	$(document).mouseup( function(e){
		console.log('mouseup');
		_mouseDown = false;
		_playerMouseDown = false;
		_soundMouseDown = false;

		// check the position of the slider and set it
	});// end mouse up function

	$('.sound-slider-handle').mousedown( function(e){
		console.log('volume');
		_soundMouseDown = true;
		// _mouseDown = true;
		// handleManager('sound');
		e.preventDefault();
		// return false;
	});// end slider handle function

	$(document).mousemove(function(e){

		if(_playerMouseDown){
			handleManager('video', e);
		}
		if (_soundMouseDown){
			handleManager('sound', e);
		}
	})// end mouse move function
}// end player Controllers 
// ===================

// Mouse Events 
// ===========================================
// ===========================================

// Play function
var playVideo = function(){

	console.log('play Clicked');
	$('.glyphicon-pause').show();
	$('.glyphicon-play').hide();

	// first play click 
	if (_firstClick){
		// connect to the server
		flash.connect(_serverUrl);
		_firstClick = false;

	}else{
		flash.playPause();
	}// end if 

}// end playVideo 
// ===================

// Pause
var pauseVideo = function(){

	console.log('pause Clicked');
	$('.glyphicon-pause').hide();
	$('.glyphicon-play').show();

	// pause the video 
	flash.playPause();

}// end pause Vidoe 
// ===================
// Sound Handle Dragging Function

// Handle Dragging function
var handleManager = function(sliderType, e){

	/* 
	If the mouse is down get the position of the mouse 
	set the slider to the position of the mouse
	*/
	var mouseX 					= e.pageX;
	var mouseY 					= e.pageY;
	var videoHandle 			= $('.slider-handle').offset().left;
	var videoHandleWidth 		= $('.slider-handle').width();
	var videoBar 				= $('.slider-bar').offset().left;
	var soundHandle 			= $('.sound-slider-handle').offset().left;
	var soundHandleWidth 		= $('.sound-slider-handle').width();
	var soundBar 				= $('.sound-slider-bar').offset().left;
	var vSeekTime				= 0;
	var sSeekTime				= 0;
	
	var sPos					= '';

	
	if (sliderType == 'video'){
		// $('.slider-handle').offset({left: mouseX});

		$('.slider-handle').offset({left: mouseX});

		// reset the handle if it goes to low
		if (videoHandle < videoBar){
			$('.slider-handle').offset({left: videoBar});
		}// end if 

		// reset the handle if it gets
		if (videoHandle > videoBar + 300){
			$('.slider-handle').offset({left: videoBar+300 - videoHandleWidth});
		}// end if 

		// get the position of the slider on the slider bar 
		//SeekTime / duration  * width  = Xpos
		//Xpos /  Width  * duration = seektime

		// on mouse up use this value to set the time 
		vSeekTime = (videoHandle - videoBar) / 300 * _duration; 



		
		



	}// end video if 
	if (sliderType == 'sound'){
		$('.sound-slider-handle').offset({left: mouseX});
		// reset the handle if it goes too low
		if (soundHandle < soundBar){
			$('.sound-slider-handle').offset({left: soundBar});
		}// end if 
		if (soundHandle > soundBar + 100){
			$('.sound-slider-handle').offset({left: soundBar+100 - soundHandleWidth})
		}
	}
	// $(document).mousemove(function(e){

	// 	if (_mouseDown){
	// 		if (sliderType == 'video'){
	// 			console.log('video is on');
	// 			mouseX = e.pageX;
	// 			mouseY = e.pageY;
	// 			handle = $('.slider-handle').offset().left;
	// 			handleWidth = $('.slider-handle').width();
	// 			bar = $('.slider-bar').offset().left;
	// 			// console.log(mouseX);
	// 			$('.slider-handle').offset({left: mouseX });

	// 			if (handle < bar){
	// 				console.log('lower');
	// 				$('.slider-handle').offset({left: bar});
	// 			}// end if 
	// 			if (handle > bar+ 300){
	// 				console.log('higher');
	// 				$('.slider-handle').offset({left: bar+300 - handleWidth});
	// 			}// end if 
	// 		}// end Video if

	// 		if (sliderType == 'sound'){

	// 			console.log('sound is on');
	// 		}
	// 	}// end mouse down if  
	// });// end mouse movue function
}// end Handle Manager
// ===================

// End Player Controllers
// ===========================================
// ===========================================

// Call Back Functions 
// ===========================================
// ===========================================

var connected = function(success, error){
	/* 
		This function is called after the NetStream has connected to the server.
		@param success - (Boolean) if the connection was successful.
		@param error - (String) the message if connection was unsuccessful.
	*/	
	console.log(success);

	if (success){
		console.log('running');
		flash.startPlaying(_videoTitle);
		flash.setVolume(_volume);
	}else{
		console.log('--------------------------------');
		console.log('---- Connect Error Message -----');
		console.log(message);
		console.log('--------------------------------');
	}
}// end Connected 
// ===================

var seekTime = function(time){
	/*
		This function is called when playing back a video.
		@param time - (Number) holds the current time (in seconds) of the video.
	*/

	var currentTime = Math.floor(time);
	var minutes = 0;
	var seconds = 0;
	var counter = 0;
	function pad(n) {
    if (n < 10){
        return "0" + n;
     }
    return n;
	}

	// count minutes
	// console.log(currentTime);
	if (currentTime >= 60){
		minutes ++;
		counter += 60;
	}// end if 

	seconds = currentTime - counter;


	// set minutes and seconds on vieo player
	$('.minutes').text(pad(minutes));
	$('.seconds').text(pad(seconds));

	// setting global seek tie 
	_seekTime = Math.floor(currentTime);
	

}// end Seek Time 
// ===================

var getDuration = function(duration){
	/*
		This function is called after the duration of a playback video has been determined. 
		@param duration - (Number) holds the duration (in seconds) of the video currently being played back.
	*/

	var newDuration = Math.floor(duration);
	
	_duration = newDuration;
	minutes = Math.floor(newDuration / 60);
	seconds = Math.floor(duration - minutes * 60) ;

	function pad(n) {
    if (n < 10){
        return "0" + n;
     }
    return n;
	}
	// set total minutes on video player
	$('.minutes-total').text(minutes);
	$('.seconds-total').text(pad(seconds));


}// end get Duration 
// ===================

var recordingError = function(message, code){
	/*
		This function is called if there is an error while recording.
		@param message - (String) holds the message of what went wrong.
		@param code - (String) the flash error code that was called.
	*/

}// end recording Error 
// ===================

var globalError = function(message){
	/* 
		This function is called if there are any flash errors.
		@param message - (String) holds the message of what went wrong.
	*/
	console.log('------------------------');
	console.log('---- Error Message -----');
	console.log(message);
	console.log('------------------------');
}// end global ERror
// ===================




// End CallBack Functions
// ===========================================
// ===========================================





