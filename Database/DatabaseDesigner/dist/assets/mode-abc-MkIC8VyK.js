import{g as R}from"./index-Wwh301DR.js";function M(u,v){for(var o=0;o<v.length;o++){const a=v[o];if(typeof a!="string"&&!Array.isArray(a)){for(const m in a)if(m!=="default"&&!(m in u)){const d=Object.getOwnPropertyDescriptor(a,m);d&&Object.defineProperty(u,m,d.get?d:{enumerable:!0,get:()=>a[m]})}}}return Object.freeze(Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}))}var x={exports:{}};(function(u,v){ace.define("ace/mode/abc_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(o,a,m){var d=o("../lib/oop"),h=o("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{token:["zupfnoter.information.comment.line.percentage","information.keyword","in formation.keyword.embedded"],regex:"(%%%%)(hn\\.[a-z]*)(.*)",comment:"Instruction Comment"},{token:["information.comment.line.percentage","information.keyword.embedded"],regex:"(%%)(.*)",comment:"Instruction Comment"},{token:"comment.line.percentage",regex:"%.*",comment:"Comments"},{token:"barline.keyword.operator",regex:"[\\[:]*[|:][|\\]:]*(?:\\[?[0-9]+)?|\\[[0-9]+",comment:"Bar lines"},{token:["information.keyword.embedded","information.argument.string.unquoted"],regex:"(\\[[A-Za-z]:)([^\\]]*\\])",comment:"embedded Header lines"},{token:["information.keyword","information.argument.string.unquoted"],regex:"^([A-Za-z]:)([^%\\\\]*)",comment:"Header lines"},{token:["text","entity.name.function","string.unquoted","text"],regex:"(\\[)([A-Z]:)(.*?)(\\])",comment:"Inline fields"},{token:["accent.constant.language","pitch.constant.numeric","duration.constant.numeric"],regex:"([\\^=_]*)([A-Ga-gz][,']*)([0-9]*/*[><0-9]*)",comment:"Notes"},{token:"zupfnoter.jumptarget.string.quoted",regex:'[\\"!]\\^\\:.*?[\\"!]',comment:"Zupfnoter jumptarget"},{token:"zupfnoter.goto.string.quoted",regex:'[\\"!]\\^\\@.*?[\\"!]',comment:"Zupfnoter goto"},{token:"zupfnoter.annotation.string.quoted",regex:'[\\"!]\\^\\!.*?[\\"!]',comment:"Zupfnoter annoation"},{token:"zupfnoter.annotationref.string.quoted",regex:'[\\"!]\\^\\#.*?[\\"!]',comment:"Zupfnoter annotation reference"},{token:"chordname.string.quoted",regex:'[\\"!]\\^.*?[\\"!]',comment:"abc chord"},{token:"string.quoted",regex:'[\\"!].*?[\\"!]',comment:"abc annotation"}]},this.normalizeRules()};s.metaData={fileTypes:["abc"],name:"ABC",scopeName:"text.abcnotation"},d.inherits(s,h),a.ABCHighlightRules=s}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(o,a,m){var d=o("../../lib/oop"),h=o("../../range").Range,s=o("./fold_mode").FoldMode,k=a.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};d.inherits(k,s),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var l=e.getLine(n);if(this.singleLineBlockCommentRe.test(l)&&!this.startRegionRe.test(l)&&!this.tripleStarBlockCommentRe.test(l))return"";var r=this._getFoldWidgetBase(e,t,n);return!r&&this.startRegionRe.test(l)?"start":r},this.getFoldWidgetRange=function(e,t,n,l){var r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);var i=r.match(this.foldingStartMarker);if(i){var c=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,c);var g=e.getCommentFoldRange(n,c+i[0].length,1);return g&&!g.isMultiLine()&&(l?g=this.getSectionRange(e,n):t!="all"&&(g=null)),g}if(t!=="markbegin"){var i=r.match(this.foldingStopMarker);if(i){var c=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,c):e.getCommentFoldRange(n,c,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),l=n.search(/\S/),r=t,c=n.length;t=t+1;for(var g=t,i=e.getLength();++t<i;){n=e.getLine(t);var p=n.search(/\S/);if(p!==-1){if(l>p)break;var f=this.getFoldWidgetRange(e,"all",t);if(f){if(f.start.row<=r)break;if(f.isMultiLine())t=f.end.row;else if(l==p)break}g=t}}return new h(r,c,g,e.getLine(g).length)},this.getCommentRegionBlock=function(e,t,n){for(var l=t.search(/\s*$/),r=e.getLength(),c=n,g=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,i=1;++n<r;){t=e.getLine(n);var p=g.exec(t);if(p&&(p[1]?i--:i++,!i))break}var f=n;if(f>c)return new h(c,l,f,t.length)}}).call(k.prototype)}),ace.define("ace/mode/abc",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/abc_highlight_rules","ace/mode/folding/cstyle"],function(o,a,m){var d=o("../lib/oop"),h=o("./text").Mode,s=o("./abc_highlight_rules").ABCHighlightRules,k=o("./folding/cstyle").FoldMode,e=function(){this.HighlightRules=s,this.foldingRules=new k,this.$behaviour=this.$defaultBehaviour};d.inherits(e,h),(function(){this.lineCommentStart="%",this.$id="ace/mode/abc",this.snippetFileId="ace/snippets/abc"}).call(e.prototype),a.Mode=e}),function(){ace.require(["ace/mode/abc"],function(o){u&&(u.exports=o)})}()})(x);var b=x.exports;const B=R(b),_=M({__proto__:null,default:B},[b]);export{_ as m};