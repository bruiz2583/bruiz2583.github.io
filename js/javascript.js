// var multiplier = 9;
// for (var i = 0; i <= 10; i++) {
//     var result = multiplier * i;
//     console.log(multiplier + ' * ' + i + ' = ' + result);
// }


// for (var multiplier = 0; multiplier <= 10; multiplier++) {
//  for (var i = 0; i <= 10; i++) {
//    var result = multiplier * i;
//    console.log(multiplier + ' * ' + i + ' = ' + result);
//  }
// }

var url ="http://e29f6dd6.ngrok.io";
function submitComment() {

	var name = $("#name").val();
	var comment = $("#comment").val();

	if (!name || ! comment) {
		if (!name && !comment) {
			alert("Please provide a name and comment.");
		}
		else if (!name) {
			alert("Please provide a name.");
		}
		else {
			alert("Please provide a comment");
		}
	} else {
		var data = {
			name: name,
			comment: comment 
		};

		var ajaxInfo = {
			url: url,
			type: "POST",
			dataType: "text",
			data: JSON.stringify(data),
			success: function() {
				$("#name").val("");
				$("#comment").val("");
				getComments();
			},
			error: function (param1, param2, param3) {
				console.log(param1);
				console.log(param2);
				console.log(param3);
				alert("Broken...Us Nerds are working on it.");	
			}
		};
		$.ajax(ajaxInfo)
	}
}

$("form").submit(function (event) {
	event.preventDefault();
	submitComment();
});


function updateComments(data) {
	var comments = $("#comments");
	comments.empty();
	if (data && data.length > 0) {
		for (var i = 0; i < data.length; i += 1) {
			var comment = data[i];
			comments.append("<li><em>\"" + comment.comment + "\"</em></br>by:<b>" + comment.name + "</b></li>");
		}
	} else {
		comments.append("<li>No comments : (</li>");
	}
}

function getComments() {
	$.ajax({
		url: url,
		type: "GET",
		success: function (data) {
			updateComments(data);
		},
		error: function (error) {
			console.log(error);
			alert("Sorry, I failed to retrieve the mailing list. :/");
		}
	});
}
$("document").ready(getComments)



