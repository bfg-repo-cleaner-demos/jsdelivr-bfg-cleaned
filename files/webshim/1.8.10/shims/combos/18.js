jQuery.webshims.register("form-datalist",function(a,b,n,m,s){b.propTypes.element=function(l){b.createPropDefault(l,"attr");if(!l.prop)l.prop={get:function(){var b=l.attr.get.call(this);b&&(b=a("#"+b)[0])&&l.propNodeName&&!a.nodeName(b,l.propNodeName)&&(b=null);return b||null},writeable:!1}};(function(){var l=a.webshims.cfg.forms,j=Modernizr.input.list;if(!j||l.customDatalist){var t=0,p={submit:1,button:1,reset:1,hidden:1,range:1,date:1},o=a.browser.msie&&7>parseInt(a.browser.version,10),u={},r=function(a){if(!a)return[];
if(u[a])return u[a];var b;try{b=JSON.parse(localStorage.getItem("storedDatalistOptions"+a))}catch(d){}u[a]=b||[];return b||[]},k={_create:function(h){if(!p[a.prop(h.input,"type")]){var b=h.datalist,d=a.data(h.input,"datalistWidget");if(b&&d&&d.datalist!==b)d.datalist=b,d.id=h.id,a(d.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",a.proxy(d,"_resetListCached")),d._resetListCached();else if(b){if(!(d&&d.datalist===b)){t++;var e=this;this.hideList=a.proxy(e,"hideList");
this.timedHide=function(){clearTimeout(e.hideTimer);e.hideTimer=setTimeout(e.hideList,9)};this.datalist=b;this.id=h.id;this.hasViewableData=!0;this._autocomplete=a.attr(h.input,"autocomplete");a.data(h.input,"datalistWidget",this);this.shadowList=a('<div class="datalist-polyfill" />');l.positionDatalist?this.shadowList.insertAfter(h.input):this.shadowList.appendTo("body");this.index=-1;this.input=h.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseenter.datalistWidget mousedown.datalistWidget click.datalistWidget",
function(c){var g=a("li:not(.hidden-item)",e.shadowList),d="mousedown"==c.type||"click"==c.type;e.markItem(g.index(c.currentTarget),d,g);"click"==c.type&&(e.hideList(),a(h.input).trigger("datalistselect"));return"mousedown"!=c.type}).bind("focusout",this.timedHide);h.input.setAttribute("autocomplete","off");a(h.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",function(){if(!e.triggeredByDatalist)e.changedValue=!1,e.showHideOptions()}).bind("keydown.datalistWidget",function(c){var g=
c.keyCode,d;if(40==g&&!e.showList())return e.markItem(e.index+1,!0),!1;if(e.isListVisible){if(38==g)return e.markItem(e.index-1,!0),!1;if(!c.shiftKey&&(33==g||36==g))return e.markItem(0,!0),!1;if(!c.shiftKey&&(34==g||35==g))return c=a("li:not(.hidden-item)",e.shadowList),e.markItem(c.length-1,!0,c),!1;if(13==g||27==g)return 13==g&&(d=a("li.active-item:not(.hidden-item)",e.shadowList),e.changeValue(a("li.active-item:not(.hidden-item)",e.shadowList))),e.hideList(),d&&d[0]&&a(h.input).trigger("datalistselect"),
!1}}).bind("focus.datalistWidget",function(){a(this).hasClass("list-focus")&&e.showList()}).bind("mousedown.datalistWidget",function(){(this==m.activeElement||a(this).is(":focus"))&&e.showList()}).bind("blur.datalistWidget",this.timedHide);a(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",a.proxy(this,"_resetListCached"));this._resetListCached();h.input.form&&h.input.id&&a(h.input.form).bind("submit.datalistWidget"+h.input.id,function(){var c=a.prop(h.input,
"value"),d=(h.input.name||h.input.id)+a.prop(h.input,"type");if(!e.storedOptions)e.storedOptions=r(d);if(c&&-1==e.storedOptions.indexOf(c)&&(e.storedOptions.push(c),c=e.storedOptions,d)){c=c||[];try{localStorage.setItem("storedDatalistOptions"+d,JSON.stringify(c))}catch(f){}}});a(n).bind("unload",function(){e.destroy()})}}else d&&d.destroy()}},destroy:function(){var b=a.attr(this.input,"autocomplete");a(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();a(m).unbind(".datalist"+
this.id);this.input.form&&this.input.id&&a(this.input.form).unbind("submit.datalistWidget"+this.input.id);this.input.removeAttribute("aria-haspopup");b===s?this.input.removeAttribute("autocomplete"):a(this.input).attr("autocomplete",b)},_resetListCached:function(a){var i=this,d;this.needsUpdate=!0;this.lastUpdatedValue=!1;this.lastUnfoundValue="";this.updateTimer||(n.QUnit||(d=a&&m.activeElement==i.input)?i.updateListOptions(d):b.ready("WINDOWLOAD",function(){i.updateTimer=setTimeout(function(){i.updateListOptions();
i=null;t=1},200+100*t)}))},updateListOptions:function(b){this.needsUpdate=!1;clearTimeout(this.updateTimer);this.updateTimer=!1;this.shadowList.css({fontSize:a.curCSS(this.input,"fontSize"),fontFamily:a.curCSS(this.input,"fontFamily")});this.searchStart=a(this.input).hasClass("search-start");var i=[],d=[],e=[],c,g,f,w;for(g=a.prop(this.datalist,"options"),f=0,w=g.length;f<w;f++){c=g[f];if(c.disabled)return;c={value:a(c).val()||"",text:a.trim(a.attr(c,"label")||c.textContent||c.innerText||a.text([c])||
""),className:c.className||"",style:a.attr(c,"style")||""};c.text?c.text!=c.value&&(c.className+=" different-label-value"):c.text=c.value;d[f]=c.value;e[f]=c}if(!this.storedOptions)this.storedOptions=r((this.input.name||this.input.id)+a.prop(this.input,"type"));this.storedOptions.forEach(function(c){-1==d.indexOf(c)&&e.push({value:c,text:c,className:"stored-suggest",style:""})});for(f=0,w=e.length;f<w;f++)g=e[f],i[f]='<li class="'+g.className+'" style="'+g.style+'" tabindex="-1" role="listitem"><span class="option-label">'+
g.text+'</span> <span class="option-value">'+g.value+"</span></li>";this.arrayOptions=e;this.shadowList.html('<div><ul role="list" class="'+(this.datalist.className||"")+" "+this.datalist.id+'-shadowdom">'+i.join("\n")+"</ul></div>");a.fn.bgIframe&&o&&this.shadowList.bgIframe();(b||this.isListVisible)&&this.showHideOptions()},showHideOptions:function(b){var i=a.prop(this.input,"value").toLowerCase();if(!(i===this.lastUpdatedValue||this.lastUnfoundValue&&0===i.indexOf(this.lastUnfoundValue))){this.lastUpdatedValue=
i;var d=!1,e=this.searchStart,c=a("li",this.shadowList);i?this.arrayOptions.forEach(function(g,f){var b;if(!("lowerText"in g))g.lowerText=g.text!=g.value?g.text.toLowerCase()+g.value.toLowerCase():g.text.toLowerCase();b=g.lowerText.indexOf(i);(b=e?!b:-1!==b)?(a(c[f]).removeClass("hidden-item"),d=!0):a(c[f]).addClass("hidden-item")}):c.length&&(c.removeClass("hidden-item"),d=!0);this.hasViewableData=d;!b&&d&&this.showList();if(!d)this.lastUnfoundValue=i,this.hideList()}},setPos:function(){var h=l.positionDatalist?
a(this.input).position():b.getRelOffset(this.shadowList,this.input);h.top+=a(this.input).outerHeight();h.width=a(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);this.shadowList.css(h);return h},showList:function(){if(this.isListVisible)return!1;this.needsUpdate&&this.updateListOptions();this.showHideOptions(!0);if(!this.hasViewableData)return!1;this.isListVisible=!0;var b=this,i;b.setPos();b.shadowList.addClass("datalist-visible");
a(m).unbind(".datalist"+b.id).bind("mousedown.datalist"+b.id+" focusin.datalist"+b.id,function(d){d.target===b.input||b.shadowList[0]===d.target||a.contains(b.shadowList[0],d.target)?(clearTimeout(b.hideTimer),setTimeout(function(){clearTimeout(b.hideTimer)},9)):b.timedHide()});a(n).unbind(".datalist"+b.id).bind("resize.datalist"+b.id+"orientationchange.datalist "+b.id+" emchange.datalist"+b.id,function(){clearTimeout(i);i=setTimeout(function(){b.setPos()},9)});clearTimeout(i);return!0},hideList:function(){if(!this.isListVisible)return!1;
var h=this,i=function(){h.changedValue&&a(h.input).trigger("change");h.changedValue=!1};h.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");h.index=-1;h.isListVisible=!1;if(h.changedValue){h.triggeredByDatalist=!0;b.triggerInlineForm&&b.triggerInlineForm(h.input,"input");if(h.input==m.activeElement||a(h.input).is(":focus"))a(h.input).one("blur",i);else i();h.triggeredByDatalist=!1}a(m).unbind(".datalist"+h.id);a(n).unbind(".datalist"+
h.id);return!0},scrollIntoView:function(b){var i=a("ul",this.shadowList),d=a("div",this.shadowList),e=b.position();e.top-=(parseInt(i.css("paddingTop"),10)||0)+(parseInt(i.css("marginTop"),10)||0)+(parseInt(i.css("borderTopWidth"),10)||0);0>e.top?d.scrollTop(d.scrollTop()+e.top-2):(e.top+=b.outerHeight(),b=d.height(),e.top>b&&d.scrollTop(d.scrollTop()+(e.top-b)+2))},changeValue:function(b){if(b[0]){var b=a("span.option-value",b).text(),i=a.prop(this.input,"value");if(b!=i)a(this.input).prop("value",
b).triggerHandler("updateInput"),this.changedValue=!0}},markItem:function(b,i,d){d=d||a("li:not(.hidden-item)",this.shadowList);if(d.length)0>b?b=d.length-1:b>=d.length&&(b=0),d.removeClass("active-item"),this.shadowList.addClass("list-item-active"),d=d.filter(":eq("+b+")").addClass("active-item"),i&&(this.changeValue(d),this.scrollIntoView(d)),this.index=b}};(function(){j||b.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var i=a("select",this);i[0]?i=i[0].options:
(i=a("option",this).get(),i.length&&b.warn("you should wrap you option-elements for a datalist in a select element to support IE and other old browsers."));return i}}});var h={autocomplete:{attr:{get:function(){var b=a.data(this,"datalistWidget");return b?b._autocomplete:"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(b){var d=a.data(this,"datalistWidget");d?(d._autocomplete=b,"off"==b&&d.hideList()):"autocomplete"in this?this.autocomplete=b:this.setAttribute("autocomplete",
b)}}}};if(!j||!1 in a("<input />")[0])h.selectedOption={prop:{writeable:!1,get:function(){var b=a.prop(this,"list"),d=null,e;if(!b)return d;e=a.attr(this,"value");if(!e)return d;b=a.prop(b,"options");if(!b.length)return d;a.each(b,function(c,b){if(e==a.prop(b,"value"))return d=b,!1});return d}}};h.list=j?{attr:{get:function(){var i=b.contentAttr(this,"list");null!=i?this.removeAttribute("list"):i=a.data(this,"datalistListAttr");return null==i?s:i},set:function(i){a.data(this,"datalistListAttr",i);
b.objectCreate(k,s,{input:this,id:i,datalist:a.prop(this,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"}:{attr:{get:function(){var a=b.contentAttr(this,"list");return null==a?s:a},set:function(h){b.contentAttr(this,"list",h);b.objectCreate(k,s,{input:this,id:h,datalist:a.prop(this,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"};b.defineNodeNameProperties("input",h);if(a.event.customEvent)a.event.customEvent.updateDatalist=!0,a.event.customEvent.updateInput=
!0,a.event.customEvent.datalistselect=!0;b.addReady(function(a,b){b.filter("datalist > select, datalist, datalist > option, datalist > select > option").closest("datalist").triggerHandler("updateDatalist")})})()}})()});
jQuery.webshims.register("form-extend",function(a,b,n,m,s,l){n=n.Modernizr;s=n.inputtypes;if(n.formvalidation&&!b.bugs.bustedValidity){var j=b.inputTypes,t={};b.addInputType=function(c,a){j[c]=a};b.addValidityRule=function(c,a){t[c]=a};b.addValidityRule("typeMismatch",function(a,b,d,e){if(""===b)return!1;e=e.typeMismatch;if(!("type"in d))d.type=(a[0].getAttribute("type")||"").toLowerCase();j[d.type]&&j[d.type].mismatch&&(e=j[d.type].mismatch(b,a));return e});var p=l.overrideMessages,o=!s.number||
!s.time||!s.range||p,u="customError,typeMismatch,rangeUnderflow,rangeOverflow,stepMismatch,tooLong,patternMismatch,valueMissing,valid".split(","),l=p?["value","checked"]:["value"],r=[],k=function(c,b){if(c){var d=(c.getAttribute&&c.getAttribute("type")||c.type||"").toLowerCase();if(p||j[d])p&&!b&&"radio"==d&&c.name?a(m.getElementsByName(c.name)).each(function(){a.prop(this,"validity")}):a.prop(c,"validity")}},h={};["input","textarea","select"].forEach(function(c){var d=b.defineNodeNameProperty(c,
"setCustomValidity",{prop:{value:function(f){var f=f+"",e="input"==c?a(this).getNativeElement()[0]:this;d.prop._supvalue.call(e,f);b.bugs.validationMessage&&b.data(e,"customvalidationMessage",f);o&&(b.data(e,"hasCustomError",!!f),k(e))}}});h[c]=d.prop._supvalue});if(o||p)l.push("min"),l.push("max"),l.push("step"),r.push("input");p&&(l.push("required"),l.push("pattern"),r.push("select"),r.push("textarea"));if(o){var i;r.forEach(function(c){var d=b.defineNodeNameProperty(c,"validity",{prop:{get:function(){if(!i){var f=
"input"==c?a(this).getNativeElement()[0]:this,e=d.prop._supget.call(f);if(!e)return e;var q={};u.forEach(function(a){q[a]=e[a]});if(!a.prop(f,"willValidate"))return q;i=!0;var l=a(f),k={type:(f.getAttribute&&f.getAttribute("type")||"").toLowerCase(),nodeName:(f.nodeName||"").toLowerCase()},v=l.val(),y=!!b.data(f,"hasCustomError"),x;i=!1;q.customError=y;if(q.valid&&q.customError)q.valid=!1;else if(!q.valid){var m=!0;a.each(q,function(a,c){if(c)return m=!1});if(m)q.valid=!0}a.each(t,function(a,d){q[a]=
d(l,v,k,q);if(q[a]&&(q.valid||!x)&&(p||j[k.type]&&j[k.type].mismatch))h[c].call(f,b.createValidationMessage(f,a)),q.valid=!1,x=!0});q.valid?(h[c].call(f,""),b.data(f,"hasCustomError",!1)):p&&!x&&!y&&a.each(q,function(a,d){if("valid"!==a&&d)return h[c].call(f,b.createValidationMessage(f,a)),!1});return q}},writeable:!1}})});l.forEach(function(a){b.onNodeNamesPropertyModify(r,a,function(){k(this)})});if(m.addEventListener){var d;m.addEventListener("change",function(a){clearTimeout(d);k(a.target)},!0);
m.addEventListener("input",function(a){clearTimeout(d);d=setTimeout(function(){k(a.target)},290)},!0)}var e=r.join(",");b.addReady(function(c,d){a(e,c).add(d.filter(e)).each(function(){a.prop(this,"validity")})});p&&b.ready("DOM form-message",function(){b.activeLang({register:"form-core",callback:function(){a("input, select, textarea").getNativeElement().each(function(){if(!b.data(this,"hasCustomError")){var c=this,d=a.prop(c,"validity")||{valid:!0},f;d.valid||(f=(c.nodeName||"").toLowerCase(),a.each(d,
function(a,d){if("valid"!==a&&d)return h[f].call(c,b.createValidationMessage(c,a)),!1}))}})}})})}b.defineNodeNameProperty("input","type",{prop:{get:function(){var a=(this.getAttribute("type")||"").toLowerCase();return b.inputTypes[a]?a:this.type}}});n.input.list&&!(a("<datalist><select><option></option></select></datalist>").prop("options")||[]).length&&b.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var c=this.options||[];if(!c.length){var d=a("select",this);if(d[0]&&
d[0].options&&d[0].options.length)c=d[0].options}return c}}})}});
jQuery.webshims.register("form-number-date-api",function(a,b){var n,m,s;if(!b.getStep)b.getStep=function(d,b){var c=a.attr(d,"step");if("any"===c)return c;b=b||o(d);if(!j[b]||!j[b].step)return c;c=n.asNumber(c);return(!isNaN(c)&&0<c?c:j[b].step)*j[b].stepScaleFactor};if(!b.addMinMaxNumberToCache)b.addMinMaxNumberToCache=function(a,b,c){a+"AsNumber"in c||(c[a+"AsNumber"]=j[c.type].asNumber(b.attr(a)),isNaN(c[a+"AsNumber"])&&a+"Default"in j[c.type]&&(c[a+"AsNumber"]=j[c.type][a+"Default"]))};var l=
parseInt("NaN",10),j=b.inputTypes,t=function(a){return"number"==typeof a||a&&a==1*a},p=function(b){return a('<input type="'+b+'" />').prop("type")===b},o=function(a){return(a.getAttribute("type")||"").toLowerCase()},u=b.addMinMaxNumberToCache,r=function(a,b){for(var a=""+a,b=b-a.length,c=0;c<b;c++)a="0"+a;return a},k=b.bugs.valueAsNumberSet||b.bugs.bustedValidity;b.addValidityRule("stepMismatch",function(a,e,c,g){if(""===e)return!1;if(!("type"in c))c.type=o(a[0]);if("date"==c.type)return!1;g=(g||
{}).stepMismatch;if(j[c.type]&&j[c.type].step){if(!("step"in c))c.step=b.getStep(a[0],c.type);if("any"==c.step)return!1;if(!("valueAsNumber"in c))c.valueAsNumber=j[c.type].asNumber(e);if(isNaN(c.valueAsNumber))return!1;u("min",a,c);a=c.minAsNumber;isNaN(a)&&(a=j[c.type].stepBase||0);g=Math.abs((c.valueAsNumber-a)%c.step);g=!(1.0E-7>=g||1.0E-7>=Math.abs(g-c.step))}return g});[{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}].forEach(function(a){b.addValidityRule(a.name,
function(b,c,g,f){f=(f||{})[a.name]||!1;if(""===c)return f;if(!("type"in g))g.type=o(b[0]);if(j[g.type]&&j[g.type].asNumber){if(!("valueAsNumber"in g))g.valueAsNumber=j[g.type].asNumber(c);if(isNaN(g.valueAsNumber))return!1;u(a.attr,b,g);if(isNaN(g[a.attr+"AsNumber"]))return f;f=g[a.attr+"AsNumber"]*a.factor<g.valueAsNumber*a.factor-1.0E-7}return f})});b.reflectProperties(["input"],["max","min","step"]);var h=b.defineNodeNameProperty("input","valueAsNumber",{prop:{get:function(){var b=o(this),b=j[b]&&
j[b].asNumber?j[b].asNumber(a.prop(this,"value")):h.prop._supget&&h.prop._supget.apply(this,arguments);null==b&&(b=l);return b},set:function(d){var e=o(this);j[e]&&j[e].numberToString?isNaN(d)?a.prop(this,"value",""):(e=j[e].numberToString(d),!1!==e?a.prop(this,"value",e):b.warn("INVALID_STATE_ERR: DOM Exception 11")):h.prop._supset&&h.prop._supset.apply(this,arguments)}}}),i=b.defineNodeNameProperty("input","valueAsDate",{prop:{get:function(){var b=o(this);return j[b]&&j[b].asDate&&!j[b].noAsDate?
j[b].asDate(a.prop(this,"value")):i.prop._supget&&i.prop._supget.call(this)||null},set:function(d){var e=o(this);if(j[e]&&j[e].dateToString&&!j[e].noAsDate){if(null===d)return a.prop(this,"value",""),"";e=j[e].dateToString(d);if(!1!==e)return a.prop(this,"value",e),e;b.warn("INVALID_STATE_ERR: DOM Exception 11")}else return i.prop._supset&&i.prop._supset.apply(this,arguments)||null}}});n={mismatch:function(a){return!t(a)},step:1,stepScaleFactor:1,asNumber:function(a){return t(a)?1*a:l},numberToString:function(a){return t(a)?
a:!1}};m={minDefault:0,maxDefault:100};s={mismatch:function(b){if(!b||!b.split||!/\d$/.test(b))return!0;var e=b.split(/\u002D/);if(3!==e.length)return!0;var c=!1;a.each(e,function(a,b){if(!(t(b)||b&&b=="0"+1*b))return c=!0,!1});if(c)return c;if(4!==e[0].length||2!=e[1].length||12<e[1]||2!=e[2].length||33<e[2])c=!0;return b!==this.dateToString(this.asDate(b,!0))},step:1,stepScaleFactor:864E5,asDate:function(a,b){return!b&&this.mismatch(a)?null:new Date(this.asNumber(a,!0))},asNumber:function(a,b){var c=
l;if(b||!this.mismatch(a))a=a.split(/\u002D/),c=Date.UTC(a[0],a[1]-1,a[2]);return c},numberToString:function(a){return t(a)?this.dateToString(new Date(1*a)):!1},dateToString:function(a){return a&&a.getFullYear?a.getUTCFullYear()+"-"+r(a.getUTCMonth()+1,2)+"-"+r(a.getUTCDate(),2):!1}};if(k||!p("range")||!p("time"))m=a.extend({},n,m);(k||!p("number"))&&b.addInputType("number",n);(k||!p("range"))&&b.addInputType("range",m);(k||!p("date"))&&b.addInputType("date",s)});
jQuery.webshims.register("form-number-date-ui",function(a,b,n,m,s,l){var j=b.triggerInlineForm,t=Modernizr.inputtypes,p=function(){var a={"padding-box":"innerWidth","border-box":"outerWidth","content-box":"width"},b=Modernizr.prefixed&&Modernizr.prefixed("boxSizing");return function(f,d){var e,h,i;h="width";b&&(h=a[f.css(b)]||h);e=f[h]();h="width"==h;if(e){var v=parseInt(d.css("marginLeft"),10)||0,j=d.outerWidth();(i=parseInt(f.css("marginRight"),10)||0)&&f.css("marginRight",0);v<=-1*j?(d.css("marginRight",
Math.floor(Math.abs(j+v)+i)),f.css("paddingRight",(parseInt(f.css("paddingRight"),10)||0)+Math.abs(v)),h&&f.css("width",Math.floor(e+v))):(d.css("marginRight",i),f.css("width",Math.floor(e-v-j)))}}}(),o={dateFormat:"yy-mm-dd"},u=a([]),r,k=function(c,g){a("input",c).add(g.filter("input")).each(function(){var c=a.prop(this,"type");if(k[c]&&!b.data(this,"shadowData"))k[c](a(this))})},h=function(b,g){if(l.lazyDate){var f=a.data(b[0],"setDateLazyTimer");f&&clearTimeout(f);a.data(b[0],"setDateLazyTimer",
setTimeout(function(){b.datepicker("setDate",g);a.removeData(b[0],"setDateLazyTimer");b=null},0))}else b.datepicker("setDate",g)};if(l.lazyDate===s)try{l.lazyDate=a.browser.msie&&9>b.browserVersion||500>a(n).width()&&500>a(n).height()}catch(i){}var d={tabindex:1,tabIndex:1,title:1,"aria-required":1,"aria-invalid":1};if(!l.copyAttrs)l.copyAttrs={};b.extendUNDEFProp(l.copyAttrs,d);k.common=function(c,g,f){Modernizr.formvalidation&&c.bind("firstinvalid",function(a){(b.fromSubmit||!r)&&c.unbind("invalid.replacedwidgetbubble").bind("invalid.replacedwidgetbubble",
function(f){!a.isInvalidUIPrevented()&&!f.isDefaultPrevented()&&(b.validityAlert.showFor(a.target),a.preventDefault(),f.preventDefault());c.unbind("invalid.replacedwidgetbubble")})});var e,h,i=a("input, span.ui-slider-handle",g),j=c[0].attributes;for(e in l.copyAttrs)if((h=j[e])&&h.specified)d[e]&&i[0]?i.attr(e,h.nodeValue):g[0].setAttribute(e,h.nodeValue);h=c.attr("id");e=l.calculateWidth?{css:{marginRight:c.css("marginRight"),marginLeft:c.css("marginLeft")},outerWidth:c.outerWidth()}:{};e.label=
h?a('label[for="'+h+'"]',c[0].form):u;h=b.getID(e.label);g.addClass(c[0].className);b.addShadowDom(c,g,{data:f||{},shadowFocusElement:a("input.input-datetime-local-date, span.ui-slider-handle",g)[0],shadowChilds:i});c.after(g).hide();c[0].form&&a(c[0].form).bind("reset",function(a){a.originalEvent&&!a.isDefaultPrevented()&&setTimeout(function(){c.prop("value",c.prop("value"))},0)});1==g.length&&!a("*",g)[0]&&(g.attr("aria-labelledby",h),e.label.bind("click",function(){g.focus();return!1}));return e};
Modernizr.formvalidation&&["input","form"].forEach(function(a){var g=b.defineNodeNameProperty(a,"checkValidity",{prop:{value:function(){r=!0;var a=g.prop._supvalue.apply(this,arguments);r=!1;return a}}})});if(!t.date||l.replaceUI){var e=function(c,g,f,d){var e,h,i=function(){j.dpDiv.unbind("mousedown.webshimsmousedownhandler");h=e=!1},j=g.bind("focusin",function(){i();j.dpDiv.unbind("mousedown.webshimsmousedownhandler").bind("mousedown.webshimsmousedownhandler",function(){e=!0})}).bind("focusout blur",
function(a){e&&(h=!0,a.stopImmediatePropagation())}).datepicker(a.extend({onClose:function(){h&&m.activeElement!==g[0]?(i(),g.trigger("focusout"),g.triggerHandler("blur")):i()}},o,l.datepicker,c.data("datepicker"))).bind("change",f).data("datepicker");j.dpDiv.addClass("input-date-datepicker-control");d&&b.triggerDomUpdate(d[0]);["disabled","min","max","value","step"].forEach(function(a){var b=c.prop(a);""!==b&&("disabled"!=a||!b)&&c.prop(a,b)});return j};k.date=function(b){if(a.fn.datepicker){var g=
a('<input class="input-date" type="text" />'),f=this.common(b,g,k.date.attrs),d=e(b,g,function(f){k.date.blockAttr=!0;var d;if(l.lazyDate){var e=a.data(g[0],"setDateLazyTimer");e&&(clearTimeout(e),a.removeData(g[0],"setDateLazyTimer"))}try{d=(d=a.datepicker.parseDate(g.datepicker("option","dateFormat"),g.prop("value")))?a.datepicker.formatDate("yy-mm-dd",d):g.prop("value")}catch(h){d=g.prop("value")}b.prop("value",d);k.date.blockAttr=!1;f.stopImmediatePropagation();j(b[0],"input");j(b[0],"change")});
f.css&&(g.css(f.css),f.outerWidth&&g.outerWidth(f.outerWidth),d.trigger[0]&&p(g,d.trigger))}};k.date.attrs={disabled:function(b,g,f){a.prop(g,"disabled",!!f)},min:function(b,g,f){try{f=a.datepicker.parseDate("yy-mm-dd",f)}catch(d){f=!1}f&&a(g).datepicker("option","minDate",f)},max:function(b,d,f){try{f=a.datepicker.parseDate("yy-mm-dd",f)}catch(e){f=!1}f&&a(d).datepicker("option","maxDate",f)},value:function(b,d,f){if(!k.date.blockAttr){try{var e=a.datepicker.parseDate("yy-mm-dd",f)}catch(i){e=!1}e?
h(a(d),e):a.prop(d,"value",f)}}}}if(!t.range||l.replaceUI)k.range=function(b){if(a.fn.slider){var d=a('<span class="input-range"><span class="ui-slider-handle" role="slider" tabindex="0" /></span>'),f=this.common(b,d,k.range.attrs);a("span",d).attr("aria-labelledby",f.label.attr("id"));f.label.bind("click",function(){a("span",d).focus();return!1});f.css&&(d.css(f.css),f.outerWidth&&d.outerWidth(f.outerWidth));d.slider(a.extend({},l.slider,b.data("slider"),{slide:function(a,d){if(a.originalEvent)k.range.blockAttr=
!0,b.prop("value",d.value),k.range.blockAttr=!1,j(b[0],"input"),j(b[0],"change")}}));["disabled","min","max","step","value"].forEach(function(d){var f=b.attr(d),e;"value"==d&&!f&&(e=b.getShadowElement())&&(f=(a(e).slider("option","max")-a(e).slider("option","min"))/2);null!=f&&b.attr(d,f)})}},k.range.attrs={disabled:function(b,d,f){f=!!f;a(d).slider("option","disabled",f);a("span",d).attr({"aria-disabled":f+"",tabindex:f?"-1":"0"})},min:function(b,d,f){f=f?1*f||0:0;a(d).slider("option","min",f);a("span",
d).attr({"aria-valuemin":f})},max:function(b,d,f){f=f||0===f?1*f||100:100;a(d).slider("option","max",f);a("span",d).attr({"aria-valuemax":f})},value:function(b,d,f){f=a(b).prop("valueAsNumber");isNaN(f)||(k.range.blockAttr||a(d).slider("option","value",f),a("span",d).attr({"aria-valuenow":f,"aria-valuetext":f}))},step:function(b,d,f){f=f&&a.trim(f)?1*f||1:1;a(d).slider("option","step",f)}};if(!b.bugs.valueAsNumberSet&&(l.replaceUI||!Modernizr.inputtypes.date||!Modernizr.inputtypes.range))n=function(){b.data(this,
"hasShadow")&&a.prop(this,"value",a.prop(this,"value"))},b.onNodeNamesPropertyModify("input","valueAsNumber",n),b.onNodeNamesPropertyModify("input","valueAsDate",n);a.each(["disabled","min","max","value","step"],function(a,d){b.onNodeNamesPropertyModify("input",d,function(a){var c=b.data(this,"shadowData");if(c&&c.data&&c.data[d]&&c.nativeElement===this)c.data[d](this,c.shadowElement,a)})});if(!l.availabeLangs)l.availabeLangs="af ar ar-DZ az bg bs ca cs da de el en-AU en-GB en-NZ eo es et eu fa fi fo fr fr-CH gl he hr hu hy id is it ja ko kz lt lv ml ms nl no pl pt-BR rm ro ru sk sl sq sr sr-SR sv ta th tr uk vi zh-CN zh-HK zh-TW".split(" ");
n=function(){a.datepicker&&(b.activeLang({langObj:a.datepicker.regional,module:"form-number-date-ui",callback:function(b){a("input.hasDatepicker").filter(".input-date, .input-datetime-local-date").datepicker("option",a.extend(o,b,l.datepicker))}}),a(m).unbind("jquery-uiReady.langchange input-widgetsReady.langchange"))};a(m).bind("jquery-uiReady.langchange input-widgetsReady.langchange",n);n();(function(){var c=function(){var b={};return function(c){return c in b?b[c]:b[c]=a('<input type="'+c+'" />')[0].type===
c}}();if(!c("number")){var d=b.cfg["forms-ext"],f=b.inputTypes,e=function(c,d,e){e=e||{};if(!("type"in e))e.type=a.prop(c,"type");if(!("step"in e))e.step=b.getStep(c,e.type);if(!("valueAsNumber"in e))e.valueAsNumber=f[e.type].asNumber(a.prop(c,"value"));var g="any"==e.step?f[e.type].step*f[e.type].stepScaleFactor:e.step;b.addMinMaxNumberToCache("min",a(c),e);b.addMinMaxNumberToCache("max",a(c),e);if(isNaN(e.valueAsNumber))e.valueAsNumber=f[e.type].stepBase||0;if("any"!==e.step&&(c=Math.round(1E7*
((e.valueAsNumber-(e.minAsnumber||0))%e.step))/1E7)&&Math.abs(c)!=e.step)e.valueAsNumber-=c;c=e.valueAsNumber+g*d;return c=!isNaN(e.minAsNumber)&&c<e.minAsNumber?e.valueAsNumber*d<e.minAsNumber?e.minAsNumber:isNaN(e.maxAsNumber)?e.valueAsNumber:e.maxAsNumber:!isNaN(e.maxAsNumber)&&c>e.maxAsNumber?e.valueAsNumber*d>e.maxAsNumber?e.maxAsNumber:isNaN(e.minAsNumber)?e.valueAsNumber:e.minAsNumber:Math.round(1E7*c)/1E7};b.modules["form-number-date-ui"].getNextStep=e;var h=function(b,c,d){if(!b.disabled&&
!b.readOnly&&!a(d).hasClass("step-controls")&&(a.prop(b,"value",f[c].numberToString(e(b,a(d).hasClass("step-up")?1:-1,{type:c}))),a(b).unbind("blur.stepeventshim"),j(b,"input"),m.activeElement)){if(m.activeElement!==b)try{b.focus()}catch(g){}setTimeout(function(){if(m.activeElement!==b)try{b.focus()}catch(c){}a(b).one("blur.stepeventshim",function(){j(b,"change")})},0)}};if(d.stepArrows){var i={set:function(){var a=b.data(this,"step-controls");if(a)a[this.disabled||this.readonly?"addClass":"removeClass"]("disabled-step-control")}};
b.onNodeNamesPropertyModify("input","disabled",i);b.onNodeNamesPropertyModify("input","readonly",a.extend({},i))}var l={38:1,40:-1};b.addReady(function(i,k){d.stepArrows&&a("input",i).add(k.filter("input")).each(function(){var i=a.prop(this,"type");if(f[i]&&f[i].asNumber&&d.stepArrows&&!(!0!==d.stepArrows&&!d.stepArrows[i]||c(i)||a(k).hasClass("has-step-controls"))){var k=this,m=a('<span class="step-controls" unselectable="on"><span class="step-up" /><span class="step-down" /></span>').insertAfter(k).bind("selectstart dragstart",
function(){return!1}).bind("mousedown mousepress",function(a){h(k,i,a.target);return!1}).bind("mousepressstart mousepressend",function(b){a(b.target)["mousepressstart"==b.type?"addClass":"removeClass"]("mousepress-ui")}),n=function(b,c){if(!k.disabled&&!k.readOnly)return a.prop(k,"value",f[i].numberToString(e(k,c,{type:i}))),j(k,"input"),!1},o=a(k).addClass("has-step-controls").attr({readonly:k.readOnly,disabled:k.disabled,autocomplete:"off",role:"spinbutton"}).bind(a.browser.msie?"keydown":"keypress",
function(b){if(!k.disabled&&!k.readOnly&&l[b.keyCode])return a.prop(k,"value",f[i].numberToString(e(k,l[b.keyCode],{type:i}))),j(k,"input"),!1});a.fn.mwheelIntent?o.add(m).bind("mwheelIntent",n):o.bind("focus",function(){o.add(m).unbind(".mwhellwebshims").bind("mousewheel.mwhellwebshims",n)}).bind("blur",function(){a(k).add(m).unbind(".mwhellwebshims")});b.data(k,"step-controls",m);d.calculateWidth&&(p(o,m),m.css("marginTop",(o.outerHeight()-m.outerHeight())/2))}})})}})();b.addReady(function(c,d){a(m).bind("jquery-uiReady.initinputui input-widgetsReady.initinputui",
function(){(a.datepicker||a.fn.slider)&&k(c,d);a.datepicker&&a.fn.slider?a(m).unbind(".initinputui"):b.modules["input-widgets"].src||b.warn('jQuery UI Widget factory is already included, but not datepicker or slider. configure src of $.webshims.modules["input-widgets"].src')})})});
