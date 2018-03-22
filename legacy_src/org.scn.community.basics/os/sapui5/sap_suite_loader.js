define([
        ]
     , function() {

// load sap.m and sap.me
var oCore = sap.ui.getCore();

// mark forced re-load of sap.m events bundle
oCfgData = window["sap-ui-config"]

if(oCfgData.libs.indexOf("sap.suite.ui.commons") == -1) {
	jQuery.sap.registerModulePath("sap.suite.ui.commons", sap.zen.createStaticSdkMimeUrl("org.scn.community.basics","os") + "/sapui5/suite");

	oCore.loadLibrary("sap.suite.ui.commons");
	oCfgData.libs = oCfgData.libs + ",sap.suite.ui.commons";
}

if(oCfgData.libs.indexOf("sap.suite.ui.microchart") == -1) {
//	jQuery.sap.registerModulePath("sap.suite.ui.microchart", sap.zen.createStaticSdkMimeUrl("org.scn.community.basics","os") + "/sapui5/suite");

	oCore.loadLibrary("sap.suite.ui.microchart");
	oCfgData.libs = oCfgData.libs + ",sap.suite.ui.microchart";
}

if(sap.suite.ui.commons.HarveyBallMicroChartItem == undefined) {
	/*!
	 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
	 */
	jQuery.sap.declare('sap.suite.ui.commons.HarveyBallMicroChartItem');
	jQuery.sap.require('sap.suite.ui.commons.library');
	jQuery.sap.require('sap.ui.core.Element');
	sap.ui.core.Element.extend('sap.suite.ui.commons.HarveyBallMicroChartItem',
			{metadata:{
						library:'sap.suite.ui.commons',
						properties:{'color':{type:'sap.suite.ui.commons.InfoTileValueColor',group:'Misc',defaultValue:sap.suite.ui.commons.InfoTileValueColor.Neutral},
							'fraction':{type:'float',group:'Misc',defaultValue:0},
							'fractionLabel':{type:'string',group:'Misc',defaultValue:null},
							'fractionScale':{type:'string',group:'Misc',defaultValue:null},
							'formattedLabel':{type:'boolean',group:'Misc',defaultValue:false}}}});
}

if(sap.suite.ui.commons.HarveyBallMicroChart == undefined) {
	/*!
	 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
	 */
	jQuery.sap.declare('sap.suite.ui.commons.HarveyBallMicroChart');
	jQuery.sap.require('sap.suite.ui.commons.library');
	jQuery.sap.require('sap.ui.core.Control');
	sap.ui.core.Control.extend('sap.suite.ui.commons.HarveyBallMicroChart',
				{metadata:
					{library:'sap.suite.ui.commons',
					properties:{'total':{type:'float', group:'Misc', defaultValue:0},
								'totalLabel':{type:'string',group:'Misc',defaultValue:null},
								'totalScale':{type:'string',group:'Misc',defaultValue:null},
								'formattedLabel':{type:'boolean',group:'Misc',defaultValue:false},
								'showTotal':{type:'boolean',group:'Misc',defaultValue:true},
								'showFractions':{type:'boolean',group:'Misc',defaultValue:true},
								'size':{type:'sap.suite.ui.commons.InfoTileSize',group:'Misc',defaultValue:sap.suite.ui.commons.InfoTileSize.Auto},
								'colorPalette':{type:'string[]',group:'Misc',defaultValue:[]},
								'width':{type:'sap.ui.core.CSSSize',group:'Misc',defaultValue:null}},
					aggregations:{'items':{type:'sap.suite.ui.commons.HarveyBallMicroChartItem',multiple:true,singularName:'item'}},
					events:{'press':{}}}});
	sap.suite.ui.commons.HarveyBallMicroChart.M_EVENTS={'press':'press'};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype.getAltText=function(){var a='';var I=true;var b=this.getItems();for(var i=0;i<b.length;i++){var o=b[i];var c=(this.getColorPalette().length==0)?this._rb.getText(('SEMANTIC_COLOR_'+o.getColor()).toUpperCase()):'';var l=o.getFractionLabel();if(!l){l=o.getFormattedLabel()?o.getFraction():o.getFraction()+o.getFractionScale().substring(0,3);}else if(!o.getFormattedLabel()){l+=o.getFractionScale().substring(0,3);}a+=(I?'':'\n')+l+' '+c;I=false;}if(this.getTotal()){var t=this.getTotalLabel();if(!t){t=this.getFormattedLabel()?this.getTotal():this.getTotal()+this.getTotalScale().substring(0,3);}else if(!this.getFormattedLabel()){t+=this.getTotalScale().substring(0,3);}a+=(I?'':'\n')+this._rb.getText('HARVEYBALLMICROCHART_TOTAL_TOOLTIP')+' '+t;}return a;};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var T=this.getAltText();if(typeof t==='string'||t instanceof String){T=t.split('{AltText}').join(T).split('((AltText))').join(T);return T;}return t?t:'';};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle('sap.suite.ui.commons');this.setTooltip('{AltText}');sap.ui.Device.media.attachHandler(this.rerender,this,sap.ui.Device.media.RANGESETS.SAP_STANDARD);};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype._calculatePath=function(){var s=this.getSize();var t=this.getTotal();var f=0;if(this.getItems().length){f=this.getItems()[0].getFraction();}var i=false;if(s=='Auto'){i=jQuery('html').hasClass('sapUiMedia-Std-Phone');}if(s=='S'||s=='XS'){i=true;}var m=i?56:72;var c=m/2;var b=4;this._oPath={initial:{x:c,y:c,x1:c,y1:c},lineTo:{x:c,y:b},arc:{x1:c-b,y1:c-b,xArc:0,largeArc:0,sweep:1,x2:'',y2:''},size:m,border:b,center:c};var a=f/t*360;if(a<10){this._oPath.initial.x-=1.5;this._oPath.initial.x1+=1.5;this._oPath.arc.x2=this._oPath.initial.x1;this._oPath.arc.y2=this._oPath.lineTo.y;}else if(a>350&&a<360){this._oPath.initial.x+=1.5;this._oPath.initial.x1-=1.5;this._oPath.arc.x2=this._oPath.initial.x1;this._oPath.arc.y2=this._oPath.lineTo.y;}else{var r=Math.PI/180.0;var R=this._oPath.center-this._oPath.border;var d=R*Math.cos((a-90)*r)+this._oPath.center;var e=this._oPath.size-(R*Math.sin((a+90)*r)+this._oPath.center);this._oPath.arc.x2=d.toFixed(2);this._oPath.arc.y2=e.toFixed(2);}var l=t/f<2?1:0;this._oPath.arc.largeArc=l;};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype.onBeforeRendering=function(){this._calculatePath();};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype.serializePieChart=function(){var p=this._oPath;return['M',p.initial.x,',',p.initial.y,' L',p.initial.x,',',p.lineTo.y,' A',p.arc.x1,',',p.arc.y1,' ',p.arc.xArc,' ',p.arc.largeArc,',',p.arc.sweep,' ',p.arc.x2,',',p.arc.y2,' L',p.initial.x1,',',p.initial.y1,' z'].join('');};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype._parseFormattedValue=function(v){return{scale:v.replace(/.*?([^+-.,\d]*)$/g,'$1').trim(),value:v.replace(/(.*?)[^+-.,\d]*$/g,'$1').trim()};};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype.ontap=function(e){if(sap.ui.Device.browser.internet_explorer){this.$().focus();}this.firePress();};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype.onkeydown=function(e){if(e.which==jQuery.sap.KeyCodes.SPACE){e.preventDefault();}};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype.onkeyup=function(e){if(e.which==jQuery.sap.KeyCodes.ENTER||e.which==jQuery.sap.KeyCodes.SPACE){this.firePress();e.preventDefault();}};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype.attachEvent=function(e,d,f,l){sap.ui.core.Control.prototype.attachEvent.call(this,e,d,f,l);if(this.hasListeners('press')){this.$().attr('tabindex',0).addClass('sapSuiteUiCommonsPointer');}return this;};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype.detachEvent=function(e,f,l){sap.ui.core.Control.prototype.detachEvent.call(this,e,f,l);if(!this.hasListeners('press')){this.$().removeAttr('tabindex').removeClass('sapSuiteUiCommonsPointer');}return this;};
	sap.suite.ui.commons.HarveyBallMicroChart.prototype.exit=function(e){sap.ui.Device.media.detachHandler(this.rerender,this,sap.ui.Device.media.RANGESETS.SAP_STANDARD);};
}

