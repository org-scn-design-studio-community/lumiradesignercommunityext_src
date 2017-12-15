/**
 * Copyright 2016 SCN SDK Community
 * 
 * Original Source Code Location:
 *  https://github.com/org-scn-design-studio-community/sdkpackage/
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at 
 *  
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 * See the License for the specific language governing permissions and 
 * limitations under the License. 
 * 
 * Author: Martin Pankraz
 * 
 * Thanks to Karol and Mustafa for pointing out how to integrate with sap.m
 * 
 * This implementation uses numeral.js by Adam Draper
 * 
 * Update by: Marton Horvath
 * Added new features: PictureTile, URL, UnitOverwrite property
 * 
 */

define(["../../../org.scn.community.shared/os/numberformat/languages",
		"../../../org.scn.community.shared/os/numberformat/numeral.min",
		//"../../../org.scn.community.basics/os/sapui5/suite/ui/microchart/InteractiveBarChart",
		//"../../../org.scn.community.basics/os/sapui5/suite/ui/microchart/InteractiveBarChartBar",
		"../../../org.scn.community.basics/os/sapui5/sap_suite_loader",
		"../../../org.scn.community.basics/os/x2js/xml2json",
		"../../../org.scn.community.databound/res/KpiTile/KpiTileSpec"	
		], function() {
	
	sap.m.TileContainer.extend("org.scn.community.databound.TileContainer", {
		
		setData : function(value) {
			this._data = value;
			return this;
		},
		
		getData : function(value) {
			return this._data;
		},
		
		setTest : function(value) {
		},
		
		getTCTiles : function()	{
			var that = this;
			var TCTiles = that.getTiles();
			return TCTiles;
		},
		
		addMicroCharts: function(key, componentType, specification) {
			var itemDef = {
				leaf:false,
				parentKey:"ROOT",
				key:key, 
				componentType:componentType, 
				top:0, 
				bottom:0, 
				left:0, 
				right:0, 
				width:"8", 
				height:"3.5", 
				specification:specification 
				};
			
			var elementsJson = JSON.parse(this.getMicroCharts());
			
			var alreadyFound = false;
			for (var i = 0; i < elementsJson.length ; i++){
				if (elementsJson[i].key == key) {
					alreadyFound = true;
					break;
				}
			}
			
			if(!alreadyFound) {
				elementsJson.push(itemDef);
			}
			
			//this.microCharts = JSON.stringify(elementsJson);
			this.MicroCharts = JSON.stringify(elementsJson);
		},
		
		getMicroChartByKeyInternal: function(key) 
		{
			if (this.getMicroCharts().length == 0){
				return "[]";
			}

			var elementsJson = JSON.parse(this.getMicroCharts());

			var value = "";
			// loop and find and update
			for (var i = 0; i < elementsJson.length ; i++){
				if (elementsJson[i].key == key) {
					value = JSON.stringify(elementsJson[i]);
					break;
				}
			}
			
			return "[" + value + "]";
		},

		metadata: {
	        properties: {
	        	"DTargetDim": {type: "string"},
	        	"DMeasureDim": {type: "string"},
	        	"DComparisonDim":{type: "string"},
	        	"DTileType":{type: "string"},
	        	"DHeaderDim":{type: "string"},
	        	"DSubHeaderDim":{type: "string"},
	        	"DFooterDim":{type: "string"},
	        	"DURLDim":{type: "string"},
	        	"DUnitOverwriteDim":{type: "string"},
	        	"DBackgroundImageDim":{type: "string"},
	        	"DNumeralString":{type: "string"},
	        	"DIconMapping":{type: "object"},
	        	"DComparisonTolerance":{type: "int"},
	        	"DCurrentHeader": {type: "string"},
	        	"DCurrentSubHeader": {type: "string"},
	        	"DCurrentFooter": {type: "string"},
	        	"DCurrentValue": {type: "float"},
	        	"DCurrentValueText":{type: "string"},
	        	"DCurrentUnit": {type: "string"},
	        	"DCurrentURL": {type: "string"},
	        	"DCurrentIconString": {type: "string"},
	        	"NewActualValue": {type: "int"},
	        	"TriggerMicroChartUpdate": {type: "string"},	       
	        	"ChartID": {type: "string"},
	        	"ChartSpecification": {type: "string"},        		        	
	        	"MicroCharts": {type: "string"},
	        	"ComponentsSpec": {type: "string"},
	        	"LayoutSpec": {type: "string"},
	        	"ContentResponsive": {type: "string"},
	        	"OnClick": {type: "string"},
	        	"OnSelect": {type: "string"}
	        }
		},
	
		initDesignStudio: function() {
			var that = this;
			
			// Identify language dynamically - commented out because it was not working properly in Lumira 2.0, set to static en instead.
			// this.sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();
			// this.sCurrentLocale
			numeral.language("en"); 
			
			//jQuery.sap.require('sap.suite.ui.microchart.InteractiveBarChart');
			//jQuery.sap.require('sap.suite.ui.microchart.InteractiveBarChartBar');
			

			this.setWidth("100%");
			this.setHeight("100%");
//			this.setEditable(true);
//			this.setAllowAdd(true);
			
			this.currentData 		= "";
			this.currentFlatData 	= "";  // TODO: add demo/init flat data
			this.dataRefreshed = false;
			
			this.chartID = "";
			this.chartSpecification = "";
				
			//this.microCharts = this.getMicroCharts();
			
			this.tileType = "Custom";
			this.triggerMicroChartUpdate = "";
			this.newActualValue = 10;
			
			var onTileAdd = function(oControlEvent) {
				that.fireDesignStudioEvent("onTileAdd");
			};
			
			var onTileMove = function(oControlEvent) {
				that.fireDesignStudioEvent("onTileMove");
			};
			
			var onTileDelete = function(oControlEvent) {
				that.fireDesignStudioEvent("onTileDelete");
			};
			
			this.attachTileAdd(onTileAdd);
			this.attachTileMove(onTileMove);
			this.attachTileDelete(onTileDelete);

		},
		
		renderer: {},
			
		afterDesignStudioUpdate: function() {
			
			var that = this;
			
			//_microCharts //var microCharts = this._microCharts;
			
			var tileCreationDim = this.getDTargetDim();
			
			//var tempMicroCharts = [];
			//tempMicroCharts = this._microCharts;
					
			this._microCharts = [];
			
			if(this.currentData !== this.getData()){
				this.dataRefreshed = true;
				this.currentData = this.getData();
				this.destroyTiles();
			}
			
			if(this.tileType !== this.getDTileType()){
				this.tileType = this.getDTileType();
				
				
				this.dataRefreshed = true;
				this.destroyTiles();
				
			}
			
			if(this.triggerMicroChartUpdate !== this.getTriggerMicroChartUpdate()){
				
				this.dataRefreshed = true;
				this.destroyTiles();
				
				this.triggerMicroChartUpdate = this.getTriggerMicroChartUpdate();
				this.newActualValue = this.getNewActualValue();
				
				//this._microCharts = tempMicroCharts;					
				//this.microChartSwap();
				
				var spec = that.getComponentsSpec(); //getChartSpecification();
				spec = JSON.parse(spec);
				spec = that.buildTree(spec);
				
				var layout = that.getLayoutSpec();
				layout = JSON.parse(layout);
				layout = that.buildTree (layout);
								
				var newSpec = JSON.parse(JSON.stringify(spec));
				
				
				var objectContainer = [];
				objectContainer = that.calculateContent(that, newSpec, layout, "_", "1");
				
				//this._microCharts.pop();
				//this._microCharts.push(objectContainer[4]);
			}
			
			
			if(this._data !== "" && this.dataRefreshed && tileCreationDim !== ""){
				this.currentFlatData = this.flattenData();
				
				for(var i=0;i<this.currentFlatData.length;i++){
					var items = this.currentFlatData[i];		// ALL ITEMS
					if(this.getDTileType() === "Standard"){
						this.createStandardTile(items);	
					}
					else if(this.getDTileType() === "Custom"){
						this.testCreateTile(items, i);
						//this.createCustomTile(items);
					}
					else if(this.getDTileType() === "Picture"){
						this.createPictureTile(items);
					}
					else if(this.getDTileType() === "MicroChart"){
												
						this.testCreateTile(items, i);
					}
					else if(this.getDTileType() === "MultiType"){
						this.createMultiType(items);							
					}
					else{
						if(window.console)console.log("unkown tile type");
					}
				}
			}
			else{
				var isInDesignMode = (sap.zen.designmode !== undefined);
				if(isInDesignMode && this.dataRefreshed){
					this.addTile( new sap.m.StandardTile({
			            title : "Dummy Tile",
						icon : "sap-icon://play",
			    		//type : "Create",			//?????
			    		number : "123.456789",
			    		numberUnit : "euro",
			    		scale : "m",
			    		info : "28 days left",
			    		infoState : "Success",
			            })
					);
				}
			}
			//reset data refresh flag!
			this.dataRefreshed = false;
			
			that.fireDesignStudioPropertiesChanged(["TriggerMicroChartUpdate"]);  // !!!!!!!
		},
		
		createMicroChartFromJSON: function(){
			
			var jsonDef = "";
			
			//jsonDef = "BulletMicroChart scale='M'";
					//"<actual><BulletMicroChartData value='120' color='Good' /></actual></BulletMicroChart>";
			
			//this._microCharts.push(new sap.suite.ui.microchart["BulletMicroChart"](jsonDef));
		},
		
		createInitialMicroChart : function(){
			
		    this._microCharts.push(new sap.suite.ui.microchart.BulletMicroChart({
									      size: "S",
									      scale: "M",
									      targetValue: "0",
									      targetValueLabel: "80",
									      minValue: 0,
									      maxValue: 100,
									      actual: [new sap.suite.ui.microchart.BulletMicroChartData({
									          value: 0,
									          color: "Good"
									        })									    
										    ],
									      thresholds: [new sap.suite.ui.microchart.BulletMicroChartData({
									          value: 0,
									          color: "Critical"
									        })
									      ]
									    }));
		}, 
		
		removeMicroCharts : function(){
		},
		
		microChartSwap : function() {
			
			var that = this;
					
			var tempMicroCharts = [];
			var aV = this.newActualValue;
			
			tempMicroCharts = this._microCharts;
			
			/*tempMicroCharts.pop();    
			
			tempMicroCharts.push(new sap.suite.ui.microchart.BulletMicroChart({
									      size: "S",
									      scale: "M",
									      targetValue: "0",
									      targetValueLabel: "75",
									      minValue: 0,
									      maxValue: 100,
									      actual: [new sap.suite.ui.microchart.BulletMicroChartData({
									          value: aV,
									          color: "Good"
									        })									    
										    ],
									      thresholds: [new sap.suite.ui.microchart.BulletMicroChartData({
									          value: 35,
									          color: "Critical"
									        })
									      ]
									    }));*/
			
			tempMicroCharts[aV] = new sap.suite.ui.microchart.BulletMicroChart({
									      size: "S",
									      scale: "M",
									      targetValue: "0",
									      targetValueLabel: "75",
									      minValue: 0,
									      maxValue: 100,
									      actual: [new sap.suite.ui.microchart.BulletMicroChartData({
									          value: aV*10,
									          color: "Good"
									        })									    
										    ],
									      thresholds: [new sap.suite.ui.microchart.BulletMicroChartData({
									          value: 35,
									          color: "Critical"
									        })
									      ]
									    });


			this._microCharts = tempMicroCharts;
			
		},

//************* STANDARD TILE ***************************************************
		createStandardTile : function(data){
			var that = this;
			
			var targetDimension = this.getDTargetDim();
			var measureDimension= this.getDMeasureDim();
			var comparisonDim 	= this.getDComparisonDim();
			var headerDim 		= this.getDHeaderDim();
			var subHeaderDim 	= this.getDSubHeaderDim();
			var footerDim 		= this.getDFooterDim();
			var tileType		= "Standard";
			
			var title 		= "";
			var icon		= "";
			var number 		= "";
			var numberUnit 	= "";
			var scale	 	= "";
			var info 		= "";
			var infostate 	= "Warning";
			
			if(data[measureDimension] !== undefined){
				scale = Math.pow(10, data[measureDimension].scale);
				number = (data[measureDimension].data)*scale;
				
				if(data[comparisonDim] !== undefined){
					var compare = data[comparisonDim].data;
					var tolerance = this.getDComparisonTolerance()/100;
					var diff = Math.abs(number-compare);
					number_tolerance = Math.abs(number*tolerance);
					//Test if abs of comparison difference is within tolerance range
					if(diff < number_tolerance){
						infostate = "None";
					}else if(number < compare){
						infostate = "Error";	
					}else if(number > compare){
						infostate = "Success";
					}//This should never happen
					else{
						infostate = "Warning";
					}
				}
				number = numeral(number/scale).format(this.getDNumeralString());
			}
			
			if(data[headerDim] !== undefined){
				if(that.isMeasure(headerDim)){
					title = headerDim;
				}else{
					title = data[headerDim];	
				}
				
				var icons = this.getDIconMapping();
				
				if(icons !== undefined){
					for(var i=0;i<icons.length;i++){
						if(icons[i].DDimValue === title){
							icon = icons[i].DIconString;
						}
					}
				}
			}
			if(data[footerDim] !== undefined){
				if(that.isMeasure(footerDim)){
					info = footerDim;	
				}else{
					info = data[footerDim];	
				}
			}
			if(data[measureDimension] !== undefined && data[measureDimension].unit !== undefined){
				numberUnit = data[measureDimension].unit;
			}
			
			var tile = new sap.m.StandardTile({
				            icon : icon,
				            title : title,
				    		number : number,
				    		numberUnit : "x"+scale+" "+numberUnit,
				    		info : info,
				    		infoState : infostate,
			            }).addStyleClass("ccTileLayout");
			
			var onTilePress = function(oControlEvent) {
				var tileId = oControlEvent.getParameters().id;
				var tiles = that.getTiles();
				var tile = null;
				
				for(var i=0;i<tiles.length;i++){
					var currentTile = tiles[i]; 
					if(tiles[i].sId === tileId){
						tile = currentTile;
						tile.addStyleClass("cc-Tile-clicked");
					}else{
						currentTile.removeStyleClass("cc-Tile-clicked");
					}
				}
				
				if(tile === null){
					if(window.console)console.log("no tile found with id "+tileId);
				}else{
					var iconString = tile.getIcon();
					var orig_value = that.retrieveValueByDimension(tile.getTitle());
					
					that.setDCurrentHeader(tile.getTitle());
//					that.setDCurrentSubHeader(tile.);
					that.setDCurrentFooter(tile.getInfo());
					that.setDCurrentValue(orig_value);
					that.setDCurrentValueText(tile.getNumber());
					that.setDCurrentUnit(tile.getNumberUnit());
					that.setDCurrentIconString(iconString);
					
					that.fireDesignStudioPropertiesChanged(["DCurrentHeader","DCurrentFooter","DCurrentValue","DCurrentUnit","DCurrentIconString"]);
					that.fireDesignStudioEvent("onTilePress");
				}
			};
			tile.attachPress(onTilePress);
			
			this.addTile(tile);
			
		},
		
//************* CUSTOM TILE ***************************************************
		createCustomTile : function(data){
			
			var that = this;
			
			var targetDimension = this.getDTargetDim();
			var measureDimension= this.getDMeasureDim();
			var comparisonDim 	= this.getDComparisonDim();
			var headerDim 		= this.getDHeaderDim();
			var subHeaderDim 	= this.getDSubHeaderDim();
			var footerDim 		= this.getDFooterDim();
			var unitOverwriteDim = this.getDUnitOverwriteDim();
			var urlDim 			= this.getDURLDim();
			var tileType		= "Custom";
			
			var headerText 		= "";
			var subHeaderText 	= "";
			var icon			= "";
			var tempValue		= "";
			var value 			= "";
			var unit 			= "";
			var url				= "";
			var scale			= "";
			var trendIndicator	= "";
			var footer 			= "";
			
			var color_class = "";

			
			if(data[measureDimension] !== undefined){
				scale = Math.pow(10, data[measureDimension].scale);
				tempValue = data[measureDimension].data;
				
				if (tempValue !== null)
				{
					value = (data[measureDimension].data)*scale;
				}
				else
				{	
					value = "";
				}
				
				if(data[comparisonDim] !== undefined){
					var compare = data[comparisonDim].data;
					var tolerance = this.getDComparisonTolerance()/100;
					var diff = Math.abs(value-compare);
					value_tolerance = Math.abs(value*tolerance);
					//Test if abs of comparison difference is within tolerance range
					if(diff < value_tolerance){
						trendIndicator = "cc-arrow-right";
						color_class = "cc-normal";
					}
					else if(value < compare){
						trendIndicator = "cc-arrow-down";
						color_class = "cc-bad";
					}else if(value > compare){
						trendIndicator = "cc-arrow-up";
						color_class = "cc-good";
					}//should not happen
					else{
						trendIndicator = "";
						color_class = "cc-warning";
					}
				}
				
				if (value !== "")
				{
					value = numeral(value).format(this.getDNumeralString());
				}
			}
			
			if(data[headerDim] !== undefined){
				if(that.isMeasure(headerDim)){
					headerText = headerDim;	
				}else{
					headerText = data[headerDim];	
				}
				var icons = this.getDIconMapping();
				
				if(icons !== undefined){
					for(var i=0;i<icons.length;i++){
						if(icons[i].DDimValue === headerText){
							icon = icons[i].DIconString;
						}
					}
				}
			}
			if(data[subHeaderDim] !== undefined){
				if(that.isMeasure(subHeaderDim)){
					subHeaderText = subHeaderDim;
				}else{
					subHeaderText = data[subHeaderDim];	
				}
			}
			
			if(data[footerDim] !== undefined){
				if(that.isMeasure(footerDim)){
					footer = footerDim;
				}else{
					footer = data[footerDim];	
				}
			}
			
			if(data[measureDimension] !== undefined && data[measureDimension].unit !== undefined){
				unit = data[measureDimension].unit;
			}
			
			if(data[unitOverwriteDim] !== undefined){
				if(that.isMeasure(unitOverwriteDim)){
					unit  = unitOverwriteDim;
				}else{
					unit  = data[unitOverwriteDim];	
				}
			}
			
			if(data[urlDim] !== undefined){
				if(that.isMeasure(urlDim)){
					url = urlDim;
				}else{
					url = data[urlDim];	
				}
			}
			
			var oLayoutVRow1 = new sap.ui.layout.VerticalLayout({
				content: [
				          new sap.m.Text({text : headerText}).addStyleClass('ccHeaderText'),
		    	          new sap.m.Text({text : subHeaderText}).addStyleClass('ccSubHeaderText'),
		    	          ]
		    })/*.addStyleClass('ccRowLayout')*/;
			
			var oLayoutHHeader = new sap.ui.layout.HorizontalLayout({
			content: [
			          oLayoutVRow1,
			          new sap.ui.core.Icon({
			        	  src : icon
			          }).addStyleClass('ccIconText')
			          ]
			}).addStyleClass('ccRowLayoutHeader');
		
			var oLayoutVValueSuffix = new sap.ui.layout.VerticalLayout({
				
				content: [
				          new sap.m.Text({text : ""}).addStyleClass(trendIndicator),
				          new sap.m.Text({text : unit}).addStyleClass('ccUnitText').addStyleClass(color_class)
				          ]
			}).addStyleClass('ccUnitLayout');
			
			var oLayoutHValue = new sap.ui.layout.HorizontalLayout({
				content: [
				          new sap.m.Text({text : value}).addStyleClass('ccValueText').addStyleClass(color_class),
				          oLayoutVValueSuffix
				          ]
			})
			
			var oLayoutVRow2 = new sap.ui.layout.VerticalLayout({
		    	content: [
		    	          oLayoutHValue
		    	          ]
		    }).addStyleClass('ccRowLayoutValue');
			
			var oLayoutVRow3 = new sap.ui.layout.VerticalLayout({
		    	content: [
		    	          new sap.m.Text({text : footer}).addStyleClass('ccFooterText'),
		    	          ]
		    }).addStyleClass('ccRowLayoutFooter');
			
			//setup a json model to retrieve values on press more easily
			var valueModel = new sap.ui.model.json.JSONModel({
                "header": headerText,
                "subHeader": subHeaderText,
                "icon": icon,
                "value": value,
                "unit": unit,
                "url": url,
                "trendIndicator": trendIndicator,
                "footer": footer,
            });
		    	      
		    var tile = new sap.m.CustomTile({
		    								height:"100%",
		     								content: new sap.ui.layout.VerticalLayout({
		     									content: [oLayoutHHeader, oLayoutVRow2, oLayoutVRow3]
		     								})		     								
										}).addStyleClass('sapMTile').addStyleClass('ccTileLayout');
		    
		    tile.setModel(valueModel);
			
		    var onTilePress = function(oControlEvent) {
		    	
		    	var oLayout = oControlEvent.getSource().getContent();
		    	var model = oLayout.getModel();
		    	var value = model.getProperty("/header");
		    	
				var tileId = oControlEvent.getParameters().id;
				var tiles = that.getTiles();
				var tile = null;
				
				for(var i=0;i<tiles.length;i++){
					var currentTile = tiles[i]; 
					if(tiles[i].sId === tileId){
						tile = currentTile;
						tile.addStyleClass("cc-Tile-clicked");
					}else{
						currentTile.removeStyleClass("cc-Tile-clicked");
					}
				}
				if(tile === null){
					if(window.console)console.log("no tile found with id "+tileId);
				}else{
					var iconString = model.getProperty("/icon");
					var orig_value = that.retrieveValueByDimension(model.getProperty("/header"));
					
					that.setDCurrentHeader(model.getProperty("/header"));
					that.setDCurrentSubHeader(model.getProperty("/subHeader"));
					that.setDCurrentFooter(model.getProperty("/footer"));
					that.setDCurrentValue(orig_value);
					that.setDCurrentValueText(model.getProperty("/value"));
					that.setDCurrentUnit(model.getProperty("/unit"));
					that.setDCurrentURL(model.getProperty("/url"));
					that.setDCurrentIconString(iconString);
					
					that.fireDesignStudioPropertiesChanged(["DCurrentHeader","DCurrentFooter","DCurrentValue","DCurrentValueText","DCurrentUnit","DCurrentURL","DCurrentIconString"]);
					that.fireDesignStudioEvent("onTilePress");
				}
			};
			tile.attachPress(onTilePress);
		    
			this.addTile(tile);
		},
		
		
//************* PICTURE TILE ***************************************************
	createPictureTile : function(data){
			
		var that = this;
			
		var headerDim 			= this.getDHeaderDim();
		var subHeaderDim 		= this.getDSubHeaderDim();
		var footerDim 			= this.getDFooterDim();
		var backgroundImageDim 	= this.getDBackgroundImageDim();
		var urlDim 				= this.getDURLDim();
		var tileType			= "Picture";
		
		var lContentText 		= "";
		var lSubHeaderText 		= "";
		var lFooter 			= "";
		var lBackgroundImage	= "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/sample/GenericTileAsFeedTile/images/NewsImage1.png";
		var url					= "";
		
		if(data[headerDim] !== undefined){
			if(that.isMeasure(headerDim)){
				lContentText = headerDim;
			}else{
				lContentText = data[headerDim];	
			}
		}

		if(data[subHeaderDim] !== undefined){
			if(that.isMeasure(subHeaderDim)){
				lSubHeaderText = subHeaderDim;
			}else{
				lSubHeaderText = data[subHeaderDim];	
			}
		}
		
		if(data[footerDim] !== undefined){
			if(that.isMeasure(footerDim)){
				lFooter = footerDim;  
			}else{
				lFooter = data[footerDim];	
			}
		}
	
		if(data[backgroundImageDim] !== undefined){
			if(that.isMeasure(backgroundImageDim)){
				lBackgroundImage = backgroundImageDim;  
			}else{
				lBackgroundImage = data[backgroundImageDim];	
			}
		}
				
		var oNewsContent = new sap.m.NewsContent({
			contentText: 	lContentText,
			subheader:  	lSubHeaderText
		}).addStyleClass("ptNewsContent");	
		
		var oTileContent = new sap.m.TileContent({
	    	footer: 		lFooter,
			content : [oNewsContent]
		}).addStyleClass("ptTileContent");	 
		
		var gTile = new sap.m.GenericTile( {    
			frameType: 			"TwoByOne",
			backgroundImage: 	lBackgroundImage,
			tileContent : [oTileContent]
		}).addStyleClass("ptGenericTile");
		
		var tile = new sap.m.CustomTile({
			height:"100%",
			content : [gTile]
		}).addStyleClass('ptPictureTile').removeStyleClass('sapMCustomTile');
		
		//setup a json model to retrieve values on press more easily
		/*var valueModel = new sap.ui.model.json.JSONModel({
            "contentText": lContentText,
            "subHeader": lSubHeaderText,
            "footer": lFooter,
            "backgroundImage": lBackgroundImage
        });

		tile.setModel(valueModel);

	    var onTilePress = function(oControlEvent) {
	    	
	    	var oLayout = oControlEvent.getSource().getContent();
	    	var model = oLayout.getModel();
	    	var content = model.getProperty("/contentText");
	    	
			var tileId = oControlEvent.getParameters().id;
			var tiles = that.getTiles();
			var tile = null;
			
			for(var i=0;i<tiles.length;i++){
				var currentTile = tiles[i]; 
				if(tiles[i].sId === tileId){
					tile = currentTile;
					tile.addStyleClass("cc-Tile-clicked");
				}else{
					currentTile.removeStyleClass("cc-Tile-clicked");
				}
			}
			if(tile === null){
				if(window.console)console.log("no tile found with id "+tileId);
			}else{
				that.setDCurrentHeader(model.getProperty("/header"));
				that.setDCurrentSubHeader(model.getProperty("/subHeader"));
				that.setDCurrentFooter(model.getProperty("/footer"));
				that.setDCurrentValueText(model.getProperty("/value"));
				
				that.fireDesignStudioPropertiesChanged(["DCurrentHeader","DCurrentFooter","DCurrentValue","DCurrentValueText","DCurrentUnit","DCurrentIconString"]);
				that.fireDesignStudioEvent("onTilePress");
			}
		};
		tile.attachPress(onTilePress);*/
		
		this.addTile(tile);
	},

	
//************* MICROCHART TILE ***************************************************
	createMicroChartTile : function(data){					//data
			
		var that = this;
			
		var headerDim 			= this.getDHeaderDim();
		var subHeaderDim 		= this.getDSubHeaderDim();
		var footerDim 			= this.getDFooterDim();
		var backgroundImageDim 	= this.getDBackgroundImageDim();
		var urlDim 				= this.getDURLDim();
		var tileType			= "MicroChart";
		
		var headerText 			= "";
		var lContentText 		= "";
		var lSubHeaderText 		= "";
		var lFooter 			= "";
		var url					= "";
		
		if(data[headerDim] !== undefined){
			if(that.isMeasure(headerDim)){
				lContentText = headerDim;
			}else{
				lContentText = data[headerDim];	
			}
		}
		
		if(data[headerDim] !== undefined){
			if(that.isMeasure(headerDim)){
				headerText = headerDim;	
			}else{
				headerText = data[headerDim];	
			}
			var icons = this.getDIconMapping();
			
			if(icons !== undefined){
				for(var i=0;i<icons.length;i++){
					if(icons[i].DDimValue === headerText){
						icon = icons[i].DIconString;
					}
				}
			}
		}

		if(data[subHeaderDim] !== undefined){
			if(that.isMeasure(subHeaderDim)){
				lSubHeaderText = subHeaderDim;
			}else{
				lSubHeaderText = data[subHeaderDim];	
			}
		}
		
		if(data[footerDim] !== undefined){
			if(that.isMeasure(footerDim)){
				lFooter = footerDim;  
			}else{
				lFooter = data[footerDim];	
			}
		}
	
		if(data[backgroundImageDim] !== undefined){
			if(that.isMeasure(backgroundImageDim)){
				lBackgroundImage = backgroundImageDim;  
			}else{
				lBackgroundImage = data[backgroundImageDim];	
			}
		}
						

		var oActual = new sap.suite.ui.microchart.BulletMicroChartData();
	    oActual.setValue(70);
	    oActual.setColor("Good");
	  
	    var oBulletChart = new sap.suite.ui.microchart.BulletMicroChart({
	      size: "S",
	      scale: "M",
	      targetValue: "0",
	      targetValueLabel: "75",
	      minValue: 0,
	      maxValue: 100,
	      actual: [oActual],
	      thresholds: [new sap.suite.ui.microchart.BulletMicroChartData({
	          value: 35,
	          color: "Critical"
	        })
	      ]
	    });
	    
	    var oForecast = new sap.suite.ui.microchart.BulletMicroChartData();
	    oForecast.setValue(60);
	    oForecast.setColor("Neutral");
	    
	    oBulletChart.setForecastValue(60);
		
		var oTileContent = new sap.m.TileContent({
			footer: 		lFooter
		}).addStyleClass("ptTileContent");	 
		
		oTileContent.setContent(oBulletChart); // !!!!!!!! sap.ui.core.Control 
		
		var gTile = new sap.m.GenericTile( {    
			frameType: 			"OneByOne",
			header		: "STATIC", //headerText,
			tileContent : [oTileContent]
		}).addStyleClass("ptGenericTile");
		
		var tile = new sap.m.CustomTile({
			height:"100%",
			content : [gTile]
		}).addStyleClass('sapMTile').addStyleClass('ccTileLayout');
		
		//addStyleClass('ptMicroChartTile').removeStyleClass('sapMCustomTile');
		
		//setup a json model to retrieve values on press more easily
		var valueModel = new sap.ui.model.json.JSONModel({
			"header": headerText,
            "contentText": lContentText,
            "subHeader": lSubHeaderText,
            "footer": lFooter,
            "backgroundImage": lBackgroundImage
        });

		tile.setModel(valueModel);

	    var onTilePress = function(oControlEvent) {
	    	
	    	var oLayout = oControlEvent.getSource().getContent();
	    	var model = oLayout.getModel();
	    	var content = model.getProperty("/contentText");
	    	
			var tileId = oControlEvent.getParameters().id;
			var tiles = that.getTiles();
			var tile = null;
			
			for(var i=0;i<tiles.length;i++)
			{
				var currentTile = tiles[i]; 
				if(tiles[i].sId === tileId){
					tile = currentTile;
					tile.addStyleClass("cc-Tile-clicked");
				}else{
					currentTile.removeStyleClass("cc-Tile-clicked");
				}
			}
			
			if(tile === null){
				if(window.console)console.log("no tile found with id "+tileId);
			}else{
				that.setDCurrentHeader(model.getProperty("/header"));				
				that.setDCurrentSubHeader(model.getProperty("/subHeader"));
				that.setDCurrentFooter(model.getProperty("/footer"));
				that.setDCurrentValueText(model.getProperty("/value"));
				
				that.fireDesignStudioPropertiesChanged(["DCurrentHeader","DCurrentFooter","DCurrentValue","DCurrentValueText","DCurrentUnit","DCurrentIconString"]);
				that.fireDesignStudioEvent("onTilePress");
			}
		};
		tile.attachPress(onTilePress);
		
		//microCharts.push(tile.getTileContent().getContent());       !!!!!!!!!!!!!!!!!!!

		this.addTile(tile);
	},

//********************************************************************************
	testCreateTile : function(data, j){					//data
		
		var that = this;
		
		var idDimension 		= this.getDTargetDim();
		var headerDim 			= this.getDHeaderDim();
		var subHeaderDim 		= this.getDSubHeaderDim();
		var footerDim 			= this.getDFooterDim();
		var measureDimension	= this.getDMeasureDim();
		var comparisonDim 		= this.getDComparisonDim();
		var backgroundImageDim 	= this.getDBackgroundImageDim();
		var urlDim 				= this.getDURLDim();
		
		var tileType			= "MicroChart";
		var headerText 			= "";
		var lContentText 		= "";
		var lSubHeaderText 		= "";
		var lFooter 			= "";
		var url					= "";
		var trendIndicator		= "";
		var	color_class			= ""; 
		var value 				= "";
		var value 				= "";
		var unit 				= "";
		var icon				= "";
		
		if (this.getMicroChartByKeyInternal(data[idDimension])=="[]")
		{
			this.createCustomTile(data);
		}
		else
		{	
		
		if(data[measureDimension] !== undefined){
				scale = Math.pow(10, data[measureDimension].scale);
				tempValue = data[measureDimension].data;
				
				if (tempValue !== "null")
				{
					value = (data[measureDimension].data)*scale;
				}
				else
				{	
					value = "";
				}
				
				if(data[comparisonDim] !== undefined){
					var compare = data[comparisonDim].data;
					var tolerance = this.getDComparisonTolerance()/100;
					var diff = Math.abs(value-compare);
					value_tolerance = Math.abs(value*tolerance);
					//Test if abs of comparison difference is within tolerance range
					if(diff < value_tolerance){
						trendIndicator = "cc-arrow-right";
						color_class = "cc-normal";
					}
					else if(value < compare){
						trendIndicator = "cc-arrow-down";
						color_class = "cc-bad";
					}else if(value > compare){
						trendIndicator = "cc-arrow-up";
						color_class = "cc-good";
					}//should not happen
					else{
						trendIndicator = "";
						color_class = "cc-warning";
					}
				}
				
				if (value !== "")
				{
					value = numeral(value).format(this.getDNumeralString());
				}
			}	
			
		if(data[headerDim] !== undefined){
			if(that.isMeasure(headerDim)){
				headerText = headerDim;	
			}else{
				headerText = data[headerDim];	
			}
			var icons = this.getDIconMapping();
			
			if(icons !== undefined){
				for(var i=0;i<icons.length;i++){
					if(icons[i].DDimValue === headerText){
						icon = icons[i].DIconString;
					}
				}
			}
		}
		if(data[subHeaderDim] !== undefined){
			if(that.isMeasure(subHeaderDim)){
				subHeaderText = subHeaderDim;
			}else{
				subHeaderText = data[subHeaderDim];	
			}
		}
		
		if(data[footerDim] !== undefined){
			if(that.isMeasure(footerDim)){
				lFooter = footerDim;  
			}else{
				lFooter = data[footerDim];	
			}
		}
	
		function fnPointsFactory() {
			/*if (isEmphasizedMode()) {
				return new sap.suite.ui.microchart.LineMicroChartEmphasizedPoint({
					x: "{x}",
					y: "{y}",
					show: "{show}",
					color: "{color}"
				});
			} else {*/
				return new sap.suite.ui.microchart.LineMicroChartPoint({
					x: "{x}",
					y: "{y}"
				});
			//}
		}
		
		//function fnPress(oEvent) {
		//	sap.m.MessageToast.show("The chart is pressed.");
		//};
		
		//if (that._microCharts.length-1 < j)
		//{
		//	this.createInitialMicroChart();
		//}
		
		//var oChart = that._microCharts[j];
		
		var spec = this.getMicroChartByKeyInternal(data[idDimension]);	//that.getComponentsSpec(); //getChartSpecification();
		
// MicroChart container	- may remain empty
		var layPanel = new sap.ui.layout.VerticalLayout(
				{
					id: that.sId + "layPanel" + j,
					height: "3.5rem",
					width: "8rem"
				}
				).addStyleClass('ccTileContentContainer');;
		
		//console.log(spec);
		
		if (spec != "")
		{				
			spec = JSON.parse(spec);
			spec = that.buildTree(spec);
		
			var layout = that.getLayoutSpec();
			layout = JSON.parse(layout);
			layout = that.buildTree(layout);
						
			var newSpec = JSON.parse(JSON.stringify(spec));

			var objectContainer = [];
			objectContainer = that.calculateContent(that, newSpec, layout, "_", "1");
		
			that._content = [];
			that._content.push(that.calculateContent(that, newSpec, layout, "_", "1"));
			
			for(var RowIn in that._content) {
				for (var compIndex in that._content[RowIn]) {
					var comp = that._content[RowIn][compIndex];
						
						if (comp.__specification.threshold == "")
						{	
							comp.__specification.threshold = null;
						}
					
						var compObj = that.createComponentByJson(that, comp.__componentType, comp.__specification, false);

						if(compObj != undefined) {
							compObj.__specification = comp;
							compObj.__componentType = comp.__componentType;
							compObj.__owner = layPanel;
							compObj.__mainOwner = that;
							
							
							layPanel.addContent(compObj, comp.__layoutSettings);
							
							//that._oComponents[comp.__techKey] = compObj;
							//that.forwardProperties(that, compObj, comp, false);
						}
					}
				}
		}

			
// Trend indicator calculations
		/*if(data[comparisonDim] !== undefined){
			var compare = data[comparisonDim].data;
			var tolerance = this.getDComparisonTolerance()/100;
			var diff = Math.abs(value-compare);
			value_tolerance = Math.abs(value*tolerance);
			//Test if abs of comparison difference is within tolerance range
			if(diff < value_tolerance){
				trendIndicator = "cc-arrow-right";
				color_class = "cc-normal";
			}
			else if(value < compare){
				trendIndicator = "cc-arrow-down";
				color_class = "cc-bad";
			}else if(value > compare){
				trendIndicator = "cc-arrow-up";
				color_class = "cc-good";
			}//should not happen
			else{
				trendIndicator = "";
				color_class = "cc-warning";
			}
		}*/
		trendIndicator = "cc-arrow-up";
		color_class = "cc-good";
		
// Trend indicators
		var oLayoutVValueSuffix = new sap.ui.layout.VerticalLayout({
			content: [
			          new sap.m.Text({text : ""}).addStyleClass(trendIndicator),
			          new sap.m.Text({text : "mil"}).addStyleClass('ccMicroChartUnitText').addStyleClass(color_class)
			          ]
		}).addStyleClass('ccMicroChartUnitLayout');
		
// KPI value
		var oValue = new sap.ui.layout.HorizontalLayout({
			content: [
			          new sap.m.Text({text : "42"}).addStyleClass('ccMicroChartValueText').addStyleClass(color_class),
			          oLayoutVValueSuffix
			          ]
		}).addStyleClass('ccMicroChartValueAndUnitLayout');
		
		var oValueVerticalContainer = new sap.ui.layout.VerticalLayout({
			content: [
		          		oValue
	    	          ]
	    }).addStyleClass('ccValueVerticalContainer');
		
// Footer and MicroChart container		
		var oTileContent = new sap.m.TileContent({
			footer: lFooter,
			content: [layPanel]
		}).addStyleClass("ccTileContent");	

// Header and Subheader container
		var oHeaderContainer = new sap.ui.layout.VerticalLayout({
			content: [
						new sap.m.Text({text : headerText}).addStyleClass('ccMicroChartHeaderText'),
						new sap.m.Text({text : subHeaderText}).addStyleClass('ccMicroChartSubHeaderText')
	    	          ]
	    }).addStyleClass('ccValueVerticalContainer');
		
// All content in a VBOX to justify top and bottom with space between
// Content: header, subheader, KPI value, MicroChart, footer		
		var oAllContent = new sap.m.VBox({
			height: "100%",
			width: "100%",
			alignItems: sap.m.FlexAlignItems.Start,
			justifyContent: sap.m.FlexJustifyContent.SpaceBetween
	    }).addStyleClass('ccAllContent');
		
		oAllContent.addItem(oHeaderContainer);
		oAllContent.addItem(oTileContent);

// CustomTile container
		var tile = new sap.m.CustomTile({
			height:"100%",
			content : [oAllContent]
		}).addStyleClass('sapMTile').addStyleClass('ccMicroChartTileLayout');
		
		//setup a json model to retrieve values on press more easily
		var valueModel = new sap.ui.model.json.JSONModel({
            "header": headerText,
            "subHeader": subHeaderText,
            "icon": icon,
            "value": value,
            "unit": unit,
            "url": url,
            "trendIndicator": trendIndicator,
            "footer": lFooter,
        });


		tile.setModel(valueModel);
		

		 var onTilePress = function(oControlEvent) {
		    	
		    	var oLayout = oControlEvent.getSource().getContent();
		    	var model = oLayout.getModel();
		    	var value = model.getProperty("/header");
		    	
				var tileId = oControlEvent.getParameters().id;
				var tiles = that.getTiles();
				var tile = null;
				
				for(var i=0;i<tiles.length;i++){
					var currentTile = tiles[i]; 
					if(tiles[i].sId === tileId){
						tile = currentTile;
						tile.addStyleClass("cc-Tile-clicked");
					}else{
						currentTile.removeStyleClass("cc-Tile-clicked");
					}
				}
				
				if(tile === null){
					if(window.console)console.log("no tile found with id "+tileId);
				}else{
					var iconString = model.getProperty("/icon");
					var orig_value = that.retrieveValueByDimension(model.getProperty("/header"));
					
					that.setDCurrentHeader(model.getProperty("/header"));
					that.setDCurrentSubHeader(model.getProperty("/subHeader"));
					that.setDCurrentFooter(model.getProperty("/footer"));
					that.setDCurrentValue(orig_value);
					that.setDCurrentValueText(model.getProperty("/value"));
					that.setDCurrentUnit(model.getProperty("/unit"));
					that.setDCurrentURL(model.getProperty("/url"));
					that.setDCurrentIconString(iconString);
					
					that.fireDesignStudioPropertiesChanged(["DCurrentHeader","DCurrentFooter","DCurrentValue","DCurrentValueText","DCurrentUnit","DCurrentURL","DCurrentIconString"]);
					that.fireDesignStudioEvent("onTilePress");
				}
			};
		
		tile.attachPress(onTilePress);
		
		that.addTile(tile);
		} // else of 
	},

//************* MULTITYPE TILE ***************************************************
	createMultiType : function(data){
		
		var that = this;
			
		var headerDim 			= this.getDHeaderDim();
		var subHeaderDim 		= this.getDSubHeaderDim();
		var footerDim 			= this.getDFooterDim();
		var backgroundImageDim 	= this.getDBackgroundImageDim();
		var urlDim 				= this.getDURLDim();
		var tileType			= "MicroChart";
		
		var headerText 			= "";
		var lContentText 		= "";
		var lSubHeaderText 		= "";
		var lFooter 			= "";
		var url					= "";
		
		if(data[headerDim] !== undefined){
			if(that.isMeasure(headerDim)){
				lContentText = headerDim;
			}else{
				lContentText = data[headerDim];	
			}
		}
		
		
		if(data[headerDim] !== undefined){
			if(that.isMeasure(headerDim)){
				headerText = headerDim;	
			}else{
				headerText = data[headerDim];	
			}
			var icons = this.getDIconMapping();
			
			if(icons !== undefined){
				for(var i=0;i<icons.length;i++){
					if(icons[i].DDimValue === headerText){
						icon = icons[i].DIconString;
					}
				}
			}
		}

		if(data[subHeaderDim] !== undefined){
			if(that.isMeasure(subHeaderDim)){
				lSubHeaderText = subHeaderDim;
			}else{
				lSubHeaderText = data[subHeaderDim];	
			}
		}
		
		if(data[footerDim] !== undefined){
			if(that.isMeasure(footerDim)){
				lFooter = footerDim;  
			}else{
				lFooter = data[footerDim];	
			}
		}
	
		if(data[backgroundImageDim] !== undefined){
			if(that.isMeasure(backgroundImageDim)){
				lBackgroundImage = backgroundImageDim;  
			}else{
				lBackgroundImage = data[backgroundImageDim];	
			}
		}
						
		
									var oActual = new sap.suite.ui.microchart.BulletMicroChartData();
								    oActual.setValue(70);
								    oActual.setColor("Good");
								  
								    var oBulletChart = new sap.suite.ui.microchart.BulletMicroChart({
								      size: "S",
								      scale: "M",
								      targetValue: "0",
								      targetValueLabel: "75",
								      minValue: 0,
								      maxValue: 100,
								      actual: [oActual],
								      thresholds: [new sap.suite.ui.microchart.BulletMicroChartData({
								          value: 35,
								          color: "Critical"
								        })
								      ]
								    });
								    
								    var oForecast = new sap.suite.ui.microchart.BulletMicroChartData();
								    oForecast.setValue(60);
								    oForecast.setColor("Neutral");
	    
	    oBulletChart.setForecastValue(60);
		
		var oTileContent = new sap.m.TileContent({
			footer: 		lFooter,
			content : [oBulletChart]
		}).addStyleClass("ptTileContent");	 
		
		var gTile = new sap.m.GenericTile( {    
			frameType: 			"OneByOne",
			header		: headerText,
			tileContent : [oTileContent]
		}).addStyleClass("ptGenericTile");
		
		var tile = new sap.m.CustomTile({
			height:"100%",
			content : [gTile]
		}).addStyleClass('sapMTile').addStyleClass('ccTileLayout');
			
		this.addTile(tile);
	},
	

	//***********************buildTree******************************************
	buildTree: function (spec){
		var specTree = [];
		var specHelper = {};
		var specHelperRoot = {};
		
		for (var compSpecInt in spec) {
			var compSpec = spec[compSpecInt];

			if(compSpec.parentKey != "ROOT") {
				specHelper[compSpec.parentKey + compSpec.key] = compSpec;
				var parent = specHelper[compSpec.parentKey];
				if (parent.properties == undefined) {
					parent.properties = [];
				}

				parent.properties.push(compSpec);
				specHelper[compSpec.parentKey + compSpec.key] = parent;
			} else {
				specHelper[compSpec.key] = compSpec;
				specHelperRoot[compSpec.key] = compSpec;
			}
		}

		for (var compSpecKey in specHelperRoot) {
			var content = specHelper[compSpecKey];
			specTree.push(content);
		}
		return specTree;
	},
	
	//**********************calculateContent******************************************
	calculateContent: function (owner, spec, layout, idPrefix, rowI) {
		var that = owner;
		var componentInstances = [];

		for (var compSpecInt in spec) {
			var compSpec = spec[compSpecInt];

			var componentInstance = that.createComponent(owner, compSpec, idPrefix + rowI, rowI);
			if(componentInstance != undefined) {
				componentInstances.push(componentInstance);
			}
		}
		
		if(layout.length > 0) {
			layout[0].properties = layout;
			var componentInstance = that.createComponent(owner, layout[0], idPrefix + rowI, rowI);
			if(componentInstance != undefined) {
				componentInstance.__techKey = "__LAYOUT__";
				componentInstances.push(componentInstance);
			}
		}

		return componentInstances;
	},
	
	// for LineMicroChart
	fnPointsFactory: function() {
		if (isEmphasizedMode()) {
			return new sap.suite.ui.microchart.LineMicroChartEmphasizedPoint({
				x: "{x}",
				y: "{y}",
				show: "{show}",
				color: "{color}"
			});
		} else {
			return new sap.suite.ui.microchart.LineMicroChartPoint({
				x: "{x}",
				y: "{y}"
			});
		}
	},
	
	createComponent: function(owner, spec, idPrefix, rowId) {
		var that = owner;

		spec = that.assureSpecIsCorrect(that, spec);   								// validates if with/height etc is set

		var properties = {};
		var finalProperties = {};
		
		if(spec.specification && spec.specification.length > 0) {
			
			// Replace &quot;
			var toreplace = "";
			toreplace = spec.specification;
			
			toreplace = toreplace.replace(/&(lt|gt|quot);/g, function (m, p) { 
			    return (p == "lt")? "<" : (p == "gt") ? ">" : "'";
			  });
			
			spec.specification = toreplace;
			
			specProperties = that.readFullSpec(that, spec.specification);			// readFullSpec ???

			var content = specProperties[spec.componentType];
			
			for (var prName in content) {											// ???
				var propDef = {};
				propDef.key = prName;
				propDef.value = content[prName];

				if(typeof propDef.value == "Array") {

				}
				finalProperties[prName] = propDef;
			}
		}
		
		for (var prIndex in spec.properties) {
			var prop = spec.properties[prIndex];
			prop.key = prop.key.replace(spec.key + "/", "");
			
			if(prop.dimension != undefined && prop.dimension != "") {
				var realValue = prop.dimension;
				
				realValue = that.findRowContent(that, realValue, rowId);

				if(prop.cast) {
					if(prop.cast == "integer") {
						prop.value = "" + parseInt(realValue);
					} else if(prop.cast == "double") {
						prop.value = "" + parseFloat(realValue);
					} else {
						prop.value = realValue;	
					}
				} else {
					prop.value = realValue;	
				}
				
			}

			if(prop.key.indexOf("/") > -1) {
				var targetProperty = finalProperties;
				while (prop.key.indexOf("/") > -1) {
					var next = prop.key.substring(0, prop.key.indexOf("/"));
					
					if(prop.key.indexOf("/") > -1) {
						if(targetProperty[next].value) {
							targetProperty = targetProperty[next].value;
						} else {
							targetProperty = targetProperty[next];
						}
						
					} else {
						targetProperty[next] = prop.value;	
					}

					prop.key = prop.key.substring(prop.key.indexOf("/")+1);
					
					if(prop.key.indexOf("/") == -1) {
						targetProperty[prop.key] = prop.value;
					}
				}
			} else {
				finalProperties[prop.key] = prop;
			}

			if(!prop.value) {
				prop.value = "";
			}

			if(prop.value.indexOf("[") == 0 || prop.value.indexOf("/") == 0 || prop.value.indexOf("{") == 0) {
				var realValue = prop.value;
				if(realValue.indexOf("/") == 0) {
					realValue = realValue.substring(1);
				}
				realValue = JSON.parse(realValue);
				prop.value = realValue[prop.key];
			}
		}

		for (var prName in finalProperties) {
			var prop = finalProperties[prName];
			prop.key = prop.key.replace(spec.key + "/", "");

			var process = {};
			process[prop.key] = prop.value;
			var ret = that.processContentJson(that, process);

			// return always first if length = 1;
			if(ret.length == 1) {
				ret[prop.key] = ret[0];	
			} else {
				ret = ret;
			}

			prop.valueN = ret;

			properties[prop.key] = prop.valueN[prop.key];
		}

		// special overwrite for events
		properties.press = that.contentOnPress;
		properties.select = that.contentOnSelect;

		properties.leftI = parseInt(spec.left);
		properties.rightI = parseInt(spec.right);
		properties.topI = parseInt(spec.top);
		properties.bottomI = parseInt(spec.bottom);

		var intValue = parseInt(spec.width, 0);//*********************************************************************
		properties["widthI"] = intValue;
		if(isNaN(intValue)) {
			intValue = 8;                     //**********************************************************************
		}
		properties["width"] = intValue + "rem";
		
		intValue = parseInt(spec.height, 0);
		properties["heightI"] = "3.5rem"; //intValue;
		if(isNaN(intValue)) {
			intValue = 3.5;                     // !!!!!!
		}
		properties["height"] = "3.5rem";
		
		var comp = {};
		comp.__specification = properties;

		comp.__layoutSettings = {};
		if(spec.left == "-1") {
			comp.__layoutSettings.right = parseInt(spec.right) + "px";
		} else {
			comp.__layoutSettings.left = parseInt(spec.left) + "px";
		}

		if(spec.top == "-1") {
			comp.__layoutSettings.bottom = parseInt(spec.bottom) + "px";
		} else {
			comp.__layoutSettings.top = parseInt(spec.top) + "px";
		}

		comp.__techKey = spec.key + rowId;
		comp.__componentType = spec.componentType;
		return comp;
	},
	
	assureSpecIsCorrect: function (that, spec) {
		if(!spec.componentType) {spec.componentType = ""};
		if(!spec.top || spec.top == "") {spec.top = "0"};
		if(!spec.bottom || spec.bottom == "") {spec.bottom = "10"};
		if(!spec.left || spec.left == "") {spec.left = "0"};
		if(!spec.right || spec.right == "") {spec.right = "10"};
		if(!spec.width || spec.width == "") {spec.width = "100"};
		if(!spec.height || spec.height == "") {spec.height = "2"};
		if(!spec.specification || spec.specification == "") {spec.specification = ""};

		return spec;
	},
	
	readFullSpec: function (that, fullSpec) {
		var spec = fullSpec;

		if(spec.indexOf("<") == 0) {
			// xml
			var converter = new X2JS({
				 attributePrefix : "",
				 mixedArrays: true
			});
			specJ = converter.xml_str2json(spec);

			spec = specJ;
		} else if(spec.indexOf("{") == 0) {
			spec = JSON.parse(spec);
		} else if(spec == undefined || spec.length == 0) {
			spec = {};
		}

		return spec;
	},
	
	findRowContent: function (that, realValue, rowId) {
		
		var content = "N/A"; //that._flatData.data2DPlain[rowId][that._flatData.colId2Index[realValue]];
		
		if(content==undefined) {
			content = "N/A";
		}

		return content;	
	},
	
	processContentJson: function (owner, iPropValue) {
		var propValue = iPropValue;
		var that = owner;

		var isJson = (typeof propValue == "object");
		if(isJson) {
			var content = undefined;
			var isJsonArray = false;

			for (var loopOnIndex in propValue) {
				var entryArrayId = loopOnIndex;
				var entryArray = propValue[entryArrayId];
				isJsonArray = entryArray instanceof Array;

				if(isJsonArray) {
					if(isJsonArray & content == undefined) {content = []};
					var retObjectS = {};
					var output = that.processContentJson(that, entryArray, retObjectS);

					var obj = {};
					obj[entryArrayId] = output;
					return obj;
				} else {
					var isJsonObject = (typeof entryArray == "object");
					if(isJsonObject) {
						if(content == undefined) {content = []};
						// create object here;
						var properties = {}

						var oneWasAnArray = false;
						var onlySimpleStrings = true;
						for (var loopOnIndexEntry in entryArray) {
							var entryObjectId = loopOnIndexEntry;
							var entryObject = entryArray[entryObjectId];
							var retObjectS = {};

							if(entryObject instanceof Array) {
								// special case for transformed XML

								var newArray = [];
								for (var outputEntryIndex in entryObject) {
									var newEntry = {};
									newEntry[entryObjectId] = entryObject[outputEntryIndex];
									newArray.push(newEntry);
								}
								entryObject = newArray;
								var output = that.processContentJson(that, entryObject);
								for (var compInd in output) {
									content.push(output[compInd]);
								}

								onlySimpleStrings = (false && onlySimpleStrings);
								oneWasAnArray = true;
							} else if (typeof entryObject == "string") {
								// processing later
								var k = 0;
							} else {
								var properties = {};
								var output = that.processContentJson(that, entryObject);
								for (var outputEntryIndex in output) {
									properties[outputEntryIndex] = output[outputEntryIndex];
								}
								
								if(entryObjectId != "__arrayIndex") {
									var comp = that.createComponentByJson(that, entryObjectId, properties, true);      //***********************************
									comp.__clName = entryObjectId;
									comp.__arrayIndex = properties._arrayIndex;
									content.push(comp);
								}

								onlySimpleStrings = (false && onlySimpleStrings);
							}
						}

						if(onlySimpleStrings) {
							var properties = {};
							var output = that.processContentJson(that, entryArray);
							for (var outputEntryIndex in output) {
								properties[outputEntryIndex] = output[outputEntryIndex];
							}
							var comp = that.createComponentByJson(that, entryArrayId, properties, true);     		//*******************************************

							comp.__clName = entryArrayId;
							comp.__arrayIndex = 0;
							content.push(comp);
						}

						if(oneWasAnArray) {
							var mixedContent = {};

							function compareFn(a, b) {
							    return a.__arrayIndex - b.__arrayIndex;
							}
							content.sort(compareFn);

							mixedContent[loopOnIndex] = content;

							content = mixedContent;
						}
					} else {
						if(content == undefined) {content = {}};

						// simple text
						var valueRet = that.fixValue(that, entryArrayId, entryArray);
						content[valueRet.entryArrayId] = valueRet.entryArray;
					}
				}
			}
			
			//console.log(content);
			
			return content;
		}

		return propValue;
	},

	fixValue: function (owner, entryArrayId, entryArray) {
		var that = owner;

		if(entryArrayId.indexOf("-") == 0 || entryArrayId.indexOf("_") == 0) {
			entryArrayId = entryArrayId.substring(1);
		}

		var specialProcessing = false;

		if(!specialProcessing) {
			if(entryArray.indexOf) {
				if(entryArray.indexOf("<") == 0) {
					entryArray = that.readFullSpec(owner, entryArray);
					var parsedValue = that.processContentJson (owner, entryArray);
					entryArray = parsedValue[0];
				} else {
					if(entryArray.indexOf("sap.") == 0) {
						// a class
						entryArray = eval(entryArray);
					} else {
						// boolean or value?
						if(entryArray == "true" || entryArray == "false") {
							entryArray = (entryArray == "true");
						} else {
							if(entryArray.indexOf(".") > -1) {
								var floatValue = parseFloat(entryArray);
								if(!isNaN(floatValue) && (""+floatValue).length == entryArray.length) {
									entryArray = floatValue;
								}	
							}
							var intValue = parseInt(entryArray);
							if(!isNaN(intValue) && (""+intValue).length == entryArray.length) {
								entryArray = intValue;
							}	
						}
					}
				} 
			}
		}

		var valueRet = {};
		valueRet.entryArrayId = entryArrayId;
		valueRet.entryArray = entryArray;

		return valueRet;
	},
	
	//**********************createComponentByJson******************************************
	
	//***********************createComponentByJson******************************************
	createComponentByJson: function (owner, name, jsonDef, createUnique) {
		var that = owner;
		var loopObject = undefined;
		
		//jQuery.sap.declare('sap.suite.ui.microchart.InteractiveBarChartBar');
		//jQuery.sap.require('sap.suite.ui.microchart.InteractiveBarChartBar');
		
		if(createUnique) {
			var unique_id = Math.random();
			jsonDef.id = that.getId() + name + unique_id;//that.nextKey;
//			that.nextKey = that.nextKey + 1;
		}

		if(sap.m[name] != undefined) {
			loopObject = new sap.m[name](jsonDef);
		} else if(sap.ui.core[name] != undefined) {
			loopObject = new sap.ui.core[name](jsonDef);
		} else if(sap.suite.ui.microchart !== undefined && sap.suite.ui.microchart[name] != undefined) {
			loopObject = new sap.suite.ui.microchart[name](jsonDef);
			loopObject.size = sap.m.Size.S;
		} else if(sap.suite.ui.commons[name] != undefined) {
			loopObject = new sap.suite.ui.commons[name](jsonDef);			
		} else {
			console.log("NOT FOUND!");
		}

		return loopObject;
	},
	
	
	afterPrepare: function (owner) {
		var that = owner;

		//that._oRoot.setResponsive(that.getContentResponsive());
		
		for (var compIndex in that._oComponents) {
			var compObj = that._oComponents[compIndex];

			compObj.__owner.removeContent(compObj);
			compObj.destroy();
		}
		for (var compIndex in that._oRowLayyouts) {
			that._oRoot.removeContent(that._oRowLayyouts[compIndex]);
			that._oRowLayyouts[compIndex].destroy();
		}

		that._oComponents = [];
		that._oRowLayyouts = [];

		var lHeight = "100" + "px"; //var lHeight = that.getContentHeight() + "px";

		for(var RowIn in that._content) {
			var columns = 1;//that.getColumnNumber();
			var minWidth = Math.floor(300 / columns);
			var layPanel = new sap.zen.commons.layout.AbsoluteLayout(
																		{
																			id: that.sId + "_fl" + RowIn,
																			height: lHeight,
																			width: minWidth + "px"
																		}
																		);
			
			layPanel.__layData = new sap.ui.layout.ResponsiveFlowLayoutData({
				minWidth : minWidth
			});

			layPanel.setLayoutData(layPanel.__layData);
			that._oRowLayyouts["__LAY" + RowIn] = layPanel;

			// visualization on processed data
			for (var compIndex in that._content[RowIn]) {
				var comp = that._content[RowIn][compIndex];
				
				if(comp.__techKey == "__LAYOUT__") {
					// special case, niy
					var compObj = that;

					for (var o in comp.__specification) {
						if(o == "press") {
							// for event there will be special logic
							continue;
						}
						if(o == "width" || o == "height" || o == "top"  || o == "bottom"  || o == "left"  || o == "right") {
							// for layout we have to ignore all properties which are originally in ds runtime
							continue;
						}
						var propValue = comp.__specification[o];
						var propKey = o;

						var propKeySetter = "set" + propKey.substring(0,1).toUpperCase() + propKey.substring(1);
						var propKeyGetter = "get" + propKey.substring(0,1).toUpperCase() + propKey.substring(1);
						if(compObj[propKeyGetter]) {
							var old = compObj[propKeyGetter]();
							if(old.destroy) {
								old.destroy();
							}
						}
						if(propValue != "-clean-") {
							if(compObj[propKeySetter]) {compObj[propKeySetter](propValue);}	
						}
					}
				} else {
					if(comp.__componentType == "") {
						continue;
					}
					
					var compObj = that._oComponents[comp.__techKey];
					if(compObj != null) {
						that.forwardProperties(that, compObj, comp, true);

						layPanel.setPositionOfChild(compObj, comp.__layoutSettings);
					} else {
						
						compObj = that.createComponentByJson(that, comp.__componentType, comp.__specification, false);
						
						
						
						if(compObj != undefined) {
							compObj.__specification = comp;
							compObj.__componentType = comp.__componentType;
							compObj.__owner = layPanel;
							compObj.__mainOwner = that;

							layPanel.addContent(compObj, comp.__layoutSettings); ////////
							that._oComponents[comp.__techKey] = compObj;

							that.forwardProperties(that, compObj, comp, false);
						}
					}
				}

				// modify the custom style classes
				if(comp.__specification.styleClass) {
					var customStyles = compObj.aCustomStyleClasses;
					if(customStyles) {
						for (var stClInt in customStyles) {
							if(customStyles[stClInt].indexOf("scn-pack-") == -1) {
								compObj.removeStyleClass(customStyles[stClInt]);
							}
						}
					}
					var classes = comp.__specification.styleClass.split(" ");
					for (var classInd in classes) {
						compObj.addStyleClass(classes[classInd]);
					}
				}
			}

			that._oRoot.addContent(layPanel);
		}

		if(that._oResize) {that._oResize(true, true);}
	},
	
	
	forwardProperties: function (owner, compObj, comp, isAll) {
		var that = owner;
		
		for (var o in comp.__specification) {
			if(o == "press" || o == "click") {
				// for event there will be special logic
				continue;
			}

			var propKey = o;
			if(isAll == true || propKey.indexOf("/") > -1) {
				var propValue = comp.__specification[o];

				if(propKey.indexOf("/") > -1) {
					var parts = propKey.split("/");
					var currentObject = compObj;
					var ret = {};
					for (var propPartInt in parts) {
						var propPart = parts[propPartInt];

						// last part in the property?
						if(propKey.indexOf(propPart) == propKey.length - propPart.length) {
							if(propPart.indexOf("[") == 0) {
								propPart = propPart.substring(1).replace("]", "");

								objectToDestroy = currentObject[propPart];
								objectToDestroy.destroy();
								currentObject[propPart] = propValue;

								that.setFinalProperty(that, ret.parent, parts[propPartInt-1], currentObject);
							} else {
								that.setFinalProperty(that, currentObject, propPart, propValue);
							}
						} else {
							if(propPart.indexOf("[") == 0) {
								propPart = propPart.substring(1).replace("]", "");
								currentObject = currentObject[propPart];
							} else {
								ret = that.getCurrentObject(that, currentObject, propPart);
								currentObject = ret.current;
								if(currentObject == undefined) {
									break;
								}
							}							
						}
					}
				} else {
					that.setFinalProperty(that, compObj, propKey, propValue);
				}
			}
		}
	},
	
	contentOnPress: function (oEvent) {
		var that = oEvent.getSource().__mainOwner;

		var componentId = oEvent.getSource().__specification.__techKey;

		//that.setClickedComponent(componentId);					!!!!
		//that.setSelectedKey("");
		//that.fireDesignStudioPropertiesChangedAndEvent(["clickedComponent", "selectedKey"], "OnClick");
		//that.fireDesignStudioPropertiesChangedAndEvent();
		that.fireDesignStudioEvent("onTilePress");
		
	},

	contentOnSelect: function (oEvent) {
		var that = oEvent.getSource().__mainOwner;

		var componentId = oEvent.getSource().__specification.__techKey;
		var selectedKey = oEvent.getParameters().selectedKey;

		that.setClickedComponent(componentId);
		that.setSelectedKey(selectedKey);
		that.fireDesignStudioPropertiesChangedAndEvent(["clickedComponent", "selectedKey"], "OnSelect");
		
	},

	getCurrentObject: function(that, currentObject, propKey) {
		var propKeySetter = "set" + propKey.substring(0,1).toUpperCase() + propKey.substring(1);
		var propKeyGetter = "get" + propKey.substring(0,1).toUpperCase() + propKey.substring(1);

		var ret = {};
		ret.parent = currentObject;
		if(currentObject[propKeyGetter]) {
			currentObject = currentObject[propKeyGetter]();
		}
		ret.current = currentObject;

		return ret;
	},

	setFinalProperty: function (owner, compObj, propKey, propValue) {
		var that = owner;

		var functionName = propKey.substring(0,1).toUpperCase() + propKey.substring(1);
		var propKeySetter = "set" + functionName;
		var propKeyGetter = "get" + functionName;

		var propKeyAdd = "add" + functionName;
		if(propKeyAdd.substring(propKeyAdd.length-1) == "s") {
			propKeyAdd = propKeyAdd.substring(0, propKeyAdd.length-1);
		}
		var propKeyRemoveAll = "removeAll" + functionName;

		if(compObj[propKeySetter]) {
			if(compObj[propKeyGetter]) {
				var old = compObj[propKeyGetter]();
				if(old && old.destroy) {
					old.destroy();
				}
			}

			if(propValue != "-clean-") {
				compObj[propKeySetter](propValue);
			} else {
				compObj[propKeySetter](undefined);
			}
		} else {
			if(compObj[propKeyRemoveAll]) {
				compObj[propKeyRemoveAll]();
			}

			var isArray = propValue instanceof Array;
			if(isArray) {
				for (var arrIn in propValue) {
					var arrObj = propValue[arrIn];

					compObj[propKeyAdd](arrObj);
				}
			} else {
				if(compObj[propKeyAdd]) {
					compObj[propKeyAdd](propValue);	
				}
			}
		}
	},
	
		
		flattenData: function(){
			var result = [];
			var row_start = "{";
			var row_end = "}";
			var row = row_start;
			var count_steps = 0;
			
			var _data = this.getData();
			
			if(_data.dimensions !== undefined){
				var dims = _data.dimensions;
				var members_length = dims[0].members.length;
								
				for(var i=0;i<_data.data.length;i++){
					var data = _data.data[i];
					
					//determine end of tuple
					if(count_steps === members_length-1){
						var measure = _data.dimensions[0].members[count_steps];
						var unit = measure.unitOfMeasure;
						var scale = measure.scalingFactor;
						if(unit === undefined)unit = "";
						if(scale === undefined)scale = '""';
						
						row += '"'+measure.text+'":{"data":'+_data.data[i]+',"unit":"'+unit+'","scale":'+scale+'},';
						var tuple = _data.tuples[i];
						
						for(var k=1;k<tuple.length;k++){
							var currentIdx = tuple[k];
							var currentDim = dims[k];
							var currentMember = currentDim.members[currentIdx];
							if(k===tuple.length-1){
								row += '"'+currentDim.key+'":"'+currentMember.text+'"';
							}else{
								row += '"'+currentDim.key+'":"'+currentMember.text+'",';	
							}
						}
						row += row_end;
						//complete row
						row = JSON.parse(row);
						result.push(row);
						//reset string to start over with next row
						row = row_start;
						count_steps = 0;
					}else{
						var measure = _data.dimensions[0].members[count_steps];
						var unit = measure.unitOfMeasure;
						var scale = measure.scalingFactor;
						if(unit === undefined)unit = "";
						if(scale === undefined)scale = '""';
						row += '"'+measure.text+'":{"data":'+data+',"unit":"'+unit+'","scale":'+scale+'},';
						//keep track of row in String array formattedData
						count_steps++;	
					}
				}
			}
			return result;
		},
		
		retrieveValueByDimension : function(dim){

			for(var i=0;i<this.currentFlatData.length;i++){
				var itm = this.currentFlatData[i];
				var target = this.getDTargetDim();
				var measure = this.getDMeasureDim();
				if(itm[target] === dim){
					return itm[measure].data;
				}
			}
			return null;
		},
		
		isMeasure : function(dimension){
			var members = this.currentData.dimensions[0].members
			for(var i=0;i<members.length;i++){
				if(members[i].text === dimension){
					return true;
				}
			}
			return false
		}
	});
});
