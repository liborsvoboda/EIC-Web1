/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';var u=require("@lexical/react/LexicalComposerContext"),w=require("@lexical/rich-text"),z=require("@lexical/utils"),B=require("lexical"),C=require("react"),D=require("react-dom"),E=require("react/jsx-runtime");
class F{constructor(a,b){this._x=a;this._y=b}get x(){return this._x}get y(){return this._y}equals({x:a,y:b}){return this.x===a&&this.y===b}calcDeltaXTo({x:a}){return this.x-a}calcDeltaYTo({y:a}){return this.y-a}calcHorizontalDistanceTo(a){return Math.abs(this.calcDeltaXTo(a))}calcVerticalDistance(a){return Math.abs(this.calcDeltaYTo(a))}calcDistanceTo(a){return Math.sqrt(Math.pow(this.calcDeltaXTo(a),2)+Math.pow(this.calcDeltaYTo(a),2))}}
class G{constructor(a,b,c,d){let [n,k]=b<=d?[b,d]:[d,b],[l,h]=a<=c?[a,c]:[c,a];this._top=n;this._right=h;this._left=l;this._bottom=k}get top(){return this._top}get right(){return this._right}get bottom(){return this._bottom}get left(){return this._left}get width(){return Math.abs(this._left-this._right)}get height(){return Math.abs(this._bottom-this._top)}equals({top:a,left:b,bottom:c,right:d}){return a===this._top&&c===this._bottom&&b===this._left&&d===this._right}contains(a){if(a instanceof F){let {x:k,
y:l}=a;a=l<this._top;let h=l>this._bottom,m=k<this._left,t=k>this._right;return{reason:{isOnBottomSide:h,isOnLeftSide:m,isOnRightSide:t,isOnTopSide:a},result:!a&&!h&&!m&&!t}}let {top:b,left:c,bottom:d,right:n}=a;return b>=this._top&&b<=this._bottom&&d>=this._top&&d<=this._bottom&&c>=this._left&&c<=this._right&&n>=this._left&&n<=this._right}intersectsWith(a){let {left:b,top:c,width:d,height:n}=a,{left:k,top:l,width:h,height:m}=this;return(b+d>=k+h?b+d:k+h)-(b<=k?b:k)<=d+h&&(c+n>=l+m?c+n:l+m)-(c<=l?
c:l)<=n+m}generateNewRect({left:a=this.left,top:b=this.top,right:c=this.right,bottom:d=this.bottom}){return new G(a,b,c,d)}static fromLTRB(a,b,c,d){return new G(a,b,c,d)}static fromLWTH(a,b,c,d){return new G(a,c,a+b,c+d)}static fromPoints(a,b){let {y:c,x:d}=a,{y:n,x:k}=b;return G.fromLTRB(d,c,k,n)}static fromDOM(a){let {top:b,width:c,left:d,height:n}=a.getBoundingClientRect();return G.fromLWTH(d,c,b,n)}}let H=Infinity;
function J(a){return a.getEditorState().read(()=>B.$getRoot().getChildrenKeys())}function K(a){let {marginTop:b,marginBottom:c}=window.getComputedStyle(a);var d=(d=a.previousElementSibling)?parseFloat(window.getComputedStyle(d).marginBottom):0;a=(a=a.nextElementSibling)?parseFloat(window.getComputedStyle(a).marginTop):0;d=Math.max(parseFloat(b),d);return{marginBottom:Math.max(parseFloat(c),a),marginTop:d}}
function L(a,b,c,d=!1){let n=a.getBoundingClientRect(),k=J(b),l=null;b.getEditorState().read(()=>{if(d){let [q,f]=[b.getElementByKey(k[0]),b.getElementByKey(k[k.length-1])],[p,e]=[null!=q?q.getBoundingClientRect():void 0,null!=f?f.getBoundingClientRect():void 0];if(p&&e){var h=z.calculateZoomLevel(q),m=z.calculateZoomLevel(f);c.y/h<p.top?l=q:c.y/m>e.bottom&&(l=f);if(l)return}}h=k.length;h=0===h?Infinity:0<=H&&H<h?H:Math.floor(h/2);for(m=0;0<=h&&h<k.length;){let q=b.getElementByKey(k[h]);if(null===
q)break;var t=z.calculateZoomLevel(q);t=new F(c.x/t,c.y/t);var r=G.fromDOM(q);let {marginTop:f,marginBottom:p}=K(q);r=r.generateNewRect({bottom:r.bottom+p,left:n.left,right:n.right,top:r.top-f});let {result:e,reason:{isOnTopSide:g,isOnBottomSide:v}}=r.contains(t);if(e){l=q;H=h;break}0===m&&(m=g?-1:v?1:Infinity);h+=m}});return l}function M(a,b){let {transform:c}=b.style;b.style.transform="translateZ(0)";a.setDragImage(b,0,0);setTimeout(()=>{b.style.transform=c})}
function N(a,b,c,d,n,k,l,h){let m=b.parentElement,t=C.useRef(!1),[r,q]=C.useState(null);C.useEffect(()=>{function f(e){let g=e.target;null==g||z.isHTMLElement(g)?null!=g&&h(g)||(e=L(b,a,e),q(e)):q(null)}function p(){q(null)}null!=m&&(m.addEventListener("mousemove",f),m.addEventListener("mouseleave",p));return()=>{null!=m&&(m.removeEventListener("mousemove",f),m.removeEventListener("mouseleave",p))}},[m,b,a,h]);C.useEffect(()=>{if(c.current){var f=c.current;if(r){var p=r.getBoundingClientRect(),e=
window.getComputedStyle(r),g=f.getBoundingClientRect(),v=b.getBoundingClientRect();p=p.top+(parseInt(e.lineHeight,10)-g.height)/2-v.top;f.style.opacity="1";f.style.transform=`translate(${4}px, ${p}px)`}else f.style.opacity="0",f.style.transform="translate(-10000px, -10000px)"}},[b,r,c]);C.useEffect(()=>{function f(e){if(!t.current)return!1;var [g]=w.eventFiles(e);if(g)return!1;let {pageY:v,target:A}=e;if(null!=A&&!z.isHTMLElement(A))return!1;var x=L(b,a,e,!0);g=d.current;if(null===x||null===g)return!1;
var y=v/z.calculateZoomLevel(A);let {top:I,height:O}=x.getBoundingClientRect(),{top:P,width:Q}=b.getBoundingClientRect(),{marginTop:R,marginBottom:S}=K(x);x=I;g.style.transform=`translate(${24}px, ${(y>=I?x+(O+S/2):x-R/2)-P-2}px)`;g.style.width=`${Q-48}px`;g.style.opacity=".4";e.preventDefault();return!0}function p(e){if(!t.current)return!1;var [g]=w.eventFiles(e);if(g)return!1;let {target:v,dataTransfer:A,pageY:x}=e;g=null!=A?A.getData("application/x-lexical-drag-block"):"";g=B.$getNodeByKey(g);
if(!g||null!=v&&!z.isHTMLElement(v))return!1;var y=L(b,a,e,!0);if(!y)return!1;e=B.$getNearestNodeFromDOMNode(y);if(!e)return!1;if(e===g)return!0;y=y.getBoundingClientRect().top;x/z.calculateZoomLevel(v)>=y?e.insertAfter(g):e.insertBefore(g);q(null);return!0}return z.mergeRegister(a.registerCommand(B.DRAGOVER_COMMAND,e=>f(e),B.COMMAND_PRIORITY_LOW),a.registerCommand(B.DROP_COMMAND,e=>p(e),B.COMMAND_PRIORITY_HIGH))},[b,a,d]);return D.createPortal(E.jsxs(E.Fragment,{children:[E.jsx("div",{draggable:!0,
onDragStart:function(f){if((f=f.dataTransfer)&&r){M(f,r);var p="";a.update(()=>{let e=B.$getNearestNodeFromDOMNode(r);e&&(p=e.getKey())});t.current=!0;f.setData("application/x-lexical-drag-block",p)}},onDragEnd:function(){t.current=!1;var f=d.current;f&&(f.style.opacity="0",f.style.transform="translate(-10000px, -10000px)")},children:n&&k}),l]}),b)}
exports.DraggableBlockPlugin_EXPERIMENTAL=function({anchorElem:a=document.body,menuRef:b,targetLineRef:c,menuComponent:d,targetLineComponent:n,isOnMenu:k}){let [l]=u.useLexicalComposerContext();return N(l,a,b,c,l._editable,d,n,k)}