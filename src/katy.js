Parse.initialize("lGJxaJjLAeZewHob85fxeWXeXVOlFUFHWKjSazzH", "HnbslyPWRrrj13cw4koWYAo6UxWMbxIpgoYCpx6f");

window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '315243075347265', // Facebook App ID
      status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true,  // initialize Facebook social plugins on the page
      version    : 'v2.2' // point to the latest Facebook Graph API version
    });
 
    // Run code after the Facebook SDK is loaded.
}; 
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(function(){
  $('.red').click(function(){
//	alert("ha");
	$('#signupmodal').fadeToggle();
	//window.location.href = "home.html";
	//$('#home').append(html);
	//  .modal('setting', 'closable', ture)
//	$('#signupmodal').modal('show');
  })
  $('#close-signup').click(function() {
	$('#signupmodal').fadeOut();
  })

  $('.grey').click(function(){
//	alert("no");
	$('#loginmodal').fadeToggle();
//	$('#loginmodal').modal('show');
  })
  $('#close-login').click(function() {
	$('#loginmodal').fadeOut();
  })

  $('.green').click(function() {
	alert("no!!!!");
	Parse.FacebookUtils.unlink(user, {
  	  success: function(user) {
      alert("The user is no longer associated with their Facebook account.");
  	  }
	});
  })
  $('#log-in').click(function() {
	Parse.User.logIn($('#user-name-in').val(), $('#password-in').val(), {
  	  success: function(user) {
    	// Do stuff after successful login.
		window.location.href = "home.html";
  	  },
  	  error: function(user, error) {
    	// The login failed. Check error to see why.
		alert("Your username or password is uncorrect!");
  	  }
	});
  })
  $('.submit').click(function() {
	var user = new Parse.User();
	user.set("username", $('#user-name').val());
	user.set("password", $('#password').val());
	user.set("email", $('#email').val());
  
	// other fields can be set just like with Parse.Object
	user.set("first_name", $('#first-name').val());
	user.set("last_name", $('#last-name').val());
	  
	user.signUp(null, {
    success: function(user) {
    	// Hooray! Let them use the app now.
		window.location.href = "home.html";
  	},
  	error: function(user, error) {
    	// Show the error message somewhere and let the user try again.
  	alert("Error: " + error.code + " " + error.message);
 	 }
	});
	$('.modal').modal('hide');
  })
  $('.facebook').click(function() {
	Parse.FacebookUtils.logIn("email,public_profile,user_friends", {
    success: function(user) {
      if (!user.existed()) {
		window.location.href = "home.html";
        //alert("User signed up and logged in through Facebook!");
      } else {
		window.location.href = "home.html";
       // alert("User logged in through Facebook!");
      }
    },
    error: function(user, error) {
      alert("User cancelled the Facebook login or did not fully authorize.");
    }
    });
  })
});

