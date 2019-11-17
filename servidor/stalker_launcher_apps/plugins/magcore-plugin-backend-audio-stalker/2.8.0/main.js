module.exports=function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=3)}([function(t,e,o){"use strict";t.exports=function(t,e,o,n){(n=n||{})[o=o||"local"]&&n[o].abort(),n[o]=core.backend.request(t,{method:e.method,version:3,body:e.body,onload:function(t,r){r.error&&(t=!0),e.onload(t,r),n[o]=null},onerror:function(t){e.onerror&&e.onerror(!0),n[o]=null},ontimeout:function(){e.onerror&&e.onerror(!0),n[o]=null}})}},function(t,e,o){"use strict";var n=o(0);function r(t){var e;for(e in t=t||{})this[e]=t[e]}r.prototype={},r.prototype.constructor=r,r.prototype.getUrl=function(t){n("audio-tracks/"+this.id+"/link",{method:"GET",onload:function(e,o){t(e,e?null:o.data.url)},onerror:t})},t.exports=r},function(t,e,o){"use strict";t.exports=function(t,e){var o,n=[];for(o in e=e||{})o&&e[o]&&n.push(o+"="+e[o]);return t+"?"+n.join("&")}},function(t,e,o){"use strict";var n=o(4),r=o(7),a={};a.search=function(t,e){e(!0)},t.exports={onAppInit:function(t,e){e(null,new r)},onContentBoardInit:function(t,e){n.load({name:core.environment.language,path:t.path+"lang"},function(){var o,i,u,s,l;o=t,i=e,u=n.gettext,s=o.api,l=o.path+"img/"+screen.height+"/",r.prototype.getAlbums({limit:10,sortby:"added"},function(t,e){var o,n,r;!t&&e.length?((o={provider:a,data:e.map(function(t){var e=t.genres.map(function(t){return t});return t.cover?n={normal:core.backend.host+t.cover,active:core.backend.host+t.cover}:r={normal:l+"audio.png",active:l+"audio-focus.png"},{id:t.id,layout:s.layouts.static,geometry:s.geometry.square,data:{name:t.artist.name,icon:r,image:n,description:t.name,meta:[t.year.name,e.join(", ")],album:t},onClick:function(){core.intent({action:"audioClub",mime:"info",data:this.data.album})}}})}).data.push({layout:s.layouts.static,geometry:s.geometry.square,data:{name:u("See more"),icon:{normal:l+"see-more.png",active:l+"see-more-focus.png"}},onClick:function(){core.intent({action:"audioClub",mime:""})}}),i(!1,o)):i(!0,{provider:a,data:[]})})})}}},function(t,e,o){"use strict";var n=o(5),r=o(6),a=new n;function i(t){var e=new r(t);a._=a.gettext=e.gettext,a.pgettext=e.pgettext,a.ngettext=e.ngettext}a.defaultLanguage="en",a.load=function(t,e){var o;e=e||null,t.ext=t.ext||"json",t.path=t.path||"lang",t.name===a.defaultLanguage?(i(),null!==e&&e(null)):((o=new XMLHttpRequest).onload=function(){var t,n;try{n=JSON.parse(o.responseText)}catch(e){t=e}t?o.onerror(t):(i(n),null!==e&&e(null),a.events["load"]&&a.emit("load"))},o.ontimeout=o.onerror=function(t){i(),null!==e&&e(null),a.events["error"]&&a.emit("error",t)},o.open("GET",t.path+"/"+t.name+"."+t.ext,!0),o.send(null))},t.exports=a},function(t,e,o){"use strict";function n(){this.events={}}n.prototype={addListener:function(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)},once:function(t,e){var o=this;this.events[t]=this.events[t]||[],this.events[t].push(function n(){o.removeListener(t,n),e.apply(o,arguments)})},addListeners:function(t){var e;for(e in t)t.hasOwnProperty(e)&&this.addListener(e,t[e])},removeListener:function(t,e){this.events[t]&&(this.events[t]=this.events[t].filter(function(t){return t!==e}),0===this.events[t].length&&(this.events[t]=void 0))},emit:function(t){var e,o=this.events[t];if(o)for(e=0;e<o.length;e++)o[e].apply(this,Array.prototype.slice.call(arguments,1))}},n.prototype.constructor=n,t.exports=n},function(module,exports,__webpack_require__){"use strict";function Gettext(config){var data,meta;config=config||{},data=config.data||{},data[""]=data[""]||{},meta=config.meta,this.gettext=function(t){return data[""][t]||t},this.pgettext=function(t,e){return data[t]&&data[t][e]||e},this.ngettext=function(msgId,plural,value){var n,evalResult;return data&&meta&&data[""][msgId]?(evalResult=eval("n = "+value+"; "+meta.plural),"boolean"==typeof evalResult&&(evalResult=+evalResult),data[""][msgId][evalResult]):1===value?msgId:plural}}Gettext.prototype.constructor=Gettext,module.exports=Gettext},function(t,e,o){"use strict";var n=o(0),r=o(1),a=o(8),i=o(2);function u(){this.requestLinks={}}u.prototype={},u.prototype.constructor=u,u.prototype.getTracks=function(t,e){n(i("audio-tracks",t),{method:"GET",onload:function(t,o){var n,a=[];if(!t)for(n=0;n<o.data.length;n++)a[n]=new r(o.data[n]);e(t,a,t?0:o.paging.total)},onerror:e},"getTracks",this.requestLinks)},u.prototype.getPlaylists=function(t,e){n(i("audio-playlists",t),{method:"GET",onload:function(t,o){var n,r=[];if(!t)for(n=0;n<o.data.length;n++)r[n]=new a(o.data[n]);e(t,r,t?null:o.paging.total)},onerror:e},"getPlaylists",this.requestLinks)},u.prototype.createPlaylist=function(t,e){n("audio-playlists",{method:"POST",body:JSON.stringify(t),onload:function(t,o){e&&e(t,t?{}:new a(o.data))},onerror:e})},u.prototype.getAllPlaylists=function(t,e){var o,r=this;o={limit:200,offset:(e=e||[]).length},n(i("audio-playlists",o),{method:"GET",onload:function(o,n){var i,u=[];if(!o){for(i=0;i<n.data.length;i++)u[i]=new a(n.data[i]);if(e=e.concat(u),n.paging.total>e.length)return void r.getAllPlaylists(t,e)}t(o,e)},onerror:t},"getPlaylists",this.requestLinks)},u.prototype.getAlbums=function(t,e){n(i("audio-albums",t),{method:"GET",onload:function(t,o){e(t,t?[]:o.data,t?null:o.paging.total)},onerror:e},"getAlbums",this.requestLinks)},u.prototype.getArtists=function(t,e){n(i("audio-artists",t),{method:"GET",onload:function(t,o){e(t,t?[]:o.data,t?null:o.paging.total)},onerror:e},"getArtists",this.requestLinks)},u.prototype.getYears=function(t){n("audio-years",{method:"GET",onload:function(e,o){o.error&&(e=!0),t&&t(e,o)},onerror:t})},u.prototype.getGenres=function(t){n("audio-genres",{method:"GET",onload:function(e,o){o.error&&(e=!0),t&&t(e,o)},onerror:t})},t.exports=u},function(t,e,o){"use strict";var n=o(0),r=o(1),a=o(2);function i(t){var e;for(e in t=t||{})this[e]=t[e];this.requestLinks={}}i.prototype={},i.prototype.constructor=i,i.prototype.getTracks=function(t,e){n(a("audio-playlists/"+this.id+"/audio-tracks",t),{method:"GET",onload:function(t,o){var n,a=[];if(!t)for(n=0;n<o.data.length;n++)a[n]=new r(o.data[n]);e(t,a,t?0:o.paging.total)},onerror:e},"getTracks",this.requestLinks)},i.prototype.edit=function(t,e){n("audio-playlists/"+this.id,{method:"PUT",body:JSON.stringify({name:t}),onload:function(t,o){e&&e(t,o.data)},onerror:e})},i.prototype.remove=function(t){n("audio-playlists/"+this.id,{method:"DELETE",onload:function(e,o){t&&t(e,o.data)},onerror:t})},i.prototype.addTrack=function(t,e){n("audio-playlists/"+this.id+"/audio-tracks",{method:"POST",body:JSON.stringify({id:t}),onload:function(t,o){e&&e(t,o.data)},onerror:e})},i.prototype.addAlbum=function(t,e){n("audio-playlists/"+this.id+"/audio-albums",{method:"POST",body:JSON.stringify({id:t}),onload:function(t,o){e&&e(t,o.data)},onerror:e})},i.prototype.removeTrack=function(t,e){n("audio-playlists/"+this.id+"/audio-tracks/"+t,{method:"DELETE",onload:function(t,o){e&&e(t,o.data)},onerror:e})},t.exports=i}]);
//# sourceMappingURL=main.js.map