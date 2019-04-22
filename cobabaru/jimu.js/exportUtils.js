// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/json dojo/Deferred esri/tasks/query esri/tasks/QueryTask esri/tasks/FeatureSet esri/graphic esri/SpatialReference esri/tasks/ProjectParameters esri/config esri/geometry/webMercatorUtils jimu/LayerInfos/LayerInfos ./utils ./GeojsonConverters".split(" "),function(n,d,h,r,m,t,u,v,w,z,A,p,B,C,q,D){function x(a,b){var c="",e=b.length,E=a.length,l="",g="",d;try{h.forEach(a,function(a){c="string"===typeof a?c+l+a:c+l+(a.alias||a.name);l=","});
for(var c=c+"\r\n",f=0;f<e;f++){l="";d=b[f];for(var m=0;m<E;m++){var k=a[m];(g=d["string"===typeof k?k:k.name])||"number"===typeof g||(g="");g&&("esriFieldTypeDate"===k.type?g=q.localizeDateByFieldInfo(g,k.fieldInfo):!k.fieldInfo||"esriFieldTypeDouble"!==k.type&&"esriFieldTypeSingle"!==k.type&&"esriFieldTypeInteger"!==k.type&&"esriFieldTypeSmallInteger"!==k.type||(g=q.localizeNumberByFieldInfo(g,k.fieldInfo)));g&&/[",\r\n]/g.test(g)&&(g='"'+g.replace(/(")/g,'""')+'"');c=c+l+g;l=","}c+="\r\n"}return c}catch(H){return""}}
var f={createDataSource:function(a){return a.type===f.TYPE_TABLE?new F(a):a.type===f.TYPE_FEATURESET?new G(a):null},TYPE_TABLE:"table",TYPE_FEATURESET:"FeatureSet",FORMAT_CSV:"CSV",FORMAT_FEATURESET:"FeatureSet",FORMAT_GEOJSON:"GeoJSON"},y=n(null,{filename:void 0,suffix:".txt",format:void 0,nls:void 0,constructor:function(){this.nls=window.jimuNls.exportTo},getExportString:function(){},getSupportExportFormats:function(){},setFormat:function(a){this.format=a},download:function(){this.getExportString().then(d.hitch(this,
function(a){var b=this.filename+this.suffix;10>dojo.isIE?saveTextAs(a,b,"utf-8"):(a=new Blob([a],{type:"text/plain;charset\x3dutf-8"}),saveAs(a,b,!0))}))},exportToPortal:function(a,b){}}),G=n(y,{featureSet:null,constructor:function(a){this.inherited(arguments);this.featureSet=a.data;this.url=a.url;this.filename=a.filename},getExportString:function(){if(this.format===f.FORMAT_CSV)return this.suffix=".csv",this._getAsCSVString();if(this.format===f.FORMAT_FEATURESET)return this.suffix=".json",this._getAsFeatureSetString();
if(this.format===f.FORMAT_GEOJSON)return this.suffix=".geojson",this._getAsGeoJsonString();var a=new m;a.resolve("");return a},getSupportExportFormats:function(){return[{value:f.FORMAT_CSV,label:this.nls.toCSV},{value:f.FORMAT_FEATURESET,label:this.nls.toFeatureCollection},{value:f.FORMAT_GEOJSON,label:this.nls.toGeoJSON}]},_getFeatureSet:function(){var a=new m;if(this.featureSet)a.resolve(this.featureSet);else if(this.url){var b=new t;b.returnGeometry=!0;b.outFields=["*"];this.queryTask=new u(this.url);
this.queryTask.execute(b,d.hitch(this,function(c){a.resolve(c)}),d.hitch(this,function(){a.resolve(null)}))}else a.resolve(null);return a},_getSpatialReference:function(a){if(a.spatialReference)return a.spatialReference;var b;h.some(a.features,function(a){if(a.geometry&&a.geometry.spatialReference)return b=a.geometry.spatialReference,!0});return b},_projectToWGS84:function(a){var b=new m,c=this._getSpatialReference(a);if(c)if(4326===parseInt(c.wkid,10))b.resolve(a);else if(c.isWebMercator()){var c=
new v,e=[];h.forEach(a.features,function(a){var b=new w;b.attributes=a.attributes;b.geometry=B.webMercatorToGeographic(a.geometry);e.push(b)});c.features=e;b.resolve(c)}else{c=new A;c.geometries=h.map(a.features,function(a){return a.geometry});c.outSR=new z(4326);var d=p&&p.defaults&&p.defaults.geometryService;d&&"esri.tasks.GeometryService"===d.declaredClass||(d=q.getArcGISDefaultGeometryService());d.project(c).then(function(c){var e=new v,d=[];h.forEach(a.features,function(a,b){var e=new w;e.attributes=
a.attributes;e.geometry=c[b];d.push(e)});e.features=d;b.resolve(e)},function(a){console.error(a);b.resolve([])})}else b.resolve([]);return b},_getAsFeatureSetString:function(){return this._getFeatureSet().then(d.hitch(this,function(a){var b="";a&&(a=a.toJson())&&(b=r.stringify(a));return b}))},_getAsGeoJsonString:function(){return this._getFeatureSet().then(d.hitch(this,function(a){return this._projectToWGS84(a)})).then(d.hitch(this,function(a){var b="";if(a&&a.features&&0<a.features.length){var c=
{type:"FeatureCollection",features:[]};h.forEach(a.features,function(a){c.features.push(D.arcgisToGeoJSON(a))});b=r.stringify(c)}return b}))},_getAsCSVString:function(){return this._getFeatureSet().then(d.hitch(this,function(a){var b="";a&&(b=this._createCSVFromFeatureSet(a));return b}))},_createCSVFromFeatureSet:function(a){var b=this._generateFields(a),c=h.map(a.features,function(b){var c=d.clone(b.attributes);"esriGeometryPoint"!==a.geometryType&&"point"!==a.geometryType||!b.geometry||(c.x=b.geometry.x,
c.y=b.geometry.y,b.geometry.spatialReference&&b.geometry.spatialReference.wkid&&(c.wkid=b.geometry.spatialReference.wkid));return c});return x(b,c)},_generateFields:function(a){var b=a.features[0],c,e,f;b._layer&&(c=b._layer.fields,f=b._layer.id);c=d.clone(c||a.fields);if(!c||0===c.length)for(e in c=[],b=b.attributes,b)b.hasOwnProperty(e)&&c.push({name:e});if(e=C.getInstanceSync().getLayerInfoById(f)){var l=e.getPopupInfo();l||(l=e.layerObject.infoTemplate&&e.layerObject.infoTemplate.info);h.forEach(c,
d.hitch(this,function(a){a.fieldInfo=this._findFieldInfo(l,a.name)}))}a.fieldAliases&&h.forEach(c,function(b){a.fieldAliases[b.name]&&(b.alias=a.fieldAliases[b.name])});if("esriGeometryPoint"===a.geometryType||"point"===a.geometryType)c.push({name:"x",type:"esriFieldTypeDouble",alias:"x"}),c.push({name:"y",type:"esriFieldTypeDouble",alias:"y"}),c.push({name:"wkid",type:"esriFieldTypeInteger",alias:"wkid"});return c},_findFieldInfo:function(a,b){if(!a)return null;var c;h.some(a.fieldInfos,function(a){if(a.fieldName===
b)return c=a,!0});return c}}),F=n(y,{table:null,constructor:function(a){this.inherited(arguments);this.table=a.data;this.url=a.url;this.filename=a.filename},getExportString:function(){if(this.format===f.FORMAT_CSV)return this.suffix=".csv",this._getAsCSVString();var a=new m;a.resolve("");return a},getSupportExportFormats:function(){return[{value:f.FORMAT_CSV,label:this.nls.toCSV}]},_getTableData:function(){var a=new m;if(this.table)a.resolve(this.table);else if(this.url){var b=new t;b.outFields=["*"];
this.queryTask=new u(this.url);this.queryTask.execute(b,d.hitch(this,function(b){var c={};c.fields=b.fields;c.datas=h.map(b.features,function(a){return a.attributes});a.resolve(c)}),d.hitch(this,function(){a.resolve(null)}))}else a.resolve(null);return a},_getAsCSVString:function(){return this._getTableData().then(d.hitch(this,function(a){var b="";a&&(b="\ufeff"+x(a.fields,a.datas));return b}))}});return f});