var info_shown = false;

var data; 

$(document).ready(function(){
	
	loadJSONfile(function(response){

		data = JSON.parse(response);
		var sorted_keys = sortDataByName();

		createTable();
		createTableHeader();
		createTableCells(sorted_keys);
	});

});

function loadJSONfile(callback) {

	var request = new XMLHttpRequest();
	request.overrideMimeType("application/json");
	request.open('GET', 'data.json', true);
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			callback(request.responseText);
		}
	}

	request.send(null);
}

function sortDataByName() {
	var keys = [];

	for (var key in data) {
		keys.push(key);
	}
	return keys.sort();
}

function createTable() {
	$("#infotable").append("<div class='divTable'></div>");
	$(".divTable").append("<div class='divTableBody'></div>");
}

function createTableHeader() {
	$(".divTableBody").append("<div id='header' class='divTableRow'></div>");
	$("#header").append("<div class='divTableCell divTableHeading column01'>Material</div>");
	$("#header").append("<div class='divTableCell divTableHeading column02'>Pode cortar?</div>");
	$("#header").append("<div class='divTableCell divTableHeading column03'>Por quê?</div>");
}

function createTableCells(keys) {
	counter = 1;

	for (var index in keys) {
		
		$(".divTableBody").append("<div id='row" + counter + "' class='divTableRow'></div>");

		$("#row" + counter).append("<div class='divTableCell column01'>" + data[keys[index]].name + "</div>");
		$("#row" + counter).append("<div class='divTableCell column02 " + data[keys[index]].permission + "'>" + loadPermission(data[keys[index]].permission) + "</div>");
		$("#row" + counter).append("<div id='button_" + keys[index] + "' class='divTableCell column03 justification'>+</div>");

		counter = counter + 1;
	}
}

function removeTable() {
	if (info_shown) {
		info_shown = false;

		$("#close_justification").animate({ opacity: 0 }, "slow");
		$("#box_justification").animate({ opacity: 0 }, "slow");

		$.when($("#bg_justification").animate({opacity : 0}, "slow")).then(function() {
			$("#bg_justification").remove();
			$("#box_justification").remove();
			$("#close_justification").remove();
		});
	}
}

function loadPermission(key) {
	if (key == "yes") {
		return "SIM"
	}
	else if (key == "no") {
		return "NÃO"
	}
	else {
		return "SEM INFO"
	}
}

$(document).on('click', '#bg_justification', function() {
	removeTable();
});

$(document).on('click', '.justification', function(e) {
	info_shown = true;
	key = e.currentTarget.id.split("_")[1];
	
	$("body").append("<div id='bg_justification'></div>");

	if (data[key].permission == "yes") {
		$("#bg_justification").addClass("bg_justification_yes");

	} else {
		$("#bg_justification").addClass("bg_justification_no");
	}

	$("#bg_justification").append("<div id='box_justification'><p>" + data[key].name + "</p><p>" + data[key].why + "</p></div>");
	$("#box_justification").append("<div id='close_justification'>FECHAR</div>");
	$("#bg_justification").height($(document).height());

	$("#bg_justification").animate({ opacity: 1 }, "slow");
	$("#box_justification").animate({ opacity: 1 }, "slow");
	$("#close_justification").animate({ opacity: 1 }, "slow");
});

$(document).keyup(function(e) {
     if (e.keyCode == 27 || e.keyCode == 13) { 
     	removeTable();
    }
});