const __vite__fileDeps=["assets/EquationComponent-BhitGt3H.js","assets/EquationComponent-D5v0xPfU.css","assets/ImageComponent-Df-DrG0c.js","assets/LexicalNestedComposer-BvRQ2YL8.js","assets/ImageResizer-Bq47wLQ-.js","assets/ImageComponent-BcOKrOJR.css","assets/ExcalidrawComponent-BNgybviX.js","assets/ExcalidrawComponent-4wE5rM2C.css","assets/PollComponent-DAHIPCbP.js","assets/PollComponent-BVS-UrBy.css","assets/InlineImageComponent-C-C-LY5p.js","assets/StickyComponent-BYChrYp_.js","assets/StickyComponent-BbsrOWz8.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
function e(e,t){for(var i=0;i<t.length;i++){const s=t[i];if("string"!=typeof s&&!Array.isArray(s))for(const t in s)if("default"!==t&&!(t in e)){const i=Object.getOwnPropertyDescriptor(s,t);i&&Object.defineProperty(e,t,i.get?i:{enumerable:!0,get:()=>s[t]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const i of e)if("childList"===i.type)for(const e of i.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function i(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function s(e){if(e.__esModule)return e;var t=e.default;if("function"==typeof t){var i=function e(){return this instanceof e?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};i.prototype=t.prototype}else i={};return Object.defineProperty(i,"__esModule",{value:!0}),Object.keys(e).forEach((function(t){var s=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(i,t,s.get?s:{enumerable:!0,get:function(){return e[t]}})})),i}var a={exports:{}},c={},u={exports:{}},d={},p=Symbol.for("react.element"),m=Symbol.for("react.portal"),h=Symbol.for("react.fragment"),f=Symbol.for("react.strict_mode"),w=Symbol.for("react.profiler"),x=Symbol.for("react.provider"),k=Symbol.for("react.context"),T=Symbol.for("react.forward_ref"),N=Symbol.for("react.suspense"),P=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),O=Symbol.iterator;var F={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,L={};function B(e,t,i){this.props=e,this.context=t,this.refs=L,this.updater=i||F}function R(){}function I(e,t,i){this.props=e,this.context=t,this.refs=L,this.updater=i||F}B.prototype.isReactComponent={},B.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},B.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},R.prototype=B.prototype;var z=I.prototype=new R;z.constructor=I,D(z,B.prototype),z.isPureReactComponent=!0;var U=Array.isArray,q=Object.prototype.hasOwnProperty,$={current:null},W={key:!0,ref:!0,__self:!0,__source:!0};function V(e,t,i){var s,a={},c=null,u=null;if(null!=t)for(s in void 0!==t.ref&&(u=t.ref),void 0!==t.key&&(c=""+t.key),t)q.call(t,s)&&!W.hasOwnProperty(s)&&(a[s]=t[s]);var d=arguments.length-2;if(1===d)a.children=i;else if(1<d){for(var m=Array(d),h=0;h<d;h++)m[h]=arguments[h+2];a.children=m}if(e&&e.defaultProps)for(s in d=e.defaultProps)void 0===a[s]&&(a[s]=d[s]);return{$$typeof:p,type:e,key:c,ref:u,props:a,_owner:$.current}}function Y(e){return"object"==typeof e&&null!==e&&e.$$typeof===p}var J=/\/+/g;function G(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function ee(e,t,i,s,a){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var u=!1;if(null===e)u=!0;else switch(c){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case p:case m:u=!0}}if(u)return a=a(u=e),e=""===s?"."+G(u,0):s,U(a)?(i="",null!=e&&(i=e.replace(J,"$&/")+"/"),ee(a,t,i,"",(function(e){return e}))):null!=a&&(Y(a)&&(a=function(e,t){return{$$typeof:p,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(a,i+(!a.key||u&&u.key===a.key?"":(""+a.key).replace(J,"$&/")+"/")+e)),t.push(a)),1;if(u=0,s=""===s?".":s+":",U(e))for(var d=0;d<e.length;d++){var h=s+G(c=e[d],d);u+=ee(c,t,i,h,a)}else if(h=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=O&&e[O]||e["@@iterator"])?e:null}(e),"function"==typeof h)for(e=h.call(e),d=0;!(c=e.next()).done;)u+=ee(c=c.value,t,i,h=s+G(c,d++),a);else if("object"===c)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return u}function te(e,t,i){if(null==e)return e;var s=[],a=0;return ee(e,s,"","",(function(e){return t.call(i,e,a++)})),s}function ne(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var ie={current:null},oe={transition:null},re={ReactCurrentDispatcher:ie,ReactCurrentBatchConfig:oe,ReactCurrentOwner:$},se=d.Children={map:te,forEach:function(e,t,i){te(e,(function(){t.apply(this,arguments)}),i)},count:function(e){var t=0;return te(e,(function(){t++})),t},toArray:function(e){return te(e,(function(e){return e}))||[]},only:function(e){if(!Y(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},ae=d.Component=B,le=d.Fragment=h,ce=d.Profiler=w,ue=d.PureComponent=I,de=d.StrictMode=f,ge=d.Suspense=N,pe=d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=re,me=d.cloneElement=function(e,t,i){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var s=D({},e.props),a=e.key,c=e.ref,u=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,u=$.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var d=e.type.defaultProps;for(m in t)q.call(t,m)&&!W.hasOwnProperty(m)&&(s[m]=void 0===t[m]&&void 0!==d?d[m]:t[m])}var m=arguments.length-2;if(1===m)s.children=i;else if(1<m){d=Array(m);for(var h=0;h<m;h++)d[h]=arguments[h+2];s.children=d}return{$$typeof:p,type:e.type,key:a,ref:c,props:s,_owner:u}},he=d.createContext=function(e){return(e={$$typeof:k,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:x,_context:e},e.Consumer=e},fe=d.createElement=V,ve=d.createFactory=function(e){var t=V.bind(null,e);return t.type=e,t},ye=d.createRef=function(){return{current:null}},_e=d.forwardRef=function(e){return{$$typeof:T,render:e}},be=d.isValidElement=Y,we=d.lazy=function(e){return{$$typeof:A,_payload:{_status:-1,_result:e},_init:ne}},xe=d.memo=function(e,t){return{$$typeof:P,type:e,compare:void 0===t?null:t}},Se=d.startTransition=function(e){var t=oe.transition;oe.transition={};try{e()}finally{oe.transition=t}},Ce=d.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},je=d.useCallback=function(e,t){return ie.current.useCallback(e,t)},Ee=d.useContext=function(e){return ie.current.useContext(e)},Te=d.useDebugValue=function(){},Ne=d.useDeferredValue=function(e){return ie.current.useDeferredValue(e)},Pe=d.useEffect=function(e,t){return ie.current.useEffect(e,t)},Ae=d.useId=function(){return ie.current.useId()},Oe=d.useImperativeHandle=function(e,t,i){return ie.current.useImperativeHandle(e,t,i)},Fe=d.useInsertionEffect=function(e,t){return ie.current.useInsertionEffect(e,t)},De=d.useLayoutEffect=function(e,t){return ie.current.useLayoutEffect(e,t)},Le=d.useMemo=function(e,t){return ie.current.useMemo(e,t)},Be=d.useReducer=function(e,t,i){return ie.current.useReducer(e,t,i)},Re=d.useRef=function(e){return ie.current.useRef(e)},Ie=d.useState=function(e){return ie.current.useState(e)},ze=d.useSyncExternalStore=function(e,t,i){return ie.current.useSyncExternalStore(e,t,i)},Ue=d.useTransition=function(){return ie.current.useTransition()},qe=d.version="18.2.0";const $e=s(e({__proto__:null,Children:se,Component:ae,Fragment:le,Profiler:ce,PureComponent:ue,StrictMode:de,Suspense:ge,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:pe,cloneElement:me,createContext:he,createElement:fe,createFactory:ve,createRef:ye,default:d,forwardRef:_e,isValidElement:be,lazy:we,memo:xe,startTransition:Se,unstable_act:Ce,useCallback:je,useContext:Ee,useDebugValue:Te,useDeferredValue:Ne,useEffect:Pe,useId:Ae,useImperativeHandle:Oe,useInsertionEffect:Fe,useLayoutEffect:De,useMemo:Le,useReducer:Be,useRef:Re,useState:Ie,useSyncExternalStore:ze,useTransition:Ue,version:qe},[d]));u.exports=$e;var He=u.exports;const We=s(e({__proto__:null,default:i(He)},[He]));
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ke=We,Ve=Symbol.for("react.element"),Ye=Symbol.for("react.fragment"),Je=Object.prototype.hasOwnProperty,Ge=Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Xe={key:!0,ref:!0,__self:!0,__source:!0};function Ze(e,t,i){var s,a={},c=null,u=null;for(s in void 0!==i&&(c=""+i),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)Je.call(t,s)&&!Xe.hasOwnProperty(s)&&(a[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps)void 0===a[s]&&(a[s]=t[s]);return{$$typeof:Ve,type:e,key:c,ref:u,props:a,_owner:Ge.current}}var Qe=c.Fragment=Ye,et=c.jsx=Ze,tt=c.jsxs=Ze;const it=s(e({__proto__:null,Fragment:Qe,default:c,jsx:et,jsxs:tt},[c]));a.exports=it;var ot=a.exports;const rt=e({__proto__:null,default:i(ot)},[ot]),st=window.location.hostname,at="playground.lexical.dev"!==st&&"lexical-playground.vercel.app"!==st,lt={disableBeforeInput:!1,emptyEditor:at,isAutocomplete:!1,isCharLimit:!1,isCharLimitUtf8:!1,isCollab:!1,isMaxLength:!1,isRichText:!0,measureTypingPerf:!1,shouldPreserveNewLinesInMarkdown:!1,shouldUseLexicalContextMenu:!1,showNestedEditorTreeView:!1,showTableOfContents:!1,showTreeView:!0,tableCellBackgroundColor:!0,tableCellMerge:!0},ct={...lt},ut=(()=>{const e=new URLSearchParams(window.location.search);for(const i of Object.keys(ct))if(e.has(i))try{const t=JSON.parse(e.get(i)??"true");ct[i]=Boolean(t)}catch(t){console.warn(`Unable to parse query parameter "${i}"`)}return ct.disableBeforeInput&&delete window.InputEvent.prototype.getTargetRanges,ct})();var dt={exports:{}},gt={},mt={exports:{}},ht={};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!function(e){function t(e,t){var i=e.length;e.push(t);e:for(;0<i;){var s=i-1>>>1,c=e[s];if(!(0<a(c,t)))break e;e[s]=t,e[i]=c,i=s}}function i(e){return 0===e.length?null:e[0]}function s(e){if(0===e.length)return null;var t=e[0],i=e.pop();if(i!==t){e[0]=i;e:for(var s=0,c=e.length,u=c>>>1;s<u;){var d=2*(s+1)-1,p=e[d],m=d+1,h=e[m];if(0>a(p,i))m<c&&0>a(h,p)?(e[s]=h,e[m]=i,s=m):(e[s]=p,e[d]=i,s=d);else{if(!(m<c&&0>a(h,i)))break e;e[s]=h,e[m]=i,s=m}}}return t}function a(e,t){var i=e.sortIndex-t.sortIndex;return 0!==i?i:e.id-t.id}if("object"==typeof performance&&"function"==typeof performance.now){var c=performance;e.unstable_now=function(){return c.now()}}else{var u=Date,d=u.now();e.unstable_now=function(){return u.now()-d}}var p=[],m=[],h=1,f=null,w=3,x=!1,k=!1,T=!1,N="function"==typeof setTimeout?setTimeout:null,P="function"==typeof clearTimeout?clearTimeout:null,A="undefined"!=typeof setImmediate?setImmediate:null;function O(e){for(var a=i(m);null!==a;){if(null===a.callback)s(m);else{if(!(a.startTime<=e))break;s(m),a.sortIndex=a.expirationTime,t(p,a)}a=i(m)}}function F(e){if(T=!1,O(e),!k)if(null!==i(p))k=!0,Y(D);else{var t=i(m);null!==t&&J(F,t.startTime-e)}}function D(t,a){k=!1,T&&(T=!1,P(I),I=-1),x=!0;var c=w;try{for(O(a),f=i(p);null!==f&&(!(f.expirationTime>a)||t&&!q());){var u=f.callback;if("function"==typeof u){f.callback=null,w=f.priorityLevel;var d=u(f.expirationTime<=a);a=e.unstable_now(),"function"==typeof d?f.callback=d:f===i(p)&&s(p),O(a)}else s(p);f=i(p)}if(null!==f)var h=!0;else{var N=i(m);null!==N&&J(F,N.startTime-a),h=!1}return h}finally{f=null,w=c,x=!1}}"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var L,B=!1,R=null,I=-1,z=5,U=-1;function q(){return!(e.unstable_now()-U<z)}function $(){if(null!==R){var t=e.unstable_now();U=t;var i=!0;try{i=R(!0,t)}finally{i?L():(B=!1,R=null)}}else B=!1}if("function"==typeof A)L=function(){A($)};else if("undefined"!=typeof MessageChannel){var W=new MessageChannel,V=W.port2;W.port1.onmessage=$,L=function(){V.postMessage(null)}}else L=function(){N($,0)};function Y(e){R=e,B||(B=!0,L())}function J(t,i){I=N((function(){t(e.unstable_now())}),i)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_continueExecution=function(){k||x||(k=!0,Y(D))},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):z=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return w},e.unstable_getFirstCallbackNode=function(){return i(p)},e.unstable_next=function(e){switch(w){case 1:case 2:case 3:var t=3;break;default:t=w}var i=w;w=t;try{return e()}finally{w=i}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var i=w;w=e;try{return t()}finally{w=i}},e.unstable_scheduleCallback=function(s,a,c){var u=e.unstable_now();switch("object"==typeof c&&null!==c?c="number"==typeof(c=c.delay)&&0<c?u+c:u:c=u,s){case 1:var d=-1;break;case 2:d=250;break;case 5:d=1073741823;break;case 4:d=1e4;break;default:d=5e3}return s={id:h++,callback:a,priorityLevel:s,startTime:c,expirationTime:d=c+d,sortIndex:-1},c>u?(s.sortIndex=c,t(m,s),null===i(p)&&s===i(m)&&(T?(P(I),I=-1):T=!0,J(F,c-u))):(s.sortIndex=d,t(p,s),k||x||(k=!0,Y(D))),s},e.unstable_shouldYield=q,e.unstable_wrapCallback=function(e){var t=w;return function(){var i=w;w=t;try{return e.apply(this,arguments)}finally{w=i}}}}(ht);const ft=s(e({__proto__:null,default:i(ht)},[ht]));mt.exports=ft;var vt=mt.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */