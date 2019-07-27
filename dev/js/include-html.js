$(document).ready( function() {
	$.when(
		$("#header").my_load("./layout/header.html"),
		$("#header_register").my_load("./layout/header_register.html"),
		$("#gnb").my_load("./layout/gnb.html"),
		$("#footer").my_load("./layout/footer.html"),
		$("#footer_register").my_load("./layout/footer_register.html")
	).then(function() {
		$("head").append("<script type=\"text/javascript\" src=\"/js/common.js\"></script>").promise().done(function() {
			initUI.setup();
		});
	});
});
jQuery.fn.extend({
	my_load: function(what) {
		var my_this = this;
		return $.get(what, function(data) {
			my_this.html(data);
		});
	}
});
/* //JS */
