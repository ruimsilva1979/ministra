module.exports=function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";function a(){this.events={}}a.prototype={addListener:function(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)},once:function(e,t){var n=this;this.events[e]=this.events[e]||[],this.events[e].push(function a(){n.removeListener(e,a),t.apply(n,arguments)})},addListeners:function(e){var t;for(t in e)e.hasOwnProperty(t)&&this.addListener(t,e[t])},removeListener:function(e,t){this.events[e]&&(this.events[e]=this.events[e].filter(function(e){return e!==t}),0===this.events[e].length&&(this.events[e]=void 0))},emit:function(e){var t,n=this.events[e];if(n)for(t=0;t<n.length;t++)n[t].apply(this,Array.prototype.slice.call(arguments,1))}},a.prototype.constructor=a,e.exports=a},function(e,t,n){"use strict";var a,o,r=n(2),s=n(0),i={ids:{base:"network",test:"speed-test"},ajaxStop:!1,ajax:function(e,t,n,a,o,r){var s,l,u=null,c=null,d=new XMLHttpRequest;if(r=!1!==r,d.onreadystatechange=function(){if(4===d.readyState)if(clearTimeout(c),i.ajaxStop)"function"==typeof n&&n(null,null,null);else{if("json"===o&&200===d.status)try{u=JSON.parse(d.responseText)}catch(e){u=null}"function"==typeof n&&(l="xml"===o?d.responseXML:"json"===o?u:d.responseText,n(l,d.status,d))}},d.open(e,t,r),a)for(s in a)a.hasOwnProperty(s)&&d.setRequestHeader(s,a[s]);return d.send(),c=setTimeout(function(){d.abort(),"function"==typeof n&&n(null,0)},6e4),d},getHumanReadableSpeed:function(e){var t,n,a=1e3*e.sizeDone/e.timeWasted*8;return a>=1048576?(t="Mbps",n=1048576):a>=1024?(t="Kbps",n=1024):(t="bps",n=1),(a/n).toFixed(2)+" "+t},calculateTheDistance:function(e,t,n,a){var o=e*Math.PI/180,r=n*Math.PI/180,s=t*Math.PI/180,i=a*Math.PI/180,l=Math.cos(o),u=Math.cos(r),c=Math.sin(o),d=Math.sin(r),p=i-s,f=Math.cos(p),v=Math.sin(p),g=c*d+l*u*f,h=Math.sqrt(Math.pow(u*v,2)+Math.pow(l*d-c*u*f,2)),m=Math.atan2(h,g);return Math.ceil(6372795*m)}};function l(){s.call(this),this.server="",this.destroy=function(){this.events={}}}function u(e){return{id:"networkSpeed",name:o("Network speed"),parent:i.ids.base,type:"option",description:o("Network speed"),icon:"theme-icon-settings",title:o("Network speed"),config:{focusable:!1},events:{click:function(){var t=this;a.events["progress"]=void 0,a.addListener("progress",function(e){t.setData({data:[{items:["LAN: "+(gSTB.GetLanLinkStatus()?o("Available"):o("Not available"))]},{items:["WiFi: "+(gSTB.GetWifiLinkStatus()?o("Available"):o("Not available"))]},{items:[o("Speed:")+" "+e.text]}]})}),a.start(e)}},prepareForRender:function(e,t){t([{items:["LAN: "+(gSTB.GetLanLinkStatus()?o("Available"):o("Not available"))]},{items:["WiFi: "+(gSTB.GetWifiLinkStatus()?o("Available"):o("Not available"))]},{items:[o("Speed:")+" "+o("Waiting")]}])},render:e.api.renders.popupLayoutList,data:{}}}l.prototype=Object.create(s.prototype),l.prototype.constructor=l,l.prototype.init=function(e){var t,n=[{name:"San Jose",lat:37.33939,long:-121.89496,code:"us"},{name:"Washington D.C",lat:38.89511,long:-77.03637,code:"us"},{name:"Amsterdam",lat:52.37403,long:4.88969,code:"nl"},{name:"Frankfurt",lat:50.11667,long:8.68333,code:"de"}],a=this;t={lat:Number(e.storage.getItem("userLat")),lon:Number(e.storage.getItem("userLon"))},i.ajax("get","http://weather.infomir.com.ua/getGeo.php",function(o){var r;try{o=JSON.parse(o).data}catch(e){o={lat:0,lon:0}}if(o.lat&&o.lat!==t.lat||o.lon&&o.lon!==t.lon){for(e.storage.setItem("userLat",t.lat),e.storage.setItem("userLon",t.lon),t.lat=o.lat,t.lon=o.lon,r=0;r<n.length;r++)n[r].distance=i.calculateTheDistance(t.lat,t.lon,n[r].lat,n[r].long);n.sort(function(e,t){return e.distance-t.distance}),a.server="http://mirror."+n[0].code+".leaseweb.net/speedtest/10mb.bin",e.storage.setItem("server",a.server)}else a.server=e.storage.getItem("server")})},l.prototype.start=function(e){var t,n,a=this,r={STOPPED:0,WAITING:1,RUNNING:2,FINISHED:3,TEMPORARY_ERROR:4,PERMANENT_ERROR:5};function s(){stbDownloadManager.AddMeasureJob(a.server||e.storage.getItem("server")),t=window.setInterval(function(){var e,n=JSON.parse(stbDownloadManager.GetMeasureInfo())[0];n.state===r.TEMPORARY_ERROR||n.state===r.PERMANENT_ERROR?(window.clearInterval(t),e=o("Error"),stbDownloadManager.DeleteJob(n.id,!1)):n.state===r.WAITING||n.state===r.RUNNING?e=o("Measure progress")+" "+Math.round(n.progressPct||0)+"%":n.state===r.FINISHED&&(window.clearInterval(t),e=i.getHumanReadableSpeed(n),stbDownloadManager.DeleteJob(n.id,!1)),a.emit("progress",{code:n.state,text:e})},2e3)}(n=JSON.parse(stbDownloadManager.GetMeasureInfo())).length?(n.forEach(function(e){stbDownloadManager.DeleteJob(e.id,!1)}),setTimeout(s,100)):s()},a=new l,e.exports={onInit:function(e,t){r.load({name:window.core.environment.language,path:e.path+"lang"},function(){var s=new(n(0));o=r.gettext,s.addListener("system:start",function(){window.MODE_STALKER?window.core.backend.once("ready",function(){a.server=window.core.backend.settings.speedtest_url||"",e.storage.getItem("server")!==a.server&&e.storage.setItem("server",a.server)}):a.init(e)}),t(null,s)})},onAppInit:function(e,t){t(null,{})},onSettingsInit:function(e,t){t(null,{content:[u(e)]})}}},function(e,t,n){"use strict";var a=n(0),o=n(3),r=new a;function s(e){var t=new o(e);r._=r.gettext=t.gettext,r.pgettext=t.pgettext,r.ngettext=t.ngettext}r.defaultLanguage="en",r.load=function(e,t){var n;t=t||null,e.ext=e.ext||"json",e.path=e.path||"lang",e.name===r.defaultLanguage?(s(),null!==t&&t(null)):((n=new XMLHttpRequest).onload=function(){var e,a;try{a=JSON.parse(n.responseText)}catch(t){e=t}e?n.onerror(e):(s(a),null!==t&&t(null),r.events["load"]&&r.emit("load"))},n.ontimeout=n.onerror=function(e){s(),null!==t&&t(null),r.events["error"]&&r.emit("error",e)},n.open("GET",e.path+"/"+e.name+"."+e.ext,!0),n.send(null))},e.exports=r},function(module,exports,__webpack_require__){"use strict";function Gettext(config){var data,meta;config=config||{},data=config.data||{},data[""]=data[""]||{},meta=config.meta,this.gettext=function(e){return data[""][e]||e},this.pgettext=function(e,t){return data[e]&&data[e][t]||t},this.ngettext=function(msgId,plural,value){var n,evalResult;return data&&meta&&data[""][msgId]?(evalResult=eval("n = "+value+"; "+meta.plural),"boolean"==typeof evalResult&&(evalResult=+evalResult),data[""][msgId][evalResult]):1===value?msgId:plural}}Gettext.prototype.constructor=Gettext,module.exports=Gettext}]);
//# sourceMappingURL=main.js.map