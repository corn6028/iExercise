Parse.initialize("lGJxaJjLAeZewHob85fxeWXeXVOlFUFHWKjSazzH", "HnbslyPWRrrj13cw4koWYAo6UxWMbxIpgoYCpx6f");
window.fbAsyncInit = function() {
// init the FB JS SDK
    Parse.FacebookUtils.init({
        appId      : '315243075347265',                        // App ID from the app dashboard
        cookie     : true,                                 // Allowed server-side to fetch fb auth cookie
        status     : true,                                 // Check Facebook Login status
        xfbml      : true                                  // Look for social plugins on the page
     });
     // Additional initialization code such as adding Event Listeners goes here
	FB.api('/me', function(response) {
	//	alert(response.name);
        var my_name = response.name;
		if(my_name !== undefined){
			Parse.User.current().set("last_name",my_name);
			Parse.User.current().set('notFB',false);
        	Parse.User.current().save();
       		$("#my_name").html("Hi, " + my_name);
			$("#user_name").html(my_name);
//			alert("no!");
		}
        //var my_facebook_id = response.id;
		//Parse.User.current().set("last_name",my_name);
		//Parse.User.current().set('notFB',false);
        //Parse.User.current().save();
       // $("#my_name").html("Hi, " + my_name);
    });
	FB.api('/me/picture?width=250', function(response) {
        var my_picture_url = response.data.url;
		if(my_name !==undefined){
			Parse.User.current().set('my_pic',my_picture_url);
			Parse.User.current().save();
			$('#me').attr('src',my_picture_url);
			if(document.URL.indexOf("?") == -1){
				document.getElementById("inner").style.backgroundImage="url('"+currentUser.get('my_pic')+"')";
			}
		}
    });
};
// Load the SDK asynchronously
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    //js.src = "http://connect.facebook.net/en_US/all.js";
    // Debug version of Facebook JS SDK
    js.src = "http://connect.facebook.net/en_US/all/debug.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//alert(Parse.User.current().get('username'));

$(document).ready(function(){
  
  /* $('#goalweight').click(function(){
    user.set("goal", parseInt($('#goal-of-weight').val()));
	window.location.href = "home.html";
	})*/

   $('.red').click(function(){
//	alert("ha");
//	$('#signupmodal').fadeToggle();
	//window.location.href = "home.html";
	//$('#home').append(html);
	//  .modal('setting', 'closable', ture)
	$('#signupmodal').modal('show');
  })
/*  $('#close-signup').click(function() {
	$('#signupmodal').fadeOut();
  })*/

  $('.grey').click(function(){
//	alert("no");
//	$('#loginmodal').fadeToggle();
	$('#loginmodal').modal('show');
  })
/*  $('#close-login').click(function() {
	$('#loginmodal').fadeOut();
  })*/

/*  $('.green').click(function() {
	alert("no!!!!");
	window.location.href = "katy.html";
	Parse.FacebookUtils.unlink(user, {
  	  success: function(user) {
      alert("The user is no longer associated with their Facebook account.");
  	  }
	});
  })*/
  $('#log-in').click(function() {
	Parse.User.logIn($('#user-name-in').val(), $('#password-in').val(), {
  	  success: function(user) {
    	// Do stuff after successful login.
		//var url = "home.html?username="+user.get('username');
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
  	user.set("age", 0);
 	user.set("height", 0);
  	user.set("weight", 0);
	user.set("friend_list",[$('#user-name').val()]);
  	user.set("goal", parseFloat($('#goal-of-weight').val()));
	user.set("achieve",true);
	user.set("total_dist",0);
   /* user.set("no1", $('#no1').val());
    user.set("no2", $('#no2').val());
    user.set("no3", $('#no3').val());*/
	user.set("notFB",true);
  
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
/*$('#goalweight').click(function(){
    user.set("goal", parseInt($('#goal-of-weight').val()));
	window.location.href = "home.html";
	})*/

 $('.facebook').click(function() {
	Parse.FacebookUtils.logIn("email,public_profile,user_friends", {
    success: function(user) {
      if (!user.existed()) {
        alert("User signed up and logged in through Facebook!");
			/*FB.api('/me', function(response) {	
				alert("Successful Login!\nPlease Login again.");
            	var my_name = response.name;
           		// var my_gender = response.gender;
            	//var my_username = response.username;
            	var my_facebook_id = response.id;
				Parse.User.current().set("last_name",my_name);
            	Parse.User.current().save();
           		// $("#my-profile-facebook-id").html(my_facebook_id);
       	 	});
			FB.api('/me/picture?width=250', function(response) {
            	//var my_picture_url = response.data.url;
            	//$("#my_picture").attr('src', my_picture_url);
        	});*/
	//	$('#goalofweightmodal').modal('show');
		window.location.href = "home.html";
		//window.location.reload();
      } else {
		alert("User logged in through Facebook!");
	//	window.reload();
		window.location.href = "home.html";
      }
//	  Parse.User.current().set('notFB',false);
    },
    error: function(user, error) {
      alert("User cancelled the Facebook login or did not fully authorize.");
    }
    });
  })
});

