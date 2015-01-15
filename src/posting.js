//Parse.initialize("lGJxaJjLAeZewHob85fxeWXeXVOlFUFHWKjSazzH", "HnbslyPWRrrj13cw4koWYAo6UxWMbxIpgoYCpx6f");
/*var params = window.location.search.split('?')[1];
var key = params.split('=')[0];
var name = params.split('=')[1];
*/
//alert(Parse.User.current().get('username'));
$(function(){
$('#comment').click(function(){
  $('#commentmodal').modal('show');
 // $('.modal').modal('show');
})

});

var currentUser = Parse.User.current();
if (currentUser) {
    // do stuff with the user
	alert(currentUser.get('username'));
    $(document).ready(function(){
		$("#my_name").html("Hi, "+currentUser.get('last_name'));
  		$("#user_name").html(currentUser.get('last_name'));

  		$("#age").html(currentUser.get('age'));
  		$("#height").html(currentUser.get('height'));
  		$("#weight").html(currentUser.get('weight'));
		$("#goal").html(currentUser.get('goal'));

		$("#no1").html('name');
		$("#no2").html('name');
  		$("#no3").html('name');


		if(!currentUser.get('notFB')){
			$('#me').attr('src',currentUser.get('my_pic'));
			//alert(currentUser.get('my_pic'));
			document.getElementById("inner").style.backgroundImage="url('"+currentUser.get('my_pic')+"')";
		//	$(".inner").attr('backgroundImage',currentUser.get('my_pic')) ;
		}
    });	
} else {
    // show the signup or login page
	alert("Please signup or login first");
	window.location.href = "katy.html";
}

function validate_required(field,alerttxt)
{
    with (field)
    {
    if (value==null||value=="")
      {alert(alerttxt);return false}
      else {return true}
      }
}
function validate_form(thisform)
{
    with (thisform)
    {
    if (validate_required(distance,"Distance must be filled out!")==false)
      {distance.focus();return false}
    }
}

$(function() {
  $('.green').click(function(){
	/*Parse.User.logIn(name,{
  	  success: function(user){
		alert('hi');
  	  },
  	  error: function(user,error) {
		alert("LOGIN ERROR");
  	  }
	});*/
	Parse.User.logOut();
	window.location.href = "katy.html";
  })
  $('#me').click(function(){
	window.location.href = "myprofile.html";
  })
  $('#friend-post').click(function(){
	window.location.href = "posting.html";
  })

  $('#winner-post').click(function(){
	window.location.href = "posting.html";
  })
  $('#i-exercise').click(function(){
	window.location.href = "home.html";
  })
});


$(document).on("click", "#submit", function(event){
  event.preventDefault();
  var P = Parse.Object.extend("p");
  var p = new P();
  
//p.set("objectId",currentUser.get('objectId'));
p.set("post", $('#post').val());
p.set("pdis", $('#pdis').val());
p.set("pweight", $('#pweight').val());
p.set("username", currentUser.get('username'));
p.set("my_pic",currentUser.get('my_pic'));
p.set("last_name",currentUser.get('last_name'));

p.save().then(function(response) {
        alert("success");
        location.reload(); //refreshes the form
    }, function(error) {
        alert("error");
        location.reload();
    });

   var fileUploadControl = $("#post_img")[0];
   if (fileUploadControl.files.length > 0) {
    alert("success>0");
   var file = fileUploadControl.files[0];
   var name = "photo.png";

   var parseFile = new Parse.File(name, file);

   //put this inside if {
   parseFile.save().then(function() {
    alert("success1");
    location.reload();
   }, function(error) {
    alert("error");
    location.reload();
    });

    // Be sure of ur parameters name
    // prod is extend of my class in parse from this: var prod = new products();
    p.set("post_img", parseFile);
    p.save();
   }

});


