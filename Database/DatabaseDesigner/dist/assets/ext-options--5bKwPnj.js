import{g as O}from"./index-Wwh301DR.js";function E(x,L){for(var i=0;i<L.length;i++){const c=L[i];if(typeof c!="string"&&!Array.isArray(c)){for(const u in c)if(u!=="default"&&!(u in x)){const l=Object.getOwnPropertyDescriptor(c,u);l&&Object.defineProperty(x,u,l.get?l:{enumerable:!0,get:()=>c[u]})}}}return Object.freeze(Object.defineProperty(x,Symbol.toStringTag,{value:"Module"}))}var w={exports:{}};(function(x,L){ace.define("ace/ext/menu_tools/settings_menu.css",["require","exports","module"],function(i,c,u){u.exports=`#ace_settingsmenu, #kbshortcutmenu {
    background-color: #F7F7F7;
    color: black;
    box-shadow: -5px 4px 5px rgba(126, 126, 126, 0.55);
    padding: 1em 0.5em 2em 1em;
    overflow: auto;
    position: absolute;
    margin: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 9991;
    cursor: default;
}

.ace_dark #ace_settingsmenu, .ace_dark #kbshortcutmenu {
    box-shadow: -20px 10px 25px rgba(126, 126, 126, 0.25);
    background-color: rgba(255, 255, 255, 0.6);
    color: black;
}

.ace_optionsMenuEntry:hover {
    background-color: rgba(100, 100, 100, 0.1);
    transition: all 0.3s
}

.ace_closeButton {
    background: rgba(245, 146, 146, 0.5);
    border: 1px solid #F48A8A;
    border-radius: 50%;
    padding: 7px;
    position: absolute;
    right: -8px;
    top: -8px;
    z-index: 100000;
}
.ace_closeButton{
    background: rgba(245, 146, 146, 0.9);
}
.ace_optionsMenuKey {
    color: darkslateblue;
    font-weight: bold;
}
.ace_optionsMenuCommand {
    color: darkcyan;
    font-weight: normal;
}
.ace_optionsMenuEntry input, .ace_optionsMenuEntry button {
    vertical-align: middle;
}

.ace_optionsMenuEntry button[ace_selected_button=true] {
    background: #e7e7e7;
    box-shadow: 1px 0px 2px 0px #adadad inset;
    border-color: #adadad;
}
.ace_optionsMenuEntry button {
    background: white;
    border: 1px solid lightgray;
    margin: 0px;
}
.ace_optionsMenuEntry button:hover{
    background: #f0f0f0;
}`}),ace.define("ace/ext/menu_tools/overlay_page",["require","exports","module","ace/lib/dom","ace/ext/menu_tools/settings_menu.css"],function(i,c,u){var l=i("../../lib/dom"),d=i("./settings_menu.css");l.importCssString(d,"settings_menu.css",!1),u.exports.overlayPage=function(p,v,g){var s=document.createElement("div"),k=!1;function S(a){a.keyCode===27&&m()}function m(){s&&(document.removeEventListener("keydown",S),s.parentNode.removeChild(s),p&&p.focus(),s=null,g&&g())}function y(a){k=a,a&&(s.style.pointerEvents="none",v.style.pointerEvents="auto")}return s.style.cssText="margin: 0; padding: 0; position: fixed; top:0; bottom:0; left:0; right:0;z-index: 9990; "+(p?"background-color: rgba(0, 0, 0, 0.3);":""),s.addEventListener("click",function(a){k||m()}),document.addEventListener("keydown",S),v.addEventListener("click",function(a){a.stopPropagation()}),s.appendChild(v),document.body.appendChild(s),p&&p.blur(),{close:m,setIgnoreFocusOut:y}}}),ace.define("ace/ext/modelist",["require","exports","module"],function(i,c,u){var l=[];function d(a){for(var t=g.text,e=a.split(/[\/\\]/).pop(),r=0;r<l.length;r++)if(l[r].supportsFile(e)){t=l[r];break}return t}var b=function(){function a(t,e,r){this.name=t,this.caption=e,this.mode="ace/mode/"+t,this.extensions=r;var o;/\^/.test(r)?o=r.replace(/\|(\^)?/g,function(f,_){return"$|"+(_?"^":"^.*\\.")})+"$":o="^.*\\.("+r+")$",this.extRe=new RegExp(o,"gi")}return a.prototype.supportsFile=function(t){return t.match(this.extRe)},a}(),p={ABAP:["abap"],ABC:["abc"],ActionScript:["as"],ADA:["ada|adb"],Alda:["alda"],Apache_Conf:["^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd"],Apex:["apex|cls|trigger|tgr"],AQL:["aql"],AsciiDoc:["asciidoc|adoc"],ASL:["dsl|asl|asl.json"],Assembly_x86:["asm|a"],Astro:["astro"],AutoHotKey:["ahk"],BatchFile:["bat|cmd"],BibTeX:["bib"],C_Cpp:["cpp|c|cc|cxx|h|hh|hpp|ino"],C9Search:["c9search_results"],Cirru:["cirru|cr"],Clojure:["clj|cljs"],Cobol:["CBL|COB"],coffee:["coffee|cf|cson|^Cakefile"],ColdFusion:["cfm|cfc"],Crystal:["cr"],CSharp:["cs"],Csound_Document:["csd"],Csound_Orchestra:["orc"],Csound_Score:["sco"],CSS:["css"],Curly:["curly"],Cuttlefish:["conf"],D:["d|di"],Dart:["dart"],Diff:["diff|patch"],Django:["djt|html.djt|dj.html|djhtml"],Dockerfile:["^Dockerfile"],Dot:["dot"],Drools:["drl"],Edifact:["edi"],Eiffel:["e|ge"],EJS:["ejs"],Elixir:["ex|exs"],Elm:["elm"],Erlang:["erl|hrl"],Flix:["flix"],Forth:["frt|fs|ldr|fth|4th"],Fortran:["f|f90"],FSharp:["fsi|fs|ml|mli|fsx|fsscript"],FSL:["fsl"],FTL:["ftl"],Gcode:["gcode"],Gherkin:["feature"],Gitignore:["^.gitignore"],Glsl:["glsl|frag|vert"],Gobstones:["gbs"],golang:["go"],GraphQLSchema:["gql"],Groovy:["groovy"],HAML:["haml"],Handlebars:["hbs|handlebars|tpl|mustache"],Haskell:["hs"],Haskell_Cabal:["cabal"],haXe:["hx"],Hjson:["hjson"],HTML:["html|htm|xhtml|vue|we|wpy"],HTML_Elixir:["eex|html.eex"],HTML_Ruby:["erb|rhtml|html.erb"],INI:["ini|conf|cfg|prefs"],Io:["io"],Ion:["ion"],Jack:["jack"],Jade:["jade|pug"],Java:["java"],JavaScript:["js|jsm|jsx|cjs|mjs"],JEXL:["jexl"],JSON:["json"],JSON5:["json5"],JSONiq:["jq"],JSP:["jsp"],JSSM:["jssm|jssm_state"],JSX:["jsx"],Julia:["jl"],Kotlin:["kt|kts"],LaTeX:["tex|latex|ltx|bib"],Latte:["latte"],LESS:["less"],Liquid:["liquid"],Lisp:["lisp"],LiveScript:["ls"],Log:["log"],LogiQL:["logic|lql"],Logtalk:["lgt"],LSL:["lsl"],Lua:["lua"],LuaPage:["lp"],Lucene:["lucene"],Makefile:["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],Markdown:["md|markdown"],Mask:["mask"],MATLAB:["matlab"],Maze:["mz"],MediaWiki:["wiki|mediawiki"],MEL:["mel"],MIPS:["s|asm"],MIXAL:["mixal"],MUSHCode:["mc|mush"],MySQL:["mysql"],Nasal:["nas"],Nginx:["nginx|conf"],Nim:["nim"],Nix:["nix"],NSIS:["nsi|nsh"],Nunjucks:["nunjucks|nunjs|nj|njk"],ObjectiveC:["m|mm"],OCaml:["ml|mli"],Odin:["odin"],PartiQL:["partiql|pql"],Pascal:["pas|p"],Perl:["pl|pm"],pgSQL:["pgsql"],PHP:["php|inc|phtml|shtml|php3|php4|php5|phps|phpt|aw|ctp|module"],PHP_Laravel_blade:["blade.php"],Pig:["pig"],PLSQL:["plsql"],Powershell:["ps1"],Praat:["praat|praatscript|psc|proc"],Prisma:["prisma"],Prolog:["plg|prolog"],Properties:["properties"],Protobuf:["proto"],PRQL:["prql"],Puppet:["epp|pp"],Python:["py"],QML:["qml"],R:["r"],Raku:["raku|rakumod|rakutest|p6|pl6|pm6"],Razor:["cshtml|asp"],RDoc:["Rd"],Red:["red|reds"],RHTML:["Rhtml"],Robot:["robot|resource"],RST:["rst"],Ruby:["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],Rust:["rs"],SaC:["sac"],SASS:["sass"],SCAD:["scad"],Scala:["scala|sbt"],Scheme:["scm|sm|rkt|oak|scheme"],Scrypt:["scrypt"],SCSS:["scss"],SH:["sh|bash|^.bashrc"],SJS:["sjs"],Slim:["slim|skim"],Smarty:["smarty|tpl"],Smithy:["smithy"],snippets:["snippets"],Soy_Template:["soy"],Space:["space"],SPARQL:["rq"],SQL:["sql"],SQLServer:["sqlserver"],Stylus:["styl|stylus"],SVG:["svg"],Swift:["swift"],Tcl:["tcl"],Terraform:["tf","tfvars","terragrunt"],Tex:["tex"],Text:["txt"],Textile:["textile"],Toml:["toml"],TSX:["tsx"],Turtle:["ttl"],Twig:["twig|swig"],Typescript:["ts|mts|cts|typescript|str"],Vala:["vala"],VBScript:["vbs|vb"],Velocity:["vm"],Verilog:["v|vh|sv|svh"],VHDL:["vhd|vhdl"],Visualforce:["vfp|component|page"],Wollok:["wlk|wpgm|wtest"],XML:["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml"],XQuery:["xq"],YAML:["yaml|yml"],Zeek:["zeek|bro"]},v={ObjectiveC:"Objective-C",CSharp:"C#",golang:"Go",C_Cpp:"C and C++",Csound_Document:"Csound Document",Csound_Orchestra:"Csound",Csound_Score:"Csound Score",coffee:"CoffeeScript",HTML_Ruby:"HTML (Ruby)",HTML_Elixir:"HTML (Elixir)",FTL:"FreeMarker",PHP_Laravel_blade:"PHP (Blade Template)",Perl6:"Perl 6",AutoHotKey:"AutoHotkey / AutoIt"},g={};for(var s in p){var k=p[s],S=(v[s]||s).replace(/_/g," "),m=s.toLowerCase(),y=new b(m,S,k[0]);g[m]=y,l.push(y)}u.exports={getModeForPath:d,modes:l,modesByName:g}}),ace.define("ace/ext/themelist",["require","exports","module"],function(i,c,u){var l=[["Chrome"],["Clouds"],["Crimson Editor"],["Dawn"],["Dreamweaver"],["Eclipse"],["GitHub"],["IPlastic"],["Solarized Light"],["TextMate"],["Tomorrow"],["XCode"],["Kuroir"],["KatzenMilch"],["SQL Server","sqlserver","light"],["CloudEditor","cloud_editor","light"],["Ambiance","ambiance","dark"],["Chaos","chaos","dark"],["Clouds Midnight","clouds_midnight","dark"],["Dracula","","dark"],["Cobalt","cobalt","dark"],["Gruvbox","gruvbox","dark"],["Green on Black","gob","dark"],["idle Fingers","idle_fingers","dark"],["krTheme","kr_theme","dark"],["Merbivore","merbivore","dark"],["Merbivore Soft","merbivore_soft","dark"],["Mono Industrial","mono_industrial","dark"],["Monokai","monokai","dark"],["Nord Dark","nord_dark","dark"],["One Dark","one_dark","dark"],["Pastel on dark","pastel_on_dark","dark"],["Solarized Dark","solarized_dark","dark"],["Terminal","terminal","dark"],["Tomorrow Night","tomorrow_night","dark"],["Tomorrow Night Blue","tomorrow_night_blue","dark"],["Tomorrow Night Bright","tomorrow_night_bright","dark"],["Tomorrow Night 80s","tomorrow_night_eighties","dark"],["Twilight","twilight","dark"],["Vibrant Ink","vibrant_ink","dark"],["GitHub Dark","github_dark","dark"],["CloudEditor Dark","cloud_editor_dark","dark"]];c.themesByName={},c.themes=l.map(function(d){var b=d[1]||d[0].replace(/ /g,"_").toLowerCase(),p={caption:d[0],theme:"ace/theme/"+b,isDark:d[2]=="dark",name:b};return c.themesByName[b]=p,p})}),ace.define("ace/ext/options",["require","exports","module","ace/ext/menu_tools/overlay_page","ace/lib/dom","ace/lib/oop","ace/config","ace/lib/event_emitter","ace/ext/modelist","ace/ext/themelist"],function(i,c,u){i("./menu_tools/overlay_page");var l=i("../lib/dom"),d=i("../lib/oop"),b=i("../config"),p=i("../lib/event_emitter").EventEmitter,v=l.buildDom,g=i("./modelist"),s=i("./themelist"),k={Bright:[],Dark:[]};s.themes.forEach(function(a){k[a.isDark?"Dark":"Bright"].push({caption:a.caption,value:a.theme})});var S=g.modes.map(function(a){return{caption:a.caption,value:a.mode}}),m={Main:{Mode:{path:"mode",type:"select",items:S},Theme:{path:"theme",type:"select",items:k},Keybinding:{type:"buttonBar",path:"keyboardHandler",items:[{caption:"Ace",value:null},{caption:"Vim",value:"ace/keyboard/vim"},{caption:"Emacs",value:"ace/keyboard/emacs"},{caption:"Sublime",value:"ace/keyboard/sublime"},{caption:"VSCode",value:"ace/keyboard/vscode"}]},"Font Size":{path:"fontSize",type:"number",defaultValue:12,defaults:[{caption:"12px",value:12},{caption:"24px",value:24}]},"Soft Wrap":{type:"buttonBar",path:"wrap",items:[{caption:"Off",value:"off"},{caption:"View",value:"free"},{caption:"margin",value:"printMargin"},{caption:"40",value:"40"}]},"Cursor Style":{path:"cursorStyle",items:[{caption:"Ace",value:"ace"},{caption:"Slim",value:"slim"},{caption:"Smooth",value:"smooth"},{caption:"Smooth And Slim",value:"smooth slim"},{caption:"Wide",value:"wide"}]},Folding:{path:"foldStyle",items:[{caption:"Manual",value:"manual"},{caption:"Mark begin",value:"markbegin"},{caption:"Mark begin and end",value:"markbeginend"}]},"Soft Tabs":[{path:"useSoftTabs"},{ariaLabel:"Tab Size",path:"tabSize",type:"number",values:[2,3,4,8,16]}],Overscroll:{type:"buttonBar",path:"scrollPastEnd",items:[{caption:"None",value:0},{caption:"Half",value:.5},{caption:"Full",value:1}]}},More:{"Atomic soft tabs":{path:"navigateWithinSoftTabs"},"Enable Behaviours":{path:"behavioursEnabled"},"Wrap with quotes":{path:"wrapBehavioursEnabled"},"Enable Auto Indent":{path:"enableAutoIndent"},"Full Line Selection":{type:"checkbox",values:"text|line",path:"selectionStyle"},"Highlight Active Line":{path:"highlightActiveLine"},"Show Invisibles":{path:"showInvisibles"},"Show Indent Guides":{path:"displayIndentGuides"},"Highlight Indent Guides":{path:"highlightIndentGuides"},"Persistent HScrollbar":{path:"hScrollBarAlwaysVisible"},"Persistent VScrollbar":{path:"vScrollBarAlwaysVisible"},"Animate scrolling":{path:"animatedScroll"},"Show Gutter":{path:"showGutter"},"Show Line Numbers":{path:"showLineNumbers"},"Relative Line Numbers":{path:"relativeLineNumbers"},"Fixed Gutter Width":{path:"fixedWidthGutter"},"Show Print Margin":[{path:"showPrintMargin"},{ariaLabel:"Print Margin",type:"number",path:"printMarginColumn"}],"Indented Soft Wrap":{path:"indentedSoftWrap"},"Highlight selected word":{path:"highlightSelectedWord"},"Fade Fold Widgets":{path:"fadeFoldWidgets"},"Use textarea for IME":{path:"useTextareaForIME"},"Merge Undo Deltas":{path:"mergeUndoDeltas",items:[{caption:"Always",value:"always"},{caption:"Never",value:"false"},{caption:"Timed",value:"true"}]},"Elastic Tabstops":{path:"useElasticTabstops"},"Incremental Search":{path:"useIncrementalSearch"},"Read-only":{path:"readOnly"},"Copy without selection":{path:"copyWithEmptySelection"},"Live Autocompletion":{path:"enableLiveAutocompletion"},"Custom scrollbar":{path:"customScrollbar"},"Use SVG gutter icons":{path:"useSvgGutterIcons"},"Annotations for folded lines":{path:"showFoldedAnnotations"},"Keyboard Accessibility Mode":{path:"enableKeyboardAccessibility"},"Gutter tooltip follows mouse":{path:"tooltipFollowsMouse",defaultValue:!0}}},y=function(){function a(t,e){this.editor=t,this.container=e||document.createElement("div"),this.groups=[],this.options={}}return a.prototype.add=function(t){t.Main&&d.mixin(m.Main,t.Main),t.More&&d.mixin(m.More,t.More)},a.prototype.render=function(){this.container.innerHTML="",v(["table",{role:"presentation",id:"controls"},this.renderOptionGroup(m.Main),["tr",null,["td",{colspan:2},["table",{role:"presentation",id:"more-controls"},this.renderOptionGroup(m.More)]]],["tr",null,["td",{colspan:2},"version "+b.version]]],this.container)},a.prototype.renderOptionGroup=function(t){return Object.keys(t).map(function(e,r){var o=t[e];return o.position||(o.position=r/1e4),o.label||(o.label=e),o}).sort(function(e,r){return e.position-r.position}).map(function(e){return this.renderOption(e.label,e)},this)},a.prototype.renderOptionControl=function(t,e){var r=this;if(Array.isArray(e))return e.map(function(n){return r.renderOptionControl(t,n)});var o,f=r.getOption(e);if(e.values&&e.type!="checkbox"&&(typeof e.values=="string"&&(e.values=e.values.split("|")),e.items=e.values.map(function(n){return{value:n,name:n}})),e.type=="buttonBar")o=["div",{role:"group","aria-labelledby":e.path+"-label"},e.items.map(function(n){return["button",{value:n.value,ace_selected_button:f==n.value,"aria-pressed":f==n.value,onclick:function(){r.setOption(e,n.value);for(var h=this.parentNode.querySelectorAll("[ace_selected_button]"),M=0;M<h.length;M++)h[M].removeAttribute("ace_selected_button"),h[M].setAttribute("aria-pressed",!1);this.setAttribute("ace_selected_button",!0),this.setAttribute("aria-pressed",!0)}},n.desc||n.caption||n.name]})];else if(e.type=="number")o=["input",{type:"number",value:f||e.defaultValue,style:"width:3em",oninput:function(){r.setOption(e,parseInt(this.value))}}],e.ariaLabel?o[1]["aria-label"]=e.ariaLabel:o[1].id=t,e.defaults&&(o=[o,e.defaults.map(function(n){return["button",{onclick:function(){var h=this.parentNode.firstChild;h.value=n.value,h.oninput()}},n.caption]})]);else if(e.items){var _=function(n){return n.map(function(h){return["option",{value:h.value||h.name},h.desc||h.caption||h.name]})},A=Array.isArray(e.items)?_(e.items):Object.keys(e.items).map(function(n){return["optgroup",{label:n},_(e.items[n])]});o=["select",{id:t,value:f,onchange:function(){r.setOption(e,this.value)}},A]}else typeof e.values=="string"&&(e.values=e.values.split("|")),e.values&&(f=f==e.values[1]),o=["input",{type:"checkbox",id:t,checked:f||null,onchange:function(){var n=this.checked;e.values&&(n=e.values[n?1:0]),r.setOption(e,n)}}],e.type=="checkedNumber"&&(o=[o,[]]);return o},a.prototype.renderOption=function(t,e){if(!(e.path&&!e.onchange&&!this.editor.$options[e.path])){var r=Array.isArray(e)?e[0].path:e.path;this.options[r]=e;var o="-"+r,f=r+"-label",_=this.renderOptionControl(o,e);return["tr",{class:"ace_optionsMenuEntry"},["td",["label",{for:o,id:f},t]],["td",_]]}},a.prototype.setOption=function(t,e){typeof t=="string"&&(t=this.options[t]),e=="false"&&(e=!1),e=="true"&&(e=!0),e=="null"&&(e=null),e=="undefined"&&(e=void 0),typeof e=="string"&&parseFloat(e).toString()==e&&(e=parseFloat(e)),t.onchange?t.onchange(e):t.path&&this.editor.setOption(t.path,e),this._signal("setOption",{name:t.path,value:e})},a.prototype.getOption=function(t){return t.getValue?t.getValue():this.editor.getOption(t.path)},a}();d.implement(y.prototype,p),c.OptionPanel=y}),function(){ace.require(["ace/ext/options"],function(i){x&&(x.exports=i)})}()})(w);var C=w.exports;const P=O(C),j=E({__proto__:null,default:P},[C]);export{j as e};