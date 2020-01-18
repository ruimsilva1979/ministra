module.exports=function(t){var n={};function e(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,e),a.l=!0,a.exports}return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)e.d(o,a,function(n){return t[n]}.bind(null,a));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=4)}([function(t,n,e){"use strict";var o,a,r,i,A=e(1),c=e(5),u=e(2),s=e(3),l=[],d=window.core.backend.request,f=500,g=60,p=30,h=10,v={addCount:0,updateCount:0,deleteCount:0},C=[],y={};function I(){!l.length&&v.deleteCount<h?v.deleteCount++:(v.deleteCount=0,d("tv-channels/deleted?from="+r+"&t="+ +new Date,{onload:function(t,n){!t&&n&&(r=n.timestamp,n.data.length&&(s.list=s.list.filter(function(t){return n.data.indexOf(t.id)<0}),l.forEach(function(t){t.emit("channels:delete",{data:n.data})})))}}))}function E(){!l.length&&v.updateCount<h?v.updateCount++:(v.updateCount=0,d("tv-channels/modified?from="+a+"&t="+ +new Date,{onload:function(t,n){var e,o={};if(!t&&n&&(a=n.timestamp,n.data.length)){for(n.data.forEach(function(t){o[t.id]=new c(t)}),e=0;e<s.list.length;e++)o[s.list[e].id]&&(s.list[e]=o[s.list[e].id]);l.forEach(function(t){t.emit("channels:modified",{data:n.data})})}}}))}function m(t,n){var e="tv-channels",A=Date.now()/1e3;e+="?limit="+f,(t=t||{}).offset&&(e+="&offset="+t.offset),d(e+="&t="+A,{onload:function(e,A){var u;if(e);else{for(u=0;u<A.data.length;u++)C.push(new c(A.data[u]));i||(i=A.paging.total),C.length<i?(t.offset=C.length,m(t,n)):(s.list=C,C=[],i=0,t.eventName=t.eventName||"ready",t.update&&l.forEach(function(t){t.emit("update")}),n&&n(!1),o=r=a=A.timestamp)}},onerror:function(){n(!0)}})}function B(){A.call(this),this.backgroungCheckInterval=null}window.core.backend.addListener("message",function(t){switch(t.type){case"update_subscription":m({update:!0})}}),y.addChannelsInterval=setInterval(function(){var t;!l.length&&v.addCount<h?v.addCount++:(t="tv-channels/added?from="+o+"&t="+ +new Date,v.addCount=0,d(t,{onload:function(t,n){!t&&n&&(o=n.timestamp,n.data.length&&(n.data=n.data.map(function(t){return new c(t)}),s.list=s.list.concat(n.data),l.forEach(function(t){t.emit("channels:add",{data:n.data})})))}}))},18e4),setTimeout(function(){y.deleteChannelsInterval=setInterval(I,18e4)},15e3),setTimeout(function(){y.updateChannelsInterval=setInterval(E,18e4)},3e4),B.prototype=Object.create(A.prototype),B.prototype.constructor=B,B.prototype.getChannels=function(t,n){var e,o=s.list;t.favorite&&(o=o.filter(function(t){return!!t.favorite})),t.genre&&(o=o.filter(function(n){return n.genre.id===t.genre})),o=t.byName?o.sort(function(t,n){return t.name>n.name?1:-1}):o.sort(function(t,n){return t.number>n.number?1:-1}),t.pvr&&(o=o.filter(function(t){return t.pvr||t.local_pvr})),t.search&&(e=new RegExp(t.search,"i"),o=o.filter(function(t){var n=t.name.match(e),o=t.number.toString().match(e);return n&&n.length||o&&o.length})),n(!1,o)},B.prototype.updateChannelsList=function(t){m(null,t)},B.prototype.getCategories=function(t){d("tv-genres",{onload:function(n,e){n?t&&t(!0):t&&t(!1,e.data)},onerror:function(){t&&t(!0)}})},B.prototype.getLastChannelId=function(t){d("storage/lastChannel",{method:"GET",onload:function(n,e){n&&t?t(n,null):t&&e.data.value&&t(!1,e.data.value)},onerror:function(){t&&t(!0,null)}})},B.prototype.getEpgLink=function(t,n){var e="tv-channels/"+t.channelId+"/epg/"+t.epgId+"/link";d(e,{onload:function(t,e){t?n(!0,[]):n(!1,e.data)},onerror:function(){n(!0,[])}})},B.prototype.getChannelsEpg=function(t,n){var e,o,a,r,i={};return a=(t=t||{}).channels,e=a.length>1,r=t.from||t.to?"from="+(Math.round(t.from/1e3)||"")+"&to="+(Math.round(t.to/1e3)||""):"next=1",a.forEach(function(t){i[t.id]=t}),o="tv-channels/"+encodeURIComponent(a.map(function(t){return t.id}).join(","))+"/epg?"+r,d(o,{onload:function(t,o){var r={};t&&n?n(!0,[]):(Object.keys(o.data).forEach(function(t){var n=e?t:a[0].id,A=e?o.data[t]:o.data;r[n]=[],A.forEach(function(t){t.channel=i[n],r[n].push(new u(t))})}),n(!1,r))},onerror:function(){n(!0,[])}})},B.prototype.destroy=function(){var t=l.indexOf(this);t&&(l=l.splice(t,1))},B.prototype.startBackgroundCheck=function(){var t=this;function n(){var t=60*(Math.floor(Math.random()*g)+p)*1e3;return t/6e4>60&&(t=n()),t}this.backgroungCheckInterval=setTimeout(function e(){var o=s.list.length;m({},function(a){o!==s.list.length&&t.emit("update"),t.backgroungCheckInterval=setTimeout(e,n())})},n())},B.prototype.stopBackgroundCheck=function(){clearTimeout(this.backgroungCheckInterval)},t.exports=function(t,n){var e=new B;l.push(e),n(null,e)}},function(t,n,e){"use strict";function o(){this.events={}}o.prototype={addListener:function(t,n){this.events[t]=this.events[t]||[],this.events[t].push(n)},once:function(t,n){var e=this;this.events[t]=this.events[t]||[],this.events[t].push(function o(){e.removeListener(t,o),n.apply(e,arguments)})},addListeners:function(t){var n;for(n in t)t.hasOwnProperty(n)&&this.addListener(n,t[n])},removeListener:function(t,n){this.events[t]&&(this.events[t]=this.events[t].filter(function(t){return t!==n}),0===this.events[t].length&&(this.events[t]=void 0))},emit:function(t){var n,e=this.events[t];if(e)for(n=0;n<e.length;n++)e[n].apply(this,Array.prototype.slice.call(arguments,1))}},o.prototype.constructor=o,t.exports=o},function(t,n,e){"use strict";var o=window.core.backend.request;function a(t){t=t||{},this.downloadable=t.downloadable,this.start=t.start,this.end=t.end,this.title=t.name,this.id=t.id,this.archive=t.in_archive,this.channel=t.channel}a.prototype={},a.prototype.constructor=a,a.prototype.getLink=function(t){var n="tv-channels/"+this.channel.id+"/epg/"+this.id+"/link";o(n,{onload:function(n,e){n?t(!0,null):t(!1,e.data)},onerror:function(){t(!0,null)}})},t.exports=a},function(t,n,e){"use strict";var o,a;o={list:[],findByNumber:(a="number",function(t){var n,e,r;for(n=o.list.length,e=0;e<n;e++)if(void 0!==(r=o.list[e])[a]&&r[a].toString()===t.toString())return r;return!1})},t.exports=o},function(t,n,e){"use strict";t.exports={onAppInit:function(t,n){e(0)(t,n)},onInit:e(6),onContentBoardInit:function(t,n){e(7)(t,n)}}},function(t,n,e){"use strict";var o=window.core.backend.request,a=e(2);function r(t){var n;for(n in t=t||{})this[n]=t[n]}r.prototype={},r.prototype.constructor=r,r.prototype.toggleFavorite=function(t){var n=this;o("tv-channels/"+this.id,{method:"PUT",body:JSON.stringify({favorite:!n.favorite}),onload:function(e){e?t(!0):(n.favorite=!n.favorite,t(!1,n.favorite))},onerror:function(){t(!0)}})},r.prototype.getUrl=function(t){this.url?t(!1,{url:this.url,solution:this.solution}):o("tv-channels/"+this.id+"/link",{onload:function(n,e){n?t(n,null):t(!1,{url:e.data.url,solution:e.data.solution})},onerror:function(){t(!0,null)}})},r.prototype.getEpg=function(t,n){var e,r,i,A=this,c=new Date;t=t||{},r=+new Date(c.getFullYear(),c.getMonth(),c.getDate()-7),i=+new Date(c.getFullYear(),c.getMonth(),c.getDate()+7),r=Math.round(r/1e3),i=Math.round(i/1e3),r=t.from||r,i=t.to||i,e="tv-channels/"+this.id+"/epg/?from="+r+"&to="+i,o(e,{onload:function(t,e){var o=[];t&&n?n(!0,[]):(e.data.forEach(function(t){t.channel=A,o.push(new a(t))}),n(!1,o))},onerror:function(){n(!0,[])}})},r.prototype.setLast=function(t){o("storage",{body:JSON.stringify({value:this.id,key:"lastChannel"}),method:"POST",onload:function(n){n&&t?t(n):t&&t(!1)},onerror:function(){t&&t(!0,null)}})},t.exports=r},function(t,n,e){"use strict";var o=e(1),a=e(3),r="magcore-app-tv",i="magcore-app-tv-classic",A={};function c(t){return core.taskManager.topApp&&core.taskManager.topApp.config.packageName===t}t.exports=function(t,n){var u=new o;u.once("system:start",function(){A.TV=core.packageMap[r],A.CLASSIC_TV=core.packageMap[i],e(0)(t,function(t,n){n.updateChannelsList(function(){window.core.backend.addListener("message",function(t){var n,e,o;t&&"play_channel"===t.type&&(n=t.msg,c(i)?e=A.CLASSIC_TV:c(r)?e=A.TV:A.CLASSIC_TV&&!A.CLASSIC_TV.locked?e=A.CLASSIC_TV:!A.TV||A.TV.locked&&!c(r)||(e=A.TV),(o=a.findByNumber(n))&&(o.censored||o.genre&&o.genre.censored)||core.taskManager.runApp({config:e,ignoreAccessControl:!0,visible:!0,onload:function(t){setTimeout(function(){t.core.emit("play:channel",{number:parseInt(n,10)})},100)}}))})})})}),n&&n(!1,u)}},function(t,n,e){"use strict";var o=e(1),a=e(0),r=e(8),i={480:{normal:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAb5JREFUWAntVr1Kw1AUTtKf2KAdYhcHEQdBBHH2ARw6dBQtIu6+hBk6+wq6CQWnPoVPoOAoDjZ0CSSlxCR+B3NKS2/SXHqLDgnc3r9zvu/c7557bzVN0wwUpV+SJBbKte/7O0uAjSoM4iVGUtOe523HcXwFJ9s0TcJ/yAGIyUDZFwTBbqPR6CIAUuCzUqn0l4EXkn88Hu8B8NJ13a0swMlkcoQV36TkbyB/1HXdz7Ln8UIB1Gq1MwAftlqtWwRyzM5ch2F4Wq/Xz9GvYv6l1+v1QR7y/Mo1rRzA3SiKHCpoXwyHw03HcQy02+nYHQUiS6bLOIDsBPZtqLFhGEaA9hfa+6i/0X/Gql9l8MhWKgByGI1GTdu2OyA+oD6+APv/ZFnWx29X7lcn+eRc1FoXSkK1lPNo03sAx8aZn1pvj5X/PwrwepHplFyUZE0eW6XG6fDgP8AJeRfhiBRQRk6E6UI6InIam+YAG/DKVeUE7TVjMsdsLVJgdn7t7TKAUoFSgVKBUoGFt4BeL7q7+b1WcRenL6IQSrQFgzwHIUrOID/HWSYLCqTv9n2Wg+pxkQKqOXLx/v5fMRIuN8J1ThL3DwPnuJXTZYA4AAAAAElFTkSuQmCC",active:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAuJJREFUaAXtmb9rFEEUx3dXEdRAIF2wkYAoCGJjKyKmCNhaHKSLlzKllWjl/5BCC8EuYKNtbL3Kwh8gEiyMqIWCcoEIend+Xnhv3dzuunPH7d6M3MKXeTPzfnzfzpvZu90oiqIjwItrMBgcB5vgoiMhb7hHkD4NXvT7fZrBJzDnmMT01SC7DL4q+W/I16bPypEBZG+B30r+JfKSo+lk1Ai4PI4n7ObAlhBX8lv0T47ja2wbAt7R4I+R510doXsGvFbbHvJtV9uJ6hF4A/xSIjvIlacHOtfBd7X5If2JkhrVGQQugy9KaB/5ZpEPxmNwF6B6cNK8RT5XpNv4GEROgedCTMk9pH/CiCDPgyeZ+acyZvNetBA6BjYzJF/RPwvOg3eZ8Xv0Ey9IF5GA3Br4qSvRRe6qvId8o8jGuzGIXgIfMnf9Pf0LdRCNJUgdjpvy6W8tOt6Bo6aXJElscgitVU7wK1CaAJtOHjxt0AEHJ4ltykm24ltjSKyRqyDdxNkSwtEiZfSI9mqT5RTH8TPirdJ+roprJRTZ3TQDuQtgW8a5dkELSEK1XOJbY+xqzG36lSuR8k4FpYdxO0N+oRbWBU6JuwAsiXaByqGhlHcq6DROOppA65BFAx1itzR2pypcyjsV/iZgj/7ayqaMHAksagLdMh0bN965TSwTopTd1GbUROsaP9VrglSdMUqfA3UGHcU3ZbUC5DQUrORsrZZsYrhv4021w/GFuI2JbDxszPsVMMJlbQgJrPNk/iggifXhRGan0PAdabrvfQnJySObVzE7hZqukMp43pcQGcxOocplnKZCCCX0z/vz/yXAI3tPUubcncofGoltHESuuopW4I0aXakyrmHeYhqH6hD2s9Q0ufPB/6kP6rVK7teorITWfxAvtgoT0CTk5ZJ871oD8pWlli/numGl5h+A+/SdXvdL6aMflSYgkz5flkDRKeQz7xy3dAVyM4EMJL1eLxCqeZrC/Q9bOOZ3iNQcwwAAAABJRU5ErkJggg=="},576:{normal:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAb5JREFUWAntVr1Kw1AUTtKf2KAdYhcHEQdBBHH2ARw6dBQtIu6+hBk6+wq6CQWnPoVPoOAoDjZ0CSSlxCR+B3NKS2/SXHqLDgnc3r9zvu/c7557bzVN0wwUpV+SJBbKte/7O0uAjSoM4iVGUtOe523HcXwFJ9s0TcJ/yAGIyUDZFwTBbqPR6CIAUuCzUqn0l4EXkn88Hu8B8NJ13a0swMlkcoQV36TkbyB/1HXdz7Ln8UIB1Gq1MwAftlqtWwRyzM5ch2F4Wq/Xz9GvYv6l1+v1QR7y/Mo1rRzA3SiKHCpoXwyHw03HcQy02+nYHQUiS6bLOIDsBPZtqLFhGEaA9hfa+6i/0X/Gql9l8MhWKgByGI1GTdu2OyA+oD6+APv/ZFnWx29X7lcn+eRc1FoXSkK1lPNo03sAx8aZn1pvj5X/PwrwepHplFyUZE0eW6XG6fDgP8AJeRfhiBRQRk6E6UI6InIam+YAG/DKVeUE7TVjMsdsLVJgdn7t7TKAUoFSgVKBUoGFt4BeL7q7+b1WcRenL6IQSrQFgzwHIUrOID/HWSYLCqTv9n2Wg+pxkQKqOXLx/v5fMRIuN8J1ThL3DwPnuJXTZYA4AAAAAElFTkSuQmCC",active:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAuJJREFUaAXtmb9rFEEUx3dXEdRAIF2wkYAoCGJjKyKmCNhaHKSLlzKllWjl/5BCC8EuYKNtbL3Kwh8gEiyMqIWCcoEIend+Xnhv3dzuunPH7d6M3MKXeTPzfnzfzpvZu90oiqIjwItrMBgcB5vgoiMhb7hHkD4NXvT7fZrBJzDnmMT01SC7DL4q+W/I16bPypEBZG+B30r+JfKSo+lk1Ai4PI4n7ObAlhBX8lv0T47ja2wbAt7R4I+R510doXsGvFbbHvJtV9uJ6hF4A/xSIjvIlacHOtfBd7X5If2JkhrVGQQugy9KaB/5ZpEPxmNwF6B6cNK8RT5XpNv4GEROgedCTMk9pH/CiCDPgyeZ+acyZvNetBA6BjYzJF/RPwvOg3eZ8Xv0Ey9IF5GA3Br4qSvRRe6qvId8o8jGuzGIXgIfMnf9Pf0LdRCNJUgdjpvy6W8tOt6Bo6aXJElscgitVU7wK1CaAJtOHjxt0AEHJ4ltykm24ltjSKyRqyDdxNkSwtEiZfSI9mqT5RTH8TPirdJ+roprJRTZ3TQDuQtgW8a5dkELSEK1XOJbY+xqzG36lSuR8k4FpYdxO0N+oRbWBU6JuwAsiXaByqGhlHcq6DROOppA65BFAx1itzR2pypcyjsV/iZgj/7ayqaMHAksagLdMh0bN965TSwTopTd1GbUROsaP9VrglSdMUqfA3UGHcU3ZbUC5DQUrORsrZZsYrhv4021w/GFuI2JbDxszPsVMMJlbQgJrPNk/iggifXhRGan0PAdabrvfQnJySObVzE7hZqukMp43pcQGcxOocplnKZCCCX0z/vz/yXAI3tPUubcncofGoltHESuuopW4I0aXakyrmHeYhqH6hD2s9Q0ufPB/6kP6rVK7teorITWfxAvtgoT0CTk5ZJ871oD8pWlli/numGl5h+A+/SdXvdL6aMflSYgkz5flkDRKeQz7xy3dAVyM4EMJL1eLxCqeZrC/Q9bOOZ3iNQcwwAAAABJRU5ErkJggg=="},720:{normal:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA8lJREFUaAXtWctrE0EczsPEqE2LaIW0HlrEB21BiFfBguYkuVStgkel+mf00LNnDz1IL+agRSjioZeIZwsiBiGIPSViUUIfeT/8vnU2LpmUnXQncbd0YDqP/T2+b36/md1OfD6fL4jqitJqtUL1ej25t7cXUwQUDECwoSjcV7FCoXC62Ww+8vv91yKRyMNsNntcwWHDryDUdxGs/AWAvwtHJwKBQKlSqbwCiW8qjv87gVqtdh2gbwIssfzc3d1NjYyM/FYBTxmmkKPC1TuIAaYIdOcB/hb0/WgzqMu9gKdfRxHA6s3C6SyAfA0Gg2+Qv2UVMpA/g5R5ANlR6LewcdOhUOi9im6njKMIAEgZAJoAfgWAnqicHuVy+TJkFwR4pHsldVDwJOMoAjRQKpUmwuHwPXRPgUwdUXmH8Uc+sxaQpa8bAD8r5n8Vi8VUNBrdssr12ndMgA4BbhjNPMCd5xhEPmUymbfT09NVjvE8gmYOzy+JcRYp91o15aizX3GUQqZRANlOp9MvANRYeQC9OjU19Rjjs6jnMF4wwYPch6WlpZc6wNO/lgiYRNgCcBxgb6MbBFgjAhiHMa5hzI3+hXK6inYCBAYS4wB9H12mFksBeyU1NDT04+9Q319/o9FY1Gdu8Ja07IHBw/7n8ZjZxamwaPa90JqZc3gi0Lnq2Ijc4HEwjSM6o+Ik6RRzPOZJBR9b8LEBYxs4pVq9GG2nkFUJ4KMY88UzCYM+tNbHWvtcGPjgqTUOMjPwvYrxjqoTiYBYeQM8DG7D0DrqZi9GVZ1TTizWBLoJLhh8zmFuBf6UItFtD/BFREPb+Xz+OQx97hd4EqBt+qAv+qRvTMf5TKVIBJjzQnF9bGysqGJEh4zwxWj7LBhsTUsEuGGF1qattn4Bw6cFg60HiQBCyO8WI7S22poFzFQ1MaiYlwioKLlJRjqF3ASOWHAiXUSTFLjWEKWs6BuNFyKQREoNs1qItDl4gUAbbLeOFwis8f3ACgJrnSRcvwdEzj/rBG6OvRABE2vX1vURODqFusbNRZNe2ANHp5CLEkaG4oUUklFbZg4fAbyyzRtl/mM/0CL+P+bttoFBxbkUAV5xCMUJFQOaZQyfFgy25iUC4n6GiolcLnfS1oImAeErQXMWDLbWu31KbCCEM/j+nozFYk8R1kFeqwzD93eg5iWXUpEI4OsPmFurMGTcDcHKHVpCWJUM9iqEhWqrCPC82FK6E6KiRICTMLADEisw6M2rRUGCq8CfjFhdW6RN7Fqk+wDz/i801Wq1L7+T7bNgWqeJ/Q+uGajXVAGMsgAAAABJRU5ErkJggg==",active:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA7dJREFUeAHtmj1oFEEUx/dODYKNSvALLW2CmMo+iIXaWAq2gqV2AQt7iSB2SpqATUq7VAaDFtaWIgoaMV0kEEEw3vl7YSf3nN2b29m93Zvd24U/8/bNzHv/92bn7dxHFEXRIRD81e/3z4DX4PIYydYi9oig58G3Xq9H0/8KTo8xCWGbIthbYFeCN+D+PTg6DubdcRgpywZBLmL7Fe0xy8dP7o9YuubcEvAMWDErrlv0z0D4exeSHfAQHPdZGsbPgnc6aJG5/oB7PrYmOhayj2Lin5AvZSHDuDnwReZpoNsGV7PYCGIMZG+CvyYI5F1w20WO/htgx8wxLbqP4KJrbnB9EF4zAegW/ROQ2L/oHoA9PVZkLnnvnwguwFGEIC1F7IUdUBzUOn2zYoP2sGPcc+kf5SvofgK4C37biUAnh5lrYD2lbw/9/aAD8yFHMFfAph1o2j3jdsB1H/u1GEtQp8CbtKCNjv7PYK4WAeUhSXCy35+agHWL/i3Yrwt5bNdqDoHeAb9MApBXwMykgugIkUk5D8Fv0B+GqkhQm4Aqshyyj8RJq9vtdkImXJSbXfPaLVA0o3Wfn9gCdkC8o8+jWwILyGft/qrvO53OFj43wCLy96L+E+cAXQPi4D/QnizqaNzzCX4bm/O+SfCtAUshBi/JjHnJk1noGlUEFwpZL39ycX7mTG5azdnoTEvW14DUhMov8Sv+DRfT+hIx80zrrAEySDtgv13w3XN6flE5TsKmtqNrltYPkxMx2Qpt0NU3zEHZ+qKcEvPLJhy6/VFFMHT+hfm1CSicwpobaJ+Ami9gYfqNegI4J8gvUo/Bjxgiu79wlfeihk6p1tvvTz2uStnFSYK3+0Wn+dn9XidBfUjSRquU7YXQnOJV/+8jOyfXLXDOcEzMNx3T2jaqBrCIL1MWMk03GGbviUFPFLn69LgqZRcnKXiy5+OtIIUwUQTt+Y2qAVkWQhKgxzVtC+jYMsmNSkCWLZDIir0n9ABXnx5XpeziJHve7hed5mf3N6oGEKwUvvYcoFd8lNyoGkCwae/8NN0gL/aeGPS054D9g5BOiD53a32VsiyY9ufLKTFfG5tG2asGUGEn8qOIWZgy/HslACLLZZAwAbra2O+ya0yePuc5AKeJ92oeJ2XNsT/rZ/HjWwM2shid4JjC/EY9AbLnp/f/AfEPofInhFV53Ca40geu48d+FYX3nyMOjCjB+QSocY0RfWtAYwIfFojva3CYndrqE1ugtpHkJD71T0CbgJxPTmOm/QOvtuGpPSrOfQAAAABJRU5ErkJggg=="},1080:{normal:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAABZNJREFUeAHtXEtrG1cU1suO8Qu31DW2oU0fXkQOJPE2KsUYL0oppGnT4GUXgf6A/oD8jJYsCl2EQkl2LYUstHEXLdQlFC9cDM2mtqjwwpVd2/JD/b7JHHE9mas7utJYo8wdGJ07576+891zHzNzR5lMJpPHmcP5Uh2NRiN3cnLy4fHx8aKlYeQkX8BPwz8ty0leNpAzdHp6eiebzb6DMwOSMgMDA+U2kZKXDAk6azNjopPv7u6+CoArIGbSB9ooFAr/WYD2HCdrkTGxWQ4ODt4cGhq6e3Z2NkyQuVyufnR09Ai6DVvQLw1B9Xr9OrrRRyCHYyqP2uHh4cORkZHt55d2v31PEMabLAbjJXhLSShAuILwQ3Szf0VnK/t69lpfXx+E4Z8FyPlzc3Pzm26QQ1Jj9yBOswA7sbGx8cP8/HzdtiWD+XZ2dsYnJiZWoJ+WOHjTr/l8/ifU17WJJ1aCSA5a930aAFnd29v7fmxs7B8xyFbu7+/PDA8Pr2C8GfPLaKB8EvOLbZm6fLF2MbQox4BTVg5jJkdHR+9hML2hAxNFj1mpCHI+F3JATB0N8V0c5BBPrB7ECkDSLIy5i+A4r3lA99SmyyHfeyhr6Xkp3m9XZiqlvBeCsXoQa0PL/l2tVr+GcX9J7dBdKxaL92q12uuiayXL5XIB+T9WyYHnVHA+6HQab1Uv42L3IAEAA9kYSzDypuhgIHrH8Y+Dg4O/iy4oK5XKyNTUFBd/b0gc8nGmejQ3N3ckurjkhREkBoCoIoy9hWtO0d4BXWiXo4dh3OJg/IqStuszlZQdJi+cIIKA4Ryw6RWvCSh4xblZDqS9i/g7iL/kp4ltphIMYbInBBEICLiEO+5bGI+uCDDpcrhlGAA5H0Dv4YO+43sqqaNd2TOCBCjGoBII4MykwxL7TCVYwqQOVFja2HTwprdR+KfwGu8uXCoCcV27p5Iy25VZuPn9djOlKX3s66B+J9MRZGhBPnJtHrgTvt+8SHFAHXacBxkcwRFkIOhcFwtLiymYS4EFuN0CuuAkpuLmLUJY+l7quKAEzipwrgHHGhah3qubTjC1JAjk8IHUbZDyFirjM51O6oo9LxsPOPl4ZRZkXQX+x7iudVKxtov5nuOR00kFvcrLRkXdt307rGG08qAFvxKvcLQInw4+wfms01axRtsio+/tl5FkGbi9h3PED9wL0P3WImvLKK0HccyRnCRne3v7KxDzRxLJIU7iIj7i9BvTg6/aIfa0I7UEcUBWCnoyMzNj8/pWKeJigj5Oerp3BOwQdWSpJQjuqc5WzyKXmIyETbwBO9pGpyVILSmp3UrFqIa7iTcSQWrlaQs7ggwt7ghyBBkYMESnzoP4EhLPwZexPvqSJ8PU6XjSRugy9Lu+VCpxQ4X68vImdDSruXZSbUydB4GcayoBDIfpJE3qCBLDo8rUEYSV9dMgOWE6SZM6glZXV8sg5GcQsMeTYeqEkKBM3SC9uLh4AhI4IIcOykGCUudBQQJM144gA0OpI8gtFA0e4RaKBoLCFoVhOikmdV1MDI8qU0dQ2KIwTCcEpo4gt1CUptdIt1DUEGOrTl0Xa5coR5CBMUeQI8jAgCHaeZAjyMCAITqSB/l7bwxFJSe6m3i1BOEGTv0A93JyzI+EpIk3YEekzGoiLUF4qVZVEi5vbW2d+45CiUtU0Me5LKACdog6stQ+k+ZOUdzEzbIkyPHp6ekv4Lp8jts3W/CI3d/xyqDVoSUIpa3BPa+CHG6G9EiC+IRhtApFog7gfAEP8PM7WW4Jtj60XQybkLjH+LFfiXUFvcro4+Y24I72SrfyIG9jJLrVt6jMbSTXtbTfAtxGa72VVld2P+i1XawfwF8ERkeQgWX3SaaBoIJMjxiIDUnTFd3kBf/elIgvn5NIP7n5H+JLUcZN4rwRAAAAAElFTkSuQmCC",active:"data:image/png;base64,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"}};t.exports=function(t,n){var e=new o,A=t.path+"/img/"+screen.height+"/";a(null,function(t,o){o.updateChannelsList(function(){e.search=function(t,n){n(!1,[])},e.icons=i,o.getChannels({favorite:!1},function(t,a){var i=a.slice(0,10).map(function(t){var n={normal:A+"placeholder.png",active:A+"placeholder-focus.png"};return t.logo&&(n={normal:core.backend.host+t.logo,active:core.backend.host+t.logo}),(t.censored||t.genre&&t.genre.censored)&&(n={normal:A+"parents-control.png",active:A+"parents-control-focus.png"}),{id:t.id,layout:r.layouts.tvChannel,geometry:r.geometry.horizontal,data:{name:t.name,number:t.number,program:{name:"",progress:0},icon:n,censored:t.censored||t.genre&&t.genre.censored,url:function(n){t.getUrl(n)}},update:function(){var n=this;o.getChannelsEpg({channels:[t]},function(e,o){!e&&o&&o[t.id]&&o[t.id][0]?n.data.program.name=o[t.id][0].title:n.data.program.name=""})},actions:[r.actions.accessControl,r.actions.favorite],onClick:function(){function n(){t.getUrl(function(n,e){!n&&e&&core.intent({action:"play",mime:"content/video",data:{uri:e.url,title:t.name,solution:e.solution||"auto",headless:!0,mediaId:t.id,tvChannel:t,extra:t.extra,retryOnError:!0,stream:!0},events:{}},function(t){})})}t.censored||t.genre&&t.genre.censored?core.accessControl.request(function(t){t||n()}):n()}}});i.length&&i.push({id:-1,layout:r.layouts.tvChannel,data:{name:"See more",icon:{normal:A+"see-more-focus.png",active:A+"see-more.png"}},runApp:!0}),n(null,{provider:e,data:i})})})})}},function(t,n,e){"use strict";t.exports={layouts:{tvChannel:1,video:2,record:3,static:4,application:5},geometry:{square:1,horizontal:2,vertical:3,round:4},actions:{favorite:1,accessControl:2,expandItemContent:3}}}]);
//# sourceMappingURL=main.js.map