import{g as O}from"./index-Wwh301DR.js";function B(k,_){for(var l=0;l<_.length;l++){const d=_[l];if(typeof d!="string"&&!Array.isArray(d)){for(const v in d)if(v!=="default"&&!(v in k)){const g=Object.getOwnPropertyDescriptor(d,v);g&&Object.defineProperty(k,v,g.get?g:{enumerable:!0,get:()=>d[v]})}}}return Object.freeze(Object.defineProperty(k,Symbol.toStringTag,{value:"Module"}))}var R={exports:{}};(function(k,_){ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(l,d,v){var g=l("../lib/oop"),f=l("./text_highlight_rules").TextHighlightRules,u=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},u.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};g.inherits(u,f),u.getTagRule=function(s){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},u.getStartRule=function(s){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:s}},u.getEndRule=function(s){return{token:"comment.doc",regex:"\\*\\/",next:s}},d.DocCommentHighlightRules=u}),ace.define("ace/mode/odin_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(l,d,v){var g=this&&this.__read||function(t,e){var o=typeof Symbol=="function"&&t[Symbol.iterator];if(!o)return t;var a=o.call(t),c,n=[],h;try{for(;(e===void 0||e-- >0)&&!(c=a.next()).done;)n.push(c.value)}catch(m){h={error:m}}finally{try{c&&!c.done&&(o=a.return)&&o.call(a)}finally{if(h)throw h.error}}return n},f=this&&this.__spreadArray||function(t,e,o){if(o||arguments.length===2)for(var a=0,c=e.length,n;a<c;a++)(n||!(a in e))&&(n||(n=Array.prototype.slice.call(e,0,a)),n[a]=e[a]);return t.concat(n||Array.prototype.slice.call(e))},u=l("../lib/oop"),s=l("./doc_comment_highlight_rules").DocCommentHighlightRules,i=l("./text_highlight_rules").TextHighlightRules,r=function(){var t="using|transmute|cast|distinct|opaque|where|struct|enum|union|bit_field|bit_set|if|when|else|do|switch|case|break|fallthrough|size_of|offset_of|type_info_if|typeid_of|type_of|align_of|or_return|or_else|inline|no_inline|import|package|foreign|defer|auto_cast|map|matrix|proc|for|continue|not_in|in",e=function(){for(var p=[],x=0;x<arguments.length;x++)p[x]=arguments[x];return p.reduce(function(b,M){return b.flatMap(function($){return M.map(function(F){return[$,F].flat()})})}).map(function(b){return b.join("")})},o=f(f(f(f(["int","uint","uintptr","typeid","rawptr","string","cstring","i8","u8","any","byte","rune","bool","b8","b16","b32","b64"],g(e(["i","u"],["16","32","64","128"],["","le","be"])),!1),g(e(["f"],["16","32","64"],["","le","be"])),!1),g(e(["complex"],["32","64","128"])),!1),g(e(["quaternion"],["64","128","256"])),!1).join("|"),a=["\\*","/","%","%%","<<",">>","&","&~","\\+","\\-","~","\\|",">","<","<=",">=","==","!="].concat(":").map(function(p){return p+"="}).concat("=",":=","::","->","\\^","&",":").join("|"),c="new|cap|copy|panic|len|make|delete|append|free",n="nil|true|false",h=this.createKeywordMapper({keyword:t,"constant.language":n,"support.function":c,"support.type":o},""),m=`\\\\(?:[0-7]{3}|x\\h{2}|u{4}|U\\h{6}|[abfnrtv'"\\\\])`.replace(/\\h/g,"[a-fA-F\\d]");this.$rules={start:[{token:"comment",regex:/\/\/.*$/},s.getStartRule("doc-start"),{token:"comment.start",regex:"\\/\\*",next:"comment"},{token:"string",regex:/"(?:[^"\\]|\\.)*?"/},{token:"string",regex:"`",next:"bqstring"},{token:"support.constant",regex:/#[a-z_]+/},{token:"constant.numeric",regex:"'(?:[^\\'\uD800-\uDBFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|"+m.replace('"',"")+")'"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:["entity.name.function","text","keyword.operator","text","keyword"],regex:"([a-zA-Z_$][a-zA-Z0-9_$]*)(\\s+)(::)(\\s+)(proc)\\b"},{token:function(p){return p[p.length-1]=="("?[{type:h(p.slice(0,-1))||"support.function",value:p.slice(0,-1)},{type:"paren.lparen",value:p.slice(-1)}]:h(p)||"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b\\(?"},{token:"keyword.operator",regex:a},{token:"punctuation.operator",regex:"\\?|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment.end",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],bqstring:[{token:"string",regex:"`",next:"start"},{defaultToken:"string"}]},this.embedRules(s,"doc-",[s.getEndRule("start")])};u.inherits(r,i),d.OdinHighlightRules=r}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(l,d,v){var g=l("../range").Range,f=function(){};(function(){this.checkOutdent=function(u,s){return/^\s+$/.test(u)?/^\s*\}/.test(s):!1},this.autoOutdent=function(u,s){var i=u.getLine(s),r=i.match(/^(\s*\})/);if(!r)return 0;var t=r[1].length,e=u.findMatchingBracket({row:s,column:t});if(!e||e.row==s)return 0;var o=this.$getIndent(u.getLine(e.row));u.replace(new g(s,0,s,t-1),o)},this.$getIndent=function(u){return u.match(/^\s*/)[0]}}).call(f.prototype),d.MatchingBraceOutdent=f}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(l,d,v){var g=l("../../lib/oop"),f=l("../../range").Range,u=l("./fold_mode").FoldMode,s=d.FoldMode=function(i){i&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+i.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+i.end)))};g.inherits(s,u),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(i,r,t){var e=i.getLine(t);if(this.singleLineBlockCommentRe.test(e)&&!this.startRegionRe.test(e)&&!this.tripleStarBlockCommentRe.test(e))return"";var o=this._getFoldWidgetBase(i,r,t);return!o&&this.startRegionRe.test(e)?"start":o},this.getFoldWidgetRange=function(i,r,t,e){var o=i.getLine(t);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(i,o,t);var n=o.match(this.foldingStartMarker);if(n){var a=n.index;if(n[1])return this.openingBracketBlock(i,n[1],t,a);var c=i.getCommentFoldRange(t,a+n[0].length,1);return c&&!c.isMultiLine()&&(e?c=this.getSectionRange(i,t):r!="all"&&(c=null)),c}if(r!=="markbegin"){var n=o.match(this.foldingStopMarker);if(n){var a=n.index+n[0].length;return n[1]?this.closingBracketBlock(i,n[1],t,a):i.getCommentFoldRange(t,a,-1)}}},this.getSectionRange=function(i,r){var t=i.getLine(r),e=t.search(/\S/),o=r,a=t.length;r=r+1;for(var c=r,n=i.getLength();++r<n;){t=i.getLine(r);var h=t.search(/\S/);if(h!==-1){if(e>h)break;var m=this.getFoldWidgetRange(i,"all",r);if(m){if(m.start.row<=o)break;if(m.isMultiLine())r=m.end.row;else if(e==h)break}c=r}}return new f(o,a,c,i.getLine(c).length)},this.getCommentRegionBlock=function(i,r,t){for(var e=r.search(/\s*$/),o=i.getLength(),a=t,c=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,n=1;++t<o;){r=i.getLine(t);var h=c.exec(r);if(h&&(h[1]?n--:n++,!n))break}var m=t;if(m>a)return new f(a,e,m,r.length)}}).call(s.prototype)}),ace.define("ace/mode/odin",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/odin_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle"],function(l,d,v){var g=l("../lib/oop"),f=l("./text").Mode,u=l("./odin_highlight_rules").OdinHighlightRules,s=l("./matching_brace_outdent").MatchingBraceOutdent,i=l("./folding/cstyle").FoldMode,r=function(){this.HighlightRules=u,this.$outdent=new s,this.foldingRules=new i,this.$behaviour=this.$defaultBehaviour};g.inherits(r,f),(function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(t,e,o){var a=this.$getIndent(e),c=this.getTokenizer().getLineTokens(e,t),n=c.tokens;if(n.length&&n[n.length-1].type=="comment")return a;if(t=="start"){var h=e.match(/^.*[\{\(\[:]\s*$/);h&&(a+=o)}return a},this.checkOutdent=function(t,e,o){return this.$outdent.checkOutdent(e,o)},this.autoOutdent=function(t,e,o){this.$outdent.autoOutdent(e,o)},this.$id="ace/mode/odin"}).call(r.prototype),d.Mode=r}),function(){ace.require(["ace/mode/odin"],function(l){k&&(k.exports=l)})}()})(R);var y=R.exports;const C=O(y),L=B({__proto__:null,default:C},[y]);export{L as m};