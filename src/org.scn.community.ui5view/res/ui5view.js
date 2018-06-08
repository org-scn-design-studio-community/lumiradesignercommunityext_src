define(["sap/designstudio/sdk/SDKModel"], function(SDKModel) {
	sap.m.Panel.extend("org.scn.community.ui5view.XMLView", {
		initDesignStudio: function() {
			// 
		},
		renderer: {},
		setXml: function(xml) {
			this._xml = xml;
		},
		setData: function(json) {
			this._model = new SDKModel(json);
			if (this._view) {
				this._view.setModel(this._model);
			}
		},
		setJs: function(js) {
			try {
				eval(js);				
			}
			catch(e) {
				// Not sure what we could do
			}
		},
		afterDesignStudioUpdate: function() {
			if (!this._constructorCalled) {
				try {
					this.destroyContent();
				    this._view = new sap.ui.core.mvc.XMLView({viewContent: this._xml});
				    this._view.placeAt(this);
				} catch(e) {
					
				}
				this._view.setModel(this._model);
			}			
		}
	});
		
});

