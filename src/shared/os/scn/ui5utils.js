define(function () {
	/**
	 * APS Info (Static)
	 */
	var componentInfo = {
		visible : true,
		title : "Not Titled",
		icon : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHySURBVDhPlY9NaxNRFIbPbdKFK1HwB7hxowvBVUXwB4h7xY3dK/oDBCmYNoGYtqixYHWTCIKL0oJ1YW2aBPrhTBPbkRYsVWkTC8GEaqfJzP2q771jpS1ufGfuuXfe85xz7tDef+pogdYaMVltec3w7+dB/WPCdiCP5zb6Fls4q6P84QJp8xPf/LOvN69PbUkV2YdEBokWHtvv2rs6vajFn666jTauZJvYhGXMBHDmrjaGUp/Jf2bZFXq2PuI14WCsbYWjiRRxkEJC7339FRx7stQ1XGWjX+4Wa0iaggOiP7vWAhVKO1t+bMjFy7KrNybXtZJQBESFhM5G2KSJSw0/lp6LZebpkXfz7Zo2tEmCtldQFPFQh0suRLbynQ0tdqdnWcY597zyww/9ALP3FRVwTFVq2Nm8+NI7nZ2PPZyLp0pdySJLlS7nq5dy1Z9oZnmpJGEBD7g4P7pAgw71lygxwxLvKTFN/WVKlVnmQ265DijkApFMkLLlByfThe5U+WrOvZJ32YPCiYGpO29WTiWn44Pu/cIasI4pECSMJN4Lj0vxvmJ9e7fhd3pGZm+PL4tWo/dVhQYWxrw6kCDk4EhwEYYcGvdq9yY/CY4/582d9k4ngOlsNG+NfYQFRdFMAGMqgoC3d+0xNJ51TVuY1jUk578Bvm+Y4nNJ66IAAAAASUVORK5CYII=",
		author : "Anonymous",
		description : "UI5 Component",
		topics : [{
				title : "SDK Component",
				content : "This component is an UI5 SDK Component.  Be sure you install the plugin to your server platform should you find it useful."
			}, {
				title : "SCN SDK Components License",
				content : "SCN SDK Components License is released under the Apache 2.0 License. Please refer to the licenses for the full copyright restrictions placed on this software.  (<a target='_blank' href='http://www.apache.org/licenses/LICENSE-2.0'>Apache 2.0 License</a>)"
			}
		]
	};
	/**
	 * Return UI5 Utility Object
	 */
	return {
		init : function (options) {
			var extension = {
				renderer : { },
				metadata : { },
				/**
				 * Relays Design Studio Property Information over to Additional Properties Sheet.
				 */
				getPropertyMetaData : function () {
					var r = [];
					for (var prop in dsProperties) {
						var o = {
							name : prop,
							opts : dsProperties[prop].opts || {}
						}
						if (!o.opts.noAps)
							r.push(o);
					}
					return JSON.stringify(r);
				},
				/**
				 * Relays Design Studio APS Information
				 */
				getComponentInformation : function(){
					return JSON.stringify(componentInfo);
				},
				/**
				 * initDesignStudio
				 */
				initDesignStudio : function(){
					
				}
			};
			var dsProperties = options.dsProperties || {};
			var properties = {};
			// If Design Studio Metadata is intended to be a UI5 metadata property, add it now.
			for(var p in dsProperties){
				var property = dsProperties[p];
				if(property.ui5Meta) {
					properties[p] = property.ui5Meta;
					if(property.processing=="JSON"){
						// TODO
					}
				}
			}
			extension.metadata.properties = properties;
			return {
				componentInfo : componentInfo,
				extension : extension
			};
		}
	};
});
