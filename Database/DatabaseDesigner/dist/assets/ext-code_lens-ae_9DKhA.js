import{g as D}from"./index-Wwh301DR.js";function I(v,y){for(var i=0;i<y.length;i++){const r=y[i];if(typeof r!="string"&&!Array.isArray(r)){for(const g in r)if(g!=="default"&&!(g in v)){const h=Object.getOwnPropertyDescriptor(r,g);h&&Object.defineProperty(v,g,h.get?h:{enumerable:!0,get:()=>r[g]})}}}return Object.freeze(Object.defineProperty(v,Symbol.toStringTag,{value:"Module"}))}var H={exports:{}};(function(v,y){ace.define("ace/ext/code_lens",["require","exports","module","ace/line_widgets","ace/lib/event","ace/lib/lang","ace/lib/dom","ace/editor","ace/config"],function(i,r,g){var h=i("../line_widgets").LineWidgets,T=i("../lib/event"),k=i("../lib/lang"),C=i("../lib/dom");function N(e){var t=e.$textLayer,n=t.$lenses;n&&n.forEach(function(o){o.remove()}),t.$lenses=null}function b(e,t){var n=e&t.CHANGE_LINES||e&t.CHANGE_FULL||e&t.CHANGE_SCROLL||e&t.CHANGE_TEXT;if(n){var o=t.session,s=t.session.lineWidgets,p=t.$textLayer,a=p.$lenses;if(!s){a&&N(t);return}var L=t.$textLayer.$lines.cells,l=t.layerConfig,x=t.$padding;a||(a=p.$lenses=[]);for(var d=0,$=0;$<L.length;$++){var f=L[$].row,m=s[f],_=m&&m.lenses;if(!(!_||!_.length)){var c=a[d];c||(c=a[d]=C.buildDom(["div",{class:"ace_codeLens"}],t.container)),c.style.height=l.lineHeight+"px",d++;for(var u=0;u<_.length;u++){var w=c.childNodes[2*u];w||(u!=0&&c.appendChild(C.createTextNode(" | ")),w=C.buildDom(["a"],c)),w.textContent=_[u].title,w.lensCommand=_[u]}for(;c.childNodes.length>2*u-1;)c.lastChild.remove();var R=t.$cursorLayer.getPixelPosition({row:f,column:0},!0).top-l.lineHeight*m.rowsAbove-l.offset;c.style.top=R+"px";var W=t.gutterWidth,E=o.getLine(f).search(/\S|$/);E==-1&&(E=0),W+=E*l.characterWidth,c.style.paddingLeft=x+W+"px"}}for(;d<a.length;)a.pop().remove()}}function S(e){if(e.lineWidgets){var t=e.widgetManager;e.lineWidgets.forEach(function(n){n&&n.lenses&&t.removeLineWidget(n)})}}r.setLenses=function(e,t){var n=Number.MAX_VALUE;return S(e),t&&t.forEach(function(o){var s=o.start.row,p=o.start.column,a=e.lineWidgets&&e.lineWidgets[s];(!a||!a.lenses)&&(a=e.widgetManager.$registerLineWidget({rowCount:1,rowsAbove:1,row:s,column:p,lenses:[]})),a.lenses.push(o.command),s<n&&(n=s)}),e._emit("changeFold",{data:{start:{row:n}}}),n};function A(e){e.codeLensProviders=[],e.renderer.on("afterRender",b),e.$codeLensClickHandler||(e.$codeLensClickHandler=function(n){var o=n.target.lensCommand;o&&(e.execCommand(o.id,o.arguments),e._emit("codeLensClick",n))},T.addListener(e.container,"click",e.$codeLensClickHandler,e)),e.$updateLenses=function(){var n=e.session;if(!n)return;n.widgetManager||(n.widgetManager=new h(n),n.widgetManager.attach(e));var o=e.codeLensProviders.length,s=[];e.codeLensProviders.forEach(function(a){a.provideCodeLenses(n,function(L,l){L||(l.forEach(function(x){s.push(x)}),o--,o==0&&p())})});function p(){var a=n.selection.cursor,L=n.documentToScreenRow(a),l=n.getScrollTop(),x=r.setLenses(n,s),d=n.$undoManager&&n.$undoManager.$lastDelta;if(!(d&&d.action=="remove"&&d.lines.length>1)){var $=n.documentToScreenRow(a),f=e.renderer.layerConfig.lineHeight,m=n.getScrollTop()+($-L)*f;x==0&&l<f/4&&l>-f/4&&(m=-f),n.setScrollTop(m)}}};var t=k.delayedCall(e.$updateLenses);e.$updateLensesOnInput=function(){t.delay(250)},e.on("input",e.$updateLensesOnInput)}function M(e){e.off("input",e.$updateLensesOnInput),e.renderer.off("afterRender",b),e.$codeLensClickHandler&&e.container.removeEventListener("click",e.$codeLensClickHandler)}r.registerCodeLensProvider=function(e,t){e.setOption("enableCodeLens",!0),e.codeLensProviders.push(t),e.$updateLensesOnInput()},r.clear=function(e){r.setLenses(e,null)};var P=i("../editor").Editor;i("../config").defineOptions(P.prototype,"editor",{enableCodeLens:{set:function(e){e?A(this):M(this)}}}),C.importCssString(`
.ace_codeLens {
    position: absolute;
    color: #aaa;
    font-size: 88%;
    background: inherit;
    width: 100%;
    display: flex;
    align-items: flex-end;
    pointer-events: none;
}
.ace_codeLens > a {
    cursor: pointer;
    pointer-events: auto;
}
.ace_codeLens > a:hover {
    color: #0000ff;
    text-decoration: underline;
}
.ace_dark > .ace_codeLens > a:hover {
    color: #4e94ce;
}
`,"codelense.css",!1)}),function(){ace.require(["ace/ext/code_lens"],function(i){v&&(v.exports=i)})}()})(H);var O=H.exports;const F=D(O),z=I({__proto__:null,default:F},[O]);export{z as e};
