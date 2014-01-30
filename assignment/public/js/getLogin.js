$(document).ready(function(){
	/* 
		Firebase references are created using a URL that specifies which data you want to access
		var myDataRef = new Firebase('https://f95sgwxcg0f.firebaseio-demo.com/');
	*/

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


	var chatRef = new Firebase('https://glaring-fire-7611.firebaseIO.com');
	
	var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
		if (error) {
		    // an error occurred while attempting login
		    console.log(error);
		    console.log(error.code);
		    // add error to the divs if there is an error
		    if (error.code == errorCodes[0]){
		    	$('#simple-user-password').addClass('invalid');
		    }
		} else if (user) {
		    // user authenticated with Firebase
		    console.log('User ID: ' + user.id + ', Provider: ' + user.password);
		    console.log(user);
		    getLogin('logged-in');

		} else {
		    // user is logged out
		    console.log('user is logged out');
		}// end else 

	});// end var auth
	// return auth
	return auth;
}// end get auth 

var auth = getAuth();

var getLogin = function(status){

	if (status == 'logged-in'){
		console.log('logged in');
		var url = "http://localhost:8886/SMS/assignment/public/";
		$.ajax({
			url: url,
			type: 'GET', 
			dataType: 'html',
			success: function(success){;
				var htmlData = success;
				var newLocation = "http://localhost:8886/SMS/assignment/public/index.php?action=getLogin";
				// reload the new page
				window.location = newLocation;
			}
		});// end ajax call
	}// end if 
	else if(status == 'not-logged-in'){
		console.log('not logged in');
		var url = "http://localhost:8886/SMS/assignment/public/";
	}

}// end getLogin 


var attemptLogin = function(data){

	if (!data){
		var data = {
			'email': '',
			'password': ''
		}
	}
 	var newData =auth.login('password', {
		email: data.email,
		password: data.password
	});
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
			var myData = {
			'email': data.email,
			'password': data.password
		}
		console.log(myData);
		attemptLogin(myData);
		});
		
	}// end else 
}// end create simple user
//================























