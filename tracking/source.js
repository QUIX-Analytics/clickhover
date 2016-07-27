//########CLICK TRACKER#################
//   Add the following script tag to your main HTML File( works only on Angular applications using ui-router)
// 		<script>
//     	window.qxid = 00000; //Replace with ID provided by Quix.com
//   		var wa = document.createElement('script');
//   		wa.type = 'text/javascript';
//   		wa.async = true;
//   		wa.src = './grab.js';
//   		var s = document.getElementsByTagName('script')[0];
//   		s.parentNode.insertBefore(wa, s);
//     </script>
//######################################

(function(document, window) {

	var clicks = (function() {

		var onClick = function(event) {

			var clickInfo = {
					sessionId: localStorage.getItem('sessionId'),
					click: {
						currentState: document.getElementsByTagName('ui-view')[0].baseURI,
						target: clickHelperFunctions.resolveCircularReference(event.target), //target is a circular reference and cannot be stored normally
						time: event.timeStamp,
						clickX: event.x,
						clickY: event.y,
						scrollX: window.scrollX,
						scrollY: window.scrollY,
						path: clickHelperFunctions.stringifyPath(event.path),
					}
				}

				clickHelperFunctions.sendClick(clickInfo);
			}

		return {
			onClick: onClick
		}

	})();

	var clickQueue = [];

	var clickHelperFunctions = (function(){

		var resolveCircularReference = function(target){
			var resolveChild = function(child){
				var childWithoutCircular = {};
				for(var prop in child){
					if(typeof child[prop] !== "function" && typeof child[prop] !== "object"){
						childWithoutCircular[prop] = child[prop]
					}
				}
				return childWithoutCircular;
			}

			var targetWithoutCircular = {};
			for(var prop in target){
				if(typeof target[prop] !== "function" && typeof target[prop] !== "object"){
					targetWithoutCircular[prop] = target[prop]
				}
				// else if ( prop === "firstChild" || prop === "firstElementChild" || prop === "lastChild" || prop === "lastElementChild"
				// 						|| prop === "nextElementSibling" || prop === "nextSibling" || prop === "offsetParent" || prop == "parentElement"
				// 						|| prop === "parentNode" || prop === "previousSibling" || prop === "previousElementSibling"){
				//
				// 								targetWithoutCircular[prop] = resolveChild(target[prop]);
				//
				// 						} else if (prop === "childNodes" || prop === "children") {
				// 							targetWithoutCircular[prop] = [];
				// 							for(var i = 0; i < target[prop].length; i++){
				// 								targetWithoutCircular[prop].push(resolveChild(target[prop][i]));
				// 							}
				// 						}
			}
			return targetWithoutCircular;
		}

		var getBrowserType = function() {
		    if (getBrowserType.prototype._cachedResult)
		        return getBrowserType.prototype._cachedResult;
		    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		    var isFirefox = typeof InstallTrigger !== 'undefined';
		    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		    var isChrome = !!window.chrome && !isOpera;
		    var isIE = /*@cc_on!@*/false || !!document.documentMode;
		    var isEdge = !isIE && !!window.StyleMedia;
		    return getBrowserType.prototype._cachedResult =
		        isOpera ? 'Opera' :
		        isFirefox ? 'Firefox' :
		        isSafari ? 'Safari' :
		        isChrome ? 'Chrome' :
		        isIE ? 'IE' :
		        isEdge ? 'Edge' :
		        "Don't know";
		};

		var platformCheck = function(){
		  var check = false;
		  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		  return check ? 'mobile' : 'desktop';
		};

		var stringifyPath = function(path){
			var stringified = '';
			for(var i = path.length - 1; i >= 0; i--){
				if(path[i].localName) {
					stringified += '>' + path[i].localName;
					if(path[i].className) stringified += '.' + path[i].className;
					if(path[i].id) stringified += '#' + path[i].id;
				}
			}
			return stringified;
		}

		var sendClick = function(clickInfo){
			if(clickInfo !== 'recurse'){
				clickQueue.push(clickInfo);
			}
			if(clickQueue.length === 1 || clickInfo === 'recurse'){
				axios.patch(url + 'site/' + window.qxid, clickQueue[0])
					.then(function(response) {
						console.log(response);
						clickQueue.shift();
						if(clickQueue.length > 0){
							sendClick('recurse');
						}
					});
			}
		}

		var randomID = function(){
			var t = "";
    	var p = "abcdefghijklmnopqrstuvwxyz0123456789";
			for( var i=0; i < 7; i++ ) t += p.charAt(Math.floor(Math.random() * p.length));
			return t;
		}

		return {
			resolveCircularReference: resolveCircularReference,
			getBrowserType: getBrowserType,
			platformCheck: platformCheck,
			stringifyPath: stringifyPath,
			sendClick: sendClick,
			randomID: randomID
		}
	})();


	/* axios v0.13.1 | (c) 2016 by Matt Zabriskie */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";function n(e){var t=new i(e),r=s(i.prototype.request,t);return o.extend(r,i.prototype,t),o.extend(r,t),r}var o=r(2),s=r(3),i=r(4),u=e.exports=n();u.Axios=i,u.create=function(e){return n(e)},u.all=function(e){return Promise.all(e)},u.spread=r(21)},function(e,t,r){"use strict";function n(e){return"[object Array]"===E.call(e)}function o(e){return"[object ArrayBuffer]"===E.call(e)}function s(e){return"undefined"!=typeof FormData&&e instanceof FormData}function i(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function u(e){return"string"==typeof e}function a(e){return"number"==typeof e}function c(e){return"undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===E.call(e)}function d(e){return"[object File]"===E.call(e)}function l(e){return"[object Blob]"===E.call(e)}function h(e){return"[object Function]"===E.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function g(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function v(){return"undefined"!=typeof window&&"undefined"!=typeof document&&"function"==typeof document.createElement}function w(e,t){if(null!==e&&"undefined"!=typeof e)if("object"==typeof e||n(e)||(e=[e]),n(e))for(var r=0,o=e.length;o>r;r++)t.call(null,e[r],r,e);else for(var s in e)e.hasOwnProperty(s)&&t.call(null,e[s],s,e)}function x(){function e(e,r){"object"==typeof t[r]&&"object"==typeof e?t[r]=x(t[r],e):t[r]=e}for(var t={},r=0,n=arguments.length;n>r;r++)w(arguments[r],e);return t}function b(e,t,r){return w(t,function(t,n){r&&"function"==typeof t?e[n]=S(t,r):e[n]=t}),e}var S=r(3),E=Object.prototype.toString;e.exports={isArray:n,isArrayBuffer:o,isFormData:s,isArrayBufferView:i,isString:u,isNumber:a,isObject:f,isUndefined:c,isDate:p,isFile:d,isBlob:l,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:v,forEach:w,merge:x,extend:b,trim:g}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},function(e,t,r){"use strict";function n(e){this.defaults=s.merge(o,e),this.interceptors={request:new i,response:new i}}var o=r(5),s=r(2),i=r(7),u=r(8),a=r(19),c=r(20);n.prototype.request=function(e){"string"==typeof e&&(e=s.merge({url:arguments[0]},arguments[1])),e=s.merge(o,this.defaults,{method:"get"},e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url));var t=[u,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},s.forEach(["delete","get","head"],function(e){n.prototype[e]=function(t,r){return this.request(s.merge(r||{},{method:e,url:t}))}}),s.forEach(["post","put","patch"],function(e){n.prototype[e]=function(t,r,n){return this.request(s.merge(n||{},{method:e,url:t,data:r}))}}),e.exports=n},function(e,t,r){"use strict";function n(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var o=r(2),s=r(6),i=/^\)\]\}',?\n/,u={"Content-Type":"application/x-www-form-urlencoded"};e.exports={transformRequest:[function(e,t){return s(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(n(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(n(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e){e=e.replace(i,"");try{e=JSON.parse(e)}catch(t){}}return e}],headers:{common:{Accept:"application/json, text/plain, */*"},patch:o.merge(u),post:o.merge(u),put:o.merge(u)},timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&300>e}}},function(e,t,r){"use strict";var n=r(2);e.exports=function(e,t){n.forEach(e,function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])})}},function(e,t,r){"use strict";function n(){this.handlers=[]}var o=r(2);n.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=n},function(e,t,r){"use strict";var n=r(2),o=r(9);e.exports=function(e){e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),n.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t;return"function"==typeof e.adapter?t=e.adapter:"undefined"!=typeof XMLHttpRequest?t=r(10):"undefined"!=typeof process&&(t=r(10)),Promise.resolve(e).then(t).then(function(t){return t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse)),Promise.reject(t)})}},function(e,t,r){"use strict";var n=r(2);e.exports=function(e,t,r){return n.forEach(r,function(r){e=r(e,t)}),e}},function(e,t,r){"use strict";var n=r(2),o=r(11),s=r(14),i=r(15),u=r(16),a=r(12),c="undefined"!=typeof window&&window.btoa||r(17);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;n.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||u(e.url)||(l=new window.XDomainRequest,h="onload",m=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var y=e.auth.username||"",g=e.auth.password||"";d.Authorization="Basic "+c(y+":"+g)}if(l.open(e.method.toUpperCase(),s(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[h]=function(){if(l&&(4===l.readyState||m)&&0!==l.status){var r="getAllResponseHeaders"in l?i(l.getAllResponseHeaders()):null,n=e.responseType&&"text"!==e.responseType?l.response:l.responseText,s={data:n,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:r,config:e,request:l};o(t,f,s),l=null}},l.onerror=function(){f(a("Network Error",e)),l=null},l.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED")),l=null},n.isStandardBrowserEnv()){var v=r(18),w=e.withCredentials||u(e.url)?v.read(e.xsrfCookieName):void 0;w&&(d[e.xsrfHeaderName]=w)}if("setRequestHeader"in l&&n.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType}catch(x){if("json"!==l.responseType)throw x}"function"==typeof e.progress&&("post"===e.method||"put"===e.method?l.upload.addEventListener("progress",e.progress):"get"===e.method&&l.addEventListener("progress",e.progress)),void 0===p&&(p=null),l.send(p)})}},function(e,t,r){"use strict";var n=r(12);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r)):e(r)}},function(e,t,r){"use strict";var n=r(13);e.exports=function(e,t,r,o){var s=new Error(e);return n(s,t,r,o)}},function(e,t){"use strict";e.exports=function(e,t,r,n){return e.config=t,r&&(e.code=r),e.response=n,e}},function(e,t,r){"use strict";function n(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=r(2);e.exports=function(e,t,r){if(!t)return e;var s;if(r)s=r(t);else if(o.isURLSearchParams(t))s=t.toString();else{var i=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),i.push(n(t)+"="+n(e))}))}),s=i.join("&")}return s&&(e+=(-1===e.indexOf("?")?"?":"&")+s),e}},function(e,t,r){"use strict";var n=r(2);e.exports=function(e){var t,r,o,s={};return e?(n.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=n.trim(e.substr(0,o)).toLowerCase(),r=n.trim(e.substr(o+1)),t&&(s[t]=s[t]?s[t]+", "+r:r)}),s):s}},function(e,t,r){"use strict";var n=r(2);e.exports=n.isStandardBrowserEnv()?function(){function e(e){var t=e;return r&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,r=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(r){var o=n.isString(r)?e(r):r;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t){"use strict";function r(){this.message="String contains an invalid character"}function n(e){for(var t,n,s=String(e),i="",u=0,a=o;s.charAt(0|u)||(a="=",u%1);i+=a.charAt(63&t>>8-u%1*8)){if(n=s.charCodeAt(u+=.75),n>255)throw new r;t=t<<8|n}return i}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",e.exports=n},function(e,t,r){"use strict";var n=r(2);e.exports=n.isStandardBrowserEnv()?function(){return{write:function(e,t,r,o,s,i){var u=[];u.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&u.push("expires="+new Date(r).toGMTString()),n.isString(o)&&u.push("path="+o),n.isString(s)&&u.push("domain="+s),i===!0&&u.push("secure"),document.cookie=u.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,"")}},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])});
//# sourceMappingURL=axios.min.map

document.addEventListener('click', clicks.onClick);

var url = 'http://localhost:3000/api/';

(function setAnonID() {
	if(!localStorage.getItem('qu')) localStorage.setItem('qu', clickHelperFunctions.randomID());
})()

axios.patch(url + 'site/' + window.qxid, { //Starts empty click session on page load
	browser: clickHelperFunctions.getBrowserType(),
	vh: window.innerHeight,
	vw: window.innerWidth,
	platform: clickHelperFunctions.platformCheck(),
	entryState: document.getElementsByTagName('ui-view')[0].baseURI,
	qu:
})
	.then(function(response) {
		console.log(response);
		localStorage.setItem('sessionId', response.data.sessions[response.data.sessions.length - 1]._id);
	});


})(document, window);
