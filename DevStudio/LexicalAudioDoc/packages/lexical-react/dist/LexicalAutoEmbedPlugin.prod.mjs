/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import{$isLinkNode as e,LinkNode as t,AutoLinkNode as n}from"@lexical/link";import{useLexicalComposerContext as o}from"@lexical/react/LexicalComposerContext";import{MenuOption as r,LexicalNodeMenuPlugin as i}from"@lexical/react/LexicalNodeMenuPlugin";import{mergeRegister as l}from"@lexical/utils";import{createCommand as s,$getNodeByKey as a,COMMAND_PRIORITY_EDITOR as c,$getSelection as u,COMMAND_PRIORITY_LOW as m}from"lexical";import{useState as d,useCallback as p,useEffect as f,useMemo as x}from"react";import{jsx as g}from"react/jsx-runtime";const w=/((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,C=s("INSERT_EMBED_COMMAND");class y extends r{constructor(e,t){super(e),this.title=e,this.onSelect=t.onSelect.bind(this)}}function E({embedConfigs:r,onOpenEmbedModalForConfig:s,getMenuOptions:w,menuRenderFn:y,menuCommandPriority:E=m}){const[M]=o(),[S,h]=d(null),[_,v]=d(null),z=p((()=>{h(null),v(null)}),[]),A=p((async t=>{const n=M.getEditorState().read((function(){const n=a(t);if(e(n))return n.getURL()}));if(void 0!==n)for(const e of r){null!=await Promise.resolve(e.parseUrl(n))&&(v(e),h(t))}}),[M,r]);f((()=>l(...[t,n].map((e=>M.registerMutationListener(e,((...e)=>((e,{updateTags:t,dirtyLeaves:n})=>{for(const[o,r]of e)"created"===r&&t.has("paste")&&n.size<=3?A(o):o===S&&z()})(...e)),{skipInitialization:!0}))))),[A,M,r,S,z]),f((()=>M.registerCommand(C,(e=>{const t=r.find((({type:t})=>t===e));return!!t&&(s(t),!0)}),c)),[M,r,s]);const L=p((async function(){if(null!=_&&null!=S){const t=M.getEditorState().read((()=>{const t=a(S);return e(t)?t:null}));if(e(t)){const e=await Promise.resolve(_.parseUrl(t.__url));null!=e&&M.update((()=>{u()||t.selectEnd(),_.insertNode(M,e),t.isAttached()&&t.remove()}))}}}),[_,M,S]),P=x((()=>null!=_&&null!=S?w(_,L,z):[]),[_,L,w,S,z]),b=p(((e,t,n)=>{M.update((()=>{e.onSelect(t),n()}))}),[M]);return null!=S?g(i,{nodeKey:S,onClose:z,onSelectOption:b,options:P,menuRenderFn:y,commandPriority:E}):null}export{y as AutoEmbedOption,C as INSERT_EMBED_COMMAND,E as LexicalAutoEmbedPlugin,w as URL_MATCHER};