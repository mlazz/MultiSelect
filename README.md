MultiSelect
===============

MultiSelect is a MooTools plugin that turns your checkbox set into one single multi-select dropdown menu. MultiSelect is also completely CSS skinnable.

![Screenshot](http://users.skavt.net/bmalezic/MultiSelect/screenshot.png)

How to use
----------

First include MultiSelect javascript file in the head of your document.

	#HTML
	<script src="Source/MultiSelect.js" type="text/javascript"></script>

In the body of the document wrap your set of checkboxes within div tag (Div CSS class is required, but can be anything you want. This is the selector used to initialize MultiSelect).

	#HTML
	<div class="MultiSelect">
		<input type="checkbox" id="box0" name="box[]" value="0" checked="checked" /> <label for="box0">MooTools FTW!</label>
		<input type="checkbox" id="box1" name="box[]" value="1" checked="checked" /> <label for="box1">Forge</label>
		<input type="checkbox" id="box2" name="box[]" value="2" checked="checked" /> <label for="box2">GitHub</label>
		<input type="checkbox" id="box3" name="box[]" value="3" checked="checked" /> <label for="box3">FireFox</label>
		<input type="checkbox" id="box4" name="box[]" value="4" checked="checked" /> <label for="box4">Safari</label>
		<input type="checkbox" id="box5" name="box[]" value="5" checked="checked" /> <label for="box5">Google Chrome</label>
		<input type="checkbox" id="box6" name="box[]" value="6" checked="checked" /> <label for="box6">Opera</label>
		<input type="checkbox" id="box7" name="box[]" value="7" checked="checked" /> <label for="box7">IE 6</label>
		<input type="checkbox" id="box8" name="box[]" value="8" checked="checked" /> <label for="box8">IE 7</label>
		<input type="checkbox" id="box9" name="box[]" value="9" checked="checked" /> <label for="box9">IE 8</label>
	</div>
	
	
Then add the following javascript

	#JS
	new myMultiSelect = new MultiSelect(".MultiSelect");
	
And you're done!	


## Class: MultiSelect ##
This plugin turns your checkbox set into one single multi-select dropdown menu - it actually moves your checkboxes into multi-select list so that your form is still working just as it was before. No server-side script modification needed!

You can also style MultiSelect the way you want with CSS provided with this plugin or just replace it with your own. CSS classes can be set with options, so you don't have to change your existing stylesheet.

### MultiSelect method: constructor ###

	#JS
	new MultiSelect(selector[, options]);

#### Arguments ####
1. selector - (*string*, *required*) CSS selector of the wrapper div
2. options - (*object*, optional) The MultiSelect options. See below

#### Options ####
1. boxes - (*string*: defaults to 'input[type=checkbox']) Checkbox selector
2. labels - (*string*: defauts to 'label') Label selector
3. monitorText - (*string*: defaults to ' selected') The text to be shown in the dropdown monitor
4. containerClass - (*string*: defaults to 'MultiSelect') CSS class (styling)
5. monitorClass - (*string*: defaults to 'monitor') CSS class (styling)
6. monitorActiveClass - (*string*: defaults to 'active') CSS class (styling)
7. itemSelectedClass: - (*string*: defaults to 'selected') CSS class (styling)

#### Returns ####

- (*MultiSelect*) - MultiSelect instance


### MultiSelect Method: append ###

Append another checkbox set to turn it into multi-select dropdown. Usefull if you have content added dinamically or if you want to include another checkbox set with different container CSS id/class.

#### Syntax ####
	
	#JS
	myMultiSelect.append(selector);
	
#### Arguments ####

1. selector - (*string*) - CSS selector of the container div

#### Example ####

	#HTML
	<div class="MultiSelect">
		<input type="checkbox" id="box0" name="box[]" value="0" checked="checked" /> <label for="box0">MooTools FTW!</label>
		<input type="checkbox" id="box1" name="box[]" value="1" checked="checked" /> <label for="box1">Forge</label>
		<input type="checkbox" id="box2" name="box[]" value="2" checked="checked" /> <label for="box2">GitHub</label>
		<input type="checkbox" id="box3" name="box[]" value="3" checked="checked" /> <label for="box3">FireFox</label>
		<input type="checkbox" id="box4" name="box[]" value="4" checked="checked" /> <label for="box4">Safari</label>
		<input type="checkbox" id="box5" name="box[]" value="5" checked="checked" /> <label for="box5">Google Chrome</label>
		<input type="checkbox" id="box6" name="box[]" value="6" checked="checked" /> <label for="box6">Opera</label>
		<input type="checkbox" id="box7" name="box[]" value="7" checked="checked" /> <label for="box7">IE 6</label>
		<input type="checkbox" id="box8" name="box[]" value="8" checked="checked" /> <label for="box8">IE 7</label>
		<input type="checkbox" id="box9" name="box[]" value="9" checked="checked" /> <label for="box9">IE 8</label>
	</div>
	<div class="anotherCheckboxSet">
		<input type="checkbox" id="box0" name="box[]" value="0" checked="checked" /> <label for="box0">MooTools FTW!</label>
		<input type="checkbox" id="box1" name="box[]" value="1" checked="checked" /> <label for="box1">Forge</label>
		<input type="checkbox" id="box2" name="box[]" value="2" checked="checked" /> <label for="box2">GitHub</label>
		<input type="checkbox" id="box3" name="box[]" value="3" checked="checked" /> <label for="box3">FireFox</label>
		<input type="checkbox" id="box4" name="box[]" value="4" checked="checked" /> <label for="box4">Safari</label>
		<input type="checkbox" id="box5" name="box[]" value="5" checked="checked" /> <label for="box5">Google Chrome</label>
		<input type="checkbox" id="box6" name="box[]" value="6" checked="checked" /> <label for="box6">Opera</label>
		<input type="checkbox" id="box7" name="box[]" value="7" checked="checked" /> <label for="box7">IE 6</label>
		<input type="checkbox" id="box8" name="box[]" value="8" checked="checked" /> <label for="box8">IE 7</label>
		<input type="checkbox" id="box9" name="box[]" value="9" checked="checked" /> <label for="box9">IE 8</label>
	</div>
	<a id="append" href="#">Append another set</a>

	#JS
	var myMultiSelect = new MultiSelect('.MultiSelect');
	document.id('append').addEvent('click', function(e) {
		e.stop();
		myMultiSelect.append('.anotherCheckboxSet');
	});