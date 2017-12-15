
 //%DEFINE-START%
var scn_pkg="org.scn.community.";if(sap.firefly!=undefined){scn_pkg=scn_pkg.replace(".","_");}
define([
	"sap/designstudio/sdk/component",
	"./KpiTileSpec",
	"../../../"+scn_pkg+"shared/modules/component.core",
	"../../../"+scn_pkg+"shared/modules/component.basics",
	"../../../"+scn_pkg+"shared/modules/component.databound",
	"../../../"+scn_pkg+"basics/os/sapui5/sap_m_loader",
	"../../../"+scn_pkg+"basics/os/sapui5/sap_suite_loader",
	"../../../"+scn_pkg+"basics/os/x2js/xml2json"
	],
	function(
		Component,
		spec,
		core,
		basics
	) {
//%DEFINE-END%

var myComponentData = spec;	



createComponent: function(owner, spec, idPrefix, rowId) {
		var that = owner;

		spec = that.assureSpecIsCorrect(that, spec);

		var properties = {};

		var finalProperties = {};
		if(spec.specification && spec.specification.length > 0) {
			specProperties = that.readFullSpec(that, spec.specification);

			var content = specProperties[spec.componentType];
			for (var prName in content) {
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

		var intValue = parseInt(spec.width, 10);
		properties["widthI"] = intValue;
		if(isNaN(intValue)) {
			intValue = 200;
		}
		properties["width"] = intValue+"px";
		
		intValue = parseInt(spec.height, 10);
		properties["heightI"] = intValue;
		if(isNaN(intValue)) {
			intValue = 40;
		}
		properties["height"] = intValue + "px";
		
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