MultiSelect
===============

MultiSelect is a MooTools plugin that turns your checkbox set into one single multi-select dropdown menu. MultiSelect is also completely CSS skinnable.


## Class: MultiSelect ##
This plugin turns your checkbox set into one single multi-select dropdown menu - it actually moves your checkboxes into multi-select list so that your form is still working just as it was before. No server-side script modification needed!

You can also style MultiSelect the way you want with provided CSS or just replace it with your own. CSS classes can be set via options, so you don't have to change your existing stylesheet.

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
8. itemHoverClass: - (*string*: default to 'hover') CSS class (styling)

#### Returns ####

- (*MultiSelect*) - MultiSelect instance


### MultiSelect Method: append ###

Append another checkbox set to turn it into multi-select dropdown. Usefull if you have content added dinamically or if you want to include another checkbox set with different wrapper CSS id/class.

#### Syntax ####
	
	#JS
	myMultiSelect.append(selector);
	
#### Arguments ####

1. selector - (*string*) - CSS selector of the wrapper div

## Changelog ##
### 1.3 ###
- partial code rewrite
- added keyboard navigation support

### 1.2 ###
- added win/mac style images
- CSS enhancements

### 1.0 ###
- initial release