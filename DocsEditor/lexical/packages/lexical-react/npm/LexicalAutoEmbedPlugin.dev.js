/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var link = require('@lexical/link');
var LexicalComposerContext = require('@lexical/react/LexicalComposerContext');
var LexicalNodeMenuPlugin = require('@lexical/react/LexicalNodeMenuPlugin');
var utils = require('@lexical/utils');
var lexical = require('lexical');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const URL_MATCHER = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const INSERT_EMBED_COMMAND = lexical.createCommand('INSERT_EMBED_COMMAND');
class AutoEmbedOption extends LexicalNodeMenuPlugin.MenuOption {
  constructor(title, options) {
    super(title);
    this.title = title;
    this.onSelect = options.onSelect.bind(this);
  }
}
function LexicalAutoEmbedPlugin({
  embedConfigs,
  onOpenEmbedModalForConfig,
  getMenuOptions,
  menuRenderFn,
  menuCommandPriority = lexical.COMMAND_PRIORITY_LOW
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [nodeKey, setNodeKey] = react.useState(null);
  const [activeEmbedConfig, setActiveEmbedConfig] = react.useState(null);
  const reset = react.useCallback(() => {
    setNodeKey(null);
    setActiveEmbedConfig(null);
  }, []);
  const checkIfLinkNodeIsEmbeddable = react.useCallback(async key => {
    const url = editor.getEditorState().read(function () {
      const linkNode = lexical.$getNodeByKey(key);
      if (link.$isLinkNode(linkNode)) {
        return linkNode.getURL();
      }
    });
    if (url === undefined) {
      return;
    }
    for (const embedConfig of embedConfigs) {
      const urlMatch = await Promise.resolve(embedConfig.parseUrl(url));
      if (urlMatch != null) {
        setActiveEmbedConfig(embedConfig);
        setNodeKey(key);
      }
    }
  }, [editor, embedConfigs]);
  react.useEffect(() => {
    const listener = (nodeMutations, {
      updateTags,
      dirtyLeaves
    }) => {
      for (const [key, mutation] of nodeMutations) {
        if (mutation === 'created' && updateTags.has('paste') && dirtyLeaves.size <= 3) {
          checkIfLinkNodeIsEmbeddable(key);
        } else if (key === nodeKey) {
          reset();
        }
      }
    };
    return utils.mergeRegister(...[link.LinkNode, link.AutoLinkNode].map(Klass => editor.registerMutationListener(Klass, (...args) => listener(...args), {
      skipInitialization: true
    })));
  }, [checkIfLinkNodeIsEmbeddable, editor, embedConfigs, nodeKey, reset]);
  react.useEffect(() => {
    return editor.registerCommand(INSERT_EMBED_COMMAND, embedConfigType => {
      const embedConfig = embedConfigs.find(({
        type
      }) => type === embedConfigType);
      if (embedConfig) {
        onOpenEmbedModalForConfig(embedConfig);
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_EDITOR);
  }, [editor, embedConfigs, onOpenEmbedModalForConfig]);
  const embedLinkViaActiveEmbedConfig = react.useCallback(async function () {
    if (activeEmbedConfig != null && nodeKey != null) {
      const linkNode = editor.getEditorState().read(() => {
        const node = lexical.$getNodeByKey(nodeKey);
        if (link.$isLinkNode(node)) {
          return node;
        }
        return null;
      });
      if (link.$isLinkNode(linkNode)) {
        const result = await Promise.resolve(activeEmbedConfig.parseUrl(linkNode.__url));
        if (result != null) {
          editor.update(() => {
            if (!lexical.$getSelection()) {
              linkNode.selectEnd();
            }
            activeEmbedConfig.insertNode(editor, result);
            if (linkNode.isAttached()) {
              linkNode.remove();
            }
          });
        }
      }
    }
  }, [activeEmbedConfig, editor, nodeKey]);
  const options = react.useMemo(() => {
    return activeEmbedConfig != null && nodeKey != null ? getMenuOptions(activeEmbedConfig, embedLinkViaActiveEmbedConfig, reset) : [];
  }, [activeEmbedConfig, embedLinkViaActiveEmbedConfig, getMenuOptions, nodeKey, reset]);
  const onSelectOption = react.useCallback((selectedOption, targetNode, closeMenu) => {
    editor.update(() => {
      selectedOption.onSelect(targetNode);
      closeMenu();
    });
  }, [editor]);
  return nodeKey != null ? /*#__PURE__*/jsxRuntime.jsx(LexicalNodeMenuPlugin.LexicalNodeMenuPlugin, {
    nodeKey: nodeKey,
    onClose: reset,
    onSelectOption: onSelectOption,
    options: options,
    menuRenderFn: menuRenderFn,
    commandPriority: menuCommandPriority
  }) : null;
}

exports.AutoEmbedOption = AutoEmbedOption;
exports.INSERT_EMBED_COMMAND = INSERT_EMBED_COMMAND;
exports.LexicalAutoEmbedPlugin = LexicalAutoEmbedPlugin;
exports.URL_MATCHER = URL_MATCHER;
