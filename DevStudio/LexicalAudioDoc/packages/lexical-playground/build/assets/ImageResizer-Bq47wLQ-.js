import{r as e,j as t,a3 as r}from"./main-zXAllzd6.js";function i(e,t,r){return Math.min(Math.max(e,t),r)}const n=1,s=8,o=2,a=4;function c({onResizeStart:c,onResizeEnd:l,buttonRef:u,imageRef:d,maxWidth:m,editor:g,showCaption:h,setShowCaption:p,captionsEnabled:y}){const w=e.useRef(null),z=e.useRef({priority:"",value:"default"}),f=e.useRef({currentHeight:0,currentWidth:0,direction:0,isResizing:!1,ratio:0,startHeight:0,startWidth:0,startX:0,startY:0}),v=g.getRootElement(),x=m||(null!==v?v.getBoundingClientRect().width-20:100),b=null!==v?v.getBoundingClientRect().height-20:100,P=(e,t)=>{if(!g.isEditable())return;const i=d.current,l=w.current;if(null!==i&&null!==l){e.preventDefault();const{width:u,height:d}=i.getBoundingClientRect(),m=r(i),g=f.current;g.startWidth=u,g.startHeight=d,g.ratio=u/d,g.currentWidth=u,g.currentHeight=d,g.startX=e.clientX/m,g.startY=e.clientY/m,g.isResizing=!0,g.direction=t,(e=>{const t=e===n||e===a?"ew":e===s||e===o?"ns":e&s&&e&a||e&o&&e&n?"nwse":"nesw";null!==v&&v.style.setProperty("cursor",`${t}-resize`,"important"),null!==document.body&&(document.body.style.setProperty("cursor",`${t}-resize`,"important"),z.current.value=document.body.style.getPropertyValue("-webkit-user-select"),z.current.priority=document.body.style.getPropertyPriority("-webkit-user-select"),document.body.style.setProperty("-webkit-user-select","none","important"))})(t),c(),l.classList.add("image-control-wrapper--resizing"),i.style.height=`${d}px`,i.style.width=`${u}px`,document.addEventListener("pointermove",R),document.addEventListener("pointerup",j)}},R=e=>{const t=d.current,c=f.current,l=c.direction&(n|a),u=c.direction&(o|s);if(null!==t&&c.isResizing){const s=r(t);if(l&&u){let r=Math.floor(c.startX-e.clientX/s);r=c.direction&n?-r:r;const o=i(c.startWidth+r,100,x),a=o/c.ratio;t.style.width=`${o}px`,t.style.height=`${a}px`,c.currentHeight=a,c.currentWidth=o}else if(u){let r=Math.floor(c.startY-e.clientY/s);r=c.direction&o?-r:r;const n=i(c.startHeight+r,100,b);t.style.height=`${n}px`,c.currentHeight=n}else{let r=Math.floor(c.startX-e.clientX/s);r=c.direction&n?-r:r;const o=i(c.startWidth+r,100,x);t.style.width=`${o}px`,c.currentWidth=o}}},j=()=>{const e=d.current,t=f.current,r=w.current;if(null!==e&&null!==r&&t.isResizing){const e=t.currentWidth,i=t.currentHeight;t.startWidth=0,t.startHeight=0,t.ratio=0,t.startX=0,t.startY=0,t.currentWidth=0,t.currentHeight=0,t.isResizing=!1,r.classList.remove("image-control-wrapper--resizing"),null!==v&&v.style.setProperty("cursor","text"),null!==document.body&&(document.body.style.setProperty("cursor","default"),document.body.style.setProperty("-webkit-user-select",z.current.value,z.current.priority)),l(e,i),document.removeEventListener("pointermove",R),document.removeEventListener("pointerup",j)}};return t.jsxs("div",{ref:w,children:[!h&&y&&t.jsx("button",{className:"image-caption-button",ref:u,onClick:()=>{p(!h)},children:"Add Caption"}),t.jsx("div",{className:"image-resizer image-resizer-n",onPointerDown:e=>{P(e,s)}}),t.jsx("div",{className:"image-resizer image-resizer-ne",onPointerDown:e=>{P(e,s|n)}}),t.jsx("div",{className:"image-resizer image-resizer-e",onPointerDown:e=>{P(e,n)}}),t.jsx("div",{className:"image-resizer image-resizer-se",onPointerDown:e=>{P(e,o|n)}}),t.jsx("div",{className:"image-resizer image-resizer-s",onPointerDown:e=>{P(e,o)}}),t.jsx("div",{className:"image-resizer image-resizer-sw",onPointerDown:e=>{P(e,o|a)}}),t.jsx("div",{className:"image-resizer image-resizer-w",onPointerDown:e=>{P(e,a)}}),t.jsx("div",{className:"image-resizer image-resizer-nw",onPointerDown:e=>{P(e,s|a)}})]})}export{c as I};