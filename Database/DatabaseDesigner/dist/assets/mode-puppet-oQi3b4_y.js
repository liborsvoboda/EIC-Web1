import{g as b}from"./index-Wwh301DR.js";function R(m,v){for(var r=0;r<v.length;r++){const l=v[r];if(typeof l!="string"&&!Array.isArray(l)){for(const h in l)if(h!=="default"&&!(h in m)){const u=Object.getOwnPropertyDescriptor(l,h);u&&Object.defineProperty(m,h,u.get?u:{enumerable:!0,get:()=>l[h]})}}}return Object.freeze(Object.defineProperty(m,Symbol.toStringTag,{value:"Module"}))}var x={exports:{}};(function(m,v){ace.define("ace/mode/puppet_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(r,l,h){var u=r("../lib/oop"),g=r("./text_highlight_rules").TextHighlightRules,a=function(){this.$rules={start:[{token:["keyword.type.puppet","constant.class.puppet","keyword.inherits.puppet","constant.class.puppet"],regex:'^\\s*(class)(\\s+(?:[-_A-Za-z0-9".]+::)*[-_A-Za-z0-9".]+\\s*)(?:(inherits\\s*)(\\s+(?:[-_A-Za-z0-9".]+::)*[-_A-Za-z0-9".]+\\s*))?'},{token:["storage.function.puppet","name.function.puppet","punctuation.lpar"],regex:"(^\\s*define)(\\s+[a-zA-Z0-9_:]+\\s*)(\\()",push:[{token:"punctuation.rpar.puppet",regex:"\\)",next:"pop"},{include:"constants"},{include:"variable"},{include:"strings"},{include:"operators"},{defaultToken:"string"}]},{token:["language.support.class","keyword.operator"],regex:"\\b([a-zA-Z_]+)(\\s+=>)"},{token:["exported.resource.puppet","keyword.name.resource.puppet","paren.lparen"],regex:"(\\@\\@)?(\\s*[a-zA-Z_]*)(\\s*\\{)"},{token:"qualified.variable.puppet",regex:"(\\$([a-z][a-z0-9_]*)?(::[a-z][a-z0-9_]*)*::[a-z0-9_][a-zA-Z0-9_]*)"},{token:"singleline.comment.puppet",regex:"#(.)*$"},{token:"multiline.comment.begin.puppet",regex:"^\\s*\\/\\*",push:"blockComment"},{token:"keyword.control.puppet",regex:"\\b(case|if|unless|else|elsif|in|default:|and|or)\\s+(?!::)"},{token:"keyword.control.puppet",regex:"\\b(import|default|inherits|include|require|contain|node|application|consumes|environment|site|function|produces)\\b"},{token:"support.function.puppet",regex:"\\b(lest|str2bool|escape|gsub|Timestamp|Timespan|with|alert|crit|debug|notice|sprintf|split|step|strftime|slice|shellquote|type|sha1|defined|scanf|reverse_each|regsubst|return|emerg|reduce|err|failed|fail|versioncmp|file|generate|then|info|realize|search|tag|tagged|template|epp|warning|hiera_include|each|assert_type|binary_file|create_resources|dig|digest|filter|lookup|find_file|fqdn_rand|hiera_array|hiera_hash|inline_epp|inline_template|map|match|md5|new|next)\\b"},{token:"constant.types.puppet",regex:"\\b(String|File|Package|Service|Class|Integer|Array|Catalogentry|Variant|Boolean|Undef|Number|Hash|Float|Numeric|NotUndef|Callable|Optional|Any|Regexp|Sensitive|Sensitive.new|Type|Resource|Default|Enum|Scalar|Collection|Data|Pattern|Tuple|Struct)\\b"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{include:"variable"},{include:"constants"},{include:"strings"},{include:"operators"},{token:"regexp.begin.string.puppet",regex:"\\s*(\\/(\\S)+)\\/"}],blockComment:[{regex:"\\*\\/",token:"multiline.comment.end.puppet",next:"pop"},{defaultToken:"comment"}],constants:[{token:"constant.language.puppet",regex:"\\b(false|true|running|stopped|installed|purged|latest|file|directory|held|undef|present|absent|link|mounted|unmounted)\\b"}],variable:[{token:"variable.puppet",regex:"(\\$[a-z0-9_{][a-zA-Z0-9_]*)"}],strings:[{token:"punctuation.quote.puppet",regex:"'",push:[{token:"punctuation.quote.puppet",regex:"'",next:"pop"},{include:"escaped_chars"},{defaultToken:"string"}]},{token:"punctuation.quote.puppet",regex:'"',push:[{token:"punctuation.quote.puppet",regex:'"',next:"pop"},{include:"escaped_chars"},{include:"variable"},{defaultToken:"string"}]}],escaped_chars:[{token:"constant.escaped_char.puppet",regex:"\\\\."}],operators:[{token:"keyword.operator",regex:"\\+\\.|\\-\\.|\\*\\.|\\/\\.|#|;;|\\+|\\-|\\*|\\*\\*\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|<-|=|::|,"}]},this.normalizeRules()};u.inherits(a,g),l.PuppetHighlightRules=a}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(r,l,h){var u=r("../../lib/oop"),g=r("../../range").Range,a=r("./fold_mode").FoldMode,s=l.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};u.inherits(s,a),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var o=e.getLine(n);if(this.singleLineBlockCommentRe.test(o)&&!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return"";var p=this._getFoldWidgetBase(e,t,n);return!p&&this.startRegionRe.test(o)?"start":p},this.getFoldWidgetRange=function(e,t,n,o){var p=e.getLine(n);if(this.startRegionRe.test(p))return this.getCommentRegionBlock(e,p,n);var i=p.match(this.foldingStartMarker);if(i){var d=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,d);var c=e.getCommentFoldRange(n,d+i[0].length,1);return c&&!c.isMultiLine()&&(o?c=this.getSectionRange(e,n):t!="all"&&(c=null)),c}if(t!=="markbegin"){var i=p.match(this.foldingStopMarker);if(i){var d=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,d):e.getCommentFoldRange(n,d,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),o=n.search(/\S/),p=t,d=n.length;t=t+1;for(var c=t,i=e.getLength();++t<i;){n=e.getLine(t);var k=n.search(/\S/);if(k!==-1){if(o>k)break;var f=this.getFoldWidgetRange(e,"all",t);if(f){if(f.start.row<=p)break;if(f.isMultiLine())t=f.end.row;else if(o==k)break}c=t}}return new g(p,d,c,e.getLine(c).length)},this.getCommentRegionBlock=function(e,t,n){for(var o=t.search(/\s*$/),p=e.getLength(),d=n,c=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,i=1;++n<p;){t=e.getLine(n);var k=c.exec(t);if(k&&(k[1]?i--:i++,!i))break}var f=n;if(f>d)return new g(d,o,f,t.length)}}).call(s.prototype)}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(r,l,h){var u=r("../range").Range,g=function(){};(function(){this.checkOutdent=function(a,s){return/^\s+$/.test(a)?/^\s*\}/.test(s):!1},this.autoOutdent=function(a,s){var e=a.getLine(s),t=e.match(/^(\s*\})/);if(!t)return 0;var n=t[1].length,o=a.findMatchingBracket({row:s,column:n});if(!o||o.row==s)return 0;var p=this.$getIndent(a.getLine(o.row));a.replace(new u(s,0,s,n-1),p)},this.$getIndent=function(a){return a.match(/^\s*/)[0]}}).call(g.prototype),l.MatchingBraceOutdent=g}),ace.define("ace/mode/puppet",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/puppet_highlight_rules","ace/mode/folding/cstyle","ace/mode/matching_brace_outdent"],function(r,l,h){var u=r("../lib/oop"),g=r("./text").Mode,a=r("./puppet_highlight_rules").PuppetHighlightRules,s=r("./folding/cstyle").FoldMode,e=r("./matching_brace_outdent").MatchingBraceOutdent,t=function(){g.call(this),this.HighlightRules=a,this.$outdent=new e,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new s};u.inherits(t,g),(function(){this.lineCommentStart="#",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/puppet"}).call(t.prototype),l.Mode=t}),function(){ace.require(["ace/mode/puppet"],function(r){m&&(m.exports=r)})}()})(x);var _=x.exports;const y=b(_),S=R({__proto__:null,default:y},[_]);export{S as m};