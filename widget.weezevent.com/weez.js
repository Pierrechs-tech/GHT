!function(){"use strict";class e{constructor(e,t,i,n,s){this.id=e,this.origin=t,this.type=i,this.payload=n,this.event=s}toString(){return JSON.stringify(this)}toJSON(){const e={...this}
;return delete e.event,e}static fromEvent(e){const{data:t,origin:i}=e;return new this(t.id,t.origin||i,t.type||"unknown",t.payload||t,e)}}function t(e,t={}){try{
let n=new URL(e),r=new URLSearchParams(n.searchParams),a=new URLSearchParams(window.location.search);const o=window.location.hash.split("#").filter((e=>e.startsWith("weez_")))
;for(let[e,t]of r.entries())a.set(e,t);for(let e of i){const t=s(e);t&&a.set(e,t)}for(let[e,i]of Object.entries(t))a.set(e,i);return n.search=a,o.length&&(n.hash+="#"+o.join("#")),n.toString()
}catch(e){}return e}const i=["utm_source","utm_campaign","utm_medium","utm_term","utm_content","o"];function n(e,t,n=2592e6){if(i.includes(e)){const i={expiry:Date.now()+n,value:t}
;localStorage.setItem(`wz_${e}`,JSON.stringify(i))}}function s(e){const t=localStorage.getItem(`wz_${e}`);if(!t)return null;const i=JSON.parse(t)
;return Date.now()>i.expiry?(localStorage.removeItem(`wz_${e}`),null):i.value}function r(){const e=navigator.userAgent.match(/chrom(?:e|ium)\/(\d+)\./i)
;return!(!e||window.location.host.includes("weezevent.com"))&&108===parseInt(e[1],10)}class a{static handles=[];constructor(e){this.tag=e,this.container=null,this.handlers={},this.iframe=null}
registerHandles(){const t=this.handles||this.constructor.handles;for(let e of t)this.on(e.type,e.callback);window.addEventListener("message",(t=>{if(t.source===this.iframe.contentWindow){
let i=e.fromEvent(t);this.handle(i)}}))}on(e,t){this.handlers[e]=this.handlers[e]||[],this.handlers[e].push(t)}handle(e){if(this.handlers[e.type])for(const t of this.handlers[e.type])t(e,this)}
shouldUseContainer(){return"div"!==this.tag.parentNode.tagName.toLowerCase()||this.getDataset().useContainer||r()}getDataset(){return this.tag.dataset||{}}getContainer(){
if(this.container)return this.container;const e=this.tag.parentNode;return this.shouldUseContainer()?(this.container=document.createElement("div"),this.container.style.display="flex",
this.container.style.flexDirection="column",this.container.style.alignItems="center",r()&&(this.container.style.maxHeight="100vh"),e.appendChild(this.container),this.container):(this.container=e,e)}
render(){this.iframe=this.buildIframe(),this.inject(),this.prune()}getAttributes(){return{src:this.getDataset().src||this.tag.href}}buildIframe(){
const e=document.createElement("iframe"),t=this.getAttributes();for(let i in t)t[i]&&e.setAttribute(i,t[i]);return e}inject(){this.getContainer().appendChild(this.iframe),this.registerHandles()}
prune(){this.tag.parentNode.removeChild(this.tag)}}class o{constructor(e,t){this.type=e,this.callback=t}}class l{constructor(e){this.window=window.self!==window.top?e.parent:e.contentWindow,
this.waiting_answers={}}send(t,{needs_answer:i=!1,timeout:n=500}={}){if(i)return new Promise(((i,s)=>{
const r=(268435456*Math.random()).toString(16),a=new e(r,t.origin,t.type,t.payload,t.event),o=setTimeout((()=>s()),n);this.waiting_answers[r]=e=>{clearTimeout(o),i(e),delete this.waiting_answers[r]},
this.window.postMessage(a,"*")}));this.window.postMessage(t,"*")}register(e){const t=t=>{t.source===this.window.parent&&e(t,this.window)};return window.addEventListener("message",t),
()=>window.removeEventListener("message",t)}listen(){window.addEventListener("message",(t=>{if(t.source===this.window.parent){let i=e.fromEvent(t)
;if(i.id&&i.id in this.waiting_answers)return void this.waiting_answers[i.id](i)}}))}}const c=new o("PingPong",(({type:e,origin:t,payload:i,event:n},s)=>{if(console.log("HOST: ping/pong",i),
"ping"===i){new l(s.iframe).send("PONG")}}));const h=(e,t)=>{function i(i){if(i.source===t.contentWindow)if("object"==typeof i.data&&"WEEZ_GAT_QUESTION"===i.data.message)n(i.data.id),function(e,t){
if("function"!=typeof ga)return;let i={message:"WEEZ_GAT_ANSWER"};ga((function(){ga.getAll().some((function(t){return t.get("trackingId")===e&&(i.clientId=t.get("clientId"),i.trackingId=e),
t.get("trackingId")===e})),t.postMessage(i,"*")}))}(i.data.id,i.source);else if("string"==typeof i.data){let s=i.data.split("-");if((s[0]===t.id||""===t.id)&&(n(s[0]),
"1"===e.resize))if(0===i.data.indexOf("SCROLLIFRAME"))t.scrollIntoView();else if("weezmulti"!==s[0]&&0!==s[0].indexOf("weezuniq")||!t)0===i.data.indexOf("SCROLLFORM")&&window.scrollTo(0,window.scrollY+t.getBoundingClientRect().top+parseFloat(s[1]));else{
let e=t,i=s[1]+"px";e.height=i,e.style.height=i}}}function n(e){let t=document.getElementById("link"+e);t&&null!==t.parentNode&&t.parentNode.removeChild(t)}
window.addEventListener?window.addEventListener("message",i,!1):window.attachEvent("onmessage",i)};let d=/^weezuniq\d+-\d+(\.\d+)?$/;const g=new o("unknown",(({type:e,origin:t,payload:i,event:n},s)=>{
if(d.test(i)){let[,e]=i.split("-");s.iframe.height=Math.ceil(e)}})),f=new o("resize",(({type:e,origin:t,payload:i,event:n},s)=>{"1"===s.iframe.getAttribute("resize")&&(s.iframe.height=i.height,
s.iframe.style.height&&(s.iframe.style.height=`${i.height}px`))})),w=new o("clean-url-params",(({id:e,type:t,origin:i,payload:n,event:s},r)=>{
const a=new URL(window.location.href),o=new URLSearchParams(a.search),{paramsKeys:l=[]}=n;l.forEach((e=>{o.delete(e)})),a.search=o;const c=a.toString();window.history.pushState({path:c},"",c),
localStorage.removeItem("wz_resale_uuid"),window.location.reload()})),u=new o("parent-url",(({id:t,type:i,origin:n,payload:s,event:r},a)=>{
if(!t)return void console.error("Id is missing but it's required");const o=new e(t,i,"piglet",{parentUrl:window.location.href},r);a.iframe.contentWindow.postMessage(o.toJSON(),"*")}));function m(e,t){
let i=new URLSearchParams(window.location.search);window.addEventListener("load",(()=>{if("1"===i.get("scrollToWeezWidget")){let i=function(e){let t=[0,0];if(e.offsetParent)for(t[0]+=e.offsetLeft,
t[1]+=e.offsetTop;e.offsetParent;)e=e.offsetParent,t[0]+=e.offsetLeft,t[1]+=e.offsetTop;return t}(e);window.scrollTo({top:i[1]-10,left:i[0],behavior:"smooth"}),"function"==typeof t&&t()}}))}
const p=new o("resize",(({type:e,origin:t,payload:i,event:n},s)=>{"1"===s.iframe.getAttribute("resize")&&(s.iframe.height=i.height,s.iframe.style.height&&(s.iframe.style.height=`${i.height}px`))
})),y=new o("parent-url",(({id:t,type:i,origin:n,payload:s,event:r},a)=>{if(!t)return void console.error("Id is missing but it's required");const o=new e(t,i,"piglet",{parentUrl:window.location.href
},r);a.iframe.contentWindow.postMessage(o.toJSON(),"*")})),v=new o("clean-url-params",(({id:e,type:t,origin:i,payload:n,event:s},r)=>{
const a=new URL(window.location.href),o=new URLSearchParams(a.search),{paramsKeys:l=[]}=n;l.forEach((e=>{o.delete(e)})),a.search=o;const c=a.toString();window.history.pushState({path:c},"",c)}))
;const b=new class{constructor(){this.widgets={},this.runtime=[]}register(e){this.widgets[e.type]=e}fromTag(e){const{dataset:{type:t}}=e
;if(!this.widgets[t])return console.warn(`[Weezevent] No registered widget for type ${t}`);let i=new(0,this.widgets[t])(e);i.render(),this.runtime.push(i)}};function z(){
const e=document.querySelectorAll("a");for(const t of e)"string"==typeof t.className&&-1!==t.className.indexOf("weezevent-widget-integration")&&b.fromTag(t)}b.register(class extends a{
static handles=[g,u];static type="ticket";getSettings(){const e=this.getDataset();let t={id:"multi"===e.id?"weezmulti":"weezuniq"+e.id,src:e.src+"&v=2&neo=1",resize:e.resize,height:e.height,
width:e.width_auto&&"1"===e.width_auto?"100%":e.width,hidePoweredBy:e.nopb?e.nopb:0,frameborder:"0",allowfullscreen:"true",scrolling:"auto"};return"1"===t.resize&&(t.src+="&jsintegration=1"),t}
getAttributes(){return{src:t(this.getDataset().src)}}render(){var e,t,i;this.iframe=this.buildIframe(),this.inject(),e=this.getSettings(),t=this.iframe,i=this.tag,{display:function(e,n){
i.parentNode.insertBefore(e,i),t.parentNode.appendChild(n),i.parentNode.removeChild(i)},setIframeParams:function(){for(let i in e)e[i]&&t.setAttribute(i,e[i])},styleLink:function(e){
let t=i.style.cssText;t+="float: right !important;",t+="margin: 10px 0 15px 0 !important;",t+="font-size: 11px !important;",t+="font-family: Arial, sans-serif !important;",
t+="text-decoration: none !important;",t+="color: #333333 !important;",e.style.cssText=t,e.href=i.href},styleIframe:function(){
t.style.cssText="box-sizing:initial; -moz-box-sizing:initial; -webkit-box-sizing:initial;"},getLink:function(){
let t=document.createElement("a"),n="Cliquer ici pour acheter des billets / Click here to buy tickets",s=document.createTextNode(n);return t.appendChild(s),t.id="link"+e.id,t.title=n,
t.style.display="none",t.href=i.attributes["data-src"].value,setTimeout((function(){t.style.display="block"}),5e3),t},init:function(){if(-1!==i.className.indexOf("rendered"))return
;let n=this.getLink(),s=e.src;t.contentWindow?t.contentWindow.location.replace(s):t.src=s,this.setIframeParams();let r=document.createElement("a");this.styleIframe(),this.styleLink(r),h(e,t),
i.classList.add("rendered"),r.innerHTML="1"!==e.hidePoweredBy?"Powered by Weezevent":"",this.display(n,r)}}.init(),this.socket=new l(this.iframe)}}),b.register(class extends a{static type="neo"
;static handles=[g,f,w,u];getAttributes(){const e=this.getDataset();return{src:t(e.src,{neo:"1"}),height:e.height,resize:e.resize,width:e.width_auto&&"1"===e.width_auto?"100%":e.width,frameborder:"0",
allowfullscreen:"true",scrolling:"auto",hidePoweredBy:e.nopb?e.nopb:0}}injectPoweredByWeezevent(){let e=document.createElement("a");this.styleLink(e),e.innerHTML="Powered by Weezevent",
"1"===this.getDataset().nopb&&(e.style.display="none"),this.getContainer().appendChild(e)}styleLink(e){let t=this.tag.style.cssText;t+="float: right !important;",t+="margin-left: auto !important;",
t+="margin-top: 10px !important;",t+="font-size: 11px !important;",t+="font-family: Arial, sans-serif !important;",t+="text-decoration: none !important;",t+="color: #333333 !important;",
e.style.cssText=t,e.href=this.tag.href}cleanUrlParams(){const e=new URL(window.location.href),t=new URLSearchParams(e.search);t.delete("scrollToWeezWidget"),e.search=t;const i=e.toString()
;window.history.pushState({path:i},"",i)}render(){super.render(),h({resize:this.getDataset().resize},this.iframe),this.socket=new l(this.iframe),this.injectPoweredByWeezevent(),
m(this.iframe,this.cleanUrlParams)}}),b.register(class extends a{static type="gadget";static handles=[v,p,y];getAttributes(){const e=this.getDataset();return{src:t(e.src),height:e.height,
resize:e.resize,width:e.width_auto&&"1"===e.width_auto?"100%":e.width,frameborder:"0",allowfullscreen:"true",scrolling:"auto",allow:"payment"}}cleanUrlParams(){
const e=new URL(window.location.href),t=new URLSearchParams(e.search);t.delete("scrollToWeezWidget"),e.search=t;const i=e.toString();window.history.pushState({path:i},"",i)}render(){super.render(),
this.socket=new l(this.iframe),m(this.iframe,this.cleanUrlParams)}}),b.register(class extends a{static handles=[c];static type="pingPong"}),b.register(class extends a{static handles=[{
type:"target-change-height",callback:({payload:e},t)=>{t.iframe.style.height=`${e.height?e.height:t.iframe.height}px`}},{type:"target-ask-values",callback:(e,t)=>{new l(t.iframe).send({
type:"target-send-values",page:window.location.href,referrer:document.referrer})}}];static type="groot";getAttributes(){const e=this.getDataset();return{src:e.iframeSrc||this.tag.href,
width:e.iframeWidth||"100%",scrolling:"no",frameBorder:"0"}}}),z(),new window.MutationObserver((e=>{e.some((e=>"childList"===e.type))&&z()})).observe(document.body,{attributes:!1,childList:!0,
subtree:!0}),function(){const e=new URLSearchParams(window.location.search);for(const[t,i]of e.entries())n(t,i)}()}();
//# sourceMappingURL=weez.js.map
