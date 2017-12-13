var info_shown = false;

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