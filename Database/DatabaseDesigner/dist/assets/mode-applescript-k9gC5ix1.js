import{g as R}from"./index-Wwh301DR.js";function y(h,b){for(var i=0;i<b.length;i++){const l=b[i];if(typeof l!="string"&&!Array.isArray(l)){for(const p in l)if(p!=="default"&&!(p in h)){const g=Object.getOwnPropertyDescriptor(l,p);g&&Object.defineProperty(h,p,g.get?g:{enumerable:!0,get:()=>l[p]})}}}return Object.freeze(Object.defineProperty(h,Symbol.toStringTag,{value:"Module"}))}var k={exports:{}};(function(h,b){ace.define("ace/mode/applescript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(i,l,p){var g=i("../lib/oop"),f=i("./text_highlight_rules").TextHighlightRules,u=function(){var m="about|above|after|against|and|around|as|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|contain|contains|continue|copy|div|does|eighth|else|end|equal|equals|error|every|exit|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|into|is|it|its|last|local|me|middle|mod|my|ninth|not|of|on|onto|or|over|prop|property|put|ref|reference|repeat|returning|script|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|try|until|where|while|whose|with|without",e="AppleScript|false|linefeed|return|pi|quote|result|space|tab|true",t="activate|beep|count|delay|launch|log|offset|read|round|run|say|summarize|write",r="alias|application|boolean|class|constant|date|file|integer|list|number|real|record|string|text|character|characters|contents|day|frontmost|id|item|length|month|name|paragraph|paragraphs|rest|reverse|running|time|version|weekday|word|words|year",n=this.createKeywordMapper({"support.function":t,"constant.language":e,"support.type":r,keyword:m},"identifier");this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"comment",regex:"\\(\\*",next:"comment"},{token:"string",regex:'".*?"'},{token:"support.type",regex:"\\b(POSIX file|POSIX path|(date|time) string|quoted form)\\b"},{token:"support.function",regex:"\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b"},{token:"constant.language",regex:"\\b(text item delimiters|current application|missing value)\\b"},{token:"keyword",regex:"\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference))\\b"},{token:n,regex:"[a-zA-Z][a-zA-Z0-9_]*\\b"}],comment:[{token:"comment",regex:"\\*\\)",next:"start"},{defaultToken:"comment"}]},this.normalizeRules()};g.inherits(u,f),l.AppleScriptHighlightRules=u}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(i,l,p){var g=i("../../lib/oop"),f=i("../../range").Range,u=i("./fold_mode").FoldMode,m=l.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};g.inherits(m,u),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,r){var n=e.getLine(r);if(this.singleLineBlockCommentRe.test(n)&&!this.startRegionRe.test(n)&&!this.tripleStarBlockCommentRe.test(n))return"";var a=this._getFoldWidgetBase(e,t,r);return!a&&this.startRegionRe.test(n)?"start":a},this.getFoldWidgetRange=function(e,t,r,n){var a=e.getLine(r);if(this.startRegionRe.test(a))return this.getCommentRegionBlock(e,a,r);var o=a.match(this.foldingStartMarker);if(o){var c=o.index;if(o[1])return this.openingBracketBlock(e,o[1],r,c);var s=e.getCommentFoldRange(r,c+o[0].length,1);return s&&!s.isMultiLine()&&(n?s=this.getSectionRange(e,r):t!="all"&&(s=null)),s}if(t!=="markbegin"){var o=a.match(this.foldingStopMarker);if(o){var c=o.index+o[0].length;return o[1]?this.closingBracketBlock(e,o[1],r,c):e.getCommentFoldRange(r,c,-1)}}},this.getSectionRange=function(e,t){var r=e.getLine(t),n=r.search(/\S/),a=t,c=r.length;t=t+1;for(var s=t,o=e.getLength();++t<o;){r=e.getLine(t);var v=r.search(/\S/);if(v!==-1){if(n>v)break;var d=this.getFoldWidgetRange(e,"all",t);if(d){if(d.start.row<=a)break;if(d.isMultiLine())t=d.end.row;else if(n==v)break}s=t}}return new f(a,c,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,r){for(var n=t.search(/\s*$/),a=e.getLength(),c=r,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,o=1;++r<a;){t=e.getLine(r);var v=s.exec(t);if(v&&(v[1]?o--:o++,!o))break}var d=r;if(d>c)return new f(c,n,d,t.length)}}).call(m.prototype)}),ace.define("ace/mode/applescript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/applescript_highlight_rules","ace/mode/folding/cstyle"],function(i,l,p){var g=i("../lib/oop"),f=i("./text").Mode,u=i("./applescript_highlight_rules").AppleScriptHighlightRules,m=i("./folding/cstyle").FoldMode,e=function(){this.HighlightRules=u,this.foldingRules=new m,this.$behaviour=this.$defaultBehaviour};g.inherits(e,f),(function(){this.lineCommentStart="--",this.blockComment={start:"(*",end:"*)"},this.$id="ace/mode/applescript"}).call(e.prototype),l.Mode=e}),function(){ace.require(["ace/mode/applescript"],function(i){h&&(h.exports=i)})}()})(k);var x=k.exports;const M=R(x),_=y({__proto__:null,default:M},[x]);export{_ as m};