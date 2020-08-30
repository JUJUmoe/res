(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();

(function() {
    var flakes = [],
        canvas = document.getElementById("Snow"), //画布ID，与上一步创建的画布对应
        ctx = canvas.getContext("2d"),
        flakeCount = 150,  //雪花数量，数值越大雪花数量越多
        mX = -100,
        mY = -100;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function snow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < flakeCount; i++) {
            var flake = flakes[i],
                x = mX,
                y = mY,
                minDist = 150,  //雪花距离鼠标指针的最小值，小于这个距离的雪花将受到鼠标的排斥
                x2 = flake.x,
                y2 = flake.y;

            var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
                dx = x2 - x,
                dy = y2 - y;

            if (dist < minDist) {
                var force = minDist / (dist * dist),
                    xcomp = (x - x2) / dist,
                    ycomp = (y - y2) / dist,
                    deltaV = force / 2;

                flake.velX -= deltaV * xcomp;
                flake.velY -= deltaV * ycomp;

            } else {
                flake.velX *= .98;
                if (flake.velY <= flake.speed) {
                    flake.velY = flake.speed
                }
                flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
            }

            ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";  //雪花颜色
            flake.y += flake.velY;
            flake.x += flake.velX;

            if (flake.y >= canvas.height || flake.y <= 0) {
                reset(flake);
            }

            if (flake.x >= canvas.width || flake.x <= 0) {
                reset(flake);
            }

            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(snow);
    };

    function reset(flake) {
        flake.x = Math.floor(Math.random() * canvas.width);
        flake.y = 0;
        flake.size = (Math.random() * 3) + 2;  //加号后面的值，雪花大小，为基准值，数值越大雪花越大
        flake.speed = (Math.random() * 1) + 0.5;  //加号后面的值，雪花速度，为基准值，数值越大雪花速度越快
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = (Math.random() * 0.5) + 0.3;  //加号后面的值，为基准值，范围0~1
    }

    function init() {
        for (var i = 0; i < flakeCount; i++) {
            var x = Math.floor(Math.random() * canvas.width),
                y = Math.floor(Math.random() * canvas.height),
                size = (Math.random() * 3) + 2,  //加号后面的值，雪花大小，为基准值，数值越大雪花越大
                speed = (Math.random() * 1) + 0.5,  //加号后面的值，雪花速度，为基准值，数值越大雪花速度越快
                opacity = (Math.random() * 0.5) + 0.3;  //加号后面的值，为基准值，范围0~1

            flakes.push({
                speed: speed,
                velY: speed,
                velX: 0,
                x: x,
                y: y,
                size: size,
                stepSize: (Math.random()) / 30 * 1,  //乘号后面的值，雪花横移幅度，为基准值，数值越大雪花横移幅度越大，0为竖直下落
                step: 0,
                angle: 180,
                opacity: opacity
            });
        }

        snow();
    };

    document.addEventListener("mousemove", function(e) {
        mX = e.clientX,
        mY = e.clientY
    });
    window.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    init();
})();

/*comment.tpl.js*/
function focusEle(ele){try{document.getElementById(ele).focus()}catch(e){}}function updateEle(ele,content){document.getElementById(ele).innerHTML=content}function timestamp(){return new Date().getTime()}var XMLHttp={_objPool:[],_getInstance:function(){for(var i=0;i<this._objPool.length;i++){if(this._objPool[i].readyState==0||this._objPool[i].readyState==4){return this._objPool[i]}}this._objPool[this._objPool.length]=this._createObj();return this._objPool[this._objPool.length-1]},_createObj:function(){if(window.XMLHttpRequest){var objXMLHttp=new XMLHttpRequest()}else{var MSXML=["MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];for(var n=0;n<MSXML.length;n++){try{var objXMLHttp=new ActiveXObject(MSXML[n]);break}catch(e){}}}if(objXMLHttp.readyState==null){objXMLHttp.readyState=0;objXMLHttp.addEventListener("load",function(){objXMLHttp.readyState=4;if(typeof objXMLHttp.onreadystatechange=="function"){objXMLHttp.onreadystatechange()}},false)}return objXMLHttp},sendReq:function(method,url,data,callback){var objXMLHttp=this._getInstance();with(objXMLHttp){try{if(url.indexOf("?")>0){url+="&randnum="+Math.random()}else{url+="?randnum="+Math.random()}open(method,url,true);setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");send(data);onreadystatechange=function(){if(objXMLHttp.readyState==4&&(objXMLHttp.status==200||objXMLHttp.status==304)){callback(objXMLHttp)}}}catch(e){alert("emria:error")}}}};function sendinfo(url,node){updateEle(node,'<div><span style="background-color:#FFFFE5; color:#666666;">加载中...</span></div>');XMLHttp.sendReq("GET",url,"",function(obj){updateEle(node,obj.responseText)})}function loadr(url,tid){url=url+"&stamp="+timestamp();var r=document.getElementById("r_"+tid);var rp=document.getElementById("rp_"+tid);if(r.style.display=="block"){r.style.display="none";rp.style.display="none"}else{r.style.display="block";r.innerHTML='<span style="background-color:#FFFFE5;text-align:center;font-size:12px;color:#666666;">加载中...</span>';XMLHttp.sendReq("GET",url,"",function(obj){r.innerHTML=obj.responseText;rp.style.display="block"})}}function reply(url,tid){var rtext=document.getElementById("rtext_"+tid).value;var rname=document.getElementById("rname_"+tid).value;var rcode=document.getElementById("rcode_"+tid).value;var rmsg=document.getElementById("rmsg_"+tid);var rn=document.getElementById("rn_"+tid);var r=document.getElementById("r_"+tid);var data="r="+rtext+"&rname="+rname+"&rcode="+rcode+"&tid="+tid;XMLHttp.sendReq("POST",url,data,function(obj){if(obj.responseText=="err1"){rmsg.innerHTML="(回复长度需在140个字内)"}else{if(obj.responseText=="err2"){rmsg.innerHTML="(昵称不能为空)"}else{if(obj.responseText=="err3"){rmsg.innerHTML="(验证码错误)"}else{if(obj.responseText=="err4"){rmsg.innerHTML="(不允许使用该昵称)"}else{if(obj.responseText=="err5"){rmsg.innerHTML="(已存在该回复)"}else{if(obj.responseText=="err0"){rmsg.innerHTML="(禁止回复)"}else{if(obj.responseText=="succ1"){rmsg.innerHTML="(回复成功，等待管理员审核)"}else{r.innerHTML+=obj.responseText;rn.innerHTML=Number(rn.innerHTML)+1;rmsg.innerHTML=""}}}}}}}})}function re(tid,rp){var rtext=document.getElementById("rtext_"+tid).value=rp;focusEle("rtext_"+tid)}function commentReply(pid,c){var response=document.getElementById("comment-post");document.getElementById("comment-pid").value=pid;document.getElementById("cancel-reply").style.display="";c.parentNode.parentNode.appendChild(response)}function cancelReply(){var commentPlace=document.getElementById("comment-place"),response=document.getElementById("comment-post");document.getElementById("comment-pid").value=0;document.getElementById("cancel-reply").style.display="none";commentPlace.appendChild(response)};


/*headroom.js*/
!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Headroom=b()}(this,function(){"use strict";function a(a){this.callback=a,this.ticking=!1}function b(a){return a&&"undefined"!=typeof window&&(a===window||a.nodeType)}function c(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var d,e,f=a||{};for(e=1;e<arguments.length;e++){var g=arguments[e]||{};for(d in g)"object"!=typeof f[d]||b(f[d])?f[d]=f[d]||g[d]:f[d]=c(f[d],g[d])}return f}function d(a){return a===Object(a)?a:{down:a,up:a}}function e(a,b){b=c(b,e.options),this.lastKnownScrollY=0,this.elem=a,this.tolerance=d(b.tolerance),this.classes=b.classes,this.offset=b.offset,this.scroller=b.scroller,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop,this.onBottom=b.onBottom,this.onNotBottom=b.onNotBottom}var f={bind:!!function(){}.bind,classList:"classList"in document.documentElement,rAF:!!(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame)};return window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,a.prototype={constructor:a,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},e.prototype={constructor:e,init:function(){return e.cutsTheMustard?(this.debouncer=new a(this.update.bind(this)),this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var a=this.classes;this.initialised=!1,this.elem.classList.remove(a.unpinned,a.pinned,a.top,a.notTop,a.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;!a.contains(b.pinned)&&a.contains(b.unpinned)||(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},bottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.bottom)||(a.add(b.bottom),a.remove(b.notBottom),this.onBottom&&this.onBottom.call(this))},notBottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notBottom)||(a.add(b.notBottom),a.remove(b.bottom),this.onNotBottom&&this.onNotBottom.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop},getViewportHeight:function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},getElementPhysicalHeight:function(a){return Math.max(a.offsetHeight,a.clientHeight)},getScrollerPhysicalHeight:function(){return this.scroller===window||this.scroller===document.body?this.getViewportHeight():this.getElementPhysicalHeight(this.scroller)},getDocumentHeight:function(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,b.scrollHeight,a.offsetHeight,b.offsetHeight,a.clientHeight,b.clientHeight)},getElementHeight:function(a){return Math.max(a.scrollHeight,a.offsetHeight,a.clientHeight)},getScrollerHeight:function(){return this.scroller===window||this.scroller===document.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(a){var b=0>a,c=a+this.getScrollerPhysicalHeight()>this.getScrollerHeight();return b||c},toleranceExceeded:function(a,b){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance[b]},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=a>this.lastKnownScrollY?"down":"up",c=this.toleranceExceeded(a,b);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),a+this.getViewportHeight()>=this.getScrollerHeight()?this.bottom():this.notBottom(),this.shouldUnpin(a,c)?this.unpin():this.shouldPin(a,c)&&this.pin(),this.lastKnownScrollY=a)}},e.options={tolerance:{up:0,down:0},offset:0,scroller:window,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",bottom:"headroom--bottom",notBottom:"headroom--not-bottom",initial:"headroom"}},e.cutsTheMustard="undefined"!=typeof f&&f.rAF&&f.bind&&f.classList,e});


/*jquery.pjax.js*/
(function($){function fnPjax(selector,container,options){var context=this;return this.on("click.pjax",selector,function(event){var opts=$.extend({},optionsFor(container,options));if(!opts.container){opts.container=$(this).attr("data-pjax")||context}handleClick(event,opts)})}function handleClick(event,container,options){options=optionsFor(container,options);var link=event.currentTarget;if(link.tagName.toUpperCase()!=="A"){throw"$.fn.pjax or $.pjax.click requires an anchor element"}if(event.which>1||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey){return}if(location.protocol!==link.protocol||location.hostname!==link.hostname){return}if(link.hash&&link.href.replace(link.hash,"")===location.href.replace(location.hash,"")){return}if(link.href===location.href+"#"){return}var defaults={url:link.href,container:$(link).attr("data-pjax"),target:link};var opts=$.extend({},defaults,options);var clickEvent=$.Event("pjax:click");$(link).trigger(clickEvent,[opts]);if(!clickEvent.isDefaultPrevented()){pjax(opts);event.preventDefault();$(link).trigger("pjax:clicked",[opts])}}function handleSubmit(event,container,options){options=optionsFor(container,options);var form=event.currentTarget;if(form.tagName.toUpperCase()!=="FORM"){throw"$.pjax.submit requires a form element"}var defaults={type:form.method.toUpperCase(),url:form.action,data:$(form).serializeArray(),container:$(form).attr("data-pjax"),target:form};pjax($.extend({},defaults,options));event.preventDefault()}function pjax(options){options=$.extend(true,{},$.ajaxSettings,pjax.defaults,options);if($.isFunction(options.url)){options.url=options.url()}var target=options.target;var hash=parseURL(options.url).hash;var context=options.context=findContainerFor(options.container);if(!options.data){options.data={}}options.data._pjax=context.selector;function fire(type,args){var event=$.Event(type,{relatedTarget:target});context.trigger(event,args);return !event.isDefaultPrevented()}var timeoutTimer;options.beforeSend=function(xhr,settings){if(settings.type!=="GET"){settings.timeout=0}xhr.setRequestHeader("X-PJAX","true");xhr.setRequestHeader("X-PJAX-Container",context.selector);if(!fire("pjax:beforeSend",[xhr,settings])){return false}if(settings.timeout>0){timeoutTimer=setTimeout(function(){if(fire("pjax:timeout",[xhr,options])){xhr.abort("timeout")}},settings.timeout);settings.timeout=0}options.requestUrl=parseURL(settings.url).href};options.complete=function(xhr,textStatus){if(timeoutTimer){clearTimeout(timeoutTimer)}fire("pjax:complete",[xhr,textStatus,options]);fire("pjax:end",[xhr,options])};options.error=function(xhr,textStatus,errorThrown){var container=extractContainer("",xhr,options);var allowed=fire("pjax:error",[xhr,textStatus,errorThrown,options]);if(options.type=="GET"&&textStatus!=="abort"&&allowed){locationReplace(container.url)}};options.success=function(data,status,xhr){var currentVersion=(typeof $.pjax.defaults.version==="function")?$.pjax.defaults.version():$.pjax.defaults.version;var latestVersion=xhr.getResponseHeader("X-PJAX-Version");var container=extractContainer(data,xhr,options);if(currentVersion&&latestVersion&&currentVersion!==latestVersion){locationReplace(container.url);return}if(!container.contents){locationReplace(container.url);return}pjax.state={id:options.id||uniqueId(),url:container.url,title:container.title,container:context.selector,fragment:options.fragment,timeout:options.timeout};if(options.push||options.replace){window.history.replaceState(pjax.state,container.title,container.url)}document.activeElement.blur();if(container.title){document.title=container.title}context.html(container.contents);var autofocusEl=context.find("input[autofocus], textarea[autofocus]").last()[0];if(autofocusEl&&document.activeElement!==autofocusEl){autofocusEl.focus()}executeScriptTags(container.scripts);if(typeof options.scrollTo==="number"){$(window).scrollTop(options.scrollTo)}if(hash!==""){var url=parseURL(container.url);url.hash=hash;pjax.state.url=url.href;window.history.replaceState(pjax.state,container.title,url.href);var target=$(url.hash);if(target.length){$(window).scrollTop(target.offset().top)}}fire("pjax:success",[data,status,xhr,options])};if(!pjax.state){pjax.state={id:uniqueId(),url:window.location.href,title:document.title,container:context.selector,fragment:options.fragment,timeout:options.timeout};window.history.replaceState(pjax.state,document.title)}var xhr=pjax.xhr;if(xhr&&xhr.readyState<4){xhr.onreadystatechange=$.noop;xhr.abort()}pjax.options=options;var xhr=pjax.xhr=$.ajax(options);if(xhr.readyState>0){if(options.push&&!options.replace){cachePush(pjax.state.id,context.clone().contents());window.history.pushState(null,"",stripPjaxParam(options.requestUrl))}fire("pjax:start",[xhr,options]);fire("pjax:send",[xhr,options])}return pjax.xhr}function pjaxReload(container,options){var defaults={url:window.location.href,push:false,replace:true,scrollTo:false};return pjax($.extend(defaults,optionsFor(container,options)))}function locationReplace(url){window.history.replaceState(null,"","#");
window.location.replace(url)}var initialPop=true;var initialURL=window.location.href;var initialState=window.history.state;if(initialState&&initialState.container){pjax.state=initialState}if("state" in window.history){initialPop=false}function onPjaxPopstate(event){var state=event.state;if(state&&state.container){if(initialPop&&initialURL==state.url){return}if(pjax.state.id===state.id){return}var container=$(state.container);if(container.length){var direction,contents=cacheMapping[state.id];if(pjax.state){direction=pjax.state.id<state.id?"forward":"back";cachePop(direction,pjax.state.id,container.clone().contents())}var popstateEvent=$.Event("pjax:popstate",{state:state,direction:direction});container.trigger(popstateEvent);var options={id:state.id,url:state.url,container:container,push:false,fragment:state.fragment,timeout:state.timeout,scrollTo:false};if(contents){container.trigger("pjax:start",[null,options]);if(state.title){document.title=state.title}container.html(contents);pjax.state=state;container.trigger("pjax:end",[null,options])}else{pjax(options)}container[0].offsetHeight}else{locationReplace(location.href)}}initialPop=false}function fallbackPjax(options){var url=$.isFunction(options.url)?options.url():options.url,method=options.type?options.type.toUpperCase():"GET";var form=$("<form>",{method:method==="GET"?"GET":"POST",action:url,style:"display:none"});if(method!=="GET"&&method!=="POST"){form.append($("<input>",{type:"hidden",name:"_method",value:method.toLowerCase()}))}var data=options.data;if(typeof data==="string"){$.each(data.split("&"),function(index,value){var pair=value.split("=");form.append($("<input>",{type:"hidden",name:pair[0],value:pair[1]}))})}else{if(typeof data==="object"){for(key in data){form.append($("<input>",{type:"hidden",name:key,value:data[key]}))}}}$(document.body).append(form);form.submit()}function uniqueId(){return(new Date).getTime()}function stripPjaxParam(url){return url.replace(/\?_pjax=[^&]+&?/,"?").replace(/_pjax=[^&]+&?/,"").replace(/[\?&]$/,"")}function parseURL(url){var a=document.createElement("a");a.href=url;return a}function optionsFor(container,options){if(container&&options){options.container=container}else{if($.isPlainObject(container)){options=container}else{options={container:container}}}if(options.container){options.container=findContainerFor(options.container)}return options}function findContainerFor(container){container=$(container);if(!container.length){throw"no pjax container for "+container.selector}else{if(container.selector!==""&&container.context===document){return container}else{if(container.attr("id")){return $("#"+container.attr("id"))}else{throw"cant get selector for pjax container!"}}}}function findAll(elems,selector){return elems.filter(selector).add(elems.find(selector))}function parseHTML(html){return $.parseHTML(html,document,true)}function extractContainer(data,xhr,options){var obj={};obj.url=stripPjaxParam(xhr.getResponseHeader("X-PJAX-URL")||options.requestUrl);if(/<html/i.test(data)){var $head=$(parseHTML(data.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]));var $body=$(parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]))}else{var $head=$body=$(parseHTML(data))}if($body.length===0){return obj}obj.title=findAll($head,"title").last().text();if(options.fragment){if(options.fragment==="body"){var $fragment=$body}else{var $fragment=findAll($body,options.fragment).first()}if($fragment.length){obj.contents=$fragment.contents();if(!obj.title){obj.title=$fragment.attr("title")||$fragment.data("title")}}}else{if(!/<html/i.test(data)){obj.contents=$body}}if(obj.contents){obj.contents=obj.contents.not(function(){return $(this).is("title")});obj.contents.find("title").remove();obj.scripts=findAll(obj.contents,"script[src]").remove();obj.contents=obj.contents.not(obj.scripts)}if(obj.title){obj.title=$.trim(obj.title)}return obj}function executeScriptTags(scripts){if(!scripts){return}var existingScripts=$("script[src]");scripts.each(function(){var src=this.src;var matchedScripts=existingScripts.filter(function(){return this.src===src});if(matchedScripts.length){return}var script=document.createElement("script");script.type=$(this).attr("type");script.src=$(this).attr("src");document.head.appendChild(script)})}var cacheMapping={};var cacheForwardStack=[];var cacheBackStack=[];function cachePush(id,value){cacheMapping[id]=value;cacheBackStack.push(id);while(cacheForwardStack.length){delete cacheMapping[cacheForwardStack.shift()]}while(cacheBackStack.length>pjax.defaults.maxCacheLength){delete cacheMapping[cacheBackStack.shift()]}}function cachePop(direction,id,value){var pushStack,popStack;cacheMapping[id]=value;if(direction==="forward"){pushStack=cacheBackStack;popStack=cacheForwardStack}else{pushStack=cacheForwardStack;popStack=cacheBackStack}pushStack.push(id);if(id=popStack.pop()){delete cacheMapping[id]}}function findVersion(){return $("meta").filter(function(){var name=$(this).attr("http-equiv");return name&&name.toUpperCase()==="X-PJAX-VERSION"
}).attr("content")}function enable(){$.fn.pjax=fnPjax;$.pjax=pjax;$.pjax.enable=$.noop;$.pjax.disable=disable;$.pjax.click=handleClick;$.pjax.submit=handleSubmit;$.pjax.reload=pjaxReload;$.pjax.defaults={timeout:650,push:true,replace:false,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:findVersion};$(window).on("popstate.pjax",onPjaxPopstate)}function disable(){$.fn.pjax=function(){return this};$.pjax=fallbackPjax;$.pjax.enable=enable;$.pjax.disable=$.noop;$.pjax.click=$.noop;$.pjax.submit=$.noop;$.pjax.reload=function(){window.location.reload()};$(window).off("popstate.pjax",onPjaxPopstate)}if($.inArray("state",$.event.props)<0){$.event.props.push("state")}$.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/);$.support.pjax?enable():disable()})(jQuery);$(document).ready(function(){$(document).bind("keydown",function(e){e=window.event||e;if(e.keyCode==116){$.pjax.reload("#pjax",{fragment:"#pjax",timeout:6000});return false}})});function HandleTabKey(evt){if(evt.keyCode==9){if(evt.preventDefault){evt.preventDefault()}else{evt.returnValue=false}}}function keyLogin(){if(event.keyCode==13){document.getElementById("send_ajax").click()}};

// pjax
$(document).pjax('a[target!=_blank]', '#dyblog_pjax', {fragment: '#dyblog_pjax',timeout: 8000}); 
	$(document).on('pjax:send', function() {
    $(".loading").css("display", "block");
});

$(document).on('pjax:complete', function() {
	$('.burger').click( function () { if (!$(this).hasClass('open')) { openMenu(); } else { closeMenu(); } $(".bar").slideToggle(500); });
	var headers = new Headroom(document.getElementById("header"),{tolerance:0,offset:70,classes:{initial: "animated",pinned:"slideDown",unpinned:"slideUp"}}); 
	headers.init();
	if($('pre').length){ prettyPrint(); }
	if($('#article-menu').length){ $("#article-menu").autoMenu({levelOne:'h2',levelTwo:'h3'}); }
	$('#post-content img').parent('a').attr('data-fancybox','gallery');
    $(".loading").css("display", "none");
	if(!timer){admin_talk()}
    commentTool();
    searchTool();
});