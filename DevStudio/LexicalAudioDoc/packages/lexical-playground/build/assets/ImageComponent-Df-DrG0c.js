import{r as e,k as t,o as a,u as s,x as r,O as n,S as o,p as i,q as l,y as d,b as c,a as h,D as u,T as m,m as g,w as v,s as x,n as f,e as p,t as j,v as w,j as C,z as E,X as b,A as N,C as R,G as S,H as y,I as V,J as z,L as H,N as k,P as I,Q as W,R as T,U as D,_ as G,V as L,W as M,Y as _,Z as A,a0 as B,a1 as K,a2 as U}from"./main-zXAllzd6.js";import{d as F}from"./LexicalNestedComposer-BvRQ2YL8.js";import{I as P}from"./ImageResizer-Bq47wLQ-.js";const q="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22%203H2v18h20v-2h-2v-2h2v-2h-2v-2h2v-2h-2V9h2V7h-2V5h2V3zm-2%204v2h-2v2h2v2h-2v2h2v2h-2v2H4V5h14v2h2zm-6%202h-2v2h-2v2H8v2H6v2h2v-2h2v-2h2v-2h2v2h2v-2h-2V9zM6%207h2v2H6V7z'%20fill='%23000000'/%3e%3c/svg%3e",J=new Set,O=U();function Q({altText:e,className:t,imageRef:a,src:s,width:r,height:n,maxWidth:o,onError:i}){return function(e){if(!J.has(e))throw new Promise((t=>{const a=new Image;a.src=e,a.onload=()=>{J.add(e),t(null)},a.onerror=()=>{J.add(e)}}))}(s),C.jsx("img",{className:t||void 0,src:s,alt:e,ref:a,style:{height:n,maxWidth:o,width:r},onError:i,draggable:"false"})}function X(){return C.jsx("img",{src:q,style:{height:200,opacity:.2,width:200},draggable:"false"})}function Y({src:U,altText:q,nodeKey:J,width:Y,height:Z,maxWidth:$,resizable:ee,showCaption:te,caption:ae,captionsEnabled:se}){const re=e.useRef(null),ne=e.useRef(null),[oe,ie,le]=t(J),[de,ce]=e.useState(!1),{isCollabActive:he}=a(),[ue]=s(),[me,ge]=e.useState(null),ve=e.useRef(null),[xe,fe]=e.useState(!1),pe=e.useCallback((e=>{if(oe&&r(n())){e.preventDefault();const t=o(J);if(i(t))return t.remove(),!0}return!1}),[oe,J]),je=e.useCallback((e=>{const t=n(),a=ne.current;if(oe&&r(t)&&1===t.getNodes().length){if(te)return l(null),e.preventDefault(),ae.focus(),!0;if(null!==a&&a!==document.activeElement)return e.preventDefault(),a.focus(),!0}return!1}),[ae,oe,te]),we=e.useCallback((e=>(ve.current===ae||ne.current===e.target)&&(l(null),ue.update((()=>{ie(!0);const e=ue.getRootElement();null!==e&&e.focus()})),!0)),[ae,ue,ie]),Ce=e.useCallback((e=>{const t=e;return!!de||t.target===re.current&&(t.shiftKey?ie(!oe):(le(),ie(!0)),!0)}),[de,oe,ie,le]),Ee=e.useCallback((e=>{ue.getEditorState().read((()=>{const t=n();"IMG"===e.target.tagName&&d(t)&&1===t.getNodes().length&&ue.dispatchCommand(O,e)}))}),[ue]);e.useEffect((()=>{let e=!0;const t=ue.getRootElement(),a=c(ue.registerUpdateListener((({editorState:t})=>{e&&ge(t.read((()=>n())))})),ue.registerCommand(p,((e,t)=>(ve.current=t,!1)),u),ue.registerCommand(f,Ce,u),ue.registerCommand(O,Ce,u),ue.registerCommand(x,(e=>e.target===re.current&&(e.preventDefault(),!0)),u),ue.registerCommand(v,pe,u),ue.registerCommand(g,pe,u),ue.registerCommand(m,je,u),ue.registerCommand(h,we,u));return null==t||t.addEventListener("contextmenu",Ee),()=>{e=!1,a(),null==t||t.removeEventListener("contextmenu",Ee)}}),[le,ue,de,oe,J,pe,je,we,Ce,Ee,ie]);const{historyState:be}=j(),{settings:{showNestedEditorTreeView:Ne}}=w(),Re=oe&&r(me)&&!de,Se=oe||de;return C.jsx(e.Suspense,{fallback:null,children:C.jsxs(C.Fragment,{children:[C.jsx("div",{draggable:Re,children:xe?C.jsx(X,{}):C.jsx(Q,{className:Se?"focused "+(r(me)?"draggable":""):null,src:U,altText:q,imageRef:re,width:Y,height:Z,maxWidth:$,onError:()=>fe(!0)})}),te&&C.jsx("div",{className:"image-caption-container",children:C.jsxs(F,{initialEditor:ae,initialNodes:[E,b,N,R,S,y,V,z],children:[C.jsx(H,{}),C.jsx(k,{}),C.jsx(I,{}),C.jsx(W,{}),C.jsx(T,{}),C.jsx(D,{}),he?C.jsx(G,{id:ae.getKey(),providerFactory:L,shouldBootstrap:!0}):C.jsx(M,{externalHistoryState:be}),C.jsx(_,{contentEditable:C.jsx(A,{placeholder:"Enter a caption...",placeholderClassName:"ImageNode__placeholder",className:"ImageNode__contentEditable"}),ErrorBoundary:B}),!0===Ne?C.jsx(K,{}):null]})}),ee&&r(me)&&Se&&C.jsx(P,{showCaption:te,setShowCaption:()=>{ue.update((()=>{const e=o(J);i(e)&&e.setShowCaption(!0)}))},editor:ue,buttonRef:ne,imageRef:re,maxWidth:$,onResizeStart:()=>{ce(!0)},onResizeEnd:(e,t)=>{setTimeout((()=>{ce(!1)}),200),ue.update((()=>{const a=o(J);i(a)&&a.setWidthAndHeight(e,t)}))},captionsEnabled:!xe&&se})]})})}export{O as RIGHT_CLICK_IMAGE_COMMAND,Y as default};