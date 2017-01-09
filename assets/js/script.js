

$(document).ready(function() {
$('body').html(`
	<input class = "input form-control"  placeholder="Looking for...." type='text'  id='search-for'>
    <button type='button' class= " btn btn-success"  id='search-button'>Search</button>
  	<button type='button' class = " btn  btn-success" id='clear'>Clear Page</button>
  	<div id='searchButtons'></div>
  	<section id='frame'><section>`); 
//adding out html content here

//Declare our array of topics
var subject = ["Cats", "Create", "World"];
//input field catch
var searchItem = $('#search-for');
//boolean to trigger adding category or not
var tempBoolean = false;
var lookingFor;
var randomPicturesIndexes = []; // for fun! to create random index of pictures
var randomIndex;
var stringToCapitalize;
addDefault(); // adding our buttons from default array
//-----------------------------------------------------
// $(".infoPic").on('click', function() {
// 	console.log("I was clicked")
// 	console.log($(this).data('name'));

// 	responsiveVoice.speak(`You picked category of  ${$(this).data('name')}`);

// });
//-----------------------------------------------------

//some nouse over animations
$("#clear").mouseover(function() {
$(this).addClass('ShakeAnimation btn-danger');
});
$("#clear").mouseout(function() {
$(this).removeClass('ShakeAnimation btn-danger');
});
						
$("#search-button").mouseover(function() {
$(this).addClass('ShakeAnimation');
});
$("#search-button").mouseout(function() {
$(this).removeClass('ShakeAnimation');
});

//on click on input field once
$(document).one("click", ".input", function() {


responsiveVoice.speak(`Write something here! And press search button!`);

});



//clicking on toopick fires and adds pictures
$(document).on("click", ".infoPic", function() {

	randomPicturesIndexes = [];
	responsiveVoice.speak(`Ten pictures of ${$(this).data('name')}?`);
	// console.log($(this).data('name'));
	$(this).addClass('clickButtonAnimate')
	lookingFor = $(this).data('name');
	// console.log(lookingFor)
	showMePictures(lookingFor);
});
//click on NOT animated picture makes it animated
$(document).on("mouseover", ".notMoving", function() {
	// console.log(this.src);
	// console.log($(this).data('id'));
	this.src = `https://media4.giphy.com/media/${$(this).data('id')}/giphy.gif`;
	$(this).removeClass('notMoving');
	$(this).addClass('moving');
	$(this).addClass('customcursor');


});
//click on animated picture makes it NOT  animated
$(document).on("mouseout", ".moving", function() {
	// console.log(this.src);
	// console.log($(this).data('id'));
	this.src = `https://media4.giphy.com/media/${$(this).data('id')}/giphy_s.gif`; // that _s does everything here
	$(this).removeClass('moving');
	$(this).addClass('notMoving');
	$(this).removeClass('customcursor');
});

function showMePictures(lookingFor) {

//-----------------------------------------------------
	//https://media4.giphy.com/media/bYI4evfBRimKA/giphy.gif
	// .data.images.original
	// .data.images.original_still
//-----------------------------------------------------

//main AJAX call
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + lookingFor + "/&api_key=dc6zaTOxFJmzC&limit=100";

	var pictures = [];
	var links = [];
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {

		console.log(response.data.length);
		do {
			randomIndex = Math.floor(Math.random() * response.data.length);
			console.log(randomIndex);
			randomPicturesIndexes.push(randomIndex);
			console.log(randomPicturesIndexes);
		} while (randomPicturesIndexes.length < 10); //generate 10 random nubers we use as an index of data pictures array


		for (p in randomPicturesIndexes) {
			//-----------------------------------------------------
			// console.log(response.data[bufferIndex]);
			// console.log(response.data[bufferIndex].id);
			// console.log(randomPicturesIndexes[p])
			//-----------------------------------------------------
			var bufferIndex = randomPicturesIndexes[p]; //index set

			console.log(`${response.data[bufferIndex].images.original_still.url}`); // pulling URL's for pictures and adding images
			$('#frame').append(`<img class="notMoving" src="${response.data[bufferIndex].images.original_still.url}" data-id="${response.data[bufferIndex].id}" height="150" width="150""> `);
			//-----------------------------------------------------
			// 	console.log(response.data[p].images.original_still.url);
			// 	console.log(response.data[p].images.original.url);
			//-----------------------------------------------------
		}



	});

}


			//beginnign function that adds images
function addDefault() {

	for (i in subject) {
		console.log(subject[i]);
		$('#searchButtons').append(`<button type = "button" class="infoPic btn btn-info" data-name = ${subject[i]} > ${subject[i]} </button>`);
	};

}
			//capitalize first letter in topck
String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
			
			//create button with topic
function addTheButton() {
	// console.log(searchItem.val());
	// console.log(subject);
	// str = str.replace(/\s/g, '')
	console.log(searchItem.val().capitalizeFirstLetter())
	stringToCapitalize = searchItem.val().capitalizeFirstLetter();

	$('#searchButtons').append(`<button type = "button" class="infoPic buttonIn btn btn-info" data-name = ${stringToCapitalize.replace(/\s/g, '')} > ${stringToCapitalize} </button>`);
	responsiveVoice.speak(`Adding Category of: ${stringToCapitalize}`);


}



		//adding topick with conditions if name match with previous or input enpty it will not do it, if it doesnt then it will
$("#search-button").on('click', function() {
						console.log(searchItem.val())
	for (i in subject) {
		tempBoolean = true;
		if ((searchItem.val().toLowerCase() === subject[i].toLowerCase()) || ((searchItem.val().toLowerCase() === ''))) {

			return responsiveVoice.speak(`Category exists or undefined`);

		} else {
			tempBoolean = false;

		}
	}
	if (tempBoolean == false) {
		subject.push(searchItem.val());
		console.log(subject);
		addTheButton();
	}

});

	//clear press will do something
$("#clear").on('click', function() {
	responsiveVoice.speak(`Oh no!! Page is clear! `);
	$('#frame').empty();

});

});
