$(function(){
	//$(".code code").snippet("html");
	$('html').tmpl({
		data: 'assets/ptrns/ptrns.json',
		devmode : true
	});
	
})




jQuery.fn.tmpl = function() {
	$.Q = this
	$.Q.args = arguments[0] || {}
	
	init = function(){
		if($.Q.args.devmode){trace = function(m){console.log(m)}}
		else{trace=function(m){return}}
		trace('data file : '+$.Q.args.data)

		getdata = function(d){
			$.getJSON(d, function(data,status) {
				if (status != "success") {trace("Problem with JSON request");return;}
				trace('data loaded:')
			 	trace(data);
				$.Q.data = data
				getPatterns()
			});
		}
	}
	
	init()
	
	getdata(this.args.data)

	getPatterns = function(){
		trace('Setting Layouts')
		var data = $.Q.data;
		trace('data.length: '+data.length)
		trace('version: '+data[0].dev.version)
		trace('pattern: '+data[0].dev.base_pattern)
		
		$('.code textarea').attr('value', data[0].dev.base_pattern)
		var myCodeMirror = CodeMirror.fromTextArea('cview');
		
	}
	
	function htmlEncode(value){
	    if (value) {
	        return jQuery('<div />').text(value).html();
	    } else {
	        return '';
	    }
	}
};	



// Plugins

// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){log.history = log.history || [];log.history.push(arguments);arguments.callee = arguments.callee.caller; if(this.console) console.log( Array.prototype.slice.call(arguments) );};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info, log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});



