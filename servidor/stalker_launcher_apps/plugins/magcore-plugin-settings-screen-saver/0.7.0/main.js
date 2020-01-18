module.exports=function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var a,r,o,i,u=n(1),s=[],c={},l={};e.exports={onInit:function(e,t){u.load({name:core.environment.language,path:e.path+"lang"},function(){i=u.gettext,function(e){var t,n,i;for(n in(a=Number(e.storage.getItem("timeValue")))||0===a||(a=300,e.storage.setItem("timeValue",a)),gSTB.SetScreenSaverTime(a),r=e.storage.getItem("saverName"),t=core.packageMap)t.hasOwnProperty(n)&&t[n].type&&"screen-saver"===t[n].type&&(i={name:core.packageMap[n].name,path:core.packageMap[n].url,packageName:core.packageMap[n].packageName},s.push(i),c[i.packageName]=i,l[core.packageMap[n].packageName]=i.path,r===i.packageName&&(o=i));!r&&s[0]&&(r=s[0].packageName,o=s[0],e.storage.setItem("saverName",r)),r?gSTB.SetScreenSaverInitAttr(JSON.stringify({url:l[r],backgroundColor:"#000"})):gSTB.SetScreenSaverTime(0)}(e),t()})},onAppInit:function(e,t){t(null,{})},onSettingsInit:function(e,t){t(null,function(e){var t,n={0:i("Disabled"),60:i("1 minute"),300:i("5 minutes"),600:i("10 minutes"),1200:i("20 minutes"),1800:i("30 minutes")};return t=r?{content:[{id:"screenSaverInterval",parent:"userInterface",type:"option",name:i("Screensaver interval"),description:[{label:i("Interval")+":",value:n[a]||""},{label:"",value:i("The duration of the device inactivity, upon which appears the screensaver")}],icon:"theme-icon-screensaver-interval",data:{timeValue:300},saveImmediate:!0,render:e.api.renders.popupSelect,prepareForRender:function(e,t){t([0,60,300,600,1200,1800].map(function(e){return{value:e,name:n[e],selected:a===e}}))},prepareForSave:function(r,o){a=r,this.data.timeValue=a,gSTB.SetScreenSaverTime(a),o(null,function(){e.api.actions.setInfo({description:[{label:i("Interval")+":",value:n[a]||""},{label:"",value:i("The duration of the device inactivity, upon which appears the screensaver")}]}),t&&t.content&&t.content[0]&&t.content[0].description&&(t.content[0].description[0].value=n[a]||"")})}},{id:"screenSaverSelect",parent:"userInterface",type:"option",name:i("Screensaver"),description:[{label:i("Name")+":",value:o.name},{label:"",value:i("Choosing a splash Screensaver")}],icon:"theme-icon-screensaver",data:{saverName:""},saveImmediate:!0,render:e.api.renders.popupSelect,prepareForRender:function(e,t){var n=[];s.forEach(function(e){n.push({value:e.packageName,name:e.name,selected:e.packageName===r})}),t(n)},prepareForSave:function(n,a){r=c[n].packageName,o=c[n],this.data.saverName=r,gSTB.SetScreenSaverInitAttr(JSON.stringify({url:l[r],backgroundColor:"#000"})),a(null,function(){e.api.actions.setInfo({description:[{label:i("Name")+":",value:o.name},{label:"",value:i("Choosing a splash Screensaver")}]}),t&&t.content&&t.content[1]&&t.content[1].description&&(t.content[1].description[0].value=o.name)})}}]}:{content:[]}}(e))}}},function(e,t,n){"use strict";var a=n(2),r=n(3),o=new a;function i(e){var t=new r(e);o._=o.gettext=t.gettext,o.pgettext=t.pgettext,o.ngettext=t.ngettext}o.defaultLanguage="en",o.load=function(e,t){var n;t=t||null,e.ext=e.ext||"json",e.path=e.path||"lang",e.name===o.defaultLanguage?(i(),null!==t&&t(null)):((n=new XMLHttpRequest).onload=function(){var e,a;try{a=JSON.parse(n.responseText)}catch(t){e=t}e?n.onerror(e):(i(a),null!==t&&t(null),o.events["load"]&&o.emit("load"))},n.ontimeout=n.onerror=function(e){i(),null!==t&&t(null),o.events["error"]&&o.emit("error",e)},n.open("GET",e.path+"/"+e.name+"."+e.ext,!0),n.send(null))},e.exports=o},function(e,t,n){"use strict";function a(){this.events={}}a.prototype={addListener:function(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)},once:function(e,t){var n=this;this.events[e]=this.events[e]||[],this.events[e].push(function a(){n.removeListener(e,a),t.apply(n,arguments)})},addListeners:function(e){var t;for(t in e)e.hasOwnProperty(t)&&this.addListener(t,e[t])},removeListener:function(e,t){this.events[e]&&(this.events[e]=this.events[e].filter(function(e){return e!==t}),0===this.events[e].length&&(this.events[e]=void 0))},emit:function(e){var t,n=this.events[e];if(n)for(t=0;t<n.length;t++)n[t].apply(this,Array.prototype.slice.call(arguments,1))}},a.prototype.constructor=a,e.exports=a},function(module,exports,__webpack_require__){"use strict";function Gettext(config){var data,meta;config=config||{},data=config.data||{},data[""]=data[""]||{},meta=config.meta,this.gettext=function(e){return data[""][e]||e},this.pgettext=function(e,t){return data[e]&&data[e][t]||t},this.ngettext=function(msgId,plural,value){var n,evalResult;return data&&meta&&data[""][msgId]?(evalResult=eval("n = "+value+"; "+meta.plural),"boolean"==typeof evalResult&&(evalResult=+evalResult),data[""][msgId][evalResult]):1===value?msgId:plural}}Gettext.prototype.constructor=Gettext,module.exports=Gettext}]);
//# sourceMappingURL=main.js.map