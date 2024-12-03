import{g as t}from"./index-Wwh301DR.js";function l(r,n){for(var o=0;o<n.length;o++){const e=n[o];if(typeof e!="string"&&!Array.isArray(e)){for(const c in e)if(c!=="default"&&!(c in r)){const a=Object.getOwnPropertyDescriptor(e,c);a&&Object.defineProperty(r,c,a.get?a:{enumerable:!0,get:()=>e[c]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}var d={exports:{}};(function(r,n){ace.define("ace/theme/cloud_editor_dark-css",["require","exports","module"],function(o,e,c){c.exports=`
.ace-cloud_editor_dark .ace_gutter {
    background: #282c34;
    color: #8e96a9;
}

.ace-cloud_editor_dark.ace_dark .ace_tooltip-marker-error.ace_tooltip-marker {
    background-color: #ff5d64;
}
.ace-cloud_editor_dark.ace_dark .ace_tooltip-marker-warning.ace_tooltip-marker {
    background-color: #e0ca57;
}

.ace-cloud_editor_dark .ace_print-margin {
    width: 1px;
    background: #e8e8e8;
}

.ace-cloud_editor_dark {
    background-color: #282c34;
    color: #dcdfe4;
}

.ace-cloud_editor_dark .ace_cursor {
    color: #66b2f0;
}

.ace-cloud_editor_dark .ace_marker-layer .ace_selection {
    background: #213a70;
}

.ace-cloud_editor_dark.ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px 0px #8e96a9;
    border-radius: 2px;
}

.ace-cloud_editor_dark .ace_marker-layer .ace_step {
    background: #6fb342;
}

.ace-cloud_editor_dark .ace_marker-layer .ace_bracket {
    margin: 0 0 0 -1px;
    border: 1px solid #e8e8e8;
}

.ace-cloud_editor_dark .ace_marker-layer .ace_active-line {
    box-sizing: border-box;
    border-top: 1px solid #75777a;
    border-bottom: 1px solid #75777a;
}

.ace-cloud_editor_dark .ace_gutter-cell_svg-icons {
    box-sizing: border-box;
    border-top: 1px solid #282c34;
    border-bottom: 1px solid #282c34;
}

.ace-cloud_editor_dark .ace_gutter-active-line {
    background-repeat: no-repeat;
    box-sizing: border-box;
    border-top: 1px solid #75777a;
    border-bottom: 1px solid #75777a;
}

.ace-cloud_editor_dark .ace_marker-layer .ace_selected-word {
    border: 1px solid #282c34;
}

.ace-cloud_editor_dark .ace_fold {
    background-color: #66b2f0;
    border-color: #dcdfe4;
}

.ace-cloud_editor_dark .ace_keyword {
    color: #c674dc;
}

.ace-cloud_editor_dark .ace_constant {
    color: #e5c383;
}

.ace-cloud_editor_dark .ace_constant.ace_numeric {
    color: #e5c383;
}

.ace-cloud_editor_dark .ace_constant.ace_character.ace_escape {
    color: #71ccc7;
}

.ace-cloud_editor_dark .ace_support.ace_function {
    color: #66b2f0;
}

.ace-cloud_editor_dark .ace_support.ace_class {
    color: #e5c383;
}

.ace-cloud_editor_dark .ace_storage {
    color: #c674dc;
}

.ace-cloud_editor_dark .ace_invalid.ace_illegal {
    color: #dcdfe4;
    background-color: #e76a71;
}

.ace-cloud_editor_dark .ace_invalid.ace_deprecated {
    color: #dcdfe4;
    background-color: #e5c383;
}

.ace-cloud_editor_dark .ace_string {
    color: #6fb342;
}

.ace-cloud_editor_dark .ace_string.ace_regexp {
    color: #6fb342;
}

.ace-cloud_editor_dark .ace_comment,
.ace-cloud_editor_dark .ace_ghost_text {
    color: #b5bac0;
    opacity: 1;
}

.ace-cloud_editor_dark .ace_variable {
    color: #e76a71;
}

.ace-cloud_editor_dark .ace_meta.ace_selector {
    color: #c674dc;
}

.ace-cloud_editor_dark .ace_entity.ace_other.ace_attribute-name {
    color: #e5c383;
}

.ace-cloud_editor_dark .ace_entity.ace_name.ace_function {
    color: #66b2f0;
}

.ace-cloud_editor_dark .ace_entity.ace_name.ace_tag {
    color: #e76a71;
}
.ace-cloud_editor_dark .ace_heading {
    color: #66b2f0;
}

.ace-cloud_editor_dark .ace_xml-pe {
    color: #e5c383;
}
.ace-cloud_editor_dark .ace_doctype {
    color: #e76a71;
}

.ace-cloud_editor_dark .ace_entity.ace_name.ace_tag,
.ace-cloud_editor_dark .ace_entity.ace_other.ace_attribute-name,
.ace-cloud_editor_dark .ace_meta.ace_tag,
.ace-cloud_editor_dark .ace_string.ace_regexp,
.ace-cloud_editor_dark .ace_variable {
    color: #e76a71;
}

.ace-cloud_editor_dark .ace_tooltip {
    background-color: #282c34;
    color: #dcdfe4;
}

.ace-cloud_editor_dark .ace_icon_svg.ace_error,
.ace-cloud_editor_dark .ace_icon_svg.ace_error_fold {
    background-color: #ff5d64;
}
.ace-cloud_editor_dark .ace_icon_svg.ace_warning,
.ace-cloud_editor_dark .ace_icon_svg.ace_warning_fold {
    background-color: #e0ca57;
}
.ace-cloud_editor_dark .ace_icon_svg.ace_info {
    background-color: #44b9d6;
}
.ace-cloud_editor_dark .ace_highlight-marker {
    background: none;
    border: #66b2f0 1px solid;
}
.ace-cloud_editor_dark .ace_tooltip.ace_hover-tooltip:focus > div {
    outline: 1px solid #44b9d6;
}

`}),ace.define("ace/theme/cloud_editor_dark",["require","exports","module","ace/theme/cloud_editor_dark-css","ace/lib/dom"],function(o,e,c){e.isDark=!0,e.cssClass="ace-cloud_editor_dark",e.cssText=o("./cloud_editor_dark-css");var a=o("../lib/dom");a.importCssString(e.cssText,e.cssClass,!1)}),function(){ace.require(["ace/theme/cloud_editor_dark"],function(o){r&&(r.exports=o)})}()})(d);var _=d.exports;const i=t(_),k=l({__proto__:null,default:i},[_]);export{k as t};
