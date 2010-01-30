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
var MultiSelect=new Class({Implements:[Options],options:{boxes:"input[type=checkbox]",labels:"label",monitorText:" selected",containerClass:"MultiSelect",monitorClass:"monitor",monitorActiveClass:"active",itemSelectedClass:"selected"},initialize:function(a,b){this.setOptions(b);this.active=false;this.action="closed";this.elements=document.getElements(a);this.elements.each(function(c){this.buildMenu(c)},this)},buildMenu:function(d){var b=this;d.addClass(b.options.containerClass);var c=d.getElements(b.options.boxes);var f=d.getElements(b.options.labels);var e=new Element("ul",{styles:{display:"none"},events:{mouseleave:function(){b.action="close"},mouseenter:function(){b.action="open"},mousedown:function(g){g.stop()},selectstart:function(){return false}}});c.each(function(j,h){j.addEvent("click",function(i){i.stop()});var g=f[h];new Element("li",{"class":j.get("checked")?b.options.itemSelectedClass:"",events:{mouseenter:function(){if(b.active===true){b.changeItemState(this,j,a)}},mousedown:function(){b.active=true;b.changeItemState(this,j,a)}}}).adopt([j,g]).inject(e)});var a=new Element("div",{"class":b.options.monitorClass,html:"<div><div>"+b.changeMonitorValue(e)+"</div></div>",events:{mouseleave:function(){b.action="close"},mouseenter:function(){b.action="open"},click:function(){b.elements.getElement("ul").setStyle("display","none");if(this.hasClass(b.options.monitorActiveClass)){this.removeClass(b.options.monitorActiveClass);e.setStyle("display","none")}else{this.addClass(b.options.monitorActiveClass);e.setStyle("display","")}if(e.getScrollSize().y>(e.getStyle("max-height").toInt()?e.getStyle("max-height").toInt():e.getStyle("height").toInt())){e.setStyle("overflow-y","scroll")}},mousedown:function(g){g.stop()},selectstart:function(){return false}}});document.addEvents({mouseup:function(){b.active=false},click:function(){if(b.action=="close"){a.removeClass(b.options.monitorActiveClass);b.elements.getElement("div").removeClass(b.options.monitorActiveClass);b.elements.getElement("ul").setStyle("display","none");b.action="open"}}});d.empty().adopt([a,e])},append:function(a){var b=document.getElements(a);this.elements.combine(b);b.each(function(c){this.buildMenu(c)},this)},changeItemState:function(b,c,a){if(b.hasClass(this.options.itemSelectedClass)){b.removeClass(this.options.itemSelectedClass);c.set("checked",false)}else{b.addClass(this.options.itemSelectedClass);c.set("checked",true)}a.set("html","<div><div>"+this.changeMonitorValue(b.getParent())+"</div></div>")},changeMonitorValue:function(a){var b=a.getElements(this.options.boxes).filter(function(c){return c.get("checked")}).length+this.options.monitorText;return b}});