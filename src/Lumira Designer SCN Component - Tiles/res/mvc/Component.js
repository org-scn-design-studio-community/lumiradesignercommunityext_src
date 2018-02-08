sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device"
], function(UIComponent, Device) {
	"use strict";
	return UIComponent.extend("org.scn.community.lumiradesigner.tiles.mvc.Component", {
		metadata: {
			// manifest: "json"
		},
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
		},
		createContent : function() {
	        var oView = sap.ui.view({
	            // id : "idApp",
	            viewName : "org.scn.community.lumiradesigner.tiles.mvc.Tiles",
	            type : "XML",
	            viewData : {
	                component : this
	            }
	        });
	        return oView;
	    }
	});
});