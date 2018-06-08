sap.designstudio.sdk.PropertyPage.subclass("org.scn.community.ui5view.APS",  function() {

	var that = this;

	this.init = function() {
		$("#form").submit(function() {
			that.firePropertiesChanged(["xml", "js"]);
			return false;
		});
	};

	this.xml = function(value) {
		if (value === undefined) {
			return $("#xml").val();
		}
		else {
			$("#xml").val(value);
			return this;
		}
	};
	
	this.js = function(value) {
		if (value === undefined) {
			return $("#js").val();
		}
		else {
			$("#js").val(value);
			return this;
		}
	};

});