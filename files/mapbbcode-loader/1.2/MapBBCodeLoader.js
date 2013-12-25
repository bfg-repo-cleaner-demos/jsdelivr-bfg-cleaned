window.mapBBCodeLoaderOptions = {
    path: "//cdn.jsdelivr.net/mapbbcode/1.2.0/",
    language: "",
    addons: [],
    proprietary: [],
    plain: false,
    force: false,
    draw: false,
    mapBBCodeOptions: { windowPath: "//cdn.jsdelivr.net/mapbbcode-loader/1.2/" },
    processorOptions: {}
};window.mapBBCodeLoaderOptions.set=function(e){for(var t in e)if("mapBBCodeOptions"===t){var a,n=e[t];for(a in n)n.hasOwnProperty(a)&&(this[t][a]=n[a])}else e.hasOwnProperty(t)&&(this[t]=e[t])},function(e,t){function a(e,a,n){var o,r,s,i=[],d=e||t,l=new RegExp("(?:^|\\s)"+a+"(?:\\s|$)");if(e.className&&l.test(e.className))return[e];if(d.getElementsByClassName)for(s=d.getElementsByClassName(a),o=0;o<s.length;o++)for(r=0;r<n.length;r++)s[o].nodeName==n[r]&&i.push(s[o]);else{for(s=[],o=0;o<n.length;o++)s=s.concat(d.getElementsByTagName(n[o]));for(o=0;o<s.length;o++)l.test(s[o].className)&&i.push(s[o])}return i}function n(e){var a=[];return function n(e){if(e.childNodes.length)for(var t=0;t<e.childNodes.length;t++)"tagName"in e&&"TEXTAREA"==e.tagName||"className"in e&&!(e.className.indexOf("mapbbcode")<0)||n(e.childNodes[t]);else e.nodeType==Node.TEXT_NODE&&(e.nodeValue.indexOf("[/map]")>=0||e.nodeValue.indexOf("[mapid]")>=0)&&a.push(e)}(e||t),a}function o(e,a,n,o){var r=t.createElement("div"),s=e.splitText(a),i=s.splitText(n);return r.className=o,s.parentNode.insertBefore(r,s),r.appendChild(s),i}function r(t){for(var a=new RegExp(e.MapBBCodeProcessor.getBBCodeRegExp().source,"gi"),n=new RegExp("\\[mapid\\]\\s*[a-z]+\\s*\\[/mapid\\]","gi"),r=0;r<t.length;r++)for(var s,i,d=t[r];;)if(s=a.exec(d.nodeValue),i=n.exec(d.nodeValue),s&&s.length>0)e.MapBBCodeProcessor.isEmpty(s[0])||(d=o(d,s.index,s[0].length,"mapbbcode"),a.lastIndex=0,n.lastIndex=0);else{if(!(i&&i.length>0))break;d=o(d,i.index,i[0].length,"mapbbcode_shared"),a.lastIndex=0,n.lastIndex=0}}function s(o,s){if(e.mapBBCodeLoaderOptions.plain){var i=n(o);i.length>0&&("MapBBCodeProcessor"in e?r(i):s.call(this,{}))}var d,l,p,c=a(o,"mapbbcode",["DIV"]);for(d=0;d<c.length;d++)if(l=c[d].childNodes,!(l&&l.length>0&&("DIV"==l[0].tagName||l.length>1&&"DIV"==l[1].tagName))&&(p=s.call(this,{shared:!1,element:c[d]})))return;for(c=a(o,"mapbbcode_shared",["DIV"]),d=0;d<c.length;d++)if(l=c[d].childNodes,!(l&&l.length>0&&("DIV"==l[0].tagName||l.length>1&&"DIV"==l[1].tagName))){var g=/^\s*(?:\[mapid\]\s*)?([a-z]+)(?:\s*\[\/mapid\])?\s*$/.exec(c[d].innerHTML);if(g&&g.length>1&&(p=s.call(this,{shared:!0,id:g[1],element:c[d]})))return}for(buttons=a(o,"mapbbcode_edit",["INPUT","BUTTON","A"]),d=0;d<buttons.length;d++){var m;if(buttons[d].getAttribute("target_id")&&(m=t.getElementsById(buttons[d].getAttribute("target_id"))),!m){var f=t.getElementsByTagName("TEXTAREA");f&&f.length>0&&(m=f[0])}if(p=s.call(this,{button:!0,target:m,element:buttons[d]}))return}}function i(e){return e&&e.length?(e=e.replace(/^\s+|\s+$/g,"").replace(/\.js$/,""),e.length<=1?e.toUpperCase():e.substring(0,1).toUpperCase()+e.substring(1).toLowerCase()):e}function d(e,a){var n,o=t.head||t.getElementsByTagName("head")[0];if("css"==e.substring(e.length-3))n=t.createElement("link"),n.rel="stylesheet",n.type="text/css",n.href=e;else{n=t.createElement("script"),n.type="text/javascript",n.async=!0,n.src=e;var r=!1;n.onload=n.onreadystatechange=n.onerror=function(){r||n.readyState&&!/loaded|complete/.test(n.readyState)||(r=!0,n.onload=n.onreadystatechange=null,m--,a&&a())},m++}o.appendChild(n)}function l(){if(h||"MapBBCode"in e)return"updateMapBBCode"in e&&e.updateMapBBCode(),void 0;h=!0;var a=e.mapBBCodeLoaderOptions;if(!a.force){var n=!1;if(s(t,function(){return n=!0,!0}),!n)return}var o=a.path||".";"/"!==o.substring(o.length-1)&&(o+="/"),"windowPath"in a.mapBBCodeOptions||(a.mapBBCodeOptions.windowPath=o),d(o+"leaflet.css"),d(o+"leaflet.js",function(){a.draw&&(d(o+"leaflet.draw.css"),d(o+"leaflet.draw.js")),d(o+"mapbbcode.js",function(){var t,n=a.language.substring(0,2).toLowerCase();if(n&&n.length>1&&d(o+"lang/"+n+".js"),a.proprietary.length>0||a.mapBBCodeOptions.layers)for(d(o+"LayerList.js"),t=0;t<a.proprietary.length;t++)d(o+"proprietary/"+i(a.proprietary[t])+".js");for(t=0;t<a.addons.length;t++)d(o+a.addons[t]);g=e.setInterval(c,50)})})}function p(a){s(a||t,function(t){var a=e._mapBBCode;t.button?e.L.DomEvent.on(t.element,"click",function(n){return a.editorWindow(t.target),e.L.DomEvent.stop(n)}):t.shared?a.showExternal(t.element,t.id):a.show(t.element)})}function c(){if(!(m>0&&--f>0)){e.clearInterval(g);var t=e.mapBBCodeLoaderOptions;e.MapBBCodeProcessor.setOptions(t.processorOptions),e._mapBBCode=new e.MapBBCode(t.mapBBCodeOptions),e.updateMapBBCode=p,p(),t.onload&&t.onload(e._mapBBCode)}}var g,m=0,f=60,h=!1;if("interactive"==t.readyState||"complete"==t.readyState)l();else if(t.addEventListener)t.addEventListener("DOMContentLoaded",l,!1);else{var u=function(){"interactive"!=t.readyState&&"complete"!=t.readyState?setTimeout(u,50):l()};u()}}(window,document);
