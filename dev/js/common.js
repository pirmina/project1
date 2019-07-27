// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];
		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

!function($) {
	'use strict';
	//$(function(){
	//	initUI.setup();
	//});
	window.initUI = (function(){
		var isLoaded;
		function setup(){
			if(isLoaded){
				return;
			}
			isLoaded = true;
			registUI('#header .util_area a.static_logout', loginLayer, false);
		}
		function registUI(el, fn, saveData){
			if(saveData === undefined){
				saveData = true;
			}
			var _inst;
			$(el).each(function(idx, obj){
				_inst = new fn();
				_inst.init(obj, el);
				if(saveData){
					$(el).data('_inst', _inst);
				}
			});
		}
		return {
			setup: setup
		};
	})();//initUI
	var loginLayer = function(){
		var el;
		function init(_el){
			el = $(_el);
			bindEvents();
			return this;
		}
		function bindEvents(){
			el.on('click', function(e){
				if($(this).parent().find('.layer_pop').length > 0) var _layer = $(this).parent().find('.layer_pop').attr('tabindex','0');
				else return;
				var _dimmed = {
					'obj' : $('.dimmed:last'),
					'opacity' : $('.dimmed:last').css('opacity')
				};
				_dimmed.obj.css({
					'display' : 'block',
					'opacity' : 0
				}).animate({
					'opacity' : _dimmed.opacity
				}, 100, function() {
					_layer.css({
						'display' : 'block',
						'opacity' : 0,
						'top' : 10
					}).animate({
						'opacity' : 1,
						'top' : 27
					}, 300, function() {
						$(this).find('input:first').focus();
					}).bind('focusin', function() {
						_layer.stop();
						_dimmed.obj.stop();
					}).bind('focusout', function(e) {
						close();
					});
					_dimmed.obj.bind('click', function() {
						close();
						el.focus();//포커스 이동
						return false;
					});
				});
				function close() {
					_layer.stop().animate({
						'opacity' : 0,
						'top' : 10
					}, 100, function() {
						$(this).removeAttr('style');
						_dimmed.obj.stop().animate({
							'opacity' : 0
						}, 100, function() {
							$(this).removeAttr('style');
							$(this).unbind('click');
						});
					});
				}
				return false;
			});//el.click
		}
		return {
			init: init
		};
	}//loginLayer
}(jQuery);
/* //JS */