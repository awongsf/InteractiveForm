/* ===================
  	  Javascript
====================== */

// When the page loads, give focus to the first text field
// $(document).ready(function () {
// 	$("input:text")[0].focus();

// 	$("select").addClass("turnintodropdown");


	
// 	setTimeout(function() {
// 		$("#payment ~ a").text("Credit Card");
// 		$("#payment").val("credit card");
//     }, 400);

// });

$("input:text")[0].focus();

$("select").addClass("turnintodropdown");
	
setTimeout(function() {
	$("#payment ~ a").text("Credit Card");
	$("#payment").val("credit card");
}, 400);

/*
Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
*/
$("form > fieldset:nth-child(1)").append("<input type='text' id='other-title' placeholder='Your Title'>");
$("#other-title").hide();

$("body").on("click", "#title ~ .dropcontainer > ul > li:last-child", function (){
	$("#other-title").show();
});

$("body").on("click", "#title ~ .dropcontainer > ul > li:not(:last-child)", function (){
	$("#other-title").hide();
});

/*
For the T-Shirt color menu, only display the options that match the design selected in the "Design" menu.
If the user selects "Theme - JS Puns" 
	then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
If the user selects "Theme - I ♥ JS" 
	then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
*/

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

/*
Some events are at the same time as others. 
If the user selects a workshop, don't allow selection of a workshop at the same date and 
time -- you should disable the checkbox and visually indicate that the workshop in the 
competing time slot isn't available.
	When a user unchecks an activity, make sure that competing activities (if there are any)
	are no longer disabled.
As a user selects activities to register for, a running total is listed below the list of 
checkboxes. For example, if the user selects "Main conference" then Total: $200 should appear. 
If they add 1 workshop the total should change to Total: $300. 
*/

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

/* Payment Info section of the form. 

Display payment sections based on chosen payment option

	The "Credit Card" payment option should be selected by default and result in the display of the
	#credit-card div, and hide the "Paypal" and "Bitcoin information.
	
	When a user selects the "PayPal" payment option, display the Paypal information, and hide the 
	credit card information and the "Bitcoin" information.
	
	When a user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the 
	credit card information.
*/

$("#credit-card").next().attr("id", "paypal");
$("#paypal").next().attr("id", "bitcoin");

$("#paypal").hide();
$("#bitcoin").hide();

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

/* Form validation. 

Display error messages and don't let the user submit the form if any of these validation errors exist:
	
	Name field can't be empty
	
	Email field must be a validly formatted e-mail address (you don't have to check that it's a real 
	e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example. 
	You'll need to use a regular expression to get this requirement. See the list of Resources 
	for links to learn about regular expressions.

	At least one activity must be checked from the list under "Register for Actitivities."

	Payment option must be selected.

	If "Credit card" is the selected payment option, make sure the user supplied a credit card number, 
	a zip code, and a 3 number CVV value.
*/

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

// Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.

$("#colors-js-puns").hide();

// Style the "select" menus (drop down menus) on the form, so they match the styling of the text fields 
// (see Resources links for an article on how to improve the look of select menus using CSS and JavaScript).


// Validate the credit card number so that it's a validly formatted credit card number. 
// (see the Resources links for information on how to do this.)

$("#exp-month").wrap("<div id='expiry'></div>");
$("#exp-year").wrap("<div id='expiry'></div>");
$("#title").wrap("<div id='job'></div>");
$("#other-title").wrap("<div id='job'></div>");

	
