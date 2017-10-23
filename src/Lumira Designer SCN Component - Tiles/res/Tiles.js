var sharedPath = sap.zen.createStaticSdkMimeUrl("org.scn.community.lumiradesigner.shared", "");
var tilesPath = sap.zen.createStaticSdkMimeUrl("org.scn.community.lumiradesigner.tiles", "") + "res";
// Register module path for MVC files
jQuery.sap.registerModulePath("org.scn.community.lumiradesigner.tiles.mvc", tilesPath + "/mvc");
// zen/mimes/sdk_include/org.scn.community.lumiradesigner.shared/
requirejs.config({
	paths : {
		ui5utils : "../" + sharedPath + "os/scn/ui5utils"
	}
});
define([
	"ui5utils",
	"css!./Tiles.css"], function(UI5Utils, CSS) {
	/**
	 * Design Studio Metadata Definition for Component logic and APS:
	 */
	var dsProperties = {
		// Name of Component that will be wrapped in ComponentContainer
		name : {
			ui5Meta : {defaultValue : "org.scn.community.lumiradesigner.tiles.mvc"}
		},
		// Propagate the ComponentContainer's model down to its Component
		propagateModel :{
			ui5Meta : { type : "boolean", defaultValue : true }
		},
		// Enable Scrolling
		enableScrolling : {
			ui5Meta : {type : "boolean"}
		},
		// Show Header
		title : {
			ui5Meta : { type : "string"}
		},
		// Tiles
		tiles : {
			ui5Meta : {type : "object[]"},
			processing : "JSON"
		},
		// Show Footer
		showFooter : {
			ui5Meta : {type : "boolean"}
		},
		// Show Header
		showHeader : {
			ui5Meta : {type : "boolean"}
		},
		// Show Sub-Header
		showSubHeader : {
			ui5Meta : {type : "boolean"}
		},
		selectedTile : { 
			opts : {
				desc : "Selected Tile",
				noAps : true
			},
			ui5Meta : "string"
		},
		onTileSelect : { 
			ui5Meta : "string",
			opts : {
				cat : "Tiles",
				order : 0,
				desc : "On Tile Select",
				apsControl : "script"
			}
		},
		tileConfig : { 
			opts : {
				desc : "Tile Configuration",
				cat : "Tiles",
				keyField : "key",
				apsControl : "complexcollection",
				apsConfig : {
					key : {
						desc : "Key",
						apsControl : "text",
						key : true
					},
					tileType : {
						desc : "Tile Type",
						defaultValue : "Monitor",
						apsControl : "combobox",
						options : [
							{key : "Monitor", text : "Monitor"},
							{key : "Success", text : "Success"},
							{key : "Warning", text : "Warning"},
							{key : "Error", text : "Error"}
						]
					},
					title : {
						desc : "Title",
						defaultValue : "Some Title",
						apsControl : "text"				
					},
					styleClass : {
						desc : "Style Class",
						apsControl : "text"
					},
					info : {
						desc : "Info",
						defaultValue : "Info",
						apsControl : "text"
					},
					icon : {
						desc : "Icon",
						defaultValue : "sap-icon://action",
						apsControl : "text"
					},
					number : {
						desc : "Number",
						defaultValue : "123",
						apsControl : "text"
					},
					numberUnit : {
						desc : "Number Unit",
						defaultValue : "$",
						apsControl : "text"
					},
					valueState : {
						desc : "Info State",
						defaultValue : "None",
						apsControl : "combobox",
						options : [
							{key : "None", text : "None"},
							{key : "Success", text : "Success"},
							{key : "Warning", text : "Warning"},
							{key : "Error", text : "Error"}
						]
					}
				}
			},
			ui5Meta : "string"
		}
	};
	// Create a UI5 definition object
	var definition = UI5Utils.init({
		dsProperties : dsProperties
	});
	// This is the UI5 Extension object
	var extension = definition.extension;
	/**
	 * Called when DS Inits
	 */
	extension.initDesignStudio = function() {
		
	};
	// Custom getter/setter for tiles
	extension.getTiles = function(){
		return JSON.stringify(sap.ui.core.ComponentContainer.prototype.getProperty.call(this,"tiles"));
	};
	extension.setTiles = function(s){
		var a = [];
		if(typeof s=="object") {
			a = s;
		}else{
			try{
				if(s && s!="") a = JSON.parse(s);
			}catch(e){
				alert("Error parsing JSON:" + s + "\n\n" + e);
			}	
		}
		sap.ui.core.ComponentContainer.prototype.setProperty.call(this,"tiles",a);
		return this;
	};
	// Set JSON Model for property storage and binding
	extension.init = function() {
		//this.setHeight("100%");
		var jM = new sap.ui.model.json.JSONModel();
		jM.setData({
			title : "Default Title",
			enableScrolling : false,
			tiles : [{
				
			}]
		});
		this.setModel(jM);
		for(var p in dsProperties){
			if(dsProperties[p].ui5Meta){
				this.bindProperty(p, "/" + p);
			}
		}
	};
	sap.ui.core.ComponentContainer.extend("org.scn.community.lumiradesigner.tiles.Tiles", extension);
});