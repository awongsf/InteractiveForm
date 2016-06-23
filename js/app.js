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
		$("#color > option:nth-child(1), #color > option:nth-child(2), #color > option:nth-child(3)").show();
		$("#color > option:nth-child(4), #color > option:nth-child(5), #color > option:nth-child(6)").hide();
	}
	if ($(this).val() === "heart js") {
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
	} else {
		$(".activities > label > input:not(:checked)").prop("disabled", false);
	}
});

jsFrameworks.change(function () {
	if ($(this).prop("checked")) {
		express.prop("disabled", true);
	} else {
		express.prop("disabled", false);
	}
});

jsLibraries.change(function () {
	if ($(this).prop("checked")) {
		nodeJS.prop("disabled", true);
	} else {
		nodeJS.prop("disabled", false);
	}
});

express.change(function () {
	if ($(this).prop("checked")) {
		jsFrameworks.prop("disabled", true);
	} else {
		jsFrameworks.prop("disabled", false);
	}
});

nodeJS.change(function () {
	if ($(this).prop("checked")) {
		jsLibraries.prop("disabled", true);
	} else {
		jsLibraries.prop("disabled", false);
	}
});


















