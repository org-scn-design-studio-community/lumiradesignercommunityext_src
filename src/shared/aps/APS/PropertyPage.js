jQuery.sap.require("sap.m.MessageBox");
// https://stackoverflow.com/questions/29413511/how-to-create-pages-with-different-containers-using-routing-in-ui5

sap.designstudio.sdk.PropertyPage.subclass("org.scn.community.lumiradesigner.PropertyPage", function () {
	this.init = function(){
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
		this.apsProperties = {};
		try{
		for(property in this.dsProperties){
			if(this.dsProperties[property].apsControl){
				this.apsProperties[property] = JSON.parse(JSON.stringify(this.dsProperties[property]));
				this.apsProperties[property].propertyName = property;
				this.apsProperties[property].text = this.apsProperties[property].text || property;
				this.apsProperties[property].category = this.apsProperties[property].category || "General";
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
			}else{
				// No APS Control specified
			}
		}
		var binding = new sap.ui.model.Binding(this.model, "/", this.model.getContext("/"));
		binding.attachChange(function(oEvent){
			var s = oEvent.getSource().getModel().getJSON();
			if(s && s!= ""){
				var changes = [];
				var o = JSON.parse(s);
				for(var f in o){
					var propvalue = JSON.stringify(o[f]);
					if(that.dsProperties[f]){
						if(that.dsProperties[f].oldValue != undefined && that.dsProperties[f].oldValue != propvalue){
							changes.push(f);						
						}
						that.dsProperties[f].oldValue = propvalue;						
					}else{
						// Ignore if not a dsProperty - e.g. 'categories' in the model.
						// TODO: Move properties to it's own branch in model like /properties/prop1 etc...
						// alert("Unknown property change found in model for property '" + f);
					}
				}
				if(changes.length>0) {
					that.firePropertiesChanged(changes);
				}
			}
		});
		var categoryHash = {};
		var categories = [];
		for(var property in this.apsProperties){
			if(!categoryHash[this.apsProperties[property].category]){
				categoryHash[this.apsProperties[property].category] = {
					text : this.apsProperties[property].category,
					items : []
				};
				categories.push(categoryHash[this.apsProperties[property].category]);
			}
			categoryHash[this.apsProperties[property].category].items.push(this.apsProperties[property]);
		}
		}catch(e){alert(e);}
		this.model.setProperty("/categories",categories);
		var tabBar = new sap.m.IconTabBar({
			expandable : false,
			applyContentPadding : false,
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
			var propertyList = new sap.m.List();
			newTab.addContent(propertyList);
			propertyList.bindAggregation("items","items",function(sId, oContext){
				var listItem = new sap.m.InputListItem({
					label : "{text}"
				});
				var apsControl = oContext.getProperty("apsControl") || "";
				var propertyName = oContext.getProperty("propertyName") || "UNKNOWN";
				var control;
				switch(apsControl.toLowerCase()){
					case "switch":
						control = new sap.m.Switch({state : "{/" + propertyName + "/value}"});
						break;
					case "text":
					default:
						control = new sap.m.Input({value : "{/" + propertyName + "/value}"});
				}
				listItem.addContent(control);
				return listItem;
				/*return new sap.m.Button({
					text : "{text}"
				})*/
			});
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