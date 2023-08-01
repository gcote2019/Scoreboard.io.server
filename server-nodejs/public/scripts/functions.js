function do_guest_score(obj, element) {
	try {
		element.innerHTML = obj.guestScore;
	} catch (error) {
	}
} 

function do_home_score(obj, element) {
	try {
		element.innerHTML = obj.homeScore;
	} catch (error) {
	}
} 

function do_guest_name(obj, element) {
	try {
		element.innerHTML = obj.guestName;
	} catch (error) {
	}
} 

function do_home_name(obj, element) {
	try {
		element.innerHTML = obj.homeName;
	} catch (error) {
	}
} 

function do_period(obj, element) {
	try {
		element.innerHTML = obj.period;
	} catch (error) {
	}
} 

function do_remaining_time(obj, element) {
	try {
		element.innerHTML = obj.remainingTime;
	} catch (error) {
	}
} 

function do_title(obj, element) {
	try {
		element.innerHTML = obj.title;
	} catch (error) {
	}
} 

function do_scoreboard() {
	let socket = io();
	let guestName = "guestName";
	let homeName = "homeName";
	let guestScore = "guestScore";
	let homeScore = "homeScore";
	let period = "period";
	let remainingTime = "remainingTime";
	let messages = "messages";
	let elementGuestName = document.getElementById(guestName);
	let elementHomeName = document.getElementById(homeName);
	let elementGuestScore = document.getElementById(guestScore);
	let elementHomeScore = document.getElementById(homeScore);
	let elementPeriod = document.getElementById(period);
	let elementRemainingTime = document.getElementById(remainingTime);
	let elementMessages = document.getElementById(messages);
	let elementTitle = document.getElementById("title");

	socket.on('game update', function(msg) {
		var obj = JSON.parse(msg)
		do_guest_name(obj, elementGuestName);
		do_home_name(obj, elementHomeName);
		do_guest_score(obj, elementGuestScore);
		do_home_score(obj, elementHomeScore);
		do_period(obj, elementPeriod);
		do_remaining_time(obj, elementRemainingTime);
		//do_title(obj, elementTitle);
	});

	socket.on('game over', function(msg) {
		try {
			var array = JSON.parse(msg)
			var result = "";
			for (let i = 0; i < array.length; i++) {
				var obj = JSON.parse(array[i]);
				result += /*obj.gameInfo + " " + */ obj.guestName + ": " + obj.guestScore + " " + obj.homeName + ": " + obj.homeScore + "</br>"; 
			}
			elementMessages.innerHTML = result;
		} catch (error) {
			console.log("game over error");
		}
	});

	socket.on('clear results', function(msg) {
		try {
			elementMessages.innerHTML = "";
		} catch (error) {
			console.log("clear results");
		}
	});
}
