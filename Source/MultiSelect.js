/*
---
description:     MultiSelect

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
	
	// Implement
	Implements: [Options], 
	
	// Options
	options: {
		containerId: 'MultiSelect', 
		boxes: 'input[type=checkbox]', 
		labels: 'label', 
		monitorClass: 'monitor',
		monitorActiveClass: 'active',
		monitorText: ' selected',
		itemSelectedClass: 'selected'
	}, 
	
	// intialization
	initialize: function(options) {
		
		// set options
		this.setOptions(options);
		
		// create container element instance
		this.element = document.id(this.options.containerId);
		
		// create item instances
		this.boxes = this.element.getElements(this.options.boxes);
		this.labels = this.element.getElements(this.options.labels);
		
		// set action variables
		this.active = false;
		this.close = true;
		
		// of we go...
		this.build();
	},
	
	build: function() {
		
		// create closure
		var self = this;
		
		var monitor = new Element('div', {
			'class': self.options.monitorClass,
			'text': self.changeMonitorValue(),
			'events': {
				'mouseleave': function() { self.close = true; },
				'mouseenter': function() { self.close = false; }, 
				'click': function() { self.close = self.element.getElement('ul').getStyle('display') == 'none' ? false : true; },
				
				'mousedown': function(e) { e.stop(); }, // stop text selection
				'selectstart': function() { return false; } // stop IE text selection
			}
		});
		
		var list = new Element('ul', {
			'styles': { display: 'none' },
			'events': {
				'mouseleave': function() { self.close = true; },
				'mouseenter': function() { self.close = false; }, 
				
				'mousedown': function(e) { e.stop(); }, // stop text selection
				'selectstart': function() { return false; } // stop IE text selection
			}
		});
		
		// parse checkboxes
		self.boxes.each(function(box, i) {
			box.addEvent('click', function(e) {
				e.stop();
			});
			var label = self.labels[i];
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
		
		// add open / close events
		document.addEvents({
			'mouseup': function() { self.active = false; },
			'click': function() {
				if (self.close) {
					monitor.removeClass(self.options.monitorActiveClass);
					list.setStyle('display', 'none');
				}
				else {
					monitor.addClass(self.options.monitorActiveClass);
					list.setStyle('display', '');
					
					if (list.getScrollSize().y > (list.getStyle('max-height').toInt() ? list.getStyle('max-height').toInt() : list.getStyle('height').toInt()))
						list.setStyle('overflow-y', 'scroll');
				}
			}
		});
		
		// insert new select list
		self.element.empty();
		self.element.adopt([monitor, list]);
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
		
		monitor.set('text', this.changeMonitorValue());
	}, 
	
	changeMonitorValue: function() {
		var text = this.boxes.filter(function(box) {
			return box.get('checked');
		}).length + this.options.monitorText;
		
		return text;
	}
});