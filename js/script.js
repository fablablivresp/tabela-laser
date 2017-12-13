var info_shown = false;

var data = {
	exemplo01 : {
		nome : "MDF (Medium Density Fiberboard)",
		permitido : "no",
		justificativa : "A máquina de corte a laser é um ferramenta rica em possibilidades criativas, mas também requer cuidados particulares."
	},

	exemplo02 : {
		nome : "COMPENSADO",
		permitido : "yes",
		justificativa : "A máquina de corte a laser é um ferramenta rica em possibilidades criativas, mas também requer cuidados particulares."
	}
}

$(document).on('click', '.justification', function() {
	info_shown = true;

	$("body").append("<div id='bg_justification'></div>");
	$("#bg_justification").append("<div id='box_justification'>OPA</div>");
	$("#box_justification").append("<div id='close_justification'>FECHAR</div>");
	$("#bg_justification").height($(document).height());

	$("#bg_justification").animate({ opacity: 1 }, "slow");
	$("#box_justification").animate({ opacity: 1 }, "slow");
	$("#close_justification").animate({ opacity: 1 }, "slow");
});

$(document).on('click', '#bg_justification', function() {
	
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

});

$(document).ready(function(){
  criaTabela();
  criaCabecalhoTabela();
  criaCelulasTabela();
});

function criaTabela() {
	$("#infotable").append("<div class='divTable'></div>");
	$(".divTable").append("<div class='divTableBody'></div>");
}

function criaCabecalhoTabela() {
	$(".divTableBody").append("<div id='header' class='divTableRow'></div>");
	$("#header").append("<div class='divTableCell divTableHeading column01'>Material</div>");
	$("#header").append("<div class='divTableCell divTableHeading column02'>Pode cortar?</div>");
	$("#header").append("<div class='divTableCell divTableHeading column03'>Por quê?</div>");
}

function criaCelulasTabela() {
	how_many_keys = Object.keys(data).length;
	counter = 1;

	for (var key in data) {
		$(".divTableBody").append("<div id='row" + counter + "' class='divTableRow'></div>");

		$("#row" + counter).append("<div class='divTableCell column01'>" + data[key].nome + "</div>");
		$("#row" + counter).append("<div class='divTableCell column02 " + data[key].permitido + "'>" + loadPermission(data[key].permitido) + "</div>");
		$("#row" + counter).append("<div class='divTableCell column03 justification'>+</div>");

		counter = counter + 1;
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