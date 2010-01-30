/*
---
description:     
  - MultiSelect is a MooTools plugin that turns your checkbox set into one single multi-select dropdown menu. MultiSelect is also completely CSS skinnable.

authors:
  - Blaž Maležič (http://twitter.com/blazmalezic)

license:
  - MIT-style license

requires:
  core/1.2.1:   '*'

provides:
  - MultiSelect
...
*/
var MultiSelect = new Class({
	
	Implements: [Options], 
	
	options: {
		boxes: 'input[type=checkbox]', 	// checkbox selector
		labels: 'label', 				// label selector
		monitorText: ' selected',		// monitor text (localization)
		containerClass: 'MultiSelect', 	// element container CSS class
		monitorClass: 'monitor',		// monitor CSS class
		monitorActiveClass: 'active',	// monitor open CSS class
		itemSelectedClass: 'selected'	// list item selected CSS class
	}, 
	
	initialize: function(selector, options) {
		
		// set options
		this.setOptions(options);
		
		// set global action variables
		this.active = false;
		this.action = 'closed';
		
		// get elements array
		this.elements = document.getElements(selector);
		
		// off we go...
		this.elements.each(function(element) {
			this.buildMenu(element);
		}, this);
		
	},
	
	buildMenu: function(element) {
		
		// create closure
		var self = this;
		
		// add container class (for styling)
		element.addClass(self.options.containerClass);
		
		// create item instances
		var boxes = element.getElements(self.options.boxes);
		var labels = element.getElements(self.options.labels);
		
		// list container
		var list = new Element('ul', {
			'styles': { display: 'none' },
			'events': {
				'mouseleave': function() { self.action = 'close'; },
				'mouseenter': function() { self.action = 'open'; }, 
				
				'mousedown': function(e) { e.stop(); }, // stop text selection
				'selectstart': function() { return false; } // stop IE text selection
			}
		});
		// list items
		boxes.each(function(box, i) {
			box.addEvent('click', function(e) {
				e.stop();
			});
			var label = labels[i];
			new Element('li', {
				'class': box.get('checked') ? self.options.itemSelectedClass : '',
				'events': {
					'mouseenter': function() {
						if (self.active === true) 
							self.changeItemState(this, box, monitor);
					},
					'mousedown': function() {
						self.active = true;
						self.changeItemState(this, box, monitor);
					}
				}
			}).adopt([box, label]).inject(list);
		});
		// list monitor
		var monitor = new Element('div', {
			'class': self.options.monitorClass,
			'html': '<div><div>' + self.changeMonitorValue(list) + '</div></div>',
			'events': {
				'mouseleave': function() { self.action = 'close'; },
				'mouseenter': function() { self.action = 'open'; }, 
				'click': function() { 
					// close all other MultiSelect menus
					self.elements.getElement('ul').setStyle('display', 'none');
					
					if (this.hasClass(self.options.monitorActiveClass)) {
						this.removeClass(self.options.monitorActiveClass);
						list.setStyle('display', 'none'); 
					}
					else {
						this.addClass(self.options.monitorActiveClass);
						list.setStyle('display', '');
					}
					
					if (list.getScrollSize().y > (list.getStyle('max-height').toInt() ? list.getStyle('max-height').toInt() : list.getStyle('height').toInt()))
						list.setStyle('overflow-y', 'scroll');
				},
				
				'mousedown': function(e) { e.stop(); }, // stop text selection
				'selectstart': function() { return false; } // stop IE text selection
			}
		});
		
		// 'global' events
		document.addEvents({
			'mouseup': function() { self.active = false; },
			'click': function() {
				if (self.action == 'close') {
					monitor.removeClass(self.options.monitorActiveClass);
					
					// close all MultiSelect menus
					self.elements.getElement('div').removeClass(self.options.monitorActiveClass);
					self.elements.getElement('ul').setStyle('display', 'none');
					
					self.action = 'open';
				}
			}
		});
		
		// replace element content
		element.empty().adopt([monitor, list]);
	}, 
	
	append: function(selector) {
		
		var elements = document.getElements(selector);
		this.elements.combine(elements);
		
		elements.each(function(element) {
			this.buildMenu(element);
		}, this);
		
	}, 
	
	changeItemState: function(item, checkbox, monitor) {
		if (item.hasClass(this.options.itemSelectedClass)) {
			item.removeClass(this.options.itemSelectedClass);
			checkbox.set('checked', false);
		}
		else {
			item.addClass(this.options.itemSelectedClass);
			checkbox.set('checked', true);
		}
		
		monitor.set('html', '<div><div>' + this.changeMonitorValue(item.getParent()) + '</div></div>');
	}, 
	
	changeMonitorValue: function(list) {
		var text = list.getElements(this.options.boxes).filter(function(box) {
			return box.get('checked');
		}).length + this.options.monitorText;
		
		return text;
	}
});