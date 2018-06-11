define([ "sap/designstudio/sdk/SDKModel" ], function(SDKModel) {
	sap.m.Panel.extend("org.scn.community.ui5view.XMLView", {
		initDesignStudio : function() {
			// 
		},
		renderer : {},
		setXml : function(xml) {
			this._xml = xml;
			this._view = null;
		},
		setData : function(json) {
			this._model = new SDKModel(json);
			if (this._view) {
				this._view.setModel(this._model);
			}
		},
		setJs : function(js) {
			try {
				eval(js);
			} catch (e) {
				// ignore error during controller parsing
			}
		},
		afterDesignStudioUpdate : function() {
			if (!this._view) {
				this.destroyContent();
				try {
					this._view = new sap.ui.core.mvc.XMLView({
						viewContent : this._xml
					});
					this._view.setModel(this._model);
				} catch (e) {
					this._view = new sap.m.Text({text: e.toString()});
				}				
				this._view.placeAt(this);
			}
		}
	});

});
