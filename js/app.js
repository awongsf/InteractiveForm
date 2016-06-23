/* ===================
  	  Javascript
====================== */

// When the page loads, give focus to the first text field
$(document).ready(function () {
	$("input:text")[0].focus();
});

/*
Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
*/
$("form > fieldset:nth-child(1)").append("<input type='text' id='other-title' placeholder='Your Title'>");
$("#other-title").hide();

$("#title").change(function () {
	if ($(this).val() === "other") {
		$("#other-title").show();
	} else {
		$("#other-title").hide();
	}
});

/*
For the T-Shirt color menu, only display the options that match the design selected in the "Design" menu.
If the user selects "Theme - JS Puns" 
	then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
If the user selects "Theme - I ♥ JS" 
	then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
*/
$("#design").change(function () {
	if ($(this).val() === "js puns") {
		$("#color").val("cornflowerblue");
		$("#color > option:nth-child(1), #color > option:nth-child(2), #color > option:nth-child(3)").show();
		$("#color > option:nth-child(4), #color > option:nth-child(5), #color > option:nth-child(6)").hide();
	}
	if ($(this).val() === "heart js") {
		$("#color").val("tomato");
		$("#color > option:nth-child(1), #color > option:nth-child(2), #color > option:nth-child(3)").hide();
		$("#color > option:nth-child(4), #color > option:nth-child(5), #color > option:nth-child(6)").show();
	}
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

var mainConference = $("input[name='all']");
var jsFrameworks = $("input[name='js-frameworks'");
var jsLibraries = $("input[name='js-libs']");
var express = $("input[name='express']");
var nodeJS = $("input[name='node']");

mainConference.change(function () {
	if ($(this).prop("checked")) {
		$(".activities > label > input:not(:checked)").prop("disabled", true);
		$(".activities > label > input:not(:checked)").parent().addClass("label-disabled");
	} else {
		$(".activities > label > input:not(:checked)").prop("disabled", false);
		$(".activities > label > input:not(:checked)").parent().removeClass("label-disabled");
	}
});

jsFrameworks.change(function () {
	if ($(this).prop("checked")) {
		express.prop("disabled", true);
		express.parent().addClass("label-disabled");
	} else {
		express.prop("disabled", false);
		express.parent().removeClass("label-disabled");
	}
});

jsLibraries.change(function () {
	if ($(this).prop("checked")) {
		nodeJS.prop("disabled", true);
		nodeJS.parent().addClass("label-disabled");
	} else {
		nodeJS.prop("disabled", false);
		nodeJS.parent().removeClass("label-disabled");
	}
});

express.change(function () {
	if ($(this).prop("checked")) {
		jsFrameworks.prop("disabled", true);
		jsFrameworks.parent().addClass("label-disabled");
	} else {
		jsFrameworks.prop("disabled", false);
		jsFrameworks.parent().removeClass("label-disabled");
	}
});

nodeJS.change(function () {
	if ($(this).prop("checked")) {
		jsLibraries.prop("disabled", true);
		jsLibraries.parent().addClass("label-disabled");
	} else {
		jsLibraries.prop("disabled", false);
		jsLibraries.parent().removeClass("label-disabled");
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














