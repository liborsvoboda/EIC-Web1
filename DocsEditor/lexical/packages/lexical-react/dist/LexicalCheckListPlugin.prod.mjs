/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import{INSERT_CHECK_LIST_COMMAND as e,insertList as t,$isListItemNode as n,$isListNode as r}from"@lexical/list";import{useLexicalComposerContext as i}from"@lexical/react/LexicalComposerContext";import{mergeRegister as l,$findMatchingParent as o,isHTMLElement as c,calculateZoomLevel as s}from"@lexical/utils";import{COMMAND_PRIORITY_LOW as u,KEY_ARROW_DOWN_COMMAND as a,KEY_ARROW_UP_COMMAND as g,KEY_ESCAPE_COMMAND as f,KEY_SPACE_COMMAND as m,$getNearestNodeFromDOMNode as d,KEY_ARROW_LEFT_COMMAND as p,$getSelection as C,$isRangeSelection as h,$isElementNode as L,getNearestEditorFromDOMNode as v}from"lexical";import{useEffect as E}from"react";function x(){const[c]=i();return E((()=>l(c.registerCommand(e,(()=>(t(c,"check"),!0)),u),c.registerCommand(a,(e=>b(e,c,!1)),u),c.registerCommand(g,(e=>b(e,c,!0)),u),c.registerCommand(f,(e=>{if(null!=_()){const e=c.getRootElement();return null!=e&&e.focus(),!0}return!1}),u),c.registerCommand(m,(e=>{const t=_();return!(null==t||!c.isEditable())&&(c.update((()=>{const r=d(t);n(r)&&(e.preventDefault(),r.toggleChecked())})),!0)}),u),c.registerCommand(p,(e=>c.getEditorState().read((()=>{const t=C();if(h(t)&&t.isCollapsed()){const{anchor:i}=t,l="element"===i.type;if(l||0===i.offset){const t=i.getNode(),s=o(t,(e=>L(e)&&!e.isInline()));if(n(s)){const n=s.getParent();if(r(n)&&"check"===n.getListType()&&(l||s.getFirstDescendant()===t)){const t=c.getElementByKey(s.__key);if(null!=t&&document.activeElement!==t)return t.focus(),e.preventDefault(),!0}}}}return!1}))),u),c.registerRootListener(((e,t)=>{null!==e&&(e.addEventListener("click",y),e.addEventListener("pointerdown",N)),null!==t&&(t.removeEventListener("click",y),t.removeEventListener("pointerdown",N))}))))),null}function k(e,t){const n=e.target;if(null===n||!c(n))return;const r=n.firstChild;if(null!=r&&c(r)&&("UL"===r.tagName||"OL"===r.tagName))return;const i=n.parentNode;if(!i||"check"!==i.__lexicalListType)return;const l=n.getBoundingClientRect(),o=e.pageX/s(n);("rtl"===n.dir?o<l.right&&o>l.right-20:o>l.left&&o<l.left+20)&&t()}function y(e){k(e,(()=>{if(e.target instanceof HTMLElement){const t=e.target,r=v(t);null!=r&&r.isEditable()&&r.update((()=>{const e=d(t);n(e)&&(t.focus(),e.toggleChecked())}))}}))}function N(e){k(e,(()=>{e.preventDefault()}))}function _(){const e=document.activeElement;return null!=e&&"LI"===e.tagName&&null!=e.parentNode&&"check"===e.parentNode.__lexicalListType?e:null}function b(e,t,i){const l=_();return null!=l&&t.update((()=>{const o=d(l);if(!n(o))return;const c=function(e,t){let i=t?e.getPreviousSibling():e.getNextSibling(),l=e;for(;null==i&&n(l);)l=l.getParentOrThrow().getParent(),null!=l&&(i=t?l.getPreviousSibling():l.getNextSibling());for(;n(i);){const e=t?i.getLastChild():i.getFirstChild();if(!r(e))return i;i=t?e.getLastChild():e.getFirstChild()}return null}(o,i);if(null!=c){c.selectStart();const n=t.getElementByKey(c.__key);null!=n&&(e.preventDefault(),setTimeout((()=>{n.focus()}),0))}})),!1}export{x as CheckListPlugin};