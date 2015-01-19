function show(no)
		{
			if(no == 1)
				document.getElementById('point').style.display = "";
			else if(no == 0)
				document.getElementById('point').style.display = "none";
		}

var user = Parse.Object.extend("User");
var query = new Parse.Query(user);
query.descending("weight");
query.find({
	success: function(results) {
   		// The object was retrieved successfully.
		for(var i=1;i<4;i++){
			var object = results[i];
			var name = "#no" + i;
			var img = "img_no" + i;
			$(document).ready(function() {
				$(name).html(object.get('last_name'));
			//	$(img).attr('src', object.get('my_pic'));
				document.getElementById(img).style.backgroundImage="url('"+object.get('my_pic')+"')";
			});
		}
  	},
  	error: function(object, error) {
    	// The object was not retrieved successfully.
    	// error is a Parse.Error with an error code and message.
  	}
});