if(sap.suite.ui.commons.HarveyBallMicroChartRenderer == undefined) {
	/*!
	 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
	 */
	jQuery.sap.declare('sap.suite.ui.commons.HarveyBallMicroChartRenderer');sap.suite.ui.commons.HarveyBallMicroChartRenderer={};
	sap.suite.ui.commons.HarveyBallMicroChartRenderer.render=function(r,c){var R=sap.ui.getCore().getConfiguration().getRTL();var t=c.getTooltip_AsString();if(typeof t!=='string'){t='';}var v='';var V='';var f=false;var a=0;var C='';var s=false;if(c.getItems().length){var p=c.getItems()[0];a=p.getFraction();C=p.getColor();v=p.getFractionLabel()?p.getFractionLabel():''+p.getFraction();V=p.getFractionScale().substring(0,3);f=p.getFormattedLabel();}if(f){var F=c._parseFormattedValue(v);V=F.scale.substring(0,3);v=F.value;}var T=c.getTotal();var b=c.getTotalLabel()?c.getTotalLabel():''+c.getTotal();var d=c.getTotalScale().substring(0,3);if(c.getFormattedLabel()){var o=c._parseFormattedValue(b);d=o.scale.substring(0,3);b=o.value;}if(c.getColorPalette()){s=c.getColorPalette()[0];}var S=c.getSize();r.write('<div');r.writeControlData(c);r.writeAttributeEscaped('title',t);r.addClass('suiteHBMC');r.addClass(S);if(c.hasListeners('press')){r.addClass('sapSuiteUiCommonsPointer');r.writeAttribute('tabindex','0');}r.writeClasses();if(c.getWidth()){r.addStyle('width',c.getWidth());}r.writeStyles();r.write('>');r.write('<div');r.addClass('suiteHBMCChartCnt');r.addClass(S);r.writeClasses();r.addStyle('display','inline-block');r.writeStyles();r.writeAttribute('role','presentation');r.writeAttributeEscaped('aria-label',c.getAltText().replace(/\s/g,' ')+(sap.ui.Device.browser.firefox?'':' '+t));r.write('>');r.write('<svg');r.writeAttribute('id',c.getId()+'-harvey-ball');r.writeAttribute('width',c._oPath.size);r.writeAttribute('height',c._oPath.size);r.writeAttribute('focusable',false);r.write('>');r.write('<g>');r.write('<circle');r.writeAttribute('cx',c._oPath.center);r.writeAttribute('cy',c._oPath.center);r.writeAttribute('r',(sap.ui.getCore().getConfiguration().getTheme()==='sap_hcb')?c._oPath.center-1:c._oPath.center);r.addClass('suiteHBMCSBall');r.writeClasses();r.write('/>');if(!a){}else if(a>=T){r.write('<circle');r.writeAttribute('cx',c._oPath.center);r.writeAttribute('cy',c._oPath.center);r.writeAttribute('r',c._oPath.center-c._oPath.border);r.addClass('suiteHBMCSgmnt');r.addClass(C);r.writeClasses();if(c.getColorPalette()){r.addStyle('fill',c.getColorPalette()[0]);r.writeStyles();}r.write('/>');}else if(a>0){r.write('<path');r.writeAttribute('id',c.getId()+'-segment');r.addClass('suiteHBMCSgmnt');r.addClass(C);r.writeClasses();r.writeAttribute('d',c.serializePieChart());if(c.getColorPalette().length!=0){r.addStyle('fill',c.getColorPalette()[0]);r.writeStyles();}r.write('/>');}r.write('</g>');r.write('</svg>');r.write('</div>');r.write('<div');r.addClass('suiteHBMCValSclCnt');r.addClass(S);r.addClass(C);if(s){r.addClass('CP');}r.writeClasses();r.addStyle('display',c.getShowFractions()?'inline-block':'none');r.writeStyles();r.write('>');r.write('<p');r.write('>');this.renderLabel(r,c,[C,S,'suiteHBMCVal'],v,'-fraction');this.renderLabel(r,c,[C,S,'suiteHBMCValScale'],V,'-fraction-scale');r.write('</p>');r.write('</div>');r.write('<div');r.addClass('suiteHBMCTtlSclCnt');r.addClass(S);r.writeClasses();if(R){r.addStyle('left','0');}else{r.addStyle('right','0');}r.addStyle('display',c.getShowTotal()?'inline-block':'none');r.writeStyles();r.write('>');this.renderLabel(r,c,[C,S,'suiteHBMCTtl'],b,'-total');this.renderLabel(r,c,[C,S,'suiteHBMCTtlScale'],d,'-total-scale');r.write('</div>');r.write('</div>');};
	sap.suite.ui.commons.HarveyBallMicroChartRenderer.renderLabel=function(r,c,C,l,I){r.write('<span');r.writeAttribute('id',c.getId()+I);for(var i=0;i<C.length;i++){r.addClass(C[i]);}r.writeClasses();r.write('>');if(l){r.writeEscaped(l);}r.write('</span>');};
}

