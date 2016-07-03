// ON PAGE LOAD
// Give focus to the first text field, add class to style drop down menus, 
// hide 'other' field, hide color label, hide paypal and bitcoin text, 
// wrap drop down menus with div for styling, and set initial payment option 
// to be Credit Card

$("input:text")[0].focus();

$("select").addClass("turnintodropdown");

$("form > fieldset:nth-child(1)").append("<input type='text' id='other-title' placeholder='Your Title'>");
$("#other-title").hide();

$("#colors-js-puns").hide();

$("#credit-card").next().attr("id", "paypal");
$("#paypal").next().attr("id", "bitcoin");

$("#paypal").hide();
$("#bitcoin").hide();

$("#exp-month").wrap("<div id='expiry'></div>");
$("#exp-year").wrap("<div id='expiry'></div>");
$("#title").wrap("<div id='job'></div>");
$("#other-title").wrap("<div id='job'></div>");

// Wait for drop down styling to load
setTimeout(function() {
	$("#payment ~ a").text("Credit Card");
	$("#payment").val("credit card");
}, 400);

// JOB ROLE
// Reveal text field when "Other" option is selected from the "Job Role" drop down menu

$("body").on("click", "#title ~ .dropcontainer > ul > li:last-child", function (){
	$("#other-title").show();
});

$("body").on("click", "#title ~ .dropcontainer > ul > li:not(:last-child)", function (){
	$("#other-title").hide();
});

// T-SHIRT INFO
// If the user selects "Theme - JS Puns" 
// 	color menu only displays "Cornflower Blue," "Dark Slate Grey," and "Gold."
// If the user selects "Theme - I ♥ JS" 
// 	color menu only displays "Tomato," "Steel Blue," and "Dim Grey."


$("body").on("click", "#design ~ .dropcontainer > ul > li:nth-child(1)", function () {
	$("#colors-js-puns").hide();
});

$("body").on("click", "#design ~ .dropcontainer > ul > li:nth-child(2)", function () {
	$("#colors-js-puns").show();
	$("#color").val("cornflowerblue");
	$("#color ~ a").text("Cornflower Blue (JS Puns shirt only)");
	$("#color ~ .dropcontainer > ul > li:nth-child(-n+3)").show();
	$("#color ~ .dropcontainer > ul > li:nth-child(n+4").hide();
});

$("body").on("click", "#design ~ .dropcontainer > ul > li:nth-child(3)", function () {
	$("#colors-js-puns").show();
	$("#color").val("tomato");
	$("#color ~ a").text("Tomato (I ♥ JS shirt only)");
	$("#color ~ .dropcontainer > ul > li:nth-child(-n+3)").hide();
	$("#color ~ .dropcontainer > ul > li:nth-child(n+4").show();
});

// ACTIVITIES
// When user selects a workshop, turn workshop text in the competing time slot grey to show
// it isn't available and disable checkbox.
// When user unchecks activity, make competing timeslots active again.
// Each time user selects activities to register for, list a running total below the list of 
// checkboxes.

var jsFrameworks = $("input[name='js-frameworks'");
var jsLibraries = $("input[name='js-libs']");
var express = $("input[name='express']");
var nodeJS = $("input[name='node']");
var runningTotal = 0;
var showTotal = false;

var updateRunningTotal = function (cost) {
	runningTotal += cost;
	if (runningTotal > 0 && showTotal === false) {
		$(".activities").append("<p id='total'></p>");
		showTotal = true;
	}
	if (runningTotal === 0) {
		$(".activities > p").remove();
		showTotal = false;
	}
	document.getElementById("total").innerHTML = "Total: $" + runningTotal;
};

$("input[name='all']").change(function () {
	if ($(this).prop("checked")) {
		updateRunningTotal(200);
	} else {
		updateRunningTotal(-200);
	}
});

jsFrameworks.change(function () {
	if ($(this).prop("checked")) {
		express.prop("disabled", true);
		express.parent().addClass("label-disabled");
		updateRunningTotal(100);
	} else {
		express.prop("disabled", false);
		express.parent().removeClass("label-disabled");
		updateRunningTotal(-100);
	}
});

jsLibraries.change(function () {
	if ($(this).prop("checked")) {
		nodeJS.prop("disabled", true);
		nodeJS.parent().addClass("label-disabled");
		updateRunningTotal(100);
	} else {
		nodeJS.prop("disabled", false);
		nodeJS.parent().removeClass("label-disabled");
		updateRunningTotal(-100);
	}
});

express.change(function () {
	if ($(this).prop("checked")) {
		jsFrameworks.prop("disabled", true);
		jsFrameworks.parent().addClass("label-disabled");
		updateRunningTotal(100);
	} else {
		jsFrameworks.prop("disabled", false);
		jsFrameworks.parent().removeClass("label-disabled");
		updateRunningTotal(-100);
	}
});

nodeJS.change(function () {
	if ($(this).prop("checked")) {
		jsLibraries.prop("disabled", true);
		jsLibraries.parent().addClass("label-disabled");
		updateRunningTotal(100);
	} else {
		jsLibraries.prop("disabled", false);
		jsLibraries.parent().removeClass("label-disabled");
		updateRunningTotal(-100);
	}
});

$("input[name='build-tools']").change(function () {
	if ($(this).prop("checked")) {
		updateRunningTotal(100);
	} else {
		updateRunningTotal(-100);
	}
});

$("input[name='npm']").change(function () {
	if ($(this).prop("checked")) {
		updateRunningTotal(100);
	} else {
		updateRunningTotal(-100);
	}
});


// PAYMENT INFO
// Display payment sections based on chosen payment option

$("body").on("click", "#payment ~ .dropcontainer > ul > li:nth-child(1)", function (){

	$("#credit-card").hide();
	$("#paypal").hide();
	$("#bitcoin").hide();

});

$("body").on("click", "#payment ~ .dropcontainer > ul > li:nth-child(2)", function (){

	$("#credit-card").show();
	$("#paypal").hide();
	$("#bitcoin").hide();

});

$("body").on("click", "#payment ~ .dropcontainer > ul > li:nth-child(3)", function (){

	$("#credit-card").hide();
	$("#paypal").show();
	$("#bitcoin").hide();

});

$("body").on("click", "#payment ~ .dropcontainer > ul > li:nth-child(4)", function (){

	$("#credit-card").hide();
	$("#paypal").hide();
	$("#bitcoin").show();

});

// FORM VALIDATION
// Check for the following errors and display error message if neccessary:
// 		Name field can't be empty
// 		Email field must be validly formatted
// 		At least one activity must be checked
// 		A payment option must be selected.
// 		If "Credit card" is selected, credit card must be valid,
//		zip code and a 3 number CVV must be entered.

var errorMsg = "";
var emailInput = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
var creditCard = /\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b/g;
var zipCode = /^\d{5}(?:[-\s]\d{4})?$/;

$("form").prepend("<h3 id='error'></h3>");
$("#error").css("color", "red");
$("#error").hide();

$("form").submit(function (event) {
	
	event.preventDefault();

	if ($("#name").val() === "") {
		
		console.log("error!");
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMsg = "Please enter your name.";

	} else if (!emailInput.test($("#mail").val())) {
		
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMsg = "Please enter a valid email.";

	} else if ($(".activities > label > input:checked").length === 0) {

		$("html, body").animate({scrollTop: 0}, "slow");
		errorMsg = "Please select at least one activity.";

	} else if ($("#payment").val() === "credit card" && !creditCard.test($("#cc-num").val())) {

		$("html, body").animate({scrollTop: 0}, "slow");
		errorMsg = "Please enter a valid credit card number.";

	} else if ($("#payment").val() === "credit card" && !zipCode.test($("#zip").val())) {
	 
	 	$("html, body").animate({scrollTop: 0}, "slow");
	 	errorMsg = "Please enter your zip code.";

	} else if ($("#payment").val() === "credit card" && $("#cvv").val().length < 3) {

		$("html, body").animate({scrollTop: 0}, "slow");
		errorMsg = "Please enter a 3 number CVV value.";

	} else {
		
		errorMsg = "";

	}

	document.getElementById("error").innerHTML = errorMsg;
	$("#error").show();
			
});

	
