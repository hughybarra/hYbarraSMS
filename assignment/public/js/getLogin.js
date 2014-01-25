$(document).ready(function(){
	/* 
		Firebase references are created using a URL that specifies which data you want to access
		var myDataRef = new Firebase('https://f95sgwxcg0f.firebaseio-demo.com/');
	*/
	var myDataRef = new Firebase('https://glaring-fire-7611.firebaseIO.com');

	attemptLogin();
	//-----------------
})// end document ready function
//==============================

// declare a new auth 
var getAuth = function(){
	/*
	Before logging users in, instantiate the FirebaseSimpleLogin by passing a Firebase reference and a callback. 
	This callback will be invoked any time that the user's authentication state changed:
	*/
	var errorCodes = [
		"INVALID_PASSWORD"
	];

	console.log('get auth is running');
	var chatRef = new Firebase('https://glaring-fire-7611.firebaseIO.com');
	var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
		if (error) {
		    // an error occurred while attempting login
		    console.log(error);
		    console.log(error.code);
		    if (error.code == errorCodes[0]){
		    	$('#simple-user-password').addClass('invalid');
		    }

		} else if (user) {
		    // user authenticated with Firebase
		    console.log('User ID: ' + user.id + ', Provider: ' + user.password);
		    // Slider Init 
		    getLogin('logged-in');
		} else {
		    // user is logged out
		    console.log('user is logged out');
		}// end else 
	});// end var auth
	// return auth
	return auth;
}// end get auth 

var _pageIsSet = false;

var getLogin = function(status){
	console.log('Get Login Function Running');

	if (status == 'logged-in'){
		console.log('YOU ARE LOOGED IN');
		var url = "http://localhost:8886/SMS/assignment/public/?action=getLoggedIn";
		$.ajax({
			url: url,
			type: 'GET', 
			dataType: 'html',
			success: function(success){
				var htmlData = success;

				console.log('RUUUNING');

				 // remove the login functionality s
				 $('.login-div').remove();
				 $('.login-buttons-script').remove();

				 // take response from server and append it to the document
				 $('#doc-head').append('<script type="text/javascript" src="js/swfobject.js" class="swfobject-script"></script>');
				 $('#doc-head').append('<script type="text/javascript" src="js/sms_setup.js" class="sms-script"></script>');
				
				 // add main.js
				 $('.script-div').append('<script src="js/main.js" class="main-js-script"></script>');
				 // this is breaking eveyrhing 
				  // $('.document-container').append(htmlData);
				
			}
		});// end ajax call
	}
	else if(status == 'not-logged-in'){
		console.log('not logged in');
		var url = "http://localhost:8886/SMS/assignment/public/?action=getLogin";

		// if the user is not logged in make an ajax call to get the log in page
		$.ajax({
			url: url,
			type: 'GET', 
			dataType: 'html',
			success: function(success){
				var htmlData = success;
				// console.log(htmlData);
				// take response from server and append it to the document

				// if page is not set 
				if (!_pageIsSet){
					$('.document-container').append(htmlData);
					$('.script-div').append('<script src="js/loginButtons.js" class="login-buttons-script"></script>');
					_pageIsSet = true;
				}
			}
		});// end ajax call
	}

}// end getLogin 

var attemptLogin = function(data){
	console.log('attemt login is running ');

	if (!data){
		getLogin('not-logged-in');
	}else{
		var auth = getAuth();
 	var newData =auth.login('password', {
		email: data.email,
		password: data.password
		// getLogin('logged-in');
	});
	}
}// end attamptLogin

var createSimpleUser = function(data){
	console.log('create simple user running');
	if (!data){
		console.log('no data passsed');
	}else{
		var auth = getAuth();
		auth.createUser(data.email, data.password, function(error, user) {
			if (!error) {
			console.log('User Id: ' + user.id + ', Email: ' + user.email);
			}// end if
		});
		// attemptLogin(data);
	}// end else 
}// end create simple user
//================























