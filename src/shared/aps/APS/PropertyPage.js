jQuery.sap.require("sap.m.MessageBox");
// https://stackoverflow.com/questions/29413511/how-to-create-pages-with-different-containers-using-routing-in-ui5

sap.designstudio.sdk.PropertyPage.subclass("org.scn.community.lumiradesigner.PropertyPage", function () {
	this.init = function(){
		var that = this;
		var that = this;
		
		try{
			var componentInfo = JSON.parse(this.callRuntimeHandler("getComponentInformation"));
			this.dsProperties = JSON.parse(this.callRuntimeHandler("getDSProperties"));
			alert(JSON.stringify(this.dsProperties));
		}catch(e){
			alert("An error occured while retreiving component metadata.\n\n" + e);
			this.dsProperties = {};
		}	
		// Property Sheet Model
		this.model = new sap.ui.model.json.JSONModel();
		this.model.setData({ });
		
		for(property in this.dsProperties){
			this.model.setProperty("/" + property, {});
			this.model.setProperty("/" + property + "/title", this.dsProperties[property].title || property);		
			this[property] = function(property){
				return function(s){
					if(s===undefined){
						if(this.dsProperties[property].serialize){
							return JSON.stringify(this.model.getProperty("/" + property + "/value"));
						}else{
							return this.model.getProperty("/" + property + "/value");							
						}
					}else{
						if(this.dsProperties[property].serialize){
							try{
								this.model.setProperty("/" + property + "/value", JSON.parse(s));								
							}catch(e){
								alert("An error occured while parsing property '" + property + ".\n\n" + "Value passed:\n\n" + s + "Error:\n\n" + e);
							}
						}else{
							this.model.setProperty("/" +  property + "/value", s);
						}
						return this;
					}
				};
			}(property);
		}
		this.model.setProperty("/categories",[{
			text : "General",
			items : [{
				text : "Property 1"
			}]
		},{
			text : "Test"
		},{
			text : "Other"
		}]);
		var tabBar = new sap.m.IconTabBar({
			expandable : false,
			showOverflowSelectList : true
		})
		var page_properties = new sap.m.Page({
    		title : "Properties",
    		content : [tabBar]
    	});
		tabBar.bindAggregation("items","/categories",function(){
			var newTab = new sap.m.IconTabFilter({
				text : "{text}"
			});
			newTab.bindAggregation("content","items",function(){
				return new sap.m.Button({
					text : "{text}"
				})
			})
			return newTab;
		});
		// Creating routing here
		/**
		 * COMPONENT DECLARATION
		 */
		jQuery.sap.declare("scn.PropertyPage.Component");
		sap.ui.core.UIComponent.extend("scn.PropertyPage.Component", {
			metadata: {
				rootView : {
					viewName : "scn.PropertyPage.view.App",
					type : sap.ui.core.mvc.ViewType.JS
				},
				routing : {
					
				}
			},
			/**
			 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
			 * @public
			 * @override
			 */
			init: function() {
				// call the base component's init function
				alert("!");
				sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
				// Parse the current url and display the targets of the route that matches the hash
				// this.getRouter().initialize();
			}
		});
		/**
		 * VIEW
		 */
		sap.ui.jsview("scn.PropertyPage.view.App",{
			getControllerName : function() {
		        return "scn.PropertyPage.controller.App";
		    },
		    createContent : function(oController) {
		        return new sap.m.App("App",{
		        	pages : [
		        	page_properties,
		        	new sap.m.Page({
		        		title : "About"
		        	})]
		        });
		    }	
		});
		/**
		 * CONTROLLER 
		 */
		sap.ui.controller("scn.PropertyPage.controller.App",{
			onInit : function(){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		        if(oRouter) {
		        	oRouter.attachRouteMatched(this.onRouteMatched, this);
		        }else{
		        	// Hmm
		        }
			},
			onRouteMatched: function(oEvent) {
		        var oParameters = oEvent.getParameters();
		        var oView = this.getView();
		        var oApp = sap.ui.getCore().byId("App");
		        if (oApp.getCurrentPage().sId !== oParameters.view.sId) {
		            oApp.to(oParameters.view.sId);
		        }
		    }
		});		
		
		this.shell = new sap.m.Shell({
			title : "Property Page",
			app: new sap.ui.core.ComponentContainer({
				height : "100%",
				name : "scn.PropertyPage",
				propagateModel : true
			})
		});
		
		this.shell.setModel(this.model);
		sap.ui.getCore().setModel(this.model);
		var navStateModel = new sap.ui.model.json.JSONModel();
		// Determine dynamically
		navStateModel.setData({
		tabs : [
			{
				text : "Config",
				selected : true
			},{
				text : "Data",
				selected : false
			},{
				text : "Appearance",
				selected : false
			},{
				text : "Scales",
				selected : false
			},{
				text : "Axes",
				selected : false
			},{
				text : "Marks",
				selected : false
			},{
				text : "Legends",
				selected : false
			},{
				text : "Signals",
				selected : false
			}
		]});
		sap.ui.getCore().setModel(navStateModel, "navState");
		this.shell.placeAt("content");
	}
});
sap.ui.getCore().attachInit(function() {
	try{
		var propertyPage = new org.scn.community.lumiradesigner.PropertyPage();
	}catch(e){
		alert("Shell Error:\n\n" + e);
	}
});