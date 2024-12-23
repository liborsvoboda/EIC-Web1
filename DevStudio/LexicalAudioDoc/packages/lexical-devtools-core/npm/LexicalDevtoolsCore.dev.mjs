/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { $generateHtmlFromNodes } from '@lexical/html';
import { $isLinkNode } from '@lexical/link';
import { $isMarkNode } from '@lexical/mark';
import { $isTableSelection } from '@lexical/table';
import { $getSelection, $getRoot, $isRangeSelection, $isNodeSelection, $isElementNode, $isTextNode, $isParagraphNode, COMMAND_PRIORITY_CRITICAL } from 'lexical';
import { forwardRef, useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const NON_SINGLE_WIDTH_CHARS_REPLACEMENT = Object.freeze({
  '\t': '\\t',
  '\n': '\\n'
});
const NON_SINGLE_WIDTH_CHARS_REGEX = new RegExp(Object.keys(NON_SINGLE_WIDTH_CHARS_REPLACEMENT).join('|'), 'g');
const SYMBOLS = Object.freeze({
  ancestorHasNextSibling: '|',
  ancestorIsLastChild: ' ',
  hasNextSibling: '├',
  isLastChild: '└',
  selectedChar: '^',
  selectedLine: '>'
});
const FORMAT_PREDICATES = [node => node.hasFormat('bold') && 'Bold', node => node.hasFormat('code') && 'Code', node => node.hasFormat('italic') && 'Italic', node => node.hasFormat('strikethrough') && 'Strikethrough', node => node.hasFormat('subscript') && 'Subscript', node => node.hasFormat('superscript') && 'Superscript', node => node.hasFormat('underline') && 'Underline'];
const FORMAT_PREDICATES_PARAGRAPH = [node => node.hasTextFormat('bold') && 'Bold', node => node.hasTextFormat('code') && 'Code', node => node.hasTextFormat('italic') && 'Italic', node => node.hasTextFormat('strikethrough') && 'Strikethrough', node => node.hasTextFormat('subscript') && 'Subscript', node => node.hasTextFormat('superscript') && 'Superscript', node => node.hasTextFormat('underline') && 'Underline'];
const DETAIL_PREDICATES = [node => node.isDirectionless() && 'Directionless', node => node.isUnmergeable() && 'Unmergeable'];
const MODE_PREDICATES = [node => node.isToken() && 'Token', node => node.isSegmented() && 'Segmented'];
function generateContent(editor, commandsLog, exportDOM, customPrintNode, obfuscateText = false) {
  const editorState = editor.getEditorState();
  const editorConfig = editor._config;
  const compositionKey = editor._compositionKey;
  const editable = editor._editable;
  if (exportDOM) {
    let htmlString = '';
    editorState.read(() => {
      htmlString = printPrettyHTML($generateHtmlFromNodes(editor));
    });
    return htmlString;
  }
  let res = ' root\n';
  const selectionString = editorState.read(() => {
    const selection = $getSelection();
    visitTree($getRoot(), (node, indent) => {
      const nodeKey = node.getKey();
      const nodeKeyDisplay = `(${nodeKey})`;
      const typeDisplay = node.getType() || '';
      const isSelected = node.isSelected();
      res += `${isSelected ? SYMBOLS.selectedLine : ' '} ${indent.join(' ')} ${nodeKeyDisplay} ${typeDisplay} ${printNode(node, customPrintNode, obfuscateText)}\n`;
      res += $printSelectedCharsLine({
        indent,
        isSelected,
        node,
        nodeKeyDisplay,
        selection,
        typeDisplay
      });
    });
    return selection === null ? ': null' : $isRangeSelection(selection) ? printRangeSelection(selection) : $isTableSelection(selection) ? printTableSelection(selection) : printNodeSelection(selection);
  });
  res += '\n selection' + selectionString;
  res += '\n\n commands:';
  if (commandsLog.length) {
    for (const {
      index,
      type,
      payload
    } of commandsLog) {
      res += `\n  └ ${index}. { type: ${type}, payload: ${payload instanceof Event ? payload.constructor.name : payload} }`;
    }
  } else {
    res += '\n  └ None dispatched.';
  }
  const {
    version
  } = editor.constructor;
  res += `\n\n editor${version ? ` (v${version})` : ''}:`;
  res += `\n  └ namespace ${editorConfig.namespace}`;
  if (compositionKey !== null) {
    res += `\n  └ compositionKey ${compositionKey}`;
  }
  res += `\n  └ editable ${String(editable)}`;
  return res;
}
function printRangeSelection(selection) {
  let res = '';
  const formatText = printFormatProperties(selection);
  res += `: range ${formatText !== '' ? `{ ${formatText} }` : ''} ${selection.style !== '' ? `{ style: ${selection.style} } ` : ''}`;
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorOffset = anchor.offset;
  const focusOffset = focus.offset;
  res += `\n  ├ anchor { key: ${anchor.key}, offset: ${anchorOffset === null ? 'null' : anchorOffset}, type: ${anchor.type} }`;
  res += `\n  └ focus { key: ${focus.key}, offset: ${focusOffset === null ? 'null' : focusOffset}, type: ${focus.type} }`;
  return res;
}
function printNodeSelection(selection) {
  if (!$isNodeSelection(selection)) {
    return '';
  }
  return `: node\n  └ [${Array.from(selection._nodes).join(', ')}]`;
}
function printTableSelection(selection) {
  return `: table\n  └ { table: ${selection.tableKey}, anchorCell: ${selection.anchor.key}, focusCell: ${selection.focus.key} }`;
}
function visitTree(currentNode, visitor, indent = []) {
  const childNodes = currentNode.getChildren();
  const childNodesLength = childNodes.length;
  childNodes.forEach((childNode, i) => {
    visitor(childNode, indent.concat(i === childNodesLength - 1 ? SYMBOLS.isLastChild : SYMBOLS.hasNextSibling));
    if ($isElementNode(childNode)) {
      visitTree(childNode, visitor, indent.concat(i === childNodesLength - 1 ? SYMBOLS.ancestorIsLastChild : SYMBOLS.ancestorHasNextSibling));
    }
  });
}
function normalize(text, obfuscateText = false) {
  const textToPrint = Object.entries(NON_SINGLE_WIDTH_CHARS_REPLACEMENT).reduce((acc, [key, value]) => acc.replace(new RegExp(key, 'g'), String(value)), text);
  if (obfuscateText) {
    return textToPrint.replace(/[^\s]/g, '*');
  }
  return textToPrint;
}
function printNode(node, customPrintNode, obfuscateText = false) {
  const customPrint = customPrintNode ? customPrintNode(node, obfuscateText) : undefined;
  if (customPrint !== undefined && customPrint.length > 0) {
    return customPrint;
  }
  if ($isTextNode(node)) {
    const text = node.getTextContent();
    const title = text.length === 0 ? '(empty)' : `"${normalize(text, obfuscateText)}"`;
    const properties = printAllTextNodeProperties(node);
    return [title, properties.length !== 0 ? `{ ${properties} }` : null].filter(Boolean).join(' ').trim();
  } else if ($isLinkNode(node)) {
    const link = node.getURL();
    const title = link.length === 0 ? '(empty)' : `"${normalize(link, obfuscateText)}"`;
    const properties = printAllLinkNodeProperties(node);
    return [title, properties.length !== 0 ? `{ ${properties} }` : null].filter(Boolean).join(' ').trim();
  } else if ($isMarkNode(node)) {
    return `ids: [ ${node.getIDs().join(', ')} ]`;
  } else if ($isParagraphNode(node)) {
    const formatText = printTextFormatProperties(node);
    let paragraphData = formatText !== '' ? `{ ${formatText} }` : '';
    paragraphData += node.__style ? `(${node.__style})` : '';
    return paragraphData;
  } else {
    return '';
  }
}
function printTextFormatProperties(nodeOrSelection) {
  let str = FORMAT_PREDICATES_PARAGRAPH.map(predicate => predicate(nodeOrSelection)).filter(Boolean).join(', ').toLocaleLowerCase();
  if (str !== '') {
    str = 'format: ' + str;
  }
  return str;
}
function printAllTextNodeProperties(node) {
  return [printFormatProperties(node), printDetailProperties(node), printModeProperties(node)].filter(Boolean).join(', ');
}
function printAllLinkNodeProperties(node) {
  return [printTargetProperties(node), printRelProperties(node), printTitleProperties(node)].filter(Boolean).join(', ');
}
function printDetailProperties(nodeOrSelection) {
  let str = DETAIL_PREDICATES.map(predicate => predicate(nodeOrSelection)).filter(Boolean).join(', ').toLocaleLowerCase();
  if (str !== '') {
    str = 'detail: ' + str;
  }
  return str;
}
function printModeProperties(nodeOrSelection) {
  let str = MODE_PREDICATES.map(predicate => predicate(nodeOrSelection)).filter(Boolean).join(', ').toLocaleLowerCase();
  if (str !== '') {
    str = 'mode: ' + str;
  }
  return str;
}
function printFormatProperties(nodeOrSelection) {
  let str = FORMAT_PREDICATES.map(predicate => predicate(nodeOrSelection)).filter(Boolean).join(', ').toLocaleLowerCase();
  if (str !== '') {
    str = 'format: ' + str;
  }
  return str;
}
function printTargetProperties(node) {
  let str = node.getTarget();
  // TODO Fix nullish on LinkNode
  if (str != null) {
    str = 'target: ' + str;
  }
  return str;
}
function printRelProperties(node) {
  let str = node.getRel();
  // TODO Fix nullish on LinkNode
  if (str != null) {
    str = 'rel: ' + str;
  }
  return str;
}
function printTitleProperties(node) {
  let str = node.getTitle();
  // TODO Fix nullish on LinkNode
  if (str != null) {
    str = 'title: ' + str;
  }
  return str;
}
function $printSelectedCharsLine({
  indent,
  isSelected,
  node,
  nodeKeyDisplay,
  selection,
  typeDisplay
}) {
  // No selection or node is not selected.
  if (!$isTextNode(node) || !$isRangeSelection(selection) || !isSelected || $isElementNode(node)) {
    return '';
  }

  // No selected characters.
  const anchor = selection.anchor;
  const focus = selection.focus;
  if (node.getTextContent() === '' || anchor.getNode() === selection.focus.getNode() && anchor.offset === focus.offset) {
    return '';
  }
  const [start, end] = $getSelectionStartEnd(node, selection);
  if (start === end) {
    return '';
  }
  const selectionLastIndent = indent[indent.length - 1] === SYMBOLS.hasNextSibling ? SYMBOLS.ancestorHasNextSibling : SYMBOLS.ancestorIsLastChild;
  const indentionChars = [...indent.slice(0, indent.length - 1), selectionLastIndent];
  const unselectedChars = Array(start + 1).fill(' ');
  const selectedChars = Array(end - start).fill(SYMBOLS.selectedChar);
  const paddingLength = typeDisplay.length + 2; // 1 for the space after + 1 for the double quote.

  const nodePrintSpaces = Array(nodeKeyDisplay.length + paddingLength).fill(' ');
  return [SYMBOLS.selectedLine, indentionChars.join(' '), [...nodePrintSpaces, ...unselectedChars, ...selectedChars].join('')].join(' ') + '\n';
}
function printPrettyHTML(str) {
  const div = document.createElement('div');
  div.innerHTML = str.trim();
  return prettifyHTML(div, 0).innerHTML;
}
function prettifyHTML(node, level) {
  const indentBefore = new Array(level++ + 1).join('  ');
  const indentAfter = new Array(level - 1).join('  ');
  let textNode;
  for (let i = 0; i < node.children.length; i++) {
    textNode = document.createTextNode('\n' + indentBefore);
    node.insertBefore(textNode, node.children[i]);
    prettifyHTML(node.children[i], level);
    if (node.lastElementChild === node.children[i]) {
      textNode = document.createTextNode('\n' + indentAfter);
      node.appendChild(textNode);
    }
  }
  return node;
}
function $getSelectionStartEnd(node, selection) {
  const anchorAndFocus = selection.getStartEndPoints();
  if ($isNodeSelection(selection) || anchorAndFocus === null) {
    return [-1, -1];
  }
  const [anchor, focus] = anchorAndFocus;
  const textContent = node.getTextContent();
  const textLength = textContent.length;
  let start = -1;
  let end = -1;

  // Only one node is being selected.
  if (anchor.type === 'text' && focus.type === 'text') {
    const anchorNode = anchor.getNode();
    const focusNode = focus.getNode();
    if (anchorNode === focusNode && node === anchorNode && anchor.offset !== focus.offset) {
      [start, end] = anchor.offset < focus.offset ? [anchor.offset, focus.offset] : [focus.offset, anchor.offset];
    } else if (node === anchorNode) {
      [start, end] = anchorNode.isBefore(focusNode) ? [anchor.offset, textLength] : [0, anchor.offset];
    } else if (node === focusNode) {
      [start, end] = focusNode.isBefore(anchorNode) ? [focus.offset, textLength] : [0, focus.offset];
    } else {
      // Node is within selection but not the anchor nor focus.
      [start, end] = [0, textLength];
    }
  }

  // Account for non-single width characters.
  const numNonSingleWidthCharBeforeSelection = (textContent.slice(0, start).match(NON_SINGLE_WIDTH_CHARS_REGEX) || []).length;
  const numNonSingleWidthCharInSelection = (textContent.slice(start, end).match(NON_SINGLE_WIDTH_CHARS_REGEX) || []).length;
  return [start + numNonSingleWidthCharBeforeSelection, end + numNonSingleWidthCharBeforeSelection + numNonSingleWidthCharInSelection];
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const LARGE_EDITOR_STATE_SIZE = 1000;
const TreeView = /*#__PURE__*/forwardRef(function TreeViewWrapped({
  treeTypeButtonClassName,
  timeTravelButtonClassName,
  timeTravelPanelSliderClassName,
  timeTravelPanelButtonClassName,
  viewClassName,
  timeTravelPanelClassName,
  editorState,
  setEditorState,
  setEditorReadOnly,
  generateContent
}, ref) {
  const [timeStampedEditorStates, setTimeStampedEditorStates] = useState([]);
  const [content, setContent] = useState('');
  const [timeTravelEnabled, setTimeTravelEnabled] = useState(false);
  const [showExportDOM, setShowExportDOM] = useState(false);
  const playingIndexRef = useRef(0);
  const inputRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLimited, setIsLimited] = useState(false);
  const [showLimited, setShowLimited] = useState(false);
  const lastEditorStateRef = useRef();
  const lastGenerationID = useRef(0);
  const generateTree = useCallback(exportDOM => {
    const myID = ++lastGenerationID.current;
    generateContent(exportDOM).then(treeText => {
      if (myID === lastGenerationID.current) {
        setContent(treeText);
      }
    }).catch(err => {
      if (myID === lastGenerationID.current) {
        setContent(`Error rendering tree: ${err.message}\n\nStack:\n${err.stack}`);
      }
    });
  }, [generateContent]);
  useEffect(() => {
    if (!showLimited && editorState._nodeMap.size > LARGE_EDITOR_STATE_SIZE) {
      setIsLimited(true);
      if (!showLimited) {
        return;
      }
    }

    // Prevent re-rendering if the editor state hasn't changed
    if (lastEditorStateRef.current !== editorState) {
      lastEditorStateRef.current = editorState;
      generateTree(showExportDOM);
      if (!timeTravelEnabled) {
        setTimeStampedEditorStates(currentEditorStates => [...currentEditorStates, [Date.now(), editorState]]);
      }
    }
  }, [editorState, generateTree, showExportDOM, showLimited, timeTravelEnabled]);
  const totalEditorStates = timeStampedEditorStates.length;
  useEffect(() => {
    if (isPlaying) {
      let timeoutId;
      const play = () => {
        const currentIndex = playingIndexRef.current;
        if (currentIndex === totalEditorStates - 1) {
          setIsPlaying(false);
          return;
        }
        const currentTime = timeStampedEditorStates[currentIndex][0];
        const nextTime = timeStampedEditorStates[currentIndex + 1][0];
        const timeDiff = nextTime - currentTime;
        timeoutId = setTimeout(() => {
          playingIndexRef.current++;
          const index = playingIndexRef.current;
          const input = inputRef.current;
          if (input !== null) {
            input.value = String(index);
          }
          setEditorState(timeStampedEditorStates[index][1]);
          play();
        }, timeDiff);
      };
      play();
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [timeStampedEditorStates, isPlaying, totalEditorStates, setEditorState]);
  const handleExportModeToggleClick = () => {
    generateTree(!showExportDOM);
    setShowExportDOM(!showExportDOM);
  };
  return /*#__PURE__*/jsxs("div", {
    className: viewClassName,
    children: [!showLimited && isLimited ? /*#__PURE__*/jsxs("div", {
      style: {
        padding: 20
      },
      children: [/*#__PURE__*/jsx("span", {
        style: {
          marginRight: 20
        },
        children: "Detected large EditorState, this can impact debugging performance."
      }), /*#__PURE__*/jsx("button", {
        onClick: () => {
          setShowLimited(true);
        },
        style: {
          background: 'transparent',
          border: '1px solid white',
          color: 'white',
          cursor: 'pointer',
          padding: 5
        },
        children: "Show full tree"
      })]
    }) : null, !showLimited ? /*#__PURE__*/jsx("button", {
      onClick: () => handleExportModeToggleClick(),
      className: treeTypeButtonClassName,
      type: "button",
      children: showExportDOM ? 'Tree' : 'Export DOM'
    }) : null, !timeTravelEnabled && (showLimited || !isLimited) && totalEditorStates > 2 && /*#__PURE__*/jsx("button", {
      onClick: () => {
        setEditorReadOnly(true);
        playingIndexRef.current = totalEditorStates - 1;
        setTimeTravelEnabled(true);
      },
      className: timeTravelButtonClassName,
      type: "button",
      children: "Time Travel"
    }), (showLimited || !isLimited) && /*#__PURE__*/jsx("pre", {
      ref: ref,
      children: content
    }), timeTravelEnabled && (showLimited || !isLimited) && /*#__PURE__*/jsxs("div", {
      className: timeTravelPanelClassName,
      children: [/*#__PURE__*/jsx("button", {
        className: timeTravelPanelButtonClassName,
        onClick: () => {
          if (playingIndexRef.current === totalEditorStates - 1) {
            playingIndexRef.current = 1;
          }
          setIsPlaying(!isPlaying);
        },
        type: "button",
        children: isPlaying ? 'Pause' : 'Play'
      }), /*#__PURE__*/jsx("input", {
        className: timeTravelPanelSliderClassName,
        ref: inputRef,
        onChange: event => {
          const editorStateIndex = Number(event.target.value);
          const timeStampedEditorState = timeStampedEditorStates[editorStateIndex];
          if (timeStampedEditorState) {
            playingIndexRef.current = editorStateIndex;
            setEditorState(timeStampedEditorState[1]);
          }
        },
        type: "range",
        min: "1",
        max: totalEditorStates - 1
      }), /*#__PURE__*/jsx("button", {
        className: timeTravelPanelButtonClassName,
        onClick: () => {
          setEditorReadOnly(false);
          const index = timeStampedEditorStates.length - 1;
          const timeStampedEditorState = timeStampedEditorStates[index];
          setEditorState(timeStampedEditorState[1]);
          const input = inputRef.current;
          if (input !== null) {
            input.value = String(index);
          }
          setTimeTravelEnabled(false);
          setIsPlaying(false);
        },
        type: "button",
        children: "Exit"
      })]
    })]
  });
});

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function registerLexicalCommandLogger(editor, setLoggedCommands) {
  const unregisterCommandListeners = new Set();
  let i = 0;
  for (const [command] of editor._commands) {
    unregisterCommandListeners.add(editor.registerCommand(command, payload => {
      setLoggedCommands(state => {
        i += 1;
        const newState = [...state];
        newState.push({
          index: i,
          payload,
          type: command.type ? command.type : 'UNKNOWN'
        });
        if (newState.length > 10) {
          newState.shift();
        }
        return newState;
      });
      return false;
    }, COMMAND_PRIORITY_CRITICAL));
  }
  return () => unregisterCommandListeners.forEach(unregister => unregister());
}
function useLexicalCommandsLog(editor) {
  const [loggedCommands, setLoggedCommands] = useState([]);
  useEffect(() => {
    return registerLexicalCommandLogger(editor, setLoggedCommands);
  }, [editor]);
  return useMemo(() => loggedCommands, [loggedCommands]);
}

export { TreeView, generateContent, registerLexicalCommandLogger, useLexicalCommandsLog };
