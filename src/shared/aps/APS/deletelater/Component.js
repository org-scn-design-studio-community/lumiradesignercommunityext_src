sap.ui.define([
	"sap/ui/core/UIComponent",
], function(UIComponent) {
	"use strict";

	return UIComponent.extend("PropertyPage.Component", {
		metadata: {
			properties : {
				dsProperties : {}
			}
			// manifest : "json"
		},
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			// Parse the current url and display the targets of the route that matches the hash
			// this.getRouter().initialize();
		},
		createContent:function(){
			alert(JSON.stringify(this.getDsProperties()));
			var oView = sap.ui.view({
				id : "App",
				viewName:"PropertyPage.App",
				type:"XML",
				viewData:{
					component:this
				}
			});
		}
	});
});