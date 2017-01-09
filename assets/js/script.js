

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
var badwords =                                                                                                                                                  ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];
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


responsiveVoice.speak(`Write something here! And press enter or search button!`);

});

$("#search-for").keydown(function(e){

	    if (e.which == 13) {
        confBtn();
    }
    
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
			$('#frame').prepend(`<img class="notMoving" src="${response.data[bufferIndex].images.original_still.url}" data-id="${response.data[bufferIndex].id}" height="150" width="150""> `);
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
function confBtn() {

//bad word not adding
for ( j in badwords) {
	
	if (searchItem.val().toLowerCase() === badwords[j]) {

		return responsiveVoice.speak(`Bad Word not adding it! `);
	}
}


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

}






		//adding topick with conditions if name match with previous or input enpty it will not do it, if it doesnt then it will
$("#search-button").on('click', confBtn );

	//clear press will do something
$("#clear").on('click', function() {
	responsiveVoice.speak(`Oh no!! Page is clear! `);
	$('#frame').empty();

});

});