if(sap.suite.ui.microchart.InteractiveBarChartBar == undefined) {
	/*!
	 * SAP UI development toolkit for HTML5 (SAPUI5)

	(c) Copyright 2009-2017 SAP SE. All rights reserved
	 */
	jQuery.sap.declare('sap.suite.ui.microchart.InteractiveBarChartBar');
	jQuery.sap.require('sap.ui.core.library');
	jQuery.sap.require("sap.suite.ui.microchart.library");
	jQuery.sap.require('sap.ui.core.Element');
	sap.ui.core.Element.extend('sap.suite.ui.microchart.InteractiveBarChartBar',{metadata:{library:"sap.suite.ui.microchart",properties:{label:{type:"string",group:"Misc",defaultValue:null},selected:{type:"boolean",group:"Appearance",defaultValue:false},displayedValue:{type:"string",group:"Data",defaultValue:null},value:{type:"float",group:"Data"}}}});
	sap.suite.ui.microchart.InteractiveBarChartBar.prototype.init=function(){this._bNullValue=true;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");};
	sap.suite.ui.microchart.InteractiveBarChartBar.prototype.validateProperty=function(p,v){if(p==="value"&&(v===null||v===undefined||isNaN(v))){this._bNullValue=true;}else if(p==="value"){this._bNullValue=false;}return E.prototype.validateProperty.apply(this,arguments);};
	sap.suite.ui.microchart.InteractiveBarChartBar.prototype.getTooltip_AsString=function(){var t=this.getTooltip_Text();this._bCustomTooltip=true;if(!t){t=this._createTooltipText();this._bCustomTooltip=false;}else if(l._isTooltipSuppressed(t)){t=null;}return t;};
	sap.suite.ui.microchart.InteractiveBarChartBar.prototype._createTooltipText=function(){var t="",L=this.getLabel();if(L&&L.length>0){t=L+":\n";}if(this._bNullValue){t+=this._oRb.getText("INTERACTIVECHART_NA");}else{t+=this.getValue();}return t;};
	sap.suite.ui.microchart.InteractiveBarChartBar.prototype._getBarTooltip=function(){var t=this.getTooltip_AsString();if(t&&!this._bCustomTooltip){t=t.replace("\n"," ");}return t;};
}

if(sap.suite.ui.microchart.InteractiveBarChart == undefined) {
/*!
	 * SAP UI development toolkit for HTML5 (SAPUI5)

	(c) Copyright 2009-2017 SAP SE. All rights reserved
	 */
	jQuery.sap.declare('sap.suite.ui.microchart.InteractiveBarChart');
	jQuery.sap.require('jquery.sap.global');
	jQuery.sap.require("sap.suite.ui.microchart.library");
	jQuery.sap.require('sap.ui.Device');
	jQuery.sap.require('sap.ui.core.Control');
	sap.ui.core.Control.extend("sap.suite.ui.microchart.InteractiveBarChart",{metadata:{library:"sap.suite.ui.microchart",properties:{displayedBars:{type:"int",group:"Appearance",defaultValue:3},labelWidth:{type:"sap.ui.core.Percentage",group:"Appearance",defaultValue:"40%"},selectionEnabled:{type:"boolean",group:"Behavior",defaultValue:true},min:{type:"float",group:"Appearance"},max:{type:"float",group:"Appearance"}},defaultAggregation:"bars",aggregations:{bars:{type:"sap.suite.ui.microchart.InteractiveBarChartBar",multiple:true,bindable:"bindable"}},events:{selectionChanged:{parameters:{selectedBars:{type:"sap.suite.ui.microchart.InteractiveBarChartBar[]"},bar:{type:"sap.suite.ui.microchart.InteractiveBarChartBar"},selected:{type:"boolean"}}},press:{}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});
	sap.suite.ui.microchart.InteractiveBarChart.MIN_BAR_WIDTH_IN_PX=1;
	sap.suite.ui.microchart.InteractiveBarChart.BAR_VALUE_PADDING_LEFT_IN_PX=4;
	sap.suite.ui.microchart.InteractiveBarChart.BAR_VALUE_PADDING_RIGHT_IN_PX=4;
	sap.suite.ui.microchart.InteractiveBarChart.SELECTION_AREA_BORDER_IN_PX=1;
	sap.suite.ui.microchart.InteractiveBarChart.DIVIDER_WIDTH_IN_PX=1;
	sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_MINVALUE=18;
	sap.suite.ui.microchart.InteractiveBarChart.BAR_HEIGHT_FONT_SMALLER=22;
	sap.suite.ui.microchart.InteractiveBarChart.BAR_HEIGHT_MINVALUE=6;
	sap.suite.ui.microchart.InteractiveBarChart.BAR_HEIGHT_LABEL_HIDE=16;
	sap.suite.ui.microchart.InteractiveBarChart.CHART_WIDTH_FONT_SMALLER=288;
	sap.suite.ui.microchart.InteractiveBarChart.LABEL_WIDTH_MINVALUE=80;
	sap.suite.ui.microchart.InteractiveBarChart.CHART_WIDTH_MINVALUE=130;
	sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_INTERACTIVE_MINVALUE=48;
	sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_INTERACTIVE_MINVALUE_COMPACT=32;
	sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_PADDING_STAGE1=34;
	sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_PADDING_STAGE1_COMPACT=32;
	sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_PADDING_STAGE2=28;
	sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_PADDING_STAGE2_COMPACT=31;
	sap.suite.ui.microchart.InteractiveBarChart.prototype.init=function(){this._iVisibleBars=0;this._bInteractiveMode=true;this._bMinMaxValid=null;this._fDividerPositionRight=0;this._iAreaHeightInteractiveMinValue;this._iAreaHeightPaddingStage1;this._iAreaHeightPaddingStage2;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this._fMin=null;this._fMax=null;this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this));}else{this._handleCoreInitialized();}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this);}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this);};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.onBeforeRendering=function(){this._bCompact=this._isCompact();this._bInteractiveMode=true;this._setResponsivenessData();this._setInternalMinMax();this._bMinMaxValid=this._checkIfMinMaxValid();if(this.getAggregation("bars")&&this.getDisplayedBars()){this._iVisibleBars=Math.min(this.getAggregation("bars").length,this.getDisplayedBars());}if(!this.data("_parentRenderingContext")&&q.isFunction(this.getParent)){this.data("_parentRenderingContext",this.getParent());}this._deregisterResizeHandler();sap.ui.getCore().detachIntervalTimer(this._checkContentDensity,this);};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.onAfterRendering=function(){this._adjustToParent();l._checkControlIsVisible(this,this._onControlIsVisible);};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._onControlIsVisible=function(){this._sResizeHandlerId=sap.ui.core.ResizeHandler.register(this,this._onResize.bind(this));this._calcBarsWidth();this._onResize();sap.ui.getCore().attachIntervalTimer(this._checkContentDensity,this);};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.exit=function(){this._deregisterResizeHandler();sap.ui.getCore().detachIntervalTimer(this._checkContentDensity,this);};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.onclick=function(e){if(!this.getSelectionEnabled()){return;}if(this._bInteractiveMode){var i=q(e.target).attr("id")||q(e.target).parents(".sapSuiteIBCBarInteractionArea").attr("id"),f=this.$().find(".sapSuiteIBCBarInteractionArea"),a,h;if(i){a=i.substring(i.lastIndexOf("-")+1);if(isNaN(a)){return;}else{a=parseInt(a,10);}this._toggleSelected(a);h=f.index(this.$().find(".sapSuiteIBCBarInteractionArea[tabindex='0']"));this._switchTabindex(h,a,f);}}else{this.firePress();if(D.browser.msie){this.$().focus();e.preventDefault();}}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.onsapenter=function(e){if(this._bInteractiveMode){var i=this.$().find(".sapSuiteIBCBarInteractionArea").index(e.target);if(i!==-1){this._toggleSelected(i);}e.preventDefault();e.stopImmediatePropagation();}else{this.firePress();}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.onsapspace=sap.suite.ui.microchart.InteractiveBarChart.prototype.onsapenter;
	sap.suite.ui.microchart.InteractiveBarChart.prototype.onsapup=function(e){var f=this.$().find(".sapSuiteIBCBarInteractionArea");var i=f.index(e.target);if(f.length>0){this._switchTabindex(i,i-1,f);}e.preventDefault();e.stopImmediatePropagation();};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.onsapdown=function(e){var f=this.$().find(".sapSuiteIBCBarInteractionArea");var i=f.index(e.target);if(f.length>0){this._switchTabindex(i,i+1,f);}e.preventDefault();e.stopImmediatePropagation();};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.onsaphome=function(e){var f=this.$().find(".sapSuiteIBCBarInteractionArea");var i=f.index(e.target);if(i!==0&&f.length>0){this._switchTabindex(i,0,f);}e.preventDefault();e.stopImmediatePropagation();};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.onsapend=function(e){var f=this.$().find(".sapSuiteIBCBarInteractionArea"),i=f.index(e.target),L=f.length;if(i!==L-1&&L>0){this._switchTabindex(i,L-1,f);}e.preventDefault();e.stopImmediatePropagation();};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.onsapleft=sap.suite.ui.microchart.InteractiveBarChart.prototype.onsapup;
	sap.suite.ui.microchart.InteractiveBarChart.prototype.onsapright=sap.suite.ui.microchart.InteractiveBarChart.prototype.onsapdown;
	sap.suite.ui.microchart.InteractiveBarChart.prototype.getSelectedBars=function(){var b=this.getAggregation("bars"),s=[],i;for(i=0;i<b.length;i++){if(b[i].getSelected()){s.push(b[i]);}}return s;};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.setSelectedBars=function(s){var b=this.getAggregation("bars"),i,a;this._deselectAllSelectedBars();if(!s){return this;}if(s instanceof l.InteractiveBarChartBar){s=[s];}if(q.isArray(s)){for(i=0;i<s.length;i++){a=this.indexOfAggregation("bars",s[i]);if(a>=0){b[a].setProperty("selected",true,true);}else{q.sap.log.warning("setSelectedBars method called with invalid InteractiveBarChartBar element");}}}this.invalidate();return this;};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.getTooltip_AsString=function(){var t=this.getTooltip_Text();if(!t){t=this._createTooltipText();}else if(l._isTooltipSuppressed(t)){t=null;}return t;};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._isCompact=function(){return q("body").hasClass("sapUiSizeCompact")||this.$().is(".sapUiSizeCompact")||this.$().closest(".sapUiSizeCompact").length>0;};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._setResponsivenessData=function(){if(this._bCompact)
	{
		this._iAreaHeightInteractiveMinValue=sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_INTERACTIVE_MINVALUE_COMPACT;
		this._iAreaHeightPaddingStage1=sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_PADDING_STAGE1_COMPACT;
		this._iAreaHeightPaddingStage2=sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_PADDING_STAGE2_COMPACT;
	}else{
		this._iAreaHeightInteractiveMinValue=sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_INTERACTIVE_MINVALUE;
		this._iAreaHeightPaddingStage1=sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_PADDING_STAGE1;
		this._iAreaHeightPaddingStage2=sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_PADDING_STAGE2;
		}
	};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._checkContentDensity=function(){if(this.$().length>0){var c=this._isCompact();if(c!==this._bCompact){this._bCompact=c;this.invalidate();}}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._adjustToParent=function(){var $=this.$();if(this.data("_parentRenderingContext")&&this.data("_parentRenderingContext")instanceof sap.m.FlexBox){var p=this.data("_parentRenderingContext").$();var P=p.width()-2;var i=p.height()-2;$.outerWidth(P);$.outerHeight(i);}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._calcBarsWidth=function(){var $=this.$(),b=$.find(".sapSuiteIBCBarLabel"),d=sap.suite.ui.microchart.InteractiveBarChart.DIVIDER_WIDTH_IN_PX,L=parseFloat(this.getLabelWidth()),B,t,f,a,c,e,v,E,g,h,r=sap.ui.getCore().getConfiguration().getRTL();if(!this._bMinMaxValid){return this;}if(this._bFullWidth){L=100;B=100;}else{B=100-L;}t=Math.abs(this._fMax-this._fMin);if(this._fMin>=0&&this._fMax>=0){f=0;a=1;}else if(this._fMin<0&&this._fMax<0){f=1;a=0;}else{f=Math.abs(this._fMin/t);a=Math.abs(this._fMax/t);}if(this._bFullWidth){if(a>=f){c=a*100;e=f*100;}else{c=f*100;e=0;}b.css("width",c+"%");b.css(r?"right":"left",e+"%");}else{b.css("width",L+"%");b.css(r?"right":"left","");}$.find(".sapSuiteIBCBarWrapper").css("width",B+"%");if(f>0){$.find(".sapSuiteIBCBarWrapperNegative").width("calc("+f*100+"% - "+d+"px)");}else{$.find(".sapSuiteIBCBarWrapperNegative").width("0%");}if(a>0){$.find(".sapSuiteIBCBarWrapperPositive").width("calc("+a*100+"% - "+d+"px)");}else{$.find(".sapSuiteIBCBarWrapperPositive").width("0%");}for(var i=0;i<this._iVisibleBars;i++){v=this.getBars()[i].getValue();g=this.$("bar-negative-"+i);h=this.$("bar-positive-"+i);if(this.getBars()[i]._bNullValue||v===0){h.add(g).css("min-width",0);}else if(!this.getBars()[i]._bNullValue){if(v>0){E=Math.min(Math.max(v,this._fMin),this._fMax);h.css({"width":this._calcPercent(E,t,Math.max(0,this._fMin),a),"min-width":1});g.css("min-width",0);}else{E=Math.max(Math.min(v,this._fMax),this._fMin);g.css({"width":this._calcPercent(E,t,Math.min(0,this._fMax),f),"min-width":1});h.css("min-width",0);}}}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._calcPercent=function(v,t,s,a){return Math.abs((v-s)/(t*a)*100).toFixed(5)+"%";};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._deselectAllSelectedBars=function(){var b=this.getAggregation("bars"),B=b.length,i;for(i=0;i<B;i++){b[i].setProperty("selected",false,true);}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._toggleSelected=function(i){var b=this.getAggregation("bars"),B=b[i];if(i<0||i>=b.length){return;}var $=this.$("interactionArea-"+i);if(B.getSelected()){$.removeClass("sapSuiteIBCBarSelected");B.setProperty("selected",false,true);}else{$.addClass("sapSuiteIBCBarSelected");B.setProperty("selected",true,true);}$.attr("aria-selected",B.getSelected());this.fireSelectionChanged({selectedBars:this.getSelectedBars(),bar:B,selected:B.getSelected()});};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._showValueOutsideBar=function(){var $=this.$(),b,v,B,f,a,c,d,e=this.$("bar-positive-0").parent().width(),g=this.$("bar-negative-0").parent().width(),r=sap.ui.getCore().getConfiguration().getRTL();b=$.find(".sapSuiteIBCBarValue");if(b.length===0){return;}for(var i=0;i<this._iVisibleBars;i++){B=(b.eq(i).width()+sap.suite.ui.microchart.InteractiveBarChart.BAR_VALUE_PADDING_LEFT_IN_PX+sap.suite.ui.microchart.InteractiveBarChart.BAR_VALUE_PADDING_RIGHT_IN_PX);f=this.$("bar-positive-"+i).width();a=this.$("bar-negative-"+i).width();c=e-f;d=g-a;if(this.getBars()[i].getValue()>=0||(this.getBars()[i]._bNullValue&&this._fMin+this._fMax>=0)){if(B>f&&B>c){b.eq(i).css("visibility","hidden");}else{b.eq(i).css("visibility","inherit");}if(B>f){v=(this.$("bar-positive-"+i).width()+sap.suite.ui.microchart.InteractiveBarChart.BAR_VALUE_PADDING_LEFT_IN_PX)+"px";b.eq(i).addClass("sapSuiteIBCBarValueOutside");}else{v="";b.eq(i).removeClass("sapSuiteIBCBarValueOutside");}if(r){b.eq(i).css({"right":v});}else{b.eq(i).css({"left":v});}}else{if(B>a&&B>d){b.eq(i).css("visibility","hidden");}else{b.eq(i).css("visibility","inherit");}if(B>a){v=(this.$("bar-negative-"+i).width()+sap.suite.ui.microchart.InteractiveBarChart.BAR_VALUE_PADDING_RIGHT_IN_PX)+"px";b.eq(i).addClass("sapSuiteIBCBarValueOutside");}else{v="";b.eq(i).removeClass("sapSuiteIBCBarValueOutside");}if(r){b.eq(i).css({"left":v});}else{b.eq(i).css({"right":v});}}}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._checkIfMinMaxValid=function(){if(this._fMin>this._fMax){q.sap.log.warning("Min value for InteractiveBarChart is larger than Max value.");return false;}return true;};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._setInternalMinMax=function(){var m=null,M=null,b,B=this.getBars(),r=Math.min(this.getDisplayedBars(),B.length);for(var i=0;i<r;i++){if(!B[i]._bNullValue){b=B[i].getValue();m=Math.min(m,b);M=Math.max(M,b);}}this._fMin=this.getMin();this._fMax=this.getMax();if(!q.isNumeric(this._fMin)||!q.isNumeric(this._fMax)){if(m>=0&&M>=0){if(!q.isNumeric(this._fMin)){this._fMin=0;}if(!q.isNumeric(this._fMax)){this._fMax=M;}}else if(m<0&&M<0){if(!q.isNumeric(this._fMin)){this._fMin=m;}if(!q.isNumeric(this._fMax)){this._fMax=0;}}else{if(!q.isNumeric(this._fMin)){this._fMin=m;}if(!q.isNumeric(this._fMax)){this._fMax=M;}}}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype.validateProperty=function(p,v){if(p==="labelWidth"&&(v!==null||v!==undefined)){var V=parseFloat(v);if(V<0||V>100){q.sap.log.warning("LabelWidth for InteractiveBarChart is not between 0 and 100.");v=null;}}return C.prototype.validateProperty.apply(this,[p,v]);};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._switchTabindex=function(o,n,f){if(o>=0&&o<f.length&&n>=0&&n<f.length){f.eq(o).removeAttr("tabindex");f.eq(n).attr("tabindex","0");f.eq(n).focus();}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._isChartEnabled=function(){return this.getSelectionEnabled()&&this._bInteractiveMode;};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._resizeVertically=function(f){var a,m,b,$=this.$(),s=false,S=$.find(".sapSuiteIBCBarInteractionArea"),c=$.height(),i=0,v=this._iVisibleBars;if(this._bInteractiveMode){i=1;}m=parseInt(S.css("margin-bottom"),10)+parseInt(S.css("margin-top"),10);a=((c-((m+2*sap.suite.ui.microchart.InteractiveBarChart.SELECTION_AREA_BORDER_IN_PX)*v))/v);if(a+i<this._iAreaHeightInteractiveMinValue){if(this._bInteractiveMode){this._bInteractiveMode=false;s=true;$.addClass("sapSuiteIBCNonInteractive");if(this.getSelectionEnabled()){var A=this.$().find(".sapSuiteIBCBarInteractionArea[tabindex='0']");this._iActiveElement=S.index(A);A.removeAttr("tabindex");this.$().attr("tabindex","0");}this.$().attr({"role":"button","aria-multiselectable":"false","aria-disabled":!this._isChartEnabled()});}}else{if(!this._bInteractiveMode){this._bInteractiveMode=true;s=true;$.removeClass("sapSuiteIBCNonInteractive");if(this.getSelectionEnabled()){this.$().removeAttr("tabindex");if(!this._iActiveElement||this._iActiveElement<0){this._iActiveElement=0;}S.eq(this._iActiveElement).attr("tabindex","0");}this.$().attr({"role":"listbox","aria-multiselectable":"true","aria-disabled":!this._isChartEnabled()});}}if(s){if(this._isChartEnabled()){$.removeAttr("title");this._addInteractionAreaTooltip(S);}else{S.removeAttr("title");$.attr("title",this.getTooltip_AsString());}}S.height(a);if(a<=this._iAreaHeightPaddingStage2){$.addClass("sapSuiteIBCStage2");}else{$.removeClass("sapSuiteIBCStage2");if(a<=this._iAreaHeightPaddingStage1){$.addClass("sapSuiteIBCStage1");}else{$.removeClass("sapSuiteIBCStage1");}}var B=this.$().find(".sapSuiteIBCBar");if(B.length>0){b=B[0].getBoundingClientRect().height;}if(b<=sap.suite.ui.microchart.InteractiveBarChart.BAR_HEIGHT_FONT_SMALLER){$.addClass("sapSuiteIBCSmallFont");}if(b<=sap.suite.ui.microchart.InteractiveBarChart.BAR_HEIGHT_LABEL_HIDE){$.find(".sapSuiteIBCBarValue").css("visibility","hidden");f.labelsVisible=false;}else{$.find(".sapSuiteIBCBarValue").css("visibility","inherit");}if(a<sap.suite.ui.microchart.InteractiveBarChart.AREA_HEIGHT_MINVALUE){$.css("visibility","hidden");f.labelsVisible=false;f.chartVisible=false;}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._resizeHorizontally=function(f){if(!f.chartVisible){return;}var $=this.$(),s=$.find(".sapSuiteIBCBarInteractionArea"),b=$.find(".sapSuiteIBCBarLabel"),B=parseFloat(this.getLabelWidth())/100*s.eq(0).width(),a=0,c=$.width(),d,e=false;if(c<sap.suite.ui.microchart.InteractiveBarChart.CHART_WIDTH_FONT_SMALLER){$.addClass("sapSuiteIBCSmallFont");B=parseFloat(this.getLabelWidth())/100*s.eq(0).width();}if(this._bFullWidth){a=6;}for(var i=0;i<b.length;i++){b.eq(i).css("width",B+"px");if(b.eq(i).children(".sapSuiteIBCBarLabelText").prop("clientWidth")<b.eq(i).children(".sapSuiteIBCBarLabelText").prop("scrollWidth")-a){e=true;}b.eq(i).css("width","100%");}if(B<sap.suite.ui.microchart.InteractiveBarChart.LABEL_WIDTH_MINVALUE&&e){$.addClass("sapSuiteIBCFullWidth");this._bFullWidth=true;this._calcBarsWidth();}else{$.removeClass("sapSuiteIBCFullWidth");this._bFullWidth=false;this._calcBarsWidth();}var g=this.$().find(".sapSuiteIBCBar");if(g.length>0){d=g[0].getBoundingClientRect().height;}if(c<sap.suite.ui.microchart.InteractiveBarChart.CHART_WIDTH_MINVALUE||d<sap.suite.ui.microchart.InteractiveBarChart.BAR_HEIGHT_MINVALUE){$.css("visibility","hidden");f.labelsVisible=false;f.chartVisible=false;}else if(d<=sap.suite.ui.microchart.InteractiveBarChart.BAR_HEIGHT_LABEL_HIDE){$.find(".sapSuiteIBCBarValue").css("visibility","hidden");f.labelsVisible=false;}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._onResize=function(){var $=this.$(),f={chartVisible:true,labelsVisible:true};$.css("visibility","visible");$.removeClass("sapSuiteIBCSmallFont");this._resizeVertically(f);this._resizeHorizontally(f);if(f.labelsVisible){this._showValueOutsideBar();}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._deregisterResizeHandler=function(){if(this._sResizeHandlerId){sap.ui.core.ResizeHandler.deregister(this._sResizeHandlerId);this._sResizeHandlerId=null;}};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._addInteractionAreaTooltip=function(s){var b=this.getBars(),e,S;s.each(function(i,a){e=q(a);S=parseInt(e.attr("data-sap-ui-ibc-selection-index"),10);e.attr("title",b[S].getTooltip_AsString());});};
	sap.suite.ui.microchart.InteractiveBarChart.prototype._createTooltipText=function(){var b=true,B=this.getBars(),s,t="";for(var i=0;i<this._iVisibleBars;i++){s=B[i]._getBarTooltip();if(s){t+=(b?"":"\n")+s;b=false;}}return t;};
}

if(sap.suite.ui.microchart.LineMicroChart == undefined) {
	
	sap.ui.define([
		'jquery.sap.global',
		'sap/suite/ui/microchart/library',
		'sap/m/library',
		'sap/ui/core/Control',
		'sap/ui/Device', 
		'sap/ui/core/ResizeHandler'	
		], function(q,l,M,C,D,R) {
		"use strict";
		/*!
		 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2017 SAP SE. All rights reserved
		 */
		sap.ui.core.Control.extend("sap.suite.ui.microchart.LineMicroChart",{metadata:{library:"sap.suite.ui.microchart",properties:{size:{type:"sap.m.Size",group:"Appearance",defaultValue:"Auto"},threshold:{type:"float",group:"Appearance",defaultValue:0},minXValue:{type:"float",group:"Appearance"},maxXValue:{type:"float",group:"Appearance"},minYValue:{type:"float",group:"Appearance"},maxYValue:{type:"float",group:"Appearance"},leftTopLabel:{type:"string",group:"Data",defaultValue:null},rightTopLabel:{type:"string",group:"Data",defaultValue:null},leftBottomLabel:{type:"string",group:"Data",defaultValue:null},rightBottomLabel:{type:"string",group:"Data",defaultValue:null},color:{type:"any",group:"Appearance",defaultValue:"Neutral"},showPoints:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"points",aggregations:{points:{type:"sap.suite.ui.microchart.LineMicroChartPoint",multiple:true,bindable:"bindable"}},events:{press:{}}}});
		sap.suite.ui.microchart.LineMicroChart.MIN_SIZE_CHART=5;
		sap.suite.ui.microchart.LineMicroChart.EDGE_CASE_HEIGHT_SHOWBOTTOMLABEL=16;
		sap.suite.ui.microchart.LineMicroChart.EDGE_CASE_HEIGHT_SHOWTOPLABEL=32;
		sap.suite.ui.microchart.LineMicroChart.EDGE_CASE_WIDTH_RESIZEFONT=168;
		sap.suite.ui.microchart.LineMicroChart.EDGE_CASE_HEIGHT_RESIZEFONT=72;		
		sap.suite.ui.microchart.LineMicroChart.prototype.ontap=function(e){if(D.browser.msie){this.$().focus();}this.firePress();};
		sap.suite.ui.microchart.LineMicroChart.prototype.onkeydown=function(e){if(e.which===q.sap.KeyCodes.SPACE){e.preventDefault();}};
		sap.suite.ui.microchart.LineMicroChart.prototype.onkeyup=function(e){if(e.which===q.sap.KeyCodes.ENTER||e.which===q.sap.KeyCodes.SPACE){this.firePress();e.preventDefault();}};
		sap.suite.ui.microchart.LineMicroChart.prototype.attachEvent=function(e,d,f,o){C.prototype.attachEvent.call(this,e,d,f,o);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapSuiteUiMicroChartPointer");}return this;};
		sap.suite.ui.microchart.LineMicroChart.prototype.detachEvent=function(e,f,o){C.prototype.detachEvent.call(this,e,f,o);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapSuiteUiMicroChartPointer");}return this;};
		sap.suite.ui.microchart.LineMicroChart.prototype.onclick=function(){if(D.browser.msie||D.browser.edge){this.$().focus();}this.firePress();};
		sap.suite.ui.microchart.LineMicroChart.prototype.onsapspace=sap.suite.ui.microchart.LineMicroChart.prototype.onclick;
		sap.suite.ui.microchart.LineMicroChart.prototype.onsapenter=sap.suite.ui.microchart.LineMicroChart.prototype.onclick;
		sap.suite.ui.microchart.LineMicroChart.prototype.getTooltip_AsString=function(){var t=this.getTooltip_Text();if(!t){t=this._createTooltipText();}else if(l._isTooltipSuppressed(t)){t=null;}return t;};
		sap.suite.ui.microchart.LineMicroChart.prototype.getThreshold=function(){if(this._bThresholdNull){return null;}else{return this.getProperty("threshold");}};
		sap.suite.ui.microchart.LineMicroChart.prototype.init=function()	{	this._bFocusMode=false;	this._bSemanticMode=false;		this._aNormalizedPoints=[];			this._minXScale=null;	this._maxXScale=null;	this._minYScale=null;this._maxYScale=null;			this._fNormalizedThreshold=0;	this._bScalingValid=false;	this._bThresholdNull=false;	this._bNoTopLabels=false;this._bNoBottomLabels=false;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this._bThemeApplied=true; if(!sap.ui.getCore().isInitialized())	{this._bThemeApplied=false;	sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this));}else	{this._handleCoreInitialized();	}	};
		sap.suite.ui.microchart.LineMicroChart.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this);}};
		sap.suite.ui.microchart.LineMicroChart.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this);};
		sap.suite.ui.microchart.LineMicroChart.prototype.onBeforeRendering=function(){if(l._isInGenericTile(this)){l._removeStandardMargins(this);}if(this.getPoints().length>0){this._setModeFlags();this._normalizePoints();}this._unbindMouseEnterLeaveHandler();};
		sap.suite.ui.microchart.LineMicroChart.prototype.onAfterRendering=function(){if(this.getSize()===M.Size.Responsive){this._sResizeHandlerId=R.register(this,this._onResize.bind(this));this._onResize();}this._bindMouseEnterLeaveHandler();};
		sap.suite.ui.microchart.LineMicroChart.prototype.exit=function(){this._deregisterResizeHandler();};		
		sap.suite.ui.microchart.LineMicroChart.prototype.validateProperty=function(p,v)	{if(p==="threshold"){if(v===null){this._bThresholdNull=true;}else{this._bThresholdNull=false;}}	if(v===null||v===undefined){return C.prototype.validateProperty.apply(this,[p,null]);}if(p==="color"&&((!M.ValueCSSColor.isValid(v)||v==="")&&(!M.ValueCSSColor.isValid(v.below)||v.below===""||!M.ValueCSSColor.isValid(v.above)||v.above===""))){q.sap.log.warning("Color property of LineMicroChart must be of type sap.m.ValueCSSColor either as single value or as composite value (above: value, below: value)");v=null;}else if(q.inArray(p,["minXValue","maxXValue","minYValue","maxYValue"])>=0){if(!q.isNumeric(v)){q.sap.log.warning("Property "+p+" of LineMicroChart is not numeric and it will be reset to default");v=null;}}return C.prototype.validateProperty.apply(this,[p,v]);};
		sap.suite.ui.microchart.LineMicroChart.prototype._setModeFlags=function(){this._bFocusMode=false;this._bSemanticMode=false;var p=this.getPoints();this._minXScale=this._maxXScale=p[0].getX();if(this._bThresholdNull){this._minYScale=this._maxYScale=p[0].getY();}else{this._minYScale=this._maxYScale=this.getThreshold();}for(var i=0;i<p.length;i++){this._minXScale=Math.min(p[i].getX(),this._minXScale);this._maxXScale=Math.max(p[i].getX(),this._maxXScale);this._minYScale=Math.min(p[i].getY(),this._minYScale);this._maxYScale=Math.max(p[i].getY(),this._maxYScale);if(p[i].getMetadata().getName()==="sap.suite.ui.microchart.LineMicroChartEmphasizedPoint"){this._bFocusMode=true;if(p[i].getColor()!==M.ValueColor.Neutral&&p[i].getShow()){this._bSemanticMode=true;}}}if(!this._bFocusMode){if(this.getColor()&&this.getColor().above&&this.getColor().below&&!this._bThresholdNull){this._bSemanticMode=true;}else{this._bSemanticMode=false;}}if(this._bFocusMode&&this._bSemanticMode&&this.getColor()!==M.ValueColor.Neutral){q.sap.log.info("Property Color of LineMicroChart has no effect if EmphasizedPoints with colors different from Neutral are used.");}if(this._bFocusMode&&this.getShowPoints()){q.sap.log.info("Property ShowPoints of LineMicroChart has no effect if EmphasizedPoints are used.");}if(this.getColor()&&this.getColor().above&&this.getColor().below&&this._bThresholdNull){q.sap.log.info("Property Color of LineMicroChart has no effect if it is composed of colors for above and below when property Threshold is null");}var s=this.getLeftTopLabel(),r=this.getRightTopLabel(),a=this.getLeftBottomLabel(),b=this.getRightBottomLabel();if(b.length===0&&a.length===0){this._bNoBottomLabels=true;}else{this._bNoBottomLabels=false;}if(s.length===0&&r.length===0){this._bNoTopLabels=true;}else{this._bNoTopLabels=false;}};
		sap.suite.ui.microchart.LineMicroChart.prototype._normalizePoints=function(){this._aNormalizedPoints=[];var m=this._minXScale,a=this._maxXScale,b=this._minYScale,c=this._maxYScale;if(q.isNumeric(this.getMinXValue())){this._minXScale=this.getMinXValue();if(!q.isNumeric(this.getMaxXValue())&&this._minXScale>a){q.sap.log.error("Property minXValue of LineMicroChart must be smaller to at least one X value of the points aggregation if property maxXValue is not set");}}if(q.isNumeric(this.getMaxXValue())){this._maxXScale=this.getMaxXValue();if(!q.isNumeric(this.getMinXValue())&&this._maxXScale<m){q.sap.log.error("Property maxXValue of LineMicroChart must be greater to at least one X value of the points aggregation if property minXValue is not set");}}if(q.isNumeric(this.getMinYValue())){this._minYScale=this.getMinYValue();if(!q.isNumeric(this.getMaxYValue())&&this._minYScale>c){q.sap.log.error("Property minYValue of LineMicroChart must be greater to threshold or at least one Y value of the points aggregation if property maxYValue is not set");}}if(q.isNumeric(this.getMaxYValue())){this._maxYScale=this.getMaxYValue();if(!q.isNumeric(this.getMinYValue())&&this._maxYScale<b){q.sap.log.error("Property maxYValue of LineMicroChart must be smaller to threshold or at least one Y value of the points aggregation if property minYValue is not set");}}if(this.getMaxYValue()<this.getMinYValue()){q.sap.log.error("Property maxYValue of LineMicroChart must not be smaller to minYValue");}if(this.getMaxXValue()<this.getMinXValue()){q.sap.log.error("Property maxXValue of LineMicroChart must not be smaller to minXValue");}var p=this.getPoints(),x=this._maxXScale-this._minXScale,y=this._maxYScale-this._minYScale,n,N;this._bScalingValid=x>=0&&y>=0;if(this._bScalingValid){for(var i=0;i<p.length;i++){if(this._minXScale===this._maxXScale&&p[i].getX()===this._maxXScale){n=50;}else{n=(((p[i].getX()-this._minXScale)/x)*100);}if(this._minYScale===this._maxYScale&&p[i].getY()===this._maxYScale){N=50;}else{N=(((p[i].getY()-this._minYScale)/y)*100);}this._aNormalizedPoints.push({x:n,y:N});}this._fNormalizedThreshold=((this.getThreshold()-this._minYScale)/y)*100;}};
		sap.suite.ui.microchart.LineMicroChart.prototype._onResize=function(){this._adjustToParent();var c=this.$(),$=this.$("sapSuiteLMCSvgElement"),p=this.$("sapSuiteLMCPointsContainer"),i=parseInt(c.width(),10),a=parseInt(c.height(),10),b,d,t=c.find(".sapSuiteLMCLeftTopLabel, .sapSuiteLMCRightTopLabel"),B=c.find(".sapSuiteLMCLeftBottomLabel, .sapSuiteLMCRightBottomLabel");if(a<=L.EDGE_CASE_HEIGHT_RESIZEFONT||i<=L.EDGE_CASE_WIDTH_RESIZEFONT){c.addClass("sapSuiteLMCSmallFont");}else{c.removeClass("sapSuiteLMCSmallFont");}b=parseInt($.width(),10);d=parseInt($.height(),10);if(d<=L.MIN_SIZE_CHART||b<L.MIN_SIZE_CHART){$.css("visibility","hidden");p.hide();}else{$.css("visibility","");p.show();}if(a<=L.EDGE_CASE_HEIGHT_SHOWTOPLABEL){t.css("visibility","hidden");}else{this._updateLabelVisibility(t);}if(a<=L.EDGE_CASE_HEIGHT_SHOWBOTTOMLABEL){B.css("visibility","hidden");}else{this._updateLabelVisibility(B);}};
		sap.suite.ui.microchart.LineMicroChart.prototype._isLabelTruncated=function(a){var $=q(a);return $.prop("offsetWidth")<$.prop("scrollWidth")||$.prop("offsetLeft")<0;};
		sap.suite.ui.microchart.LineMicroChart.prototype._updateLabelVisibility=function(a){if(a.length===0){return;}var t=this._isLabelTruncated(a[0]);if(!t&&a.length>1){t=this._isLabelTruncated(a[1]);}if(t){a.css("visibility","hidden");}else{a.css("visibility","");}};
		sap.suite.ui.microchart.LineMicroChart.prototype._adjustToParent=function(){var c=this.$(),p,P,o=this.getParent();if(!o){return;}if(o.getMetadata().getName()==="sap.m.FlexBox"){p=o.getHeight();P=o.getWidth();}else if(q.isFunction(o.getRootNode)){p=Math.round(q(o.getRootNode()).height());P=Math.round(q(o.getRootNode()).width());}if(p){c.height(p);}if(P){c.width(P);}};
		sap.suite.ui.microchart.LineMicroChart.prototype._createTooltipText=function(){var t="";var s=this.getLeftTopLabel();var S=this.getLeftBottomLabel();var e=this.getRightTopLabel();var E=this.getRightBottomLabel();var i=true;if(s||S){t+=this._oRb.getText(("LINEMICROCHART_START"))+": "+S+" "+s;i=false;}if(e||E){t+=(i?"":"\n")+this._oRb.getText(("LINEMICROCHART_END"))+": "+E+" "+e;}return t;};
		sap.suite.ui.microchart.LineMicroChart.prototype._addTitleAttribute=function(){if(!this.$().attr("title")){this.$().attr("title",this.getTooltip_AsString());}};
		sap.suite.ui.microchart.LineMicroChart.prototype._removeTitleAttribute=function(){if(this.$().attr("title")){this.$().removeAttr("title");}};
		sap.suite.ui.microchart.LineMicroChart.prototype._bindMouseEnterLeaveHandler=function(){this.$().bind("mouseenter.tooltip",this._addTitleAttribute.bind(this));this.$().bind("mouseleave.tooltip",this._removeTitleAttribute.bind(this));};
		sap.suite.ui.microchart.LineMicroChart.prototype._unbindMouseEnterLeaveHandler=function(){this.$().unbind("mouseenter.tooltip");this.$().unbind("mouseleave.tooltip");};
		sap.suite.ui.microchart.LineMicroChart.prototype._deregisterResizeHandler=function(){if(this._sResizeHandlerId){R.deregister(this._sResizeHandlerId);this._sResizeHandlerId=null;}};
	});
}		


if(sap.suite.ui.microchart.LineMicroChartPoint == undefined) {
	
	jQuery.sap.declare('sap.suite.ui.microchart.LineMicroChartPoint');

	sap.ui.define(['sap/ui/core/Control'],function(C){"use strict";
	var L=sap.ui.core.Control.extend("sap.suite.ui.microchart.LineMicroChartPoint",{metadata:{properties:{x:{type:"float",group:"Data",defaultValue:0},y:{type:"float",group:"Data",defaultValue:0}}}});return L;});
}

if(sap.suite.ui.microchart.LineMicroChartEmphasizedPoint == undefined) {
	/*!
	 * SAP UI development toolkit for HTML5 (SAPUI5)

	(c) Copyright 2009-2017 SAP SE. All rights reserved
	 */
	jQuery.sap.declare('sap.suite.ui.microchart.LineMicroChartEmphasizedPoint');	
	sap.ui.define(["sap/m/library","sap/suite/ui/microchart/LineMicroChartPoint"],function(M,L){"use strict";
	var a = sap.suite.ui.microchart.LineMicroChartPoint.extend("sap.suite.ui.microchart.LineMicroChartEmphasizedPoint",{metadata:{properties:{color:{type:"sap.m.ValueColor",group:"Misc",defaultValue:"Neutral"},show:{type:"boolean",group:"Appearance",defaultValue:false}}}});
	sap.suite.ui.microchart.LineMicroChartPoint.prototype.setColor=function(v){return this.setProperty("color",M.ValueColor[v]||null);};return a;});
}


if(sap.suite.ui.microchart.LineMicroChartRenderer == undefined) {
	/*!
	 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
	 */
	jQuery.sap.declare('sap.suite.ui.microchart.LineMicroChartRenderer');
	
	sap.ui.define(["sap/suite/ui/microchart/library",
					'sap/m/library',
					"sap/ui/core/theming/Parameters"
	],function(l,M,P){sap.suite.ui.microchart.LineMicroChartRenderer={};
	sap.suite.ui.microchart.LineMicroChartRenderer.render=function(r,c)
		{
			r.write("<div");
			r.writeControlData(c);
			r.addClass("sapSuiteLMC");
			if(!l._isInGenericTile(c))
				{r.addClass("sapSuiteLMCFocus");}
			if(c._bSemanticMode)
				{r.addClass("sapSuiteLMCSemanticMode");}
			if(c._bFocusMode)
				{r.addClass("sapSuiteLMCFocusMode");}
			if(c.getSize())
				{r.addClass("sapSuiteLMCSize"+c.getSize());}
			if(c.hasListeners("press")){r.addClass("sapSuiteUiMicroChartPointer");
				r.writeAttribute("tabindex","0");}
			if(c._bNoBottomLabels){r.addClass("sapSuiteLMCNoBottomLabels");}
			if(c._bNoTopLabels){r.addClass("sapSuiteLMCNoTopLabels");}
			if(jQuery.inArray(c.getSize(),["S","XS","M"])>=0)
				{r.addClass("sapSuiteLMCSmallFont");}
			
			r.writeClasses();
			var a=c._createTooltipText();
			
			r.writeAttribute("role","presentation");
			r.writeAttributeEscaped("aria-label",a);
			r.write(">");
			r.write("<div");
			r.addClass("sapSuiteLMCSvgWrapper");
			r.writeClasses();
			r.write(">");
			this._renderLabelsTop(r,c);
			this._renderCanvas(r,c);
			this._renderLabelsBottom(r,c);
			r.write("</div>");
			r.write("</div>");
		};
	sap.suite.ui.microchart.LineMicroChartRenderer._renderCanvas=function(r,c){var p=c.getPoints();var a=p.length;r.write("<div");r.addClass("sapSuiteLMCSvgCanvas");r.writeClasses();r.write(">");r.write("<svg");r.writeAttributeEscaped("id",c.getId()+"-sapSuiteLMCSvgElement");r.writeAttribute("focusable","false");r.addClass("sapSuiteLMCSvgElement");r.writeClasses();r.write(">");if(c._bScalingValid){this._renderThresholdLine(r,c);for(var i=1;i<a;i++){this._renderLine(r,c,c._aNormalizedPoints[i-1].x,c._aNormalizedPoints[i-1].y,c._aNormalizedPoints[i].x,c._aNormalizedPoints[i].y);}}r.write('</svg>');r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-sapSuiteLMCPointsContainer");r.writeClasses();r.write(">");var s=c.getShowPoints(),o,b;if(c._bScalingValid&&(c._bFocusMode||s)){for(var j=0;j<a;j++){o=p[j];b=this._isPointEmphasized(o);if(!c._bFocusMode&&s||c._bFocusMode&&b&&o.getShow()){this._renderPoint(r,c,o,j,b);}}}r.write("</div>");r.write("</div>");};
	sap.suite.ui.microchart.LineMicroChartRenderer._renderPoint=function(r,c,p,a,e){var n=c._aNormalizedPoints[a],C=c.getColor();if(n.x<0||n.x>100||n.y<0||n.y>100){return;}r.write("<div");r.addStyle("left",jQuery.sap.encodeHTML(n.x+"%"));r.addStyle("top",jQuery.sap.encodeHTML(100-n.y+"%"));if(c._bFocusMode&&c._bSemanticMode){r.addClass("sapSuiteLMCPoint"+jQuery.sap.encodeHTML(p.getColor()));}else if(!c._bFocusMode&&c._bSemanticMode){if(p.getY()>=c.getThreshold()){if(M.ValueColor[C.above]){r.addClass("sapSuiteLMCPoint"+jQuery.sap.encodeHTML(C.above));}else{r.addStyle("background-color",jQuery.sap.encodeHTML(this._getHexColor(C.above)));}}else{if(M.ValueColor[C.below]){r.addClass("sapSuiteLMCPoint"+jQuery.sap.encodeHTML(C.below));}else{r.addStyle("background-color",jQuery.sap.encodeHTML(this._getHexColor(C.below)));}}}else if(!c._bSemanticMode&&typeof C==="string"){if(M.ValueColor[C]){r.addClass("sapSuiteLMCPoint"+jQuery.sap.encodeHTML(C));}else{r.addStyle("background-color",jQuery.sap.encodeHTML(this._getHexColor(C)));}}else{r.addClass("sapSuiteLMCPointNeutral");}r.addClass("sapSuiteLMCPoint");if(e&&p.getShow()){r.addClass("sapSuiteLMCPointEmphasized");}r.writeClasses();r.writeStyles();r.write("/>");};
	sap.suite.ui.microchart.LineMicroChartRenderer._renderThresholdLine=function(r,c){if(c._fNormalizedThreshold>=0&&c._fNormalizedThreshold<=100&&!c._bThresholdNull){r.write("<line");r.writeAttribute("x1","0%");r.writeAttributeEscaped("y1",(100-c._fNormalizedThreshold)+"%");r.writeAttribute("x2","100%");r.writeAttributeEscaped("y2",(100-c._fNormalizedThreshold)+"%");r.addClass("sapSuiteLMCLineThreshold");r.writeClasses();r.write("/>");}};
	sap.suite.ui.microchart.LineMicroChartRenderer._renderLine=function(r,c,s,a,e,b){if(this._isDimensionLineOutsideCanvas(c,s,e,"X")||this._isDimensionLineOutsideCanvas(c,a,b,"Y")){return;}var i,I,d=e-s,f=b-a;if((a-c._fNormalizedThreshold)*(b-c._fNormalizedThreshold)<0){i=s+(c._fNormalizedThreshold-a)*d/f;this._renderLine(r,c,s,a,i,c._fNormalizedThreshold);this._renderLine(r,c,i,c._fNormalizedThreshold,e,b);}else{if(a*b<0){i=s-a*d/f;this._renderLine(r,c,s,a,i,0);this._renderLine(r,c,i,0,e,b);}else if((a-100)*(b-100)<0){i=s+(100-a)*d/f;this._renderLine(r,c,s,a,i,100);this._renderLine(r,c,i,100,e,b);}else if(s*e<0){I=a-s*f/d;this._renderLine(r,c,s,a,0,I);this._renderLine(r,c,0,I,e,b);}else if((s-100)*(e-100)<0){I=a+(100-s)*f/d;this._renderLine(r,c,s,a,100,I);this._renderLine(r,c,100,I,e,b);}else{this._displayLine(r,c,s,a,e,b);}}};
	sap.suite.ui.microchart.LineMicroChartRenderer._displayLine=function(r,c,s,a,e,b){r.write("<line");r.writeAttributeEscaped("x1",s+"%");r.writeAttributeEscaped("y1",(100-a)+"%");r.writeAttributeEscaped("x2",e+"%");r.writeAttributeEscaped("y2",(100-b)+"%");r.addClass("sapSuiteLMCLine");if(c._bSemanticMode&&!c._bFocusMode){if(a>=c._fNormalizedThreshold&&b>=c._fNormalizedThreshold){if(M.ValueColor[c.getColor().above]){r.addClass("sapSuiteLMCLine"+jQuery.sap.encodeHTML(c.getColor().above));}else{r.addStyle("stroke",jQuery.sap.encodeHTML(this._getHexColor(c.getColor().above)));}}else{if(M.ValueColor[c.getColor().below]){r.addClass("sapSuiteLMCLine"+jQuery.sap.encodeHTML(c.getColor().below));}else{r.addStyle("stroke",jQuery.sap.encodeHTML(this._getHexColor(c.getColor().below)));}}}else if(!c._bSemanticMode&&typeof c.getColor()==="string"){if(M.ValueColor[c.getColor()]){r.addClass("sapSuiteLMCLine"+jQuery.sap.encodeHTML(c.getColor()));}else{r.addStyle("stroke",jQuery.sap.encodeHTML(this._getHexColor(c.getColor())));}}else{r.addClass("sapSuiteLMCLineNeutral");}r.writeStyles();r.writeClasses();r.write("/>");};
	sap.suite.ui.microchart.LineMicroChartRenderer._renderLabelsBottom=function(r,c){var s=c.getLeftBottomLabel();if(s&&s.length>0){r.write("<div");r.addClass("sapSuiteLMCLeftBottomLabel");r.addClass("sapSuiteLMCLabel");r.writeClasses();r.write(">");r.writeEscaped(s);r.write("</div>");}var R=c.getRightBottomLabel();if(R&&R.length>0){r.write("<div");r.addClass("sapSuiteLMCRightBottomLabel");r.addClass("sapSuiteLMCLabel");r.writeClasses();r.write(">");r.writeEscaped(R);r.write("</div>");}};
	sap.suite.ui.microchart.LineMicroChartRenderer._renderLabelsTop=function(r,c){var t="",T="",p=c.getPoints(),i=p.length,f,o;if(i>=1){f=p[0];o=p[i-1];if(c._bFocusMode&&c._bSemanticMode&&c._bScalingValid){if(this._isPointEmphasized(f)&&f.getShow()){t="sapSuiteLMCLabel"+f.getColor();}else{t="sapSuiteLMCLabelNeutral";}if(this._isPointEmphasized(o)&&o.getShow()){T="sapSuiteLMCLabel"+o.getColor();}else{T="sapSuiteLMCLabelNeutral";}}else if(!c._bFocusMode&&c._bSemanticMode&&c._bScalingValid&&c.getShowPoints()&&M.ValueColor[c.getColor().above]&&M.ValueColor[c.getColor().below]){if(f.getY()>=c.getThreshold()){t="sapSuiteLMCLabel"+c.getColor().above;}else{t="sapSuiteLMCLabel"+c.getColor().below;}if(o.getY()>=c.getThreshold()){T="sapSuiteLMCLabel"+c.getColor().above;}else{T="sapSuiteLMCLabel"+c.getColor().below;}}else{t="sapSuiteLMCLabelNeutral";T="sapSuiteLMCLabelNeutral";}}var s=c.getLeftTopLabel();if(s&&s.length>0){r.write("<div");r.addClass("sapSuiteLMCLeftTopLabel");r.addClass("sapSuiteLMCLabel");r.addClass(jQuery.sap.encodeHTML(t));r.writeClasses();r.write(">");r.writeEscaped(s);r.write("</div>");}var R=c.getRightTopLabel();if(R&&R.length>0){r.write("<div");r.addClass("sapSuiteLMCRightTopLabel");r.addClass("sapSuiteLMCLabel");r.addClass(jQuery.sap.encodeHTML(T));r.writeClasses();r.write(">");r.writeEscaped(c.getRightTopLabel());r.write("</div>");}};
	sap.suite.ui.microchart.LineMicroChartRenderer._isPointEmphasized=function(p){return p&&p.getMetadata().getName()==="sap.suite.ui.microchart.LineMicroChartEmphasizedPoint";};
	sap.suite.ui.microchart.LineMicroChartRenderer._getHexColor=function(c){return P.get(c)||c;};
	sap.suite.ui.microchart.LineMicroChartRenderer._isDimensionLineOutsideCanvas=function(c,s,e,a)
	{
		var m=100,i=0;
		if(a==="X"&&c._minXScale===c._maxXScale)
			{m=50;i=50;}
		else if(a==="Y"&&c._minYScale===c._maxYScale)
			{m=50;i=50;}
		return((s>=m&&e>=m)&&!(s===m&&e===m))||((s<=i&&e<=i)&&!(s===i&&e===i));
	};
	return sap.suite.ui.microchart.LineMicroChartRenderer;},true);
}


});// End of closure