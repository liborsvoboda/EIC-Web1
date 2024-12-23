/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var LexicalComposerContext = require('@lexical/react/LexicalComposerContext');
var richText = require('@lexical/rich-text');
var utils = require('@lexical/utils');
var lexical = require('lexical');
var react = require('react');
var reactDom = require('react-dom');
var jsxRuntime = require('react/jsx-runtime');

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
class Point {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  equals({
    x,
    y
  }) {
    return this.x === x && this.y === y;
  }
  calcDeltaXTo({
    x
  }) {
    return this.x - x;
  }
  calcDeltaYTo({
    y
  }) {
    return this.y - y;
  }
  calcHorizontalDistanceTo(point) {
    return Math.abs(this.calcDeltaXTo(point));
  }
  calcVerticalDistance(point) {
    return Math.abs(this.calcDeltaYTo(point));
  }
  calcDistanceTo(point) {
    return Math.sqrt(Math.pow(this.calcDeltaXTo(point), 2) + Math.pow(this.calcDeltaYTo(point), 2));
  }
}
function isPoint(x) {
  return x instanceof Point;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
class Rectangle {
  constructor(left, top, right, bottom) {
    const [physicTop, physicBottom] = top <= bottom ? [top, bottom] : [bottom, top];
    const [physicLeft, physicRight] = left <= right ? [left, right] : [right, left];
    this._top = physicTop;
    this._right = physicRight;
    this._left = physicLeft;
    this._bottom = physicBottom;
  }
  get top() {
    return this._top;
  }
  get right() {
    return this._right;
  }
  get bottom() {
    return this._bottom;
  }
  get left() {
    return this._left;
  }
  get width() {
    return Math.abs(this._left - this._right);
  }
  get height() {
    return Math.abs(this._bottom - this._top);
  }
  equals({
    top,
    left,
    bottom,
    right
  }) {
    return top === this._top && bottom === this._bottom && left === this._left && right === this._right;
  }
  contains(target) {
    if (isPoint(target)) {
      const {
        x,
        y
      } = target;
      const isOnTopSide = y < this._top;
      const isOnBottomSide = y > this._bottom;
      const isOnLeftSide = x < this._left;
      const isOnRightSide = x > this._right;
      const result = !isOnTopSide && !isOnBottomSide && !isOnLeftSide && !isOnRightSide;
      return {
        reason: {
          isOnBottomSide,
          isOnLeftSide,
          isOnRightSide,
          isOnTopSide
        },
        result
      };
    } else {
      const {
        top,
        left,
        bottom,
        right
      } = target;
      return top >= this._top && top <= this._bottom && bottom >= this._top && bottom <= this._bottom && left >= this._left && left <= this._right && right >= this._left && right <= this._right;
    }
  }
  intersectsWith(rect) {
    const {
      left: x1,
      top: y1,
      width: w1,
      height: h1
    } = rect;
    const {
      left: x2,
      top: y2,
      width: w2,
      height: h2
    } = this;
    const maxX = x1 + w1 >= x2 + w2 ? x1 + w1 : x2 + w2;
    const maxY = y1 + h1 >= y2 + h2 ? y1 + h1 : y2 + h2;
    const minX = x1 <= x2 ? x1 : x2;
    const minY = y1 <= y2 ? y1 : y2;
    return maxX - minX <= w1 + w2 && maxY - minY <= h1 + h2;
  }
  generateNewRect({
    left = this.left,
    top = this.top,
    right = this.right,
    bottom = this.bottom
  }) {
    return new Rectangle(left, top, right, bottom);
  }
  static fromLTRB(left, top, right, bottom) {
    return new Rectangle(left, top, right, bottom);
  }
  static fromLWTH(left, width, top, height) {
    return new Rectangle(left, top, left + width, top + height);
  }
  static fromPoints(startPoint, endPoint) {
    const {
      y: top,
      x: left
    } = startPoint;
    const {
      y: bottom,
      x: right
    } = endPoint;
    return Rectangle.fromLTRB(left, top, right, bottom);
  }
  static fromDOM(dom) {
    const {
      top,
      width,
      left,
      height
    } = dom.getBoundingClientRect();
    return Rectangle.fromLWTH(left, width, top, height);
  }
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const SPACE = 4;
const TARGET_LINE_HALF_HEIGHT = 2;
const DRAG_DATA_FORMAT = 'application/x-lexical-drag-block';
const TEXT_BOX_HORIZONTAL_PADDING = 28;
const Downward = 1;
const Upward = -1;
const Indeterminate = 0;
let prevIndex = Infinity;
function getCurrentIndex(keysLength) {
  if (keysLength === 0) {
    return Infinity;
  }
  if (prevIndex >= 0 && prevIndex < keysLength) {
    return prevIndex;
  }
  return Math.floor(keysLength / 2);
}
function getTopLevelNodeKeys(editor) {
  return editor.getEditorState().read(() => lexical.$getRoot().getChildrenKeys());
}
function getCollapsedMargins(elem) {
  const getMargin = (element, margin) => element ? parseFloat(window.getComputedStyle(element)[margin]) : 0;
  const {
    marginTop,
    marginBottom
  } = window.getComputedStyle(elem);
  const prevElemSiblingMarginBottom = getMargin(elem.previousElementSibling, 'marginBottom');
  const nextElemSiblingMarginTop = getMargin(elem.nextElementSibling, 'marginTop');
  const collapsedTopMargin = Math.max(parseFloat(marginTop), prevElemSiblingMarginBottom);
  const collapsedBottomMargin = Math.max(parseFloat(marginBottom), nextElemSiblingMarginTop);
  return {
    marginBottom: collapsedBottomMargin,
    marginTop: collapsedTopMargin
  };
}
function getBlockElement(anchorElem, editor, event, useEdgeAsDefault = false) {
  const anchorElementRect = anchorElem.getBoundingClientRect();
  const topLevelNodeKeys = getTopLevelNodeKeys(editor);
  let blockElem = null;
  editor.getEditorState().read(() => {
    if (useEdgeAsDefault) {
      const [firstNode, lastNode] = [editor.getElementByKey(topLevelNodeKeys[0]), editor.getElementByKey(topLevelNodeKeys[topLevelNodeKeys.length - 1])];
      const [firstNodeRect, lastNodeRect] = [firstNode != null ? firstNode.getBoundingClientRect() : undefined, lastNode != null ? lastNode.getBoundingClientRect() : undefined];
      if (firstNodeRect && lastNodeRect) {
        const firstNodeZoom = utils.calculateZoomLevel(firstNode);
        const lastNodeZoom = utils.calculateZoomLevel(lastNode);
        if (event.y / firstNodeZoom < firstNodeRect.top) {
          blockElem = firstNode;
        } else if (event.y / lastNodeZoom > lastNodeRect.bottom) {
          blockElem = lastNode;
        }
        if (blockElem) {
          return;
        }
      }
    }
    let index = getCurrentIndex(topLevelNodeKeys.length);
    let direction = Indeterminate;
    while (index >= 0 && index < topLevelNodeKeys.length) {
      const key = topLevelNodeKeys[index];
      const elem = editor.getElementByKey(key);
      if (elem === null) {
        break;
      }
      const zoom = utils.calculateZoomLevel(elem);
      const point = new Point(event.x / zoom, event.y / zoom);
      const domRect = Rectangle.fromDOM(elem);
      const {
        marginTop,
        marginBottom
      } = getCollapsedMargins(elem);
      const rect = domRect.generateNewRect({
        bottom: domRect.bottom + marginBottom,
        left: anchorElementRect.left,
        right: anchorElementRect.right,
        top: domRect.top - marginTop
      });
      const {
        result,
        reason: {
          isOnTopSide,
          isOnBottomSide
        }
      } = rect.contains(point);
      if (result) {
        blockElem = elem;
        prevIndex = index;
        break;
      }
      if (direction === Indeterminate) {
        if (isOnTopSide) {
          direction = Upward;
        } else if (isOnBottomSide) {
          direction = Downward;
        } else {
          // stop search block element
          direction = Infinity;
        }
      }
      index += direction;
    }
  });
  return blockElem;
}
function setMenuPosition(targetElem, floatingElem, anchorElem) {
  if (!targetElem) {
    floatingElem.style.opacity = '0';
    floatingElem.style.transform = 'translate(-10000px, -10000px)';
    return;
  }
  const targetRect = targetElem.getBoundingClientRect();
  const targetStyle = window.getComputedStyle(targetElem);
  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();
  const top = targetRect.top + (parseInt(targetStyle.lineHeight, 10) - floatingElemRect.height) / 2 - anchorElementRect.top;
  const left = SPACE;
  floatingElem.style.opacity = '1';
  floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}
function setDragImage(dataTransfer, draggableBlockElem) {
  const {
    transform
  } = draggableBlockElem.style;

  // Remove dragImage borders
  draggableBlockElem.style.transform = 'translateZ(0)';
  dataTransfer.setDragImage(draggableBlockElem, 0, 0);
  setTimeout(() => {
    draggableBlockElem.style.transform = transform;
  });
}
function setTargetLine(targetLineElem, targetBlockElem, mouseY, anchorElem) {
  const {
    top: targetBlockElemTop,
    height: targetBlockElemHeight
  } = targetBlockElem.getBoundingClientRect();
  const {
    top: anchorTop,
    width: anchorWidth
  } = anchorElem.getBoundingClientRect();
  const {
    marginTop,
    marginBottom
  } = getCollapsedMargins(targetBlockElem);
  let lineTop = targetBlockElemTop;
  if (mouseY >= targetBlockElemTop) {
    lineTop += targetBlockElemHeight + marginBottom / 2;
  } else {
    lineTop -= marginTop / 2;
  }
  const top = lineTop - anchorTop - TARGET_LINE_HALF_HEIGHT;
  const left = TEXT_BOX_HORIZONTAL_PADDING - SPACE;
  targetLineElem.style.transform = `translate(${left}px, ${top}px)`;
  targetLineElem.style.width = `${anchorWidth - (TEXT_BOX_HORIZONTAL_PADDING - SPACE) * 2}px`;
  targetLineElem.style.opacity = '.4';
}
function hideTargetLine(targetLineElem) {
  if (targetLineElem) {
    targetLineElem.style.opacity = '0';
    targetLineElem.style.transform = 'translate(-10000px, -10000px)';
  }
}
function useDraggableBlockMenu(editor, anchorElem, menuRef, targetLineRef, isEditable, menuComponent, targetLineComponent, isOnMenu) {
  const scrollerElem = anchorElem.parentElement;
  const isDraggingBlockRef = react.useRef(false);
  const [draggableBlockElem, setDraggableBlockElem] = react.useState(null);
  react.useEffect(() => {
    function onMouseMove(event) {
      const target = event.target;
      if (target != null && !utils.isHTMLElement(target)) {
        setDraggableBlockElem(null);
        return;
      }
      if (target != null && isOnMenu(target)) {
        return;
      }
      const _draggableBlockElem = getBlockElement(anchorElem, editor, event);
      setDraggableBlockElem(_draggableBlockElem);
    }
    function onMouseLeave() {
      setDraggableBlockElem(null);
    }
    if (scrollerElem != null) {
      scrollerElem.addEventListener('mousemove', onMouseMove);
      scrollerElem.addEventListener('mouseleave', onMouseLeave);
    }
    return () => {
      if (scrollerElem != null) {
        scrollerElem.removeEventListener('mousemove', onMouseMove);
        scrollerElem.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [scrollerElem, anchorElem, editor, isOnMenu]);
  react.useEffect(() => {
    if (menuRef.current) {
      setMenuPosition(draggableBlockElem, menuRef.current, anchorElem);
    }
  }, [anchorElem, draggableBlockElem, menuRef]);
  react.useEffect(() => {
    function onDragover(event) {
      if (!isDraggingBlockRef.current) {
        return false;
      }
      const [isFileTransfer] = richText.eventFiles(event);
      if (isFileTransfer) {
        return false;
      }
      const {
        pageY,
        target
      } = event;
      if (target != null && !utils.isHTMLElement(target)) {
        return false;
      }
      const targetBlockElem = getBlockElement(anchorElem, editor, event, true);
      const targetLineElem = targetLineRef.current;
      if (targetBlockElem === null || targetLineElem === null) {
        return false;
      }
      setTargetLine(targetLineElem, targetBlockElem, pageY / utils.calculateZoomLevel(target), anchorElem);
      // Prevent default event to be able to trigger onDrop events
      event.preventDefault();
      return true;
    }
    function $onDrop(event) {
      if (!isDraggingBlockRef.current) {
        return false;
      }
      const [isFileTransfer] = richText.eventFiles(event);
      if (isFileTransfer) {
        return false;
      }
      const {
        target,
        dataTransfer,
        pageY
      } = event;
      const dragData = dataTransfer != null ? dataTransfer.getData(DRAG_DATA_FORMAT) : '';
      const draggedNode = lexical.$getNodeByKey(dragData);
      if (!draggedNode) {
        return false;
      }
      if (target != null && !utils.isHTMLElement(target)) {
        return false;
      }
      const targetBlockElem = getBlockElement(anchorElem, editor, event, true);
      if (!targetBlockElem) {
        return false;
      }
      const targetNode = lexical.$getNearestNodeFromDOMNode(targetBlockElem);
      if (!targetNode) {
        return false;
      }
      if (targetNode === draggedNode) {
        return true;
      }
      const targetBlockElemTop = targetBlockElem.getBoundingClientRect().top;
      if (pageY / utils.calculateZoomLevel(target) >= targetBlockElemTop) {
        targetNode.insertAfter(draggedNode);
      } else {
        targetNode.insertBefore(draggedNode);
      }
      setDraggableBlockElem(null);
      return true;
    }
    return utils.mergeRegister(editor.registerCommand(lexical.DRAGOVER_COMMAND, event => {
      return onDragover(event);
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.DROP_COMMAND, event => {
      return $onDrop(event);
    }, lexical.COMMAND_PRIORITY_HIGH));
  }, [anchorElem, editor, targetLineRef]);
  function onDragStart(event) {
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer || !draggableBlockElem) {
      return;
    }
    setDragImage(dataTransfer, draggableBlockElem);
    let nodeKey = '';
    editor.update(() => {
      const node = lexical.$getNearestNodeFromDOMNode(draggableBlockElem);
      if (node) {
        nodeKey = node.getKey();
      }
    });
    isDraggingBlockRef.current = true;
    dataTransfer.setData(DRAG_DATA_FORMAT, nodeKey);
  }
  function onDragEnd() {
    isDraggingBlockRef.current = false;
    hideTargetLine(targetLineRef.current);
  }
  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx("div", {
      draggable: true,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
      children: isEditable && menuComponent
    }), targetLineComponent]
  }), anchorElem);
}
function DraggableBlockPlugin_EXPERIMENTAL({
  anchorElem = document.body,
  menuRef,
  targetLineRef,
  menuComponent,
  targetLineComponent,
  isOnMenu
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  return useDraggableBlockMenu(editor, anchorElem, menuRef, targetLineRef, editor._editable, menuComponent, targetLineComponent, isOnMenu);
}

exports.DraggableBlockPlugin_EXPERIMENTAL = DraggableBlockPlugin_EXPERIMENTAL;
