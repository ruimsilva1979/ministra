!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t){return Math.floor(Math.random()*(t-e+1))+e}function o(){var e=document.createElement("div");document.body.appendChild(e),e.className="clock",e.style.top="100px",e.style.left="100px",setInterval(function(){var t,n,o,u;t=e,n=new Date,o=n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes(),u=n.getHours()+":"+o,t.style.top=r(100,screen.height-100)+"px",t.style.left=r(100,screen.width-200)+"px",t.innerHTML=u},1e4)}window.moveTo(0,0),window.resizeTo(screen.width,screen.height),window.onclick=function(){return!1},window.oncontextmenu=function(){return!1},window.onload=function(){o()}}]);
//# sourceMappingURL=main.js.map