sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/GenericTile",
    "sap/m/SlideTile",
    "sap/m/TileContent",
    "sap/m/NumericContent",
    "sap/m/NewsContent",
    "sap/m/FeedContent"
    ], function(Controller, GenericTile, SlideTile, TileContent, NumericContent, NewsContent, FeedContent) {
	"use strict";
	return Controller.extend("org.scn.community.lumiradesigner.tiles.mvc.Tiles", {
		renderFactory : function(sId, oContext){
			// One way to get property for further processing...
			var header = oContext.getProperty("header");
			var tile = new GenericTile({
				// Shorthand way
				header : "{DS>header}",
				tileContent : [
					new sap.m.TileContent({
						content : new sap.m.NumericContent({
							value : "123"
						})
					})
				]/*,
				subheader : "{DS>subheader}",
				backgroundImage : "{DS>backgroundImage}",
				headerImage : "{DS>headerImage}",
				imageDescription : "{DS>imageDescription}",
				size : "{DS>size}",*/
				// frameType : frameType
			});
			tile.addStyleClass("sapUiTinyMarginBegin");
			tile.addStyleClass("sapUiTinyMarginTop");
			tile.addStyleClass("tileLayout");
			return tile;
		},
		onInit: function(oEvent) {
			
		}
    });
});