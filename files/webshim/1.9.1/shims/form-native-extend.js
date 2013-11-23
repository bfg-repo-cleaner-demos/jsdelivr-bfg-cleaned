jQuery.webshims.register("form-extend",function(c,b,k,i,j,g){k=k.Modernizr;j=k.inputtypes;if(k.formvalidation&&!b.bugs.bustedValidity){var l=b.inputTypes,t={};b.addInputType=function(a,b){l[a]=b};b.addValidityRule=function(a,b){t[a]=b};b.addValidityRule("typeMismatch",function(a,b,d,c){if(""===b)return!1;c=c.typeMismatch;if(!("type"in d))d.type=(a[0].getAttribute("type")||"").toLowerCase();l[d.type]&&l[d.type].mismatch&&(c=l[d.type].mismatch(b,a));return c});var f=g.overrideMessages,n=!j.number||
!j.time||!j.range||f,v="customError,typeMismatch,rangeUnderflow,rangeOverflow,stepMismatch,tooLong,patternMismatch,valueMissing,valid".split(","),g=f?["value","checked"]:["value"],h=[],m=function(a,b){if(a){var d=(a.getAttribute&&a.getAttribute("type")||a.type||"").toLowerCase();if(f||l[d])f&&!b&&"radio"==d&&a.name?c(i.getElementsByName(a.name)).each(function(){c.prop(this,"validity")}):c.prop(a,"validity")}},o={};["input","textarea","select"].forEach(function(a){var p=b.defineNodeNameProperty(a,
"setCustomValidity",{prop:{value:function(d){var d=d+"",f="input"==a?c(this).getNativeElement()[0]:this;p.prop._supvalue.call(f,d);b.bugs.validationMessage&&b.data(f,"customvalidationMessage",d);n&&(b.data(f,"hasCustomError",!!d),m(f))}}});o[a]=p.prop._supvalue});if(n||f)g.push("min"),g.push("max"),g.push("step"),h.push("input");f&&(g.push("required"),g.push("pattern"),h.push("select"),h.push("textarea"));if(n){var q;h.forEach(function(a){var p=b.defineNodeNameProperty(a,"validity",{prop:{get:function(){if(!q){var d=
"input"==a?c(this).getNativeElement()[0]:this,g=p.prop._supget.call(d);if(!g)return g;var e={};v.forEach(function(a){e[a]=g[a]});if(!c.prop(d,"willValidate"))return e;q=!0;var i=c(d),h={type:(d.getAttribute&&d.getAttribute("type")||"").toLowerCase(),nodeName:(d.nodeName||"").toLowerCase()},m=i.val(),k=!!b.data(d,"hasCustomError"),j;q=!1;e.customError=k;if(e.valid&&e.customError)e.valid=!1;else if(!e.valid){var n=!0;c.each(e,function(a,b){if(b)return n=!1});if(n)e.valid=!0}c.each(t,function(c,g){e[c]=
g(i,m,h,e);if(e[c]&&(e.valid||!j)&&(f||l[h.type]&&l[h.type].mismatch))o[a].call(d,b.createValidationMessage(d,c)),e.valid=!1,j=!0});e.valid?(o[a].call(d,""),b.data(d,"hasCustomError",!1)):f&&!j&&!k&&c.each(e,function(c,e){if("valid"!==c&&e)return o[a].call(d,b.createValidationMessage(d,c)),!1});return e}},writeable:!1}})});g.forEach(function(a){b.onNodeNamesPropertyModify(h,a,function(){m(this)})});if(i.addEventListener){var r,s=function(a){if("form"in a.target){var b=a.target.form;clearTimeout(r);
m(a.target);b&&f&&c("input",b).each(function(){"password"==this.type&&m(this)})}};i.addEventListener("change",s,!0);f&&(i.addEventListener("blur",s,!0),i.addEventListener("keydown",function(a){13==a.keyCode&&s(a)},!0));i.addEventListener("input",function(a){clearTimeout(r);r=setTimeout(function(){m(a.target)},290)},!0)}var u=h.join(",");b.addReady(function(a,b){c(u,a).add(b.filter(u)).each(function(){c.prop(this,"validity")})});f&&b.ready("DOM form-message",function(){b.activeLang({register:"form-core",
callback:function(){c("input, select, textarea").getNativeElement().each(function(){if(!b.data(this,"hasCustomError")){var a=this,f=c.prop(a,"validity")||{valid:!0},d;f.valid||(d=(a.nodeName||"").toLowerCase(),c.each(f,function(c,e){if("valid"!==c&&e)return o[d].call(a,b.createValidationMessage(a,c)),!1}))}})}})})}b.defineNodeNameProperty("input","type",{prop:{get:function(){var a=(this.getAttribute("type")||"").toLowerCase();return b.inputTypes[a]?a:this.type}}})}});
