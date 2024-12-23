/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var utils = require('@lexical/utils');
var lexical = require('lexical');

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const PIXEL_VALUE_REG_EXP = /^(\d+(?:\.\d+)?)px$/;

// .PlaygroundEditorTheme__tableCell width value from
// packages/lexical-playground/src/themes/PlaygroundEditorTheme.css
const COLUMN_WIDTH = 75;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const TableCellHeaderStates = {
  BOTH: 3,
  COLUMN: 2,
  NO_STATUS: 0,
  ROW: 1
};
/** @noInheritDoc */
class TableCellNode extends lexical.ElementNode {
  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  static getType() {
    return 'tablecell';
  }
  static clone(node) {
    const cellNode = new TableCellNode(node.__headerState, node.__colSpan, node.__width, node.__key);
    cellNode.__rowSpan = node.__rowSpan;
    cellNode.__backgroundColor = node.__backgroundColor;
    return cellNode;
  }
  static importDOM() {
    return {
      td: node => ({
        conversion: $convertTableCellNodeElement,
        priority: 0
      }),
      th: node => ({
        conversion: $convertTableCellNodeElement,
        priority: 0
      })
    };
  }
  static importJSON(serializedNode) {
    const colSpan = serializedNode.colSpan || 1;
    const rowSpan = serializedNode.rowSpan || 1;
    const cellNode = $createTableCellNode(serializedNode.headerState, colSpan, serializedNode.width || undefined);
    cellNode.__rowSpan = rowSpan;
    cellNode.__backgroundColor = serializedNode.backgroundColor || null;
    return cellNode;
  }
  constructor(headerState = TableCellHeaderStates.NO_STATUS, colSpan = 1, width, key) {
    super(key);
    this.__colSpan = colSpan;
    this.__rowSpan = 1;
    this.__headerState = headerState;
    this.__width = width;
    this.__backgroundColor = null;
  }
  createDOM(config) {
    const element = document.createElement(this.getTag());
    if (this.__width) {
      element.style.width = `${this.__width}px`;
    }
    if (this.__colSpan > 1) {
      element.colSpan = this.__colSpan;
    }
    if (this.__rowSpan > 1) {
      element.rowSpan = this.__rowSpan;
    }
    if (this.__backgroundColor !== null) {
      element.style.backgroundColor = this.__backgroundColor;
    }
    utils.addClassNamesToElement(element, config.theme.tableCell, this.hasHeader() && config.theme.tableCellHeader);
    return element;
  }
  exportDOM(editor) {
    const {
      element
    } = super.exportDOM(editor);
    if (element) {
      const element_ = element;
      element_.style.border = '1px solid black';
      if (this.__colSpan > 1) {
        element_.colSpan = this.__colSpan;
      }
      if (this.__rowSpan > 1) {
        element_.rowSpan = this.__rowSpan;
      }
      element_.style.width = `${this.getWidth() || COLUMN_WIDTH}px`;
      element_.style.verticalAlign = 'top';
      element_.style.textAlign = 'start';
      const backgroundColor = this.getBackgroundColor();
      if (backgroundColor !== null) {
        element_.style.backgroundColor = backgroundColor;
      } else if (this.hasHeader()) {
        element_.style.backgroundColor = '#f2f3f5';
      }
    }
    return {
      element
    };
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      backgroundColor: this.getBackgroundColor(),
      colSpan: this.__colSpan,
      headerState: this.__headerState,
      rowSpan: this.__rowSpan,
      type: 'tablecell',
      width: this.getWidth()
    };
  }
  getColSpan() {
    return this.__colSpan;
  }
  setColSpan(colSpan) {
    this.getWritable().__colSpan = colSpan;
    return this;
  }
  getRowSpan() {
    return this.__rowSpan;
  }
  setRowSpan(rowSpan) {
    this.getWritable().__rowSpan = rowSpan;
    return this;
  }
  getTag() {
    return this.hasHeader() ? 'th' : 'td';
  }
  setHeaderStyles(headerState) {
    const self = this.getWritable();
    self.__headerState = headerState;
    return this.__headerState;
  }
  getHeaderStyles() {
    return this.getLatest().__headerState;
  }
  setWidth(width) {
    const self = this.getWritable();
    self.__width = width;
    return this.__width;
  }
  getWidth() {
    return this.getLatest().__width;
  }
  getBackgroundColor() {
    return this.getLatest().__backgroundColor;
  }
  setBackgroundColor(newBackgroundColor) {
    this.getWritable().__backgroundColor = newBackgroundColor;
  }
  toggleHeaderStyle(headerStateToToggle) {
    const self = this.getWritable();
    if ((self.__headerState & headerStateToToggle) === headerStateToToggle) {
      self.__headerState -= headerStateToToggle;
    } else {
      self.__headerState += headerStateToToggle;
    }
    return self;
  }
  hasHeaderState(headerState) {
    return (this.getHeaderStyles() & headerState) === headerState;
  }
  hasHeader() {
    return this.getLatest().__headerState !== TableCellHeaderStates.NO_STATUS;
  }
  updateDOM(prevNode) {
    return prevNode.__headerState !== this.__headerState || prevNode.__width !== this.__width || prevNode.__colSpan !== this.__colSpan || prevNode.__rowSpan !== this.__rowSpan || prevNode.__backgroundColor !== this.__backgroundColor;
  }
  isShadowRoot() {
    return true;
  }
  collapseAtStart() {
    return true;
  }
  canBeEmpty() {
    return false;
  }
  canIndent() {
    return false;
  }
}
function $convertTableCellNodeElement(domNode) {
  const domNode_ = domNode;
  const nodeName = domNode.nodeName.toLowerCase();
  let width = undefined;
  if (PIXEL_VALUE_REG_EXP.test(domNode_.style.width)) {
    width = parseFloat(domNode_.style.width);
  }
  const tableCellNode = $createTableCellNode(nodeName === 'th' ? TableCellHeaderStates.ROW : TableCellHeaderStates.NO_STATUS, domNode_.colSpan, width);
  tableCellNode.__rowSpan = domNode_.rowSpan;
  const backgroundColor = domNode_.style.backgroundColor;
  if (backgroundColor !== '') {
    tableCellNode.__backgroundColor = backgroundColor;
  }
  const style = domNode_.style;
  const textDecoration = style.textDecoration.split(' ');
  const hasBoldFontWeight = style.fontWeight === '700' || style.fontWeight === 'bold';
  const hasLinethroughTextDecoration = textDecoration.includes('line-through');
  const hasItalicFontStyle = style.fontStyle === 'italic';
  const hasUnderlineTextDecoration = textDecoration.includes('underline');
  return {
    after: childLexicalNodes => {
      if (childLexicalNodes.length === 0) {
        childLexicalNodes.push(lexical.$createParagraphNode());
      }
      return childLexicalNodes;
    },
    forChild: (lexicalNode, parentLexicalNode) => {
      if ($isTableCellNode(parentLexicalNode) && !lexical.$isElementNode(lexicalNode)) {
        const paragraphNode = lexical.$createParagraphNode();
        if (lexical.$isLineBreakNode(lexicalNode) && lexicalNode.getTextContent() === '\n') {
          return null;
        }
        if (lexical.$isTextNode(lexicalNode)) {
          if (hasBoldFontWeight) {
            lexicalNode.toggleFormat('bold');
          }
          if (hasLinethroughTextDecoration) {
            lexicalNode.toggleFormat('strikethrough');
          }
          if (hasItalicFontStyle) {
            lexicalNode.toggleFormat('italic');
          }
          if (hasUnderlineTextDecoration) {
            lexicalNode.toggleFormat('underline');
          }
        }
        paragraphNode.append(lexicalNode);
        return paragraphNode;
      }
      return lexicalNode;
    },
    node: tableCellNode
  };
}
function $createTableCellNode(headerState, colSpan = 1, width) {
  return lexical.$applyNodeReplacement(new TableCellNode(headerState, colSpan, width));
}
function $isTableCellNode(node) {
  return node instanceof TableCellNode;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const INSERT_TABLE_COMMAND = lexical.createCommand('INSERT_TABLE_COMMAND');

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/** @noInheritDoc */
class TableRowNode extends lexical.ElementNode {
  /** @internal */

  static getType() {
    return 'tablerow';
  }
  static clone(node) {
    return new TableRowNode(node.__height, node.__key);
  }
  static importDOM() {
    return {
      tr: node => ({
        conversion: $convertTableRowElement,
        priority: 0
      })
    };
  }
  static importJSON(serializedNode) {
    return $createTableRowNode(serializedNode.height);
  }
  constructor(height, key) {
    super(key);
    this.__height = height;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      ...(this.getHeight() && {
        height: this.getHeight()
      }),
      type: 'tablerow',
      version: 1
    };
  }
  createDOM(config) {
    const element = document.createElement('tr');
    if (this.__height) {
      element.style.height = `${this.__height}px`;
    }
    utils.addClassNamesToElement(element, config.theme.tableRow);
    return element;
  }
  isShadowRoot() {
    return true;
  }
  setHeight(height) {
    const self = this.getWritable();
    self.__height = height;
    return this.__height;
  }
  getHeight() {
    return this.getLatest().__height;
  }
  updateDOM(prevNode) {
    return prevNode.__height !== this.__height;
  }
  canBeEmpty() {
    return false;
  }
  canIndent() {
    return false;
  }
}
function $convertTableRowElement(domNode) {
  const domNode_ = domNode;
  let height = undefined;
  if (PIXEL_VALUE_REG_EXP.test(domNode_.style.height)) {
    height = parseFloat(domNode_.style.height);
  }
  return {
    node: $createTableRowNode(height)
  };
}
function $createTableRowNode(height) {
  return lexical.$applyNodeReplacement(new TableRowNode(height));
}
function $isTableRowNode(node) {
  return node instanceof TableRowNode;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const CAN_USE_DOM = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined';

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function $createTableNodeWithDimensions(rowCount, columnCount, includeHeaders = true) {
  const tableNode = $createTableNode();
  for (let iRow = 0; iRow < rowCount; iRow++) {
    const tableRowNode = $createTableRowNode();
    for (let iColumn = 0; iColumn < columnCount; iColumn++) {
      let headerState = TableCellHeaderStates.NO_STATUS;
      if (typeof includeHeaders === 'object') {
        if (iRow === 0 && includeHeaders.rows) {
          headerState |= TableCellHeaderStates.ROW;
        }
        if (iColumn === 0 && includeHeaders.columns) {
          headerState |= TableCellHeaderStates.COLUMN;
        }
      } else if (includeHeaders) {
        if (iRow === 0) {
          headerState |= TableCellHeaderStates.ROW;
        }
        if (iColumn === 0) {
          headerState |= TableCellHeaderStates.COLUMN;
        }
      }
      const tableCellNode = $createTableCellNode(headerState);
      const paragraphNode = lexical.$createParagraphNode();
      paragraphNode.append(lexical.$createTextNode());
      tableCellNode.append(paragraphNode);
      tableRowNode.append(tableCellNode);
    }
    tableNode.append(tableRowNode);
  }
  return tableNode;
}
function $getTableCellNodeFromLexicalNode(startingNode) {
  const node = utils.$findMatchingParent(startingNode, n => $isTableCellNode(n));
  if ($isTableCellNode(node)) {
    return node;
  }
  return null;
}
function $getTableRowNodeFromTableCellNodeOrThrow(startingNode) {
  const node = utils.$findMatchingParent(startingNode, n => $isTableRowNode(n));
  if ($isTableRowNode(node)) {
    return node;
  }
  throw new Error('Expected table cell to be inside of table row.');
}
function $getTableNodeFromLexicalNodeOrThrow(startingNode) {
  const node = utils.$findMatchingParent(startingNode, n => $isTableNode(n));
  if ($isTableNode(node)) {
    return node;
  }
  throw new Error('Expected table cell to be inside of table.');
}
function $getTableRowIndexFromTableCellNode(tableCellNode) {
  const tableRowNode = $getTableRowNodeFromTableCellNodeOrThrow(tableCellNode);
  const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableRowNode);
  return tableNode.getChildren().findIndex(n => n.is(tableRowNode));
}
function $getTableColumnIndexFromTableCellNode(tableCellNode) {
  const tableRowNode = $getTableRowNodeFromTableCellNodeOrThrow(tableCellNode);
  return tableRowNode.getChildren().findIndex(n => n.is(tableCellNode));
}
function $getTableCellSiblingsFromTableCellNode(tableCellNode, table) {
  const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
  const {
    x,
    y
  } = tableNode.getCordsFromCellNode(tableCellNode, table);
  return {
    above: tableNode.getCellNodeFromCords(x, y - 1, table),
    below: tableNode.getCellNodeFromCords(x, y + 1, table),
    left: tableNode.getCellNodeFromCords(x - 1, y, table),
    right: tableNode.getCellNodeFromCords(x + 1, y, table)
  };
}
function $removeTableRowAtIndex(tableNode, indexToDelete) {
  const tableRows = tableNode.getChildren();
  if (indexToDelete >= tableRows.length || indexToDelete < 0) {
    throw new Error('Expected table cell to be inside of table row.');
  }
  const targetRowNode = tableRows[indexToDelete];
  targetRowNode.remove();
  return tableNode;
}
function $insertTableRow(tableNode, targetIndex, shouldInsertAfter = true, rowCount, table) {
  const tableRows = tableNode.getChildren();
  if (targetIndex >= tableRows.length || targetIndex < 0) {
    throw new Error('Table row target index out of range');
  }
  const targetRowNode = tableRows[targetIndex];
  if ($isTableRowNode(targetRowNode)) {
    for (let r = 0; r < rowCount; r++) {
      const tableRowCells = targetRowNode.getChildren();
      const tableColumnCount = tableRowCells.length;
      const newTableRowNode = $createTableRowNode();
      for (let c = 0; c < tableColumnCount; c++) {
        const tableCellFromTargetRow = tableRowCells[c];
        if (!$isTableCellNode(tableCellFromTargetRow)) {
          throw Error(`Expected table cell`);
        }
        const {
          above,
          below
        } = $getTableCellSiblingsFromTableCellNode(tableCellFromTargetRow, table);
        let headerState = TableCellHeaderStates.NO_STATUS;
        const width = above && above.getWidth() || below && below.getWidth() || undefined;
        if (above && above.hasHeaderState(TableCellHeaderStates.COLUMN) || below && below.hasHeaderState(TableCellHeaderStates.COLUMN)) {
          headerState |= TableCellHeaderStates.COLUMN;
        }
        const tableCellNode = $createTableCellNode(headerState, 1, width);
        tableCellNode.append(lexical.$createParagraphNode());
        newTableRowNode.append(tableCellNode);
      }
      if (shouldInsertAfter) {
        targetRowNode.insertAfter(newTableRowNode);
      } else {
        targetRowNode.insertBefore(newTableRowNode);
      }
    }
  } else {
    throw new Error('Row before insertion index does not exist.');
  }
  return tableNode;
}
const getHeaderState = (currentState, possibleState) => {
  if (currentState === TableCellHeaderStates.BOTH || currentState === possibleState) {
    return possibleState;
  }
  return TableCellHeaderStates.NO_STATUS;
};
function $insertTableRow__EXPERIMENTAL(insertAfter = true) {
  const selection = lexical.$getSelection();
  if (!(lexical.$isRangeSelection(selection) || $isTableSelection(selection))) {
    throw Error(`Expected a RangeSelection or TableSelection`);
  }
  const focus = selection.focus.getNode();
  const [focusCell,, grid] = $getNodeTriplet(focus);
  const [gridMap, focusCellMap] = $computeTableMap(grid, focusCell, focusCell);
  const columnCount = gridMap[0].length;
  const {
    startRow: focusStartRow
  } = focusCellMap;
  if (insertAfter) {
    const focusEndRow = focusStartRow + focusCell.__rowSpan - 1;
    const focusEndRowMap = gridMap[focusEndRow];
    const newRow = $createTableRowNode();
    for (let i = 0; i < columnCount; i++) {
      const {
        cell,
        startRow
      } = focusEndRowMap[i];
      if (startRow + cell.__rowSpan - 1 <= focusEndRow) {
        const currentCell = focusEndRowMap[i].cell;
        const currentCellHeaderState = currentCell.__headerState;
        const headerState = getHeaderState(currentCellHeaderState, TableCellHeaderStates.COLUMN);
        newRow.append($createTableCellNode(headerState).append(lexical.$createParagraphNode()));
      } else {
        cell.setRowSpan(cell.__rowSpan + 1);
      }
    }
    const focusEndRowNode = grid.getChildAtIndex(focusEndRow);
    if (!$isTableRowNode(focusEndRowNode)) {
      throw Error(`focusEndRow is not a TableRowNode`);
    }
    focusEndRowNode.insertAfter(newRow);
  } else {
    const focusStartRowMap = gridMap[focusStartRow];
    const newRow = $createTableRowNode();
    for (let i = 0; i < columnCount; i++) {
      const {
        cell,
        startRow
      } = focusStartRowMap[i];
      if (startRow === focusStartRow) {
        const currentCell = focusStartRowMap[i].cell;
        const currentCellHeaderState = currentCell.__headerState;
        const headerState = getHeaderState(currentCellHeaderState, TableCellHeaderStates.COLUMN);
        newRow.append($createTableCellNode(headerState).append(lexical.$createParagraphNode()));
      } else {
        cell.setRowSpan(cell.__rowSpan + 1);
      }
    }
    const focusStartRowNode = grid.getChildAtIndex(focusStartRow);
    if (!$isTableRowNode(focusStartRowNode)) {
      throw Error(`focusEndRow is not a TableRowNode`);
    }
    focusStartRowNode.insertBefore(newRow);
  }
}
function $insertTableColumn(tableNode, targetIndex, shouldInsertAfter = true, columnCount, table) {
  const tableRows = tableNode.getChildren();
  const tableCellsToBeInserted = [];
  for (let r = 0; r < tableRows.length; r++) {
    const currentTableRowNode = tableRows[r];
    if ($isTableRowNode(currentTableRowNode)) {
      for (let c = 0; c < columnCount; c++) {
        const tableRowChildren = currentTableRowNode.getChildren();
        if (targetIndex >= tableRowChildren.length || targetIndex < 0) {
          throw new Error('Table column target index out of range');
        }
        const targetCell = tableRowChildren[targetIndex];
        if (!$isTableCellNode(targetCell)) {
          throw Error(`Expected table cell`);
        }
        const {
          left,
          right
        } = $getTableCellSiblingsFromTableCellNode(targetCell, table);
        let headerState = TableCellHeaderStates.NO_STATUS;
        if (left && left.hasHeaderState(TableCellHeaderStates.ROW) || right && right.hasHeaderState(TableCellHeaderStates.ROW)) {
          headerState |= TableCellHeaderStates.ROW;
        }
        const newTableCell = $createTableCellNode(headerState);
        newTableCell.append(lexical.$createParagraphNode());
        tableCellsToBeInserted.push({
          newTableCell,
          targetCell
        });
      }
    }
  }
  tableCellsToBeInserted.forEach(({
    newTableCell,
    targetCell
  }) => {
    if (shouldInsertAfter) {
      targetCell.insertAfter(newTableCell);
    } else {
      targetCell.insertBefore(newTableCell);
    }
  });
  return tableNode;
}
function $insertTableColumn__EXPERIMENTAL(insertAfter = true) {
  const selection = lexical.$getSelection();
  if (!(lexical.$isRangeSelection(selection) || $isTableSelection(selection))) {
    throw Error(`Expected a RangeSelection or TableSelection`);
  }
  const anchor = selection.anchor.getNode();
  const focus = selection.focus.getNode();
  const [anchorCell] = $getNodeTriplet(anchor);
  const [focusCell,, grid] = $getNodeTriplet(focus);
  const [gridMap, focusCellMap, anchorCellMap] = $computeTableMap(grid, focusCell, anchorCell);
  const rowCount = gridMap.length;
  const startColumn = insertAfter ? Math.max(focusCellMap.startColumn, anchorCellMap.startColumn) : Math.min(focusCellMap.startColumn, anchorCellMap.startColumn);
  const insertAfterColumn = insertAfter ? startColumn + focusCell.__colSpan - 1 : startColumn - 1;
  const gridFirstChild = grid.getFirstChild();
  if (!$isTableRowNode(gridFirstChild)) {
    throw Error(`Expected firstTable child to be a row`);
  }
  let firstInsertedCell = null;
  function $createTableCellNodeForInsertTableColumn(headerState = TableCellHeaderStates.NO_STATUS) {
    const cell = $createTableCellNode(headerState).append(lexical.$createParagraphNode());
    if (firstInsertedCell === null) {
      firstInsertedCell = cell;
    }
    return cell;
  }
  let loopRow = gridFirstChild;
  rowLoop: for (let i = 0; i < rowCount; i++) {
    if (i !== 0) {
      const currentRow = loopRow.getNextSibling();
      if (!$isTableRowNode(currentRow)) {
        throw Error(`Expected row nextSibling to be a row`);
      }
      loopRow = currentRow;
    }
    const rowMap = gridMap[i];
    const currentCellHeaderState = rowMap[insertAfterColumn < 0 ? 0 : insertAfterColumn].cell.__headerState;
    const headerState = getHeaderState(currentCellHeaderState, TableCellHeaderStates.ROW);
    if (insertAfterColumn < 0) {
      $insertFirst(loopRow, $createTableCellNodeForInsertTableColumn(headerState));
      continue;
    }
    const {
      cell: currentCell,
      startColumn: currentStartColumn,
      startRow: currentStartRow
    } = rowMap[insertAfterColumn];
    if (currentStartColumn + currentCell.__colSpan - 1 <= insertAfterColumn) {
      let insertAfterCell = currentCell;
      let insertAfterCellRowStart = currentStartRow;
      let prevCellIndex = insertAfterColumn;
      while (insertAfterCellRowStart !== i && insertAfterCell.__rowSpan > 1) {
        prevCellIndex -= currentCell.__colSpan;
        if (prevCellIndex >= 0) {
          const {
            cell: cell_,
            startRow: startRow_
          } = rowMap[prevCellIndex];
          insertAfterCell = cell_;
          insertAfterCellRowStart = startRow_;
        } else {
          loopRow.append($createTableCellNodeForInsertTableColumn(headerState));
          continue rowLoop;
        }
      }
      insertAfterCell.insertAfter($createTableCellNodeForInsertTableColumn(headerState));
    } else {
      currentCell.setColSpan(currentCell.__colSpan + 1);
    }
  }
  if (firstInsertedCell !== null) {
    $moveSelectionToCell(firstInsertedCell);
  }
}
function $deleteTableColumn(tableNode, targetIndex) {
  const tableRows = tableNode.getChildren();
  for (let i = 0; i < tableRows.length; i++) {
    const currentTableRowNode = tableRows[i];
    if ($isTableRowNode(currentTableRowNode)) {
      const tableRowChildren = currentTableRowNode.getChildren();
      if (targetIndex >= tableRowChildren.length || targetIndex < 0) {
        throw new Error('Table column target index out of range');
      }
      tableRowChildren[targetIndex].remove();
    }
  }
  return tableNode;
}
function $deleteTableRow__EXPERIMENTAL() {
  const selection = lexical.$getSelection();
  if (!(lexical.$isRangeSelection(selection) || $isTableSelection(selection))) {
    throw Error(`Expected a RangeSelection or TableSelection`);
  }
  const anchor = selection.anchor.getNode();
  const focus = selection.focus.getNode();
  const [anchorCell,, grid] = $getNodeTriplet(anchor);
  const [focusCell] = $getNodeTriplet(focus);
  const [gridMap, anchorCellMap, focusCellMap] = $computeTableMap(grid, anchorCell, focusCell);
  const {
    startRow: anchorStartRow
  } = anchorCellMap;
  const {
    startRow: focusStartRow
  } = focusCellMap;
  const focusEndRow = focusStartRow + focusCell.__rowSpan - 1;
  if (gridMap.length === focusEndRow - anchorStartRow + 1) {
    // Empty grid
    grid.remove();
    return;
  }
  const columnCount = gridMap[0].length;
  const nextRow = gridMap[focusEndRow + 1];
  const nextRowNode = grid.getChildAtIndex(focusEndRow + 1);
  for (let row = focusEndRow; row >= anchorStartRow; row--) {
    for (let column = columnCount - 1; column >= 0; column--) {
      const {
        cell,
        startRow: cellStartRow,
        startColumn: cellStartColumn
      } = gridMap[row][column];
      if (cellStartColumn !== column) {
        // Don't repeat work for the same Cell
        continue;
      }
      // Rows overflowing top have to be trimmed
      if (row === anchorStartRow && cellStartRow < anchorStartRow) {
        cell.setRowSpan(cell.__rowSpan - (cellStartRow - anchorStartRow));
      }
      // Rows overflowing bottom have to be trimmed and moved to the next row
      if (cellStartRow >= anchorStartRow && cellStartRow + cell.__rowSpan - 1 > focusEndRow) {
        cell.setRowSpan(cell.__rowSpan - (focusEndRow - cellStartRow + 1));
        if (!(nextRowNode !== null)) {
          throw Error(`Expected nextRowNode not to be null`);
        }
        if (column === 0) {
          $insertFirst(nextRowNode, cell);
        } else {
          const {
            cell: previousCell
          } = nextRow[column - 1];
          previousCell.insertAfter(cell);
        }
      }
    }
    const rowNode = grid.getChildAtIndex(row);
    if (!$isTableRowNode(rowNode)) {
      throw Error(`Expected GridNode childAtIndex(${String(row)}) to be RowNode`);
    }
    rowNode.remove();
  }
  if (nextRow !== undefined) {
    const {
      cell
    } = nextRow[0];
    $moveSelectionToCell(cell);
  } else {
    const previousRow = gridMap[anchorStartRow - 1];
    const {
      cell
    } = previousRow[0];
    $moveSelectionToCell(cell);
  }
}
function $deleteTableColumn__EXPERIMENTAL() {
  const selection = lexical.$getSelection();
  if (!(lexical.$isRangeSelection(selection) || $isTableSelection(selection))) {
    throw Error(`Expected a RangeSelection or TableSelection`);
  }
  const anchor = selection.anchor.getNode();
  const focus = selection.focus.getNode();
  const [anchorCell,, grid] = $getNodeTriplet(anchor);
  const [focusCell] = $getNodeTriplet(focus);
  const [gridMap, anchorCellMap, focusCellMap] = $computeTableMap(grid, anchorCell, focusCell);
  const {
    startColumn: anchorStartColumn
  } = anchorCellMap;
  const {
    startRow: focusStartRow,
    startColumn: focusStartColumn
  } = focusCellMap;
  const startColumn = Math.min(anchorStartColumn, focusStartColumn);
  const endColumn = Math.max(anchorStartColumn + anchorCell.__colSpan - 1, focusStartColumn + focusCell.__colSpan - 1);
  const selectedColumnCount = endColumn - startColumn + 1;
  const columnCount = gridMap[0].length;
  if (columnCount === endColumn - startColumn + 1) {
    // Empty grid
    grid.selectPrevious();
    grid.remove();
    return;
  }
  const rowCount = gridMap.length;
  for (let row = 0; row < rowCount; row++) {
    for (let column = startColumn; column <= endColumn; column++) {
      const {
        cell,
        startColumn: cellStartColumn
      } = gridMap[row][column];
      if (cellStartColumn < startColumn) {
        if (column === startColumn) {
          const overflowLeft = startColumn - cellStartColumn;
          // Overflowing left
          cell.setColSpan(cell.__colSpan -
          // Possible overflow right too
          Math.min(selectedColumnCount, cell.__colSpan - overflowLeft));
        }
      } else if (cellStartColumn + cell.__colSpan - 1 > endColumn) {
        if (column === endColumn) {
          // Overflowing right
          const inSelectedArea = endColumn - cellStartColumn + 1;
          cell.setColSpan(cell.__colSpan - inSelectedArea);
        }
      } else {
        cell.remove();
      }
    }
  }
  const focusRowMap = gridMap[focusStartRow];
  const nextColumn = anchorStartColumn > focusStartColumn ? focusRowMap[anchorStartColumn + anchorCell.__colSpan] : focusRowMap[focusStartColumn + focusCell.__colSpan];
  if (nextColumn !== undefined) {
    const {
      cell
    } = nextColumn;
    $moveSelectionToCell(cell);
  } else {
    const previousRow = focusStartColumn < anchorStartColumn ? focusRowMap[focusStartColumn - 1] : focusRowMap[anchorStartColumn - 1];
    const {
      cell
    } = previousRow;
    $moveSelectionToCell(cell);
  }
}
function $moveSelectionToCell(cell) {
  const firstDescendant = cell.getFirstDescendant();
  if (firstDescendant == null) {
    cell.selectStart();
  } else {
    firstDescendant.getParentOrThrow().selectStart();
  }
}
function $insertFirst(parent, node) {
  const firstChild = parent.getFirstChild();
  if (firstChild !== null) {
    firstChild.insertBefore(node);
  } else {
    parent.append(node);
  }
}
function $unmergeCell() {
  const selection = lexical.$getSelection();
  if (!(lexical.$isRangeSelection(selection) || $isTableSelection(selection))) {
    throw Error(`Expected a RangeSelection or TableSelection`);
  }
  const anchor = selection.anchor.getNode();
  const [cell, row, grid] = $getNodeTriplet(anchor);
  const colSpan = cell.__colSpan;
  const rowSpan = cell.__rowSpan;
  if (colSpan > 1) {
    for (let i = 1; i < colSpan; i++) {
      cell.insertAfter($createTableCellNode(TableCellHeaderStates.NO_STATUS));
    }
    cell.setColSpan(1);
  }
  if (rowSpan > 1) {
    const [map, cellMap] = $computeTableMap(grid, cell, cell);
    const {
      startColumn,
      startRow
    } = cellMap;
    let currentRowNode;
    for (let i = 1; i < rowSpan; i++) {
      const currentRow = startRow + i;
      const currentRowMap = map[currentRow];
      currentRowNode = (currentRowNode || row).getNextSibling();
      if (!$isTableRowNode(currentRowNode)) {
        throw Error(`Expected row next sibling to be a row`);
      }
      let insertAfterCell = null;
      for (let column = 0; column < startColumn; column++) {
        const currentCellMap = currentRowMap[column];
        const currentCell = currentCellMap.cell;
        if (currentCellMap.startRow === currentRow) {
          insertAfterCell = currentCell;
        }
        if (currentCell.__colSpan > 1) {
          column += currentCell.__colSpan - 1;
        }
      }
      if (insertAfterCell === null) {
        for (let j = 0; j < colSpan; j++) {
          $insertFirst(currentRowNode, $createTableCellNode(TableCellHeaderStates.NO_STATUS));
        }
      } else {
        for (let j = 0; j < colSpan; j++) {
          insertAfterCell.insertAfter($createTableCellNode(TableCellHeaderStates.NO_STATUS));
        }
      }
    }
    cell.setRowSpan(1);
  }
}
function $computeTableMap(grid, cellA, cellB) {
  const [tableMap, cellAValue, cellBValue] = $computeTableMapSkipCellCheck(grid, cellA, cellB);
  if (!(cellAValue !== null)) {
    throw Error(`Anchor not found in Grid`);
  }
  if (!(cellBValue !== null)) {
    throw Error(`Focus not found in Grid`);
  }
  return [tableMap, cellAValue, cellBValue];
}
function $computeTableMapSkipCellCheck(grid, cellA, cellB) {
  const tableMap = [];
  let cellAValue = null;
  let cellBValue = null;
  function write(startRow, startColumn, cell) {
    const value = {
      cell,
      startColumn,
      startRow
    };
    const rowSpan = cell.__rowSpan;
    const colSpan = cell.__colSpan;
    for (let i = 0; i < rowSpan; i++) {
      if (tableMap[startRow + i] === undefined) {
        tableMap[startRow + i] = [];
      }
      for (let j = 0; j < colSpan; j++) {
        tableMap[startRow + i][startColumn + j] = value;
      }
    }
    if (cellA !== null && cellA.is(cell)) {
      cellAValue = value;
    }
    if (cellB !== null && cellB.is(cell)) {
      cellBValue = value;
    }
  }
  function isEmpty(row, column) {
    return tableMap[row] === undefined || tableMap[row][column] === undefined;
  }
  const gridChildren = grid.getChildren();
  for (let i = 0; i < gridChildren.length; i++) {
    const row = gridChildren[i];
    if (!$isTableRowNode(row)) {
      throw Error(`Expected GridNode children to be TableRowNode`);
    }
    const rowChildren = row.getChildren();
    let j = 0;
    for (const cell of rowChildren) {
      if (!$isTableCellNode(cell)) {
        throw Error(`Expected TableRowNode children to be TableCellNode`);
      }
      while (!isEmpty(i, j)) {
        j++;
      }
      write(i, j, cell);
      j += cell.__colSpan;
    }
  }
  return [tableMap, cellAValue, cellBValue];
}
function $getNodeTriplet(source) {
  let cell;
  if (source instanceof TableCellNode) {
    cell = source;
  } else if ('__type' in source) {
    const cell_ = utils.$findMatchingParent(source, $isTableCellNode);
    if (!$isTableCellNode(cell_)) {
      throw Error(`Expected to find a parent TableCellNode`);
    }
    cell = cell_;
  } else {
    const cell_ = utils.$findMatchingParent(source.getNode(), $isTableCellNode);
    if (!$isTableCellNode(cell_)) {
      throw Error(`Expected to find a parent TableCellNode`);
    }
    cell = cell_;
  }
  const row = cell.getParent();
  if (!$isTableRowNode(row)) {
    throw Error(`Expected TableCellNode to have a parent TableRowNode`);
  }
  const grid = row.getParent();
  if (!$isTableNode(grid)) {
    throw Error(`Expected TableRowNode to have a parent GridNode`);
  }
  return [cell, row, grid];
}
function $getTableCellNodeRect(tableCellNode) {
  const [cellNode,, gridNode] = $getNodeTriplet(tableCellNode);
  const rows = gridNode.getChildren();
  const rowCount = rows.length;
  const columnCount = rows[0].getChildren().length;

  // Create a matrix of the same size as the table to track the position of each cell
  const cellMatrix = new Array(rowCount);
  for (let i = 0; i < rowCount; i++) {
    cellMatrix[i] = new Array(columnCount);
  }
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const row = rows[rowIndex];
    const cells = row.getChildren();
    let columnIndex = 0;
    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      // Find the next available position in the matrix, skip the position of merged cells
      while (cellMatrix[rowIndex][columnIndex]) {
        columnIndex++;
      }
      const cell = cells[cellIndex];
      const rowSpan = cell.__rowSpan || 1;
      const colSpan = cell.__colSpan || 1;

      // Put the cell into the corresponding position in the matrix
      for (let i = 0; i < rowSpan; i++) {
        for (let j = 0; j < colSpan; j++) {
          cellMatrix[rowIndex + i][columnIndex + j] = cell;
        }
      }

      // Return to the original index, row span and column span of the cell.
      if (cellNode === cell) {
        return {
          colSpan,
          columnIndex,
          rowIndex,
          rowSpan
        };
      }
      columnIndex += colSpan;
    }
  }
  return null;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

class TableSelection {
  constructor(tableKey, anchor, focus) {
    this.anchor = anchor;
    this.focus = focus;
    anchor._selection = this;
    focus._selection = this;
    this._cachedNodes = null;
    this.dirty = false;
    this.tableKey = tableKey;
  }
  getStartEndPoints() {
    return [this.anchor, this.focus];
  }

  /**
   * Returns whether the Selection is "backwards", meaning the focus
   * logically precedes the anchor in the EditorState.
   * @returns true if the Selection is backwards, false otherwise.
   */
  isBackward() {
    return this.focus.isBefore(this.anchor);
  }
  getCachedNodes() {
    return this._cachedNodes;
  }
  setCachedNodes(nodes) {
    this._cachedNodes = nodes;
  }
  is(selection) {
    if (!$isTableSelection(selection)) {
      return false;
    }
    return this.tableKey === selection.tableKey && this.anchor.is(selection.anchor) && this.focus.is(selection.focus);
  }
  set(tableKey, anchorCellKey, focusCellKey) {
    this.dirty = true;
    this.tableKey = tableKey;
    this.anchor.key = anchorCellKey;
    this.focus.key = focusCellKey;
    this._cachedNodes = null;
  }
  clone() {
    return new TableSelection(this.tableKey, this.anchor, this.focus);
  }
  isCollapsed() {
    return false;
  }
  extract() {
    return this.getNodes();
  }
  insertRawText(text) {
    // Do nothing?
  }
  insertText() {
    // Do nothing?
  }
  insertNodes(nodes) {
    const focusNode = this.focus.getNode();
    if (!lexical.$isElementNode(focusNode)) {
      throw Error(`Expected TableSelection focus to be an ElementNode`);
    }
    const selection = lexical.$normalizeSelection__EXPERIMENTAL(focusNode.select(0, focusNode.getChildrenSize()));
    selection.insertNodes(nodes);
  }

  // TODO Deprecate this method. It's confusing when used with colspan|rowspan
  getShape() {
    const anchorCellNode = lexical.$getNodeByKey(this.anchor.key);
    if (!$isTableCellNode(anchorCellNode)) {
      throw Error(`Expected TableSelection anchor to be (or a child of) TableCellNode`);
    }
    const anchorCellNodeRect = $getTableCellNodeRect(anchorCellNode);
    if (!(anchorCellNodeRect !== null)) {
      throw Error(`getCellRect: expected to find AnchorNode`);
    }
    const focusCellNode = lexical.$getNodeByKey(this.focus.key);
    if (!$isTableCellNode(focusCellNode)) {
      throw Error(`Expected TableSelection focus to be (or a child of) TableCellNode`);
    }
    const focusCellNodeRect = $getTableCellNodeRect(focusCellNode);
    if (!(focusCellNodeRect !== null)) {
      throw Error(`getCellRect: expected to find focusCellNode`);
    }
    const startX = Math.min(anchorCellNodeRect.columnIndex, focusCellNodeRect.columnIndex);
    const stopX = Math.max(anchorCellNodeRect.columnIndex, focusCellNodeRect.columnIndex);
    const startY = Math.min(anchorCellNodeRect.rowIndex, focusCellNodeRect.rowIndex);
    const stopY = Math.max(anchorCellNodeRect.rowIndex, focusCellNodeRect.rowIndex);
    return {
      fromX: Math.min(startX, stopX),
      fromY: Math.min(startY, stopY),
      toX: Math.max(startX, stopX),
      toY: Math.max(startY, stopY)
    };
  }
  getNodes() {
    const cachedNodes = this._cachedNodes;
    if (cachedNodes !== null) {
      return cachedNodes;
    }
    const anchorNode = this.anchor.getNode();
    const focusNode = this.focus.getNode();
    const anchorCell = utils.$findMatchingParent(anchorNode, $isTableCellNode);
    // todo replace with triplet
    const focusCell = utils.$findMatchingParent(focusNode, $isTableCellNode);
    if (!$isTableCellNode(anchorCell)) {
      throw Error(`Expected TableSelection anchor to be (or a child of) TableCellNode`);
    }
    if (!$isTableCellNode(focusCell)) {
      throw Error(`Expected TableSelection focus to be (or a child of) TableCellNode`);
    }
    const anchorRow = anchorCell.getParent();
    if (!$isTableRowNode(anchorRow)) {
      throw Error(`Expected anchorCell to have a parent TableRowNode`);
    }
    const tableNode = anchorRow.getParent();
    if (!$isTableNode(tableNode)) {
      throw Error(`Expected tableNode to have a parent TableNode`);
    }
    const focusCellGrid = focusCell.getParents()[1];
    if (focusCellGrid !== tableNode) {
      if (!tableNode.isParentOf(focusCell)) {
        // focus is on higher Grid level than anchor
        const gridParent = tableNode.getParent();
        if (!(gridParent != null)) {
          throw Error(`Expected gridParent to have a parent`);
        }
        this.set(this.tableKey, gridParent.getKey(), focusCell.getKey());
      } else {
        // anchor is on higher Grid level than focus
        const focusCellParent = focusCellGrid.getParent();
        if (!(focusCellParent != null)) {
          throw Error(`Expected focusCellParent to have a parent`);
        }
        this.set(this.tableKey, focusCell.getKey(), focusCellParent.getKey());
      }
      return this.getNodes();
    }

    // TODO Mapping the whole Grid every time not efficient. We need to compute the entire state only
    // once (on load) and iterate on it as updates occur. However, to do this we need to have the
    // ability to store a state. Killing TableSelection and moving the logic to the plugin would make
    // this possible.
    const [map, cellAMap, cellBMap] = $computeTableMap(tableNode, anchorCell, focusCell);
    let minColumn = Math.min(cellAMap.startColumn, cellBMap.startColumn);
    let minRow = Math.min(cellAMap.startRow, cellBMap.startRow);
    let maxColumn = Math.max(cellAMap.startColumn + cellAMap.cell.__colSpan - 1, cellBMap.startColumn + cellBMap.cell.__colSpan - 1);
    let maxRow = Math.max(cellAMap.startRow + cellAMap.cell.__rowSpan - 1, cellBMap.startRow + cellBMap.cell.__rowSpan - 1);
    let exploredMinColumn = minColumn;
    let exploredMinRow = minRow;
    let exploredMaxColumn = minColumn;
    let exploredMaxRow = minRow;
    function expandBoundary(mapValue) {
      const {
        cell,
        startColumn: cellStartColumn,
        startRow: cellStartRow
      } = mapValue;
      minColumn = Math.min(minColumn, cellStartColumn);
      minRow = Math.min(minRow, cellStartRow);
      maxColumn = Math.max(maxColumn, cellStartColumn + cell.__colSpan - 1);
      maxRow = Math.max(maxRow, cellStartRow + cell.__rowSpan - 1);
    }
    while (minColumn < exploredMinColumn || minRow < exploredMinRow || maxColumn > exploredMaxColumn || maxRow > exploredMaxRow) {
      if (minColumn < exploredMinColumn) {
        // Expand on the left
        const rowDiff = exploredMaxRow - exploredMinRow;
        const previousColumn = exploredMinColumn - 1;
        for (let i = 0; i <= rowDiff; i++) {
          expandBoundary(map[exploredMinRow + i][previousColumn]);
        }
        exploredMinColumn = previousColumn;
      }
      if (minRow < exploredMinRow) {
        // Expand on top
        const columnDiff = exploredMaxColumn - exploredMinColumn;
        const previousRow = exploredMinRow - 1;
        for (let i = 0; i <= columnDiff; i++) {
          expandBoundary(map[previousRow][exploredMinColumn + i]);
        }
        exploredMinRow = previousRow;
      }
      if (maxColumn > exploredMaxColumn) {
        // Expand on the right
        const rowDiff = exploredMaxRow - exploredMinRow;
        const nextColumn = exploredMaxColumn + 1;
        for (let i = 0; i <= rowDiff; i++) {
          expandBoundary(map[exploredMinRow + i][nextColumn]);
        }
        exploredMaxColumn = nextColumn;
      }
      if (maxRow > exploredMaxRow) {
        // Expand on the bottom
        const columnDiff = exploredMaxColumn - exploredMinColumn;
        const nextRow = exploredMaxRow + 1;
        for (let i = 0; i <= columnDiff; i++) {
          expandBoundary(map[nextRow][exploredMinColumn + i]);
        }
        exploredMaxRow = nextRow;
      }
    }
    const nodes = [tableNode];
    let lastRow = null;
    for (let i = minRow; i <= maxRow; i++) {
      for (let j = minColumn; j <= maxColumn; j++) {
        const {
          cell
        } = map[i][j];
        const currentRow = cell.getParent();
        if (!$isTableRowNode(currentRow)) {
          throw Error(`Expected TableCellNode parent to be a TableRowNode`);
        }
        if (currentRow !== lastRow) {
          nodes.push(currentRow);
        }
        nodes.push(cell, ...$getChildrenRecursively(cell));
        lastRow = currentRow;
      }
    }
    if (!lexical.isCurrentlyReadOnlyMode()) {
      this._cachedNodes = nodes;
    }
    return nodes;
  }
  getTextContent() {
    const nodes = this.getNodes();
    let textContent = '';
    for (let i = 0; i < nodes.length; i++) {
      textContent += nodes[i].getTextContent();
    }
    return textContent;
  }
}
function $isTableSelection(x) {
  return x instanceof TableSelection;
}
function $createTableSelection() {
  const anchor = lexical.$createPoint('root', 0, 'element');
  const focus = lexical.$createPoint('root', 0, 'element');
  return new TableSelection('root', anchor, focus);
}
function $getChildrenRecursively(node) {
  const nodes = [];
  const stack = [node];
  while (stack.length > 0) {
    const currentNode = stack.pop();
    if (!(currentNode !== undefined)) {
      throw Error(`Stack.length > 0; can't be undefined`);
    }
    if (lexical.$isElementNode(currentNode)) {
      stack.unshift(...currentNode.getChildren());
    }
    if (currentNode !== node) {
      nodes.push(currentNode);
    }
  }
  return nodes;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

class TableObserver {
  constructor(editor, tableNodeKey) {
    this.isHighlightingCells = false;
    this.anchorX = -1;
    this.anchorY = -1;
    this.focusX = -1;
    this.focusY = -1;
    this.listenersToRemove = new Set();
    this.tableNodeKey = tableNodeKey;
    this.editor = editor;
    this.table = {
      columns: 0,
      domRows: [],
      rows: 0
    };
    this.tableSelection = null;
    this.anchorCellNodeKey = null;
    this.focusCellNodeKey = null;
    this.anchorCell = null;
    this.focusCell = null;
    this.hasHijackedSelectionStyles = false;
    this.trackTable();
    this.isSelecting = false;
  }
  getTable() {
    return this.table;
  }
  removeListeners() {
    Array.from(this.listenersToRemove).forEach(removeListener => removeListener());
  }
  trackTable() {
    const observer = new MutationObserver(records => {
      this.editor.update(() => {
        let gridNeedsRedraw = false;
        for (let i = 0; i < records.length; i++) {
          const record = records[i];
          const target = record.target;
          const nodeName = target.nodeName;
          if (nodeName === 'TABLE' || nodeName === 'TBODY' || nodeName === 'THEAD' || nodeName === 'TR') {
            gridNeedsRedraw = true;
            break;
          }
        }
        if (!gridNeedsRedraw) {
          return;
        }
        const tableElement = this.editor.getElementByKey(this.tableNodeKey);
        if (!tableElement) {
          throw new Error('Expected to find TableElement in DOM');
        }
        this.table = getTable(tableElement);
      });
    });
    this.editor.update(() => {
      const tableElement = this.editor.getElementByKey(this.tableNodeKey);
      if (!tableElement) {
        throw new Error('Expected to find TableElement in DOM');
      }
      this.table = getTable(tableElement);
      observer.observe(tableElement, {
        attributes: true,
        childList: true,
        subtree: true
      });
    });
  }
  clearHighlight() {
    const editor = this.editor;
    this.isHighlightingCells = false;
    this.anchorX = -1;
    this.anchorY = -1;
    this.focusX = -1;
    this.focusY = -1;
    this.tableSelection = null;
    this.anchorCellNodeKey = null;
    this.focusCellNodeKey = null;
    this.anchorCell = null;
    this.focusCell = null;
    this.hasHijackedSelectionStyles = false;
    this.enableHighlightStyle();
    editor.update(() => {
      const tableNode = lexical.$getNodeByKey(this.tableNodeKey);
      if (!$isTableNode(tableNode)) {
        throw new Error('Expected TableNode.');
      }
      const tableElement = editor.getElementByKey(this.tableNodeKey);
      if (!tableElement) {
        throw new Error('Expected to find TableElement in DOM');
      }
      const grid = getTable(tableElement);
      $updateDOMForSelection(editor, grid, null);
      lexical.$setSelection(null);
      editor.dispatchCommand(lexical.SELECTION_CHANGE_COMMAND, undefined);
    });
  }
  enableHighlightStyle() {
    const editor = this.editor;
    editor.update(() => {
      const tableElement = editor.getElementByKey(this.tableNodeKey);
      if (!tableElement) {
        throw new Error('Expected to find TableElement in DOM');
      }
      utils.removeClassNamesFromElement(tableElement, editor._config.theme.tableSelection);
      tableElement.classList.remove('disable-selection');
      this.hasHijackedSelectionStyles = false;
    });
  }
  disableHighlightStyle() {
    const editor = this.editor;
    editor.update(() => {
      const tableElement = editor.getElementByKey(this.tableNodeKey);
      if (!tableElement) {
        throw new Error('Expected to find TableElement in DOM');
      }
      utils.addClassNamesToElement(tableElement, editor._config.theme.tableSelection);
      this.hasHijackedSelectionStyles = true;
    });
  }
  updateTableTableSelection(selection) {
    if (selection !== null && selection.tableKey === this.tableNodeKey) {
      const editor = this.editor;
      this.tableSelection = selection;
      this.isHighlightingCells = true;
      this.disableHighlightStyle();
      $updateDOMForSelection(editor, this.table, this.tableSelection);
    } else if (selection == null) {
      this.clearHighlight();
    } else {
      this.tableNodeKey = selection.tableKey;
      this.updateTableTableSelection(selection);
    }
  }
  setFocusCellForSelection(cell, ignoreStart = false) {
    const editor = this.editor;
    editor.update(() => {
      const tableNode = lexical.$getNodeByKey(this.tableNodeKey);
      if (!$isTableNode(tableNode)) {
        throw new Error('Expected TableNode.');
      }
      const tableElement = editor.getElementByKey(this.tableNodeKey);
      if (!tableElement) {
        throw new Error('Expected to find TableElement in DOM');
      }
      const cellX = cell.x;
      const cellY = cell.y;
      this.focusCell = cell;
      if (this.anchorCell !== null) {
        const domSelection = getDOMSelection(editor._window);
        // Collapse the selection
        if (domSelection) {
          domSelection.setBaseAndExtent(this.anchorCell.elem, 0, this.focusCell.elem, 0);
        }
      }
      if (!this.isHighlightingCells && (this.anchorX !== cellX || this.anchorY !== cellY || ignoreStart)) {
        this.isHighlightingCells = true;
        this.disableHighlightStyle();
      } else if (cellX === this.focusX && cellY === this.focusY) {
        return;
      }
      this.focusX = cellX;
      this.focusY = cellY;
      if (this.isHighlightingCells) {
        const focusTableCellNode = lexical.$getNearestNodeFromDOMNode(cell.elem);
        if (this.tableSelection != null && this.anchorCellNodeKey != null && $isTableCellNode(focusTableCellNode) && tableNode.is($findTableNode(focusTableCellNode))) {
          const focusNodeKey = focusTableCellNode.getKey();
          this.tableSelection = this.tableSelection.clone() || $createTableSelection();
          this.focusCellNodeKey = focusNodeKey;
          this.tableSelection.set(this.tableNodeKey, this.anchorCellNodeKey, this.focusCellNodeKey);
          lexical.$setSelection(this.tableSelection);
          editor.dispatchCommand(lexical.SELECTION_CHANGE_COMMAND, undefined);
          $updateDOMForSelection(editor, this.table, this.tableSelection);
        }
      }
    });
  }
  setAnchorCellForSelection(cell) {
    this.isHighlightingCells = false;
    this.anchorCell = cell;
    this.anchorX = cell.x;
    this.anchorY = cell.y;
    this.editor.update(() => {
      const anchorTableCellNode = lexical.$getNearestNodeFromDOMNode(cell.elem);
      if ($isTableCellNode(anchorTableCellNode)) {
        const anchorNodeKey = anchorTableCellNode.getKey();
        this.tableSelection = this.tableSelection != null ? this.tableSelection.clone() : $createTableSelection();
        this.anchorCellNodeKey = anchorNodeKey;
      }
    });
  }
  formatCells(type) {
    this.editor.update(() => {
      const selection = lexical.$getSelection();
      if (!$isTableSelection(selection)) {
        {
          throw Error(`Expected grid selection`);
        }
      }
      const formatSelection = lexical.$createRangeSelection();
      const anchor = formatSelection.anchor;
      const focus = formatSelection.focus;
      selection.getNodes().forEach(cellNode => {
        if ($isTableCellNode(cellNode) && cellNode.getTextContentSize() !== 0) {
          anchor.set(cellNode.getKey(), 0, 'element');
          focus.set(cellNode.getKey(), cellNode.getChildrenSize(), 'element');
          formatSelection.formatText(type);
        }
      });
      lexical.$setSelection(selection);
      this.editor.dispatchCommand(lexical.SELECTION_CHANGE_COMMAND, undefined);
    });
  }
  clearText() {
    const editor = this.editor;
    editor.update(() => {
      const tableNode = lexical.$getNodeByKey(this.tableNodeKey);
      if (!$isTableNode(tableNode)) {
        throw new Error('Expected TableNode.');
      }
      const selection = lexical.$getSelection();
      if (!$isTableSelection(selection)) {
        {
          throw Error(`Expected grid selection`);
        }
      }
      const selectedNodes = selection.getNodes().filter($isTableCellNode);
      if (selectedNodes.length === this.table.columns * this.table.rows) {
        tableNode.selectPrevious();
        // Delete entire table
        tableNode.remove();
        const rootNode = lexical.$getRoot();
        rootNode.selectStart();
        return;
      }
      selectedNodes.forEach(cellNode => {
        if (lexical.$isElementNode(cellNode)) {
          const paragraphNode = lexical.$createParagraphNode();
          const textNode = lexical.$createTextNode();
          paragraphNode.append(textNode);
          cellNode.append(paragraphNode);
          cellNode.getChildren().forEach(child => {
            if (child !== paragraphNode) {
              child.remove();
            }
          });
        }
      });
      $updateDOMForSelection(editor, this.table, null);
      lexical.$setSelection(null);
      editor.dispatchCommand(lexical.SELECTION_CHANGE_COMMAND, undefined);
    });
  }
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const LEXICAL_ELEMENT_KEY = '__lexicalTableSelection';
const getDOMSelection = targetWindow => CAN_USE_DOM ? (targetWindow || window).getSelection() : null;
const isMouseDownOnEvent = event => {
  return (event.buttons & 1) === 1;
};
function applyTableHandlers(tableNode, tableElement, editor, hasTabHandler) {
  const rootElement = editor.getRootElement();
  if (rootElement === null) {
    throw new Error('No root element.');
  }
  const tableObserver = new TableObserver(editor, tableNode.getKey());
  const editorWindow = editor._window || window;
  attachTableObserverToTableElement(tableElement, tableObserver);
  const createMouseHandlers = () => {
    const onMouseUp = () => {
      tableObserver.isSelecting = false;
      editorWindow.removeEventListener('mouseup', onMouseUp);
      editorWindow.removeEventListener('mousemove', onMouseMove);
    };
    const onMouseMove = moveEvent => {
      // delaying mousemove handler to allow selectionchange handler from LexicalEvents.ts to be executed first
      setTimeout(() => {
        if (!isMouseDownOnEvent(moveEvent) && tableObserver.isSelecting) {
          tableObserver.isSelecting = false;
          editorWindow.removeEventListener('mouseup', onMouseUp);
          editorWindow.removeEventListener('mousemove', onMouseMove);
          return;
        }
        const focusCell = getDOMCellFromTarget(moveEvent.target);
        if (focusCell !== null && (tableObserver.anchorX !== focusCell.x || tableObserver.anchorY !== focusCell.y)) {
          moveEvent.preventDefault();
          tableObserver.setFocusCellForSelection(focusCell);
        }
      }, 0);
    };
    return {
      onMouseMove: onMouseMove,
      onMouseUp: onMouseUp
    };
  };
  tableElement.addEventListener('mousedown', event => {
    setTimeout(() => {
      if (event.button !== 0) {
        return;
      }
      if (!editorWindow) {
        return;
      }
      const anchorCell = getDOMCellFromTarget(event.target);
      if (anchorCell !== null) {
        stopEvent(event);
        tableObserver.setAnchorCellForSelection(anchorCell);
      }
      const {
        onMouseUp,
        onMouseMove
      } = createMouseHandlers();
      tableObserver.isSelecting = true;
      editorWindow.addEventListener('mouseup', onMouseUp);
      editorWindow.addEventListener('mousemove', onMouseMove);
    }, 0);
  });

  // Clear selection when clicking outside of dom.
  const mouseDownCallback = event => {
    if (event.button !== 0) {
      return;
    }
    editor.update(() => {
      const selection = lexical.$getSelection();
      const target = event.target;
      if ($isTableSelection(selection) && selection.tableKey === tableObserver.tableNodeKey && rootElement.contains(target)) {
        tableObserver.clearHighlight();
      }
    });
  };
  editorWindow.addEventListener('mousedown', mouseDownCallback);
  tableObserver.listenersToRemove.add(() => editorWindow.removeEventListener('mousedown', mouseDownCallback));
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.KEY_ARROW_DOWN_COMMAND, event => $handleArrowKey(editor, event, 'down', tableNode, tableObserver), lexical.COMMAND_PRIORITY_HIGH));
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.KEY_ARROW_UP_COMMAND, event => $handleArrowKey(editor, event, 'up', tableNode, tableObserver), lexical.COMMAND_PRIORITY_HIGH));
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.KEY_ARROW_LEFT_COMMAND, event => $handleArrowKey(editor, event, 'backward', tableNode, tableObserver), lexical.COMMAND_PRIORITY_HIGH));
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.KEY_ARROW_RIGHT_COMMAND, event => $handleArrowKey(editor, event, 'forward', tableNode, tableObserver), lexical.COMMAND_PRIORITY_HIGH));
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.KEY_ESCAPE_COMMAND, event => {
    const selection = lexical.$getSelection();
    if ($isTableSelection(selection)) {
      const focusCellNode = utils.$findMatchingParent(selection.focus.getNode(), $isTableCellNode);
      if ($isTableCellNode(focusCellNode)) {
        stopEvent(event);
        focusCellNode.selectEnd();
        return true;
      }
    }
    return false;
  }, lexical.COMMAND_PRIORITY_HIGH));
  const deleteTextHandler = command => () => {
    const selection = lexical.$getSelection();
    if (!$isSelectionInTable(selection, tableNode)) {
      return false;
    }
    if ($isTableSelection(selection)) {
      tableObserver.clearText();
      return true;
    } else if (lexical.$isRangeSelection(selection)) {
      const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), n => $isTableCellNode(n));
      if (!$isTableCellNode(tableCellNode)) {
        return false;
      }
      const anchorNode = selection.anchor.getNode();
      const focusNode = selection.focus.getNode();
      const isAnchorInside = tableNode.isParentOf(anchorNode);
      const isFocusInside = tableNode.isParentOf(focusNode);
      const selectionContainsPartialTable = isAnchorInside && !isFocusInside || isFocusInside && !isAnchorInside;
      if (selectionContainsPartialTable) {
        tableObserver.clearText();
        return true;
      }
      const nearestElementNode = utils.$findMatchingParent(selection.anchor.getNode(), n => lexical.$isElementNode(n));
      const topLevelCellElementNode = nearestElementNode && utils.$findMatchingParent(nearestElementNode, n => lexical.$isElementNode(n) && $isTableCellNode(n.getParent()));
      if (!lexical.$isElementNode(topLevelCellElementNode) || !lexical.$isElementNode(nearestElementNode)) {
        return false;
      }
      if (command === lexical.DELETE_LINE_COMMAND && topLevelCellElementNode.getPreviousSibling() === null) {
        // TODO: Fix Delete Line in Table Cells.
        return true;
      }
    }
    return false;
  };
  [lexical.DELETE_WORD_COMMAND, lexical.DELETE_LINE_COMMAND, lexical.DELETE_CHARACTER_COMMAND].forEach(command => {
    tableObserver.listenersToRemove.add(editor.registerCommand(command, deleteTextHandler(command), lexical.COMMAND_PRIORITY_CRITICAL));
  });
  const $deleteCellHandler = event => {
    const selection = lexical.$getSelection();
    if (!$isSelectionInTable(selection, tableNode)) {
      const nodes = selection ? selection.getNodes() : null;
      if (nodes) {
        const table = nodes.find(node => $isTableNode(node) && node.getKey() === tableObserver.tableNodeKey);
        if ($isTableNode(table)) {
          const parentNode = table.getParent();
          if (!parentNode) {
            return false;
          }
          table.remove();
        }
      }
      return false;
    }
    if ($isTableSelection(selection)) {
      event.preventDefault();
      event.stopPropagation();
      tableObserver.clearText();
      return true;
    } else if (lexical.$isRangeSelection(selection)) {
      const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), n => $isTableCellNode(n));
      if (!$isTableCellNode(tableCellNode)) {
        return false;
      }
    }
    return false;
  };
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.KEY_BACKSPACE_COMMAND, $deleteCellHandler, lexical.COMMAND_PRIORITY_CRITICAL));
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.KEY_DELETE_COMMAND, $deleteCellHandler, lexical.COMMAND_PRIORITY_CRITICAL));
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.FORMAT_TEXT_COMMAND, payload => {
    const selection = lexical.$getSelection();
    if (!$isSelectionInTable(selection, tableNode)) {
      return false;
    }
    if ($isTableSelection(selection)) {
      tableObserver.formatCells(payload);
      return true;
    } else if (lexical.$isRangeSelection(selection)) {
      const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), n => $isTableCellNode(n));
      if (!$isTableCellNode(tableCellNode)) {
        return false;
      }
    }
    return false;
  }, lexical.COMMAND_PRIORITY_CRITICAL));
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.FORMAT_ELEMENT_COMMAND, formatType => {
    const selection = lexical.$getSelection();
    if (!$isTableSelection(selection) || !$isSelectionInTable(selection, tableNode)) {
      return false;
    }
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (!$isTableCellNode(anchorNode) || !$isTableCellNode(focusNode)) {
      return false;
    }
    const [tableMap, anchorCell, focusCell] = $computeTableMap(tableNode, anchorNode, focusNode);
    const maxRow = Math.max(anchorCell.startRow, focusCell.startRow);
    const maxColumn = Math.max(anchorCell.startColumn, focusCell.startColumn);
    const minRow = Math.min(anchorCell.startRow, focusCell.startRow);
    const minColumn = Math.min(anchorCell.startColumn, focusCell.startColumn);
    for (let i = minRow; i <= maxRow; i++) {
      for (let j = minColumn; j <= maxColumn; j++) {
        const cell = tableMap[i][j].cell;
        cell.setFormat(formatType);
        const cellChildren = cell.getChildren();
        for (let k = 0; k < cellChildren.length; k++) {
          const child = cellChildren[k];
          if (lexical.$isElementNode(child) && !child.isInline()) {
            child.setFormat(formatType);
          }
        }
      }
    }
    return true;
  }, lexical.COMMAND_PRIORITY_CRITICAL));
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.CONTROLLED_TEXT_INSERTION_COMMAND, payload => {
    const selection = lexical.$getSelection();
    if (!$isSelectionInTable(selection, tableNode)) {
      return false;
    }
    if ($isTableSelection(selection)) {
      tableObserver.clearHighlight();
      return false;
    } else if (lexical.$isRangeSelection(selection)) {
      const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), n => $isTableCellNode(n));
      if (!$isTableCellNode(tableCellNode)) {
        return false;
      }
      if (typeof payload === 'string') {
        const edgePosition = $getTableEdgeCursorPosition(editor, selection, tableNode);
        if (edgePosition) {
          $insertParagraphAtTableEdge(edgePosition, tableNode, [lexical.$createTextNode(payload)]);
          return true;
        }
      }
    }
    return false;
  }, lexical.COMMAND_PRIORITY_CRITICAL));
  if (hasTabHandler) {
    tableObserver.listenersToRemove.add(editor.registerCommand(lexical.KEY_TAB_COMMAND, event => {
      const selection = lexical.$getSelection();
      if (!lexical.$isRangeSelection(selection) || !selection.isCollapsed() || !$isSelectionInTable(selection, tableNode)) {
        return false;
      }
      const tableCellNode = $findCellNode(selection.anchor.getNode());
      if (tableCellNode === null) {
        return false;
      }
      stopEvent(event);
      const currentCords = tableNode.getCordsFromCellNode(tableCellNode, tableObserver.table);
      selectTableNodeInDirection(tableObserver, tableNode, currentCords.x, currentCords.y, !event.shiftKey ? 'forward' : 'backward');
      return true;
    }, lexical.COMMAND_PRIORITY_CRITICAL));
  }
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.FOCUS_COMMAND, payload => {
    return tableNode.isSelected();
  }, lexical.COMMAND_PRIORITY_HIGH));
  function getObserverCellFromCellNode(tableCellNode) {
    const currentCords = tableNode.getCordsFromCellNode(tableCellNode, tableObserver.table);
    return tableNode.getDOMCellFromCordsOrThrow(currentCords.x, currentCords.y, tableObserver.table);
  }
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.SELECTION_INSERT_CLIPBOARD_NODES_COMMAND, selectionPayload => {
    const {
      nodes,
      selection
    } = selectionPayload;
    const anchorAndFocus = selection.getStartEndPoints();
    const isTableSelection = $isTableSelection(selection);
    const isRangeSelection = lexical.$isRangeSelection(selection);
    const isSelectionInsideOfGrid = isRangeSelection && utils.$findMatchingParent(selection.anchor.getNode(), n => $isTableCellNode(n)) !== null && utils.$findMatchingParent(selection.focus.getNode(), n => $isTableCellNode(n)) !== null || isTableSelection;
    if (nodes.length !== 1 || !$isTableNode(nodes[0]) || !isSelectionInsideOfGrid || anchorAndFocus === null) {
      return false;
    }
    const [anchor] = anchorAndFocus;
    const newGrid = nodes[0];
    const newGridRows = newGrid.getChildren();
    const newColumnCount = newGrid.getFirstChildOrThrow().getChildrenSize();
    const newRowCount = newGrid.getChildrenSize();
    const gridCellNode = utils.$findMatchingParent(anchor.getNode(), n => $isTableCellNode(n));
    const gridRowNode = gridCellNode && utils.$findMatchingParent(gridCellNode, n => $isTableRowNode(n));
    const gridNode = gridRowNode && utils.$findMatchingParent(gridRowNode, n => $isTableNode(n));
    if (!$isTableCellNode(gridCellNode) || !$isTableRowNode(gridRowNode) || !$isTableNode(gridNode)) {
      return false;
    }
    const startY = gridRowNode.getIndexWithinParent();
    const stopY = Math.min(gridNode.getChildrenSize() - 1, startY + newRowCount - 1);
    const startX = gridCellNode.getIndexWithinParent();
    const stopX = Math.min(gridRowNode.getChildrenSize() - 1, startX + newColumnCount - 1);
    const fromX = Math.min(startX, stopX);
    const fromY = Math.min(startY, stopY);
    const toX = Math.max(startX, stopX);
    const toY = Math.max(startY, stopY);
    const gridRowNodes = gridNode.getChildren();
    let newRowIdx = 0;
    let newAnchorCellKey;
    let newFocusCellKey;
    for (let r = fromY; r <= toY; r++) {
      const currentGridRowNode = gridRowNodes[r];
      if (!$isTableRowNode(currentGridRowNode)) {
        return false;
      }
      const newGridRowNode = newGridRows[newRowIdx];
      if (!$isTableRowNode(newGridRowNode)) {
        return false;
      }
      const gridCellNodes = currentGridRowNode.getChildren();
      const newGridCellNodes = newGridRowNode.getChildren();
      let newColumnIdx = 0;
      for (let c = fromX; c <= toX; c++) {
        const currentGridCellNode = gridCellNodes[c];
        if (!$isTableCellNode(currentGridCellNode)) {
          return false;
        }
        const newGridCellNode = newGridCellNodes[newColumnIdx];
        if (!$isTableCellNode(newGridCellNode)) {
          return false;
        }
        if (r === fromY && c === fromX) {
          newAnchorCellKey = currentGridCellNode.getKey();
        } else if (r === toY && c === toX) {
          newFocusCellKey = currentGridCellNode.getKey();
        }
        const originalChildren = currentGridCellNode.getChildren();
        newGridCellNode.getChildren().forEach(child => {
          if (lexical.$isTextNode(child)) {
            const paragraphNode = lexical.$createParagraphNode();
            paragraphNode.append(child);
            currentGridCellNode.append(child);
          } else {
            currentGridCellNode.append(child);
          }
        });
        originalChildren.forEach(n => n.remove());
        newColumnIdx++;
      }
      newRowIdx++;
    }
    if (newAnchorCellKey && newFocusCellKey) {
      const newTableSelection = $createTableSelection();
      newTableSelection.set(nodes[0].getKey(), newAnchorCellKey, newFocusCellKey);
      lexical.$setSelection(newTableSelection);
    }
    return true;
  }, lexical.COMMAND_PRIORITY_CRITICAL));
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, () => {
    const selection = lexical.$getSelection();
    const prevSelection = lexical.$getPreviousSelection();
    if (lexical.$isRangeSelection(selection)) {
      const {
        anchor,
        focus
      } = selection;
      const anchorNode = anchor.getNode();
      const focusNode = focus.getNode();
      // Using explicit comparison with table node to ensure it's not a nested table
      // as in that case we'll leave selection resolving to that table
      const anchorCellNode = $findCellNode(anchorNode);
      const focusCellNode = $findCellNode(focusNode);
      const isAnchorInside = !!(anchorCellNode && tableNode.is($findTableNode(anchorCellNode)));
      const isFocusInside = !!(focusCellNode && tableNode.is($findTableNode(focusCellNode)));
      const isPartialyWithinTable = isAnchorInside !== isFocusInside;
      const isWithinTable = isAnchorInside && isFocusInside;
      const isBackward = selection.isBackward();
      if (isPartialyWithinTable) {
        const newSelection = selection.clone();
        if (isFocusInside) {
          const [tableMap] = $computeTableMap(tableNode, focusCellNode, focusCellNode);
          const firstCell = tableMap[0][0].cell;
          const lastCell = tableMap[tableMap.length - 1].at(-1).cell;
          newSelection.focus.set(isBackward ? firstCell.getKey() : lastCell.getKey(), isBackward ? firstCell.getChildrenSize() : lastCell.getChildrenSize(), 'element');
        } else {
          newSelection.anchor.set(tableNode.getParentOrThrow().getKey(), isBackward ? tableNode.getIndexWithinParent() + 1 : tableNode.getIndexWithinParent(), 'element');
        }
        lexical.$setSelection(newSelection);
        $addHighlightStyleToTable(editor, tableObserver);
      } else if (isWithinTable) {
        // Handle case when selection spans across multiple cells but still
        // has range selection, then we convert it into grid selection
        if (!anchorCellNode.is(focusCellNode)) {
          tableObserver.setAnchorCellForSelection(getObserverCellFromCellNode(anchorCellNode));
          tableObserver.setFocusCellForSelection(getObserverCellFromCellNode(focusCellNode), true);
          if (!tableObserver.isSelecting) {
            setTimeout(() => {
              const {
                onMouseUp,
                onMouseMove
              } = createMouseHandlers();
              tableObserver.isSelecting = true;
              editorWindow.addEventListener('mouseup', onMouseUp);
              editorWindow.addEventListener('mousemove', onMouseMove);
            }, 0);
          }
        }
      }
    } else if (selection && $isTableSelection(selection) && selection.is(prevSelection) && selection.tableKey === tableNode.getKey()) {
      // if selection goes outside of the table we need to change it to Range selection
      const domSelection = getDOMSelection(editor._window);
      if (domSelection && domSelection.anchorNode && domSelection.focusNode) {
        const focusNode = lexical.$getNearestNodeFromDOMNode(domSelection.focusNode);
        const isFocusOutside = focusNode && !tableNode.is($findTableNode(focusNode));
        const anchorNode = lexical.$getNearestNodeFromDOMNode(domSelection.anchorNode);
        const isAnchorInside = anchorNode && tableNode.is($findTableNode(anchorNode));
        if (isFocusOutside && isAnchorInside && domSelection.rangeCount > 0) {
          const newSelection = lexical.$createRangeSelectionFromDom(domSelection, editor);
          if (newSelection) {
            newSelection.anchor.set(tableNode.getKey(), selection.isBackward() ? tableNode.getChildrenSize() : 0, 'element');
            domSelection.removeAllRanges();
            lexical.$setSelection(newSelection);
          }
        }
      }
    }
    if (selection && !selection.is(prevSelection) && ($isTableSelection(selection) || $isTableSelection(prevSelection)) && tableObserver.tableSelection && !tableObserver.tableSelection.is(prevSelection)) {
      if ($isTableSelection(selection) && selection.tableKey === tableObserver.tableNodeKey) {
        tableObserver.updateTableTableSelection(selection);
      } else if (!$isTableSelection(selection) && $isTableSelection(prevSelection) && prevSelection.tableKey === tableObserver.tableNodeKey) {
        tableObserver.updateTableTableSelection(null);
      }
      return false;
    }
    if (tableObserver.hasHijackedSelectionStyles && !tableNode.isSelected()) {
      $removeHighlightStyleToTable(editor, tableObserver);
    } else if (!tableObserver.hasHijackedSelectionStyles && tableNode.isSelected()) {
      $addHighlightStyleToTable(editor, tableObserver);
    }
    return false;
  }, lexical.COMMAND_PRIORITY_CRITICAL));
  tableObserver.listenersToRemove.add(editor.registerCommand(lexical.INSERT_PARAGRAPH_COMMAND, () => {
    const selection = lexical.$getSelection();
    if (!lexical.$isRangeSelection(selection) || !selection.isCollapsed() || !$isSelectionInTable(selection, tableNode)) {
      return false;
    }
    const edgePosition = $getTableEdgeCursorPosition(editor, selection, tableNode);
    if (edgePosition) {
      $insertParagraphAtTableEdge(edgePosition, tableNode);
      return true;
    }
    return false;
  }, lexical.COMMAND_PRIORITY_CRITICAL));
  return tableObserver;
}
function attachTableObserverToTableElement(tableElement, tableObserver) {
  tableElement[LEXICAL_ELEMENT_KEY] = tableObserver;
}
function getTableObserverFromTableElement(tableElement) {
  return tableElement[LEXICAL_ELEMENT_KEY];
}
function getDOMCellFromTarget(node) {
  let currentNode = node;
  while (currentNode != null) {
    const nodeName = currentNode.nodeName;
    if (nodeName === 'TD' || nodeName === 'TH') {
      // @ts-expect-error: internal field
      const cell = currentNode._cell;
      if (cell === undefined) {
        return null;
      }
      return cell;
    }
    currentNode = currentNode.parentNode;
  }
  return null;
}
function getTable(tableElement) {
  const domRows = [];
  const grid = {
    columns: 0,
    domRows,
    rows: 0
  };
  let currentNode = tableElement.firstChild;
  let x = 0;
  let y = 0;
  domRows.length = 0;
  while (currentNode != null) {
    const nodeMame = currentNode.nodeName;
    if (nodeMame === 'TD' || nodeMame === 'TH') {
      const elem = currentNode;
      const cell = {
        elem,
        hasBackgroundColor: elem.style.backgroundColor !== '',
        highlighted: false,
        x,
        y
      };

      // @ts-expect-error: internal field
      currentNode._cell = cell;
      let row = domRows[y];
      if (row === undefined) {
        row = domRows[y] = [];
      }
      row[x] = cell;
    } else {
      const child = currentNode.firstChild;
      if (child != null) {
        currentNode = child;
        continue;
      }
    }
    const sibling = currentNode.nextSibling;
    if (sibling != null) {
      x++;
      currentNode = sibling;
      continue;
    }
    const parent = currentNode.parentNode;
    if (parent != null) {
      const parentSibling = parent.nextSibling;
      if (parentSibling == null) {
        break;
      }
      y++;
      x = 0;
      currentNode = parentSibling;
    }
  }
  grid.columns = x + 1;
  grid.rows = y + 1;
  return grid;
}
function $updateDOMForSelection(editor, table, selection) {
  const selectedCellNodes = new Set(selection ? selection.getNodes() : []);
  $forEachTableCell(table, (cell, lexicalNode) => {
    const elem = cell.elem;
    if (selectedCellNodes.has(lexicalNode)) {
      cell.highlighted = true;
      $addHighlightToDOM(editor, cell);
    } else {
      cell.highlighted = false;
      $removeHighlightFromDOM(editor, cell);
      if (!elem.getAttribute('style')) {
        elem.removeAttribute('style');
      }
    }
  });
}
function $forEachTableCell(grid, cb) {
  const {
    domRows
  } = grid;
  for (let y = 0; y < domRows.length; y++) {
    const row = domRows[y];
    if (!row) {
      continue;
    }
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (!cell) {
        continue;
      }
      const lexicalNode = lexical.$getNearestNodeFromDOMNode(cell.elem);
      if (lexicalNode !== null) {
        cb(cell, lexicalNode, {
          x,
          y
        });
      }
    }
  }
}
function $addHighlightStyleToTable(editor, tableSelection) {
  tableSelection.disableHighlightStyle();
  $forEachTableCell(tableSelection.table, cell => {
    cell.highlighted = true;
    $addHighlightToDOM(editor, cell);
  });
}
function $removeHighlightStyleToTable(editor, tableObserver) {
  tableObserver.enableHighlightStyle();
  $forEachTableCell(tableObserver.table, cell => {
    const elem = cell.elem;
    cell.highlighted = false;
    $removeHighlightFromDOM(editor, cell);
    if (!elem.getAttribute('style')) {
      elem.removeAttribute('style');
    }
  });
}
const selectTableNodeInDirection = (tableObserver, tableNode, x, y, direction) => {
  const isForward = direction === 'forward';
  switch (direction) {
    case 'backward':
    case 'forward':
      if (x !== (isForward ? tableObserver.table.columns - 1 : 0)) {
        selectTableCellNode(tableNode.getCellNodeFromCordsOrThrow(x + (isForward ? 1 : -1), y, tableObserver.table), isForward);
      } else {
        if (y !== (isForward ? tableObserver.table.rows - 1 : 0)) {
          selectTableCellNode(tableNode.getCellNodeFromCordsOrThrow(isForward ? 0 : tableObserver.table.columns - 1, y + (isForward ? 1 : -1), tableObserver.table), isForward);
        } else if (!isForward) {
          tableNode.selectPrevious();
        } else {
          tableNode.selectNext();
        }
      }
      return true;
    case 'up':
      if (y !== 0) {
        selectTableCellNode(tableNode.getCellNodeFromCordsOrThrow(x, y - 1, tableObserver.table), false);
      } else {
        tableNode.selectPrevious();
      }
      return true;
    case 'down':
      if (y !== tableObserver.table.rows - 1) {
        selectTableCellNode(tableNode.getCellNodeFromCordsOrThrow(x, y + 1, tableObserver.table), true);
      } else {
        tableNode.selectNext();
      }
      return true;
    default:
      return false;
  }
};
const adjustFocusNodeInDirection = (tableObserver, tableNode, x, y, direction) => {
  const isForward = direction === 'forward';
  switch (direction) {
    case 'backward':
    case 'forward':
      if (x !== (isForward ? tableObserver.table.columns - 1 : 0)) {
        tableObserver.setFocusCellForSelection(tableNode.getDOMCellFromCordsOrThrow(x + (isForward ? 1 : -1), y, tableObserver.table));
      }
      return true;
    case 'up':
      if (y !== 0) {
        tableObserver.setFocusCellForSelection(tableNode.getDOMCellFromCordsOrThrow(x, y - 1, tableObserver.table));
        return true;
      } else {
        return false;
      }
    case 'down':
      if (y !== tableObserver.table.rows - 1) {
        tableObserver.setFocusCellForSelection(tableNode.getDOMCellFromCordsOrThrow(x, y + 1, tableObserver.table));
        return true;
      } else {
        return false;
      }
    default:
      return false;
  }
};
function $isSelectionInTable(selection, tableNode) {
  if (lexical.$isRangeSelection(selection) || $isTableSelection(selection)) {
    const isAnchorInside = tableNode.isParentOf(selection.anchor.getNode());
    const isFocusInside = tableNode.isParentOf(selection.focus.getNode());
    return isAnchorInside && isFocusInside;
  }
  return false;
}
function selectTableCellNode(tableCell, fromStart) {
  if (fromStart) {
    tableCell.selectStart();
  } else {
    tableCell.selectEnd();
  }
}
const BROWSER_BLUE_RGB = '172,206,247';
function $addHighlightToDOM(editor, cell) {
  const element = cell.elem;
  const node = lexical.$getNearestNodeFromDOMNode(element);
  if (!$isTableCellNode(node)) {
    throw Error(`Expected to find LexicalNode from Table Cell DOMNode`);
  }
  const backgroundColor = node.getBackgroundColor();
  if (backgroundColor === null) {
    element.style.setProperty('background-color', `rgb(${BROWSER_BLUE_RGB})`);
  } else {
    element.style.setProperty('background-image', `linear-gradient(to right, rgba(${BROWSER_BLUE_RGB},0.85), rgba(${BROWSER_BLUE_RGB},0.85))`);
  }
  element.style.setProperty('caret-color', 'transparent');
}
function $removeHighlightFromDOM(editor, cell) {
  const element = cell.elem;
  const node = lexical.$getNearestNodeFromDOMNode(element);
  if (!$isTableCellNode(node)) {
    throw Error(`Expected to find LexicalNode from Table Cell DOMNode`);
  }
  const backgroundColor = node.getBackgroundColor();
  if (backgroundColor === null) {
    element.style.removeProperty('background-color');
  }
  element.style.removeProperty('background-image');
  element.style.removeProperty('caret-color');
}
function $findCellNode(node) {
  const cellNode = utils.$findMatchingParent(node, $isTableCellNode);
  return $isTableCellNode(cellNode) ? cellNode : null;
}
function $findTableNode(node) {
  const tableNode = utils.$findMatchingParent(node, $isTableNode);
  return $isTableNode(tableNode) ? tableNode : null;
}
function $handleArrowKey(editor, event, direction, tableNode, tableObserver) {
  if ((direction === 'up' || direction === 'down') && isTypeaheadMenuInView(editor)) {
    return false;
  }
  const selection = lexical.$getSelection();
  if (!$isSelectionInTable(selection, tableNode)) {
    if (lexical.$isRangeSelection(selection)) {
      if (selection.isCollapsed() && direction === 'backward') {
        const anchorType = selection.anchor.type;
        const anchorOffset = selection.anchor.offset;
        if (anchorType !== 'element' && !(anchorType === 'text' && anchorOffset === 0)) {
          return false;
        }
        const anchorNode = selection.anchor.getNode();
        if (!anchorNode) {
          return false;
        }
        const parentNode = utils.$findMatchingParent(anchorNode, n => lexical.$isElementNode(n) && !n.isInline());
        if (!parentNode) {
          return false;
        }
        const siblingNode = parentNode.getPreviousSibling();
        if (!siblingNode || !$isTableNode(siblingNode)) {
          return false;
        }
        stopEvent(event);
        siblingNode.selectEnd();
        return true;
      } else if (event.shiftKey && (direction === 'up' || direction === 'down')) {
        const focusNode = selection.focus.getNode();
        if (lexical.$isRootOrShadowRoot(focusNode)) {
          const selectedNode = selection.getNodes()[0];
          if (selectedNode) {
            const tableCellNode = utils.$findMatchingParent(selectedNode, $isTableCellNode);
            if (tableCellNode && tableNode.isParentOf(tableCellNode)) {
              const firstDescendant = tableNode.getFirstDescendant();
              const lastDescendant = tableNode.getLastDescendant();
              if (!firstDescendant || !lastDescendant) {
                return false;
              }
              const [firstCellNode] = $getNodeTriplet(firstDescendant);
              const [lastCellNode] = $getNodeTriplet(lastDescendant);
              const firstCellCoords = tableNode.getCordsFromCellNode(firstCellNode, tableObserver.table);
              const lastCellCoords = tableNode.getCordsFromCellNode(lastCellNode, tableObserver.table);
              const firstCellDOM = tableNode.getDOMCellFromCordsOrThrow(firstCellCoords.x, firstCellCoords.y, tableObserver.table);
              const lastCellDOM = tableNode.getDOMCellFromCordsOrThrow(lastCellCoords.x, lastCellCoords.y, tableObserver.table);
              tableObserver.setAnchorCellForSelection(firstCellDOM);
              tableObserver.setFocusCellForSelection(lastCellDOM, true);
              return true;
            }
          }
          return false;
        } else {
          const focusParentNode = utils.$findMatchingParent(focusNode, n => lexical.$isElementNode(n) && !n.isInline());
          if (!focusParentNode) {
            return false;
          }
          const sibling = direction === 'down' ? focusParentNode.getNextSibling() : focusParentNode.getPreviousSibling();
          if ($isTableNode(sibling) && tableObserver.tableNodeKey === sibling.getKey()) {
            const firstDescendant = sibling.getFirstDescendant();
            const lastDescendant = sibling.getLastDescendant();
            if (!firstDescendant || !lastDescendant) {
              return false;
            }
            const [firstCellNode] = $getNodeTriplet(firstDescendant);
            const [lastCellNode] = $getNodeTriplet(lastDescendant);
            const newSelection = selection.clone();
            newSelection.focus.set((direction === 'up' ? firstCellNode : lastCellNode).getKey(), direction === 'up' ? 0 : lastCellNode.getChildrenSize(), 'element');
            lexical.$setSelection(newSelection);
            return true;
          }
        }
      }
    }
    return false;
  }
  if (lexical.$isRangeSelection(selection) && selection.isCollapsed()) {
    const {
      anchor,
      focus
    } = selection;
    const anchorCellNode = utils.$findMatchingParent(anchor.getNode(), $isTableCellNode);
    const focusCellNode = utils.$findMatchingParent(focus.getNode(), $isTableCellNode);
    if (!$isTableCellNode(anchorCellNode) || !anchorCellNode.is(focusCellNode)) {
      return false;
    }
    const anchorCellTable = $findTableNode(anchorCellNode);
    if (anchorCellTable !== tableNode && anchorCellTable != null) {
      const anchorCellTableElement = editor.getElementByKey(anchorCellTable.getKey());
      if (anchorCellTableElement != null) {
        tableObserver.table = getTable(anchorCellTableElement);
        return $handleArrowKey(editor, event, direction, anchorCellTable, tableObserver);
      }
    }
    if (direction === 'backward' || direction === 'forward') {
      const anchorType = anchor.type;
      const anchorOffset = anchor.offset;
      const anchorNode = anchor.getNode();
      if (!anchorNode) {
        return false;
      }
      const selectedNodes = selection.getNodes();
      if (selectedNodes.length === 1 && lexical.$isDecoratorNode(selectedNodes[0])) {
        return false;
      }
      if (isExitingTableAnchor(anchorType, anchorOffset, anchorNode, direction)) {
        return $handleTableExit(event, anchorNode, tableNode, direction);
      }
      return false;
    }
    const anchorCellDom = editor.getElementByKey(anchorCellNode.__key);
    const anchorDOM = editor.getElementByKey(anchor.key);
    if (anchorDOM == null || anchorCellDom == null) {
      return false;
    }
    let edgeSelectionRect;
    if (anchor.type === 'element') {
      edgeSelectionRect = anchorDOM.getBoundingClientRect();
    } else {
      const domSelection = window.getSelection();
      if (domSelection === null || domSelection.rangeCount === 0) {
        return false;
      }
      const range = domSelection.getRangeAt(0);
      edgeSelectionRect = range.getBoundingClientRect();
    }
    const edgeChild = direction === 'up' ? anchorCellNode.getFirstChild() : anchorCellNode.getLastChild();
    if (edgeChild == null) {
      return false;
    }
    const edgeChildDOM = editor.getElementByKey(edgeChild.__key);
    if (edgeChildDOM == null) {
      return false;
    }
    const edgeRect = edgeChildDOM.getBoundingClientRect();
    const isExiting = direction === 'up' ? edgeRect.top > edgeSelectionRect.top - edgeSelectionRect.height : edgeSelectionRect.bottom + edgeSelectionRect.height > edgeRect.bottom;
    if (isExiting) {
      stopEvent(event);
      const cords = tableNode.getCordsFromCellNode(anchorCellNode, tableObserver.table);
      if (event.shiftKey) {
        const cell = tableNode.getDOMCellFromCordsOrThrow(cords.x, cords.y, tableObserver.table);
        tableObserver.setAnchorCellForSelection(cell);
        tableObserver.setFocusCellForSelection(cell, true);
      } else {
        return selectTableNodeInDirection(tableObserver, tableNode, cords.x, cords.y, direction);
      }
      return true;
    }
  } else if ($isTableSelection(selection)) {
    const {
      anchor,
      focus
    } = selection;
    const anchorCellNode = utils.$findMatchingParent(anchor.getNode(), $isTableCellNode);
    const focusCellNode = utils.$findMatchingParent(focus.getNode(), $isTableCellNode);
    const [tableNodeFromSelection] = selection.getNodes();
    const tableElement = editor.getElementByKey(tableNodeFromSelection.getKey());
    if (!$isTableCellNode(anchorCellNode) || !$isTableCellNode(focusCellNode) || !$isTableNode(tableNodeFromSelection) || tableElement == null) {
      return false;
    }
    tableObserver.updateTableTableSelection(selection);
    const grid = getTable(tableElement);
    const cordsAnchor = tableNode.getCordsFromCellNode(anchorCellNode, grid);
    const anchorCell = tableNode.getDOMCellFromCordsOrThrow(cordsAnchor.x, cordsAnchor.y, grid);
    tableObserver.setAnchorCellForSelection(anchorCell);
    stopEvent(event);
    if (event.shiftKey) {
      const cords = tableNode.getCordsFromCellNode(focusCellNode, grid);
      return adjustFocusNodeInDirection(tableObserver, tableNodeFromSelection, cords.x, cords.y, direction);
    } else {
      focusCellNode.selectEnd();
    }
    return true;
  }
  return false;
}
function stopEvent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  event.stopPropagation();
}
function isTypeaheadMenuInView(editor) {
  // There is no inbuilt way to check if the component picker is in view
  // but we can check if the root DOM element has the aria-controls attribute "typeahead-menu".
  const root = editor.getRootElement();
  if (!root) {
    return false;
  }
  return root.hasAttribute('aria-controls') && root.getAttribute('aria-controls') === 'typeahead-menu';
}
function isExitingTableAnchor(type, offset, anchorNode, direction) {
  return isExitingTableElementAnchor(type, anchorNode, direction) || $isExitingTableTextAnchor(type, offset, anchorNode, direction);
}
function isExitingTableElementAnchor(type, anchorNode, direction) {
  return type === 'element' && (direction === 'backward' ? anchorNode.getPreviousSibling() === null : anchorNode.getNextSibling() === null);
}
function $isExitingTableTextAnchor(type, offset, anchorNode, direction) {
  const parentNode = utils.$findMatchingParent(anchorNode, n => lexical.$isElementNode(n) && !n.isInline());
  if (!parentNode) {
    return false;
  }
  const hasValidOffset = direction === 'backward' ? offset === 0 : offset === anchorNode.getTextContentSize();
  return type === 'text' && hasValidOffset && (direction === 'backward' ? parentNode.getPreviousSibling() === null : parentNode.getNextSibling() === null);
}
function $handleTableExit(event, anchorNode, tableNode, direction) {
  const anchorCellNode = utils.$findMatchingParent(anchorNode, $isTableCellNode);
  if (!$isTableCellNode(anchorCellNode)) {
    return false;
  }
  const [tableMap, cellValue] = $computeTableMap(tableNode, anchorCellNode, anchorCellNode);
  if (!isExitingCell(tableMap, cellValue, direction)) {
    return false;
  }
  const toNode = $getExitingToNode(anchorNode, direction, tableNode);
  if (!toNode || $isTableNode(toNode)) {
    return false;
  }
  stopEvent(event);
  if (direction === 'backward') {
    toNode.selectEnd();
  } else {
    toNode.selectStart();
  }
  return true;
}
function isExitingCell(tableMap, cellValue, direction) {
  const firstCell = tableMap[0][0];
  const lastCell = tableMap[tableMap.length - 1][tableMap[0].length - 1];
  const {
    startColumn,
    startRow
  } = cellValue;
  return direction === 'backward' ? startColumn === firstCell.startColumn && startRow === firstCell.startRow : startColumn === lastCell.startColumn && startRow === lastCell.startRow;
}
function $getExitingToNode(anchorNode, direction, tableNode) {
  const parentNode = utils.$findMatchingParent(anchorNode, n => lexical.$isElementNode(n) && !n.isInline());
  if (!parentNode) {
    return undefined;
  }
  const anchorSibling = direction === 'backward' ? parentNode.getPreviousSibling() : parentNode.getNextSibling();
  return anchorSibling && $isTableNode(anchorSibling) ? anchorSibling : direction === 'backward' ? tableNode.getPreviousSibling() : tableNode.getNextSibling();
}
function $insertParagraphAtTableEdge(edgePosition, tableNode, children) {
  const paragraphNode = lexical.$createParagraphNode();
  if (edgePosition === 'first') {
    tableNode.insertBefore(paragraphNode);
  } else {
    tableNode.insertAfter(paragraphNode);
  }
  paragraphNode.append(...(children || []));
  paragraphNode.selectEnd();
}
function $getTableEdgeCursorPosition(editor, selection, tableNode) {
  const tableNodeParent = tableNode.getParent();
  if (!tableNodeParent) {
    return undefined;
  }
  const tableNodeParentDOM = editor.getElementByKey(tableNodeParent.getKey());
  if (!tableNodeParentDOM) {
    return undefined;
  }

  // TODO: Add support for nested tables
  const domSelection = window.getSelection();
  if (!domSelection || domSelection.anchorNode !== tableNodeParentDOM) {
    return undefined;
  }
  const anchorCellNode = utils.$findMatchingParent(selection.anchor.getNode(), n => $isTableCellNode(n));
  if (!anchorCellNode) {
    return undefined;
  }
  const parentTable = utils.$findMatchingParent(anchorCellNode, n => $isTableNode(n));
  if (!$isTableNode(parentTable) || !parentTable.is(tableNode)) {
    return undefined;
  }
  const [tableMap, cellValue] = $computeTableMap(tableNode, anchorCellNode, anchorCellNode);
  const firstCell = tableMap[0][0];
  const lastCell = tableMap[tableMap.length - 1][tableMap[0].length - 1];
  const {
    startRow,
    startColumn
  } = cellValue;
  const isAtFirstCell = startRow === firstCell.startRow && startColumn === firstCell.startColumn;
  const isAtLastCell = startRow === lastCell.startRow && startColumn === lastCell.startColumn;
  if (isAtFirstCell) {
    return 'first';
  } else if (isAtLastCell) {
    return 'last';
  } else {
    return undefined;
  }
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/** @noInheritDoc */
class TableNode extends lexical.ElementNode {
  static getType() {
    return 'table';
  }
  static clone(node) {
    return new TableNode(node.__key);
  }
  static importDOM() {
    return {
      table: _node => ({
        conversion: $convertTableElement,
        priority: 1
      })
    };
  }
  static importJSON(_serializedNode) {
    return $createTableNode();
  }
  constructor(key) {
    super(key);
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'table',
      version: 1
    };
  }
  createDOM(config, editor) {
    const tableElement = document.createElement('table');
    utils.addClassNamesToElement(tableElement, config.theme.table);
    return tableElement;
  }
  updateDOM() {
    return false;
  }
  exportDOM(editor) {
    return {
      ...super.exportDOM(editor),
      after: tableElement => {
        if (tableElement) {
          const newElement = tableElement.cloneNode();
          const colGroup = document.createElement('colgroup');
          const tBody = document.createElement('tbody');
          if (utils.isHTMLElement(tableElement)) {
            tBody.append(...tableElement.children);
          }
          const firstRow = this.getFirstChildOrThrow();
          if (!$isTableRowNode(firstRow)) {
            throw new Error('Expected to find row node.');
          }
          const colCount = firstRow.getChildrenSize();
          for (let i = 0; i < colCount; i++) {
            const col = document.createElement('col');
            colGroup.append(col);
          }
          newElement.replaceChildren(colGroup, tBody);
          return newElement;
        }
      }
    };
  }
  canBeEmpty() {
    return false;
  }
  isShadowRoot() {
    return true;
  }
  getCordsFromCellNode(tableCellNode, table) {
    const {
      rows,
      domRows
    } = table;
    for (let y = 0; y < rows; y++) {
      const row = domRows[y];
      if (row == null) {
        continue;
      }
      const x = row.findIndex(cell => {
        if (!cell) {
          return;
        }
        const {
          elem
        } = cell;
        const cellNode = lexical.$getNearestNodeFromDOMNode(elem);
        return cellNode === tableCellNode;
      });
      if (x !== -1) {
        return {
          x,
          y
        };
      }
    }
    throw new Error('Cell not found in table.');
  }
  getDOMCellFromCords(x, y, table) {
    const {
      domRows
    } = table;
    const row = domRows[y];
    if (row == null) {
      return null;
    }
    const cell = row[x];
    if (cell == null) {
      return null;
    }
    return cell;
  }
  getDOMCellFromCordsOrThrow(x, y, table) {
    const cell = this.getDOMCellFromCords(x, y, table);
    if (!cell) {
      throw new Error('Cell not found at cords.');
    }
    return cell;
  }
  getCellNodeFromCords(x, y, table) {
    const cell = this.getDOMCellFromCords(x, y, table);
    if (cell == null) {
      return null;
    }
    const node = lexical.$getNearestNodeFromDOMNode(cell.elem);
    if ($isTableCellNode(node)) {
      return node;
    }
    return null;
  }
  getCellNodeFromCordsOrThrow(x, y, table) {
    const node = this.getCellNodeFromCords(x, y, table);
    if (!node) {
      throw new Error('Node at cords not TableCellNode.');
    }
    return node;
  }
  canSelectBefore() {
    return true;
  }
  canIndent() {
    return false;
  }
}
function $getElementForTableNode(editor, tableNode) {
  const tableElement = editor.getElementByKey(tableNode.getKey());
  if (tableElement == null) {
    throw new Error('Table Element Not Found');
  }
  return getTable(tableElement);
}
function $convertTableElement(_domNode) {
  return {
    node: $createTableNode()
  };
}
function $createTableNode() {
  return lexical.$applyNodeReplacement(new TableNode());
}
function $isTableNode(node) {
  return node instanceof TableNode;
}

exports.$computeTableMap = $computeTableMap;
exports.$computeTableMapSkipCellCheck = $computeTableMapSkipCellCheck;
exports.$createTableCellNode = $createTableCellNode;
exports.$createTableNode = $createTableNode;
exports.$createTableNodeWithDimensions = $createTableNodeWithDimensions;
exports.$createTableRowNode = $createTableRowNode;
exports.$createTableSelection = $createTableSelection;
exports.$deleteTableColumn = $deleteTableColumn;
exports.$deleteTableColumn__EXPERIMENTAL = $deleteTableColumn__EXPERIMENTAL;
exports.$deleteTableRow__EXPERIMENTAL = $deleteTableRow__EXPERIMENTAL;
exports.$findCellNode = $findCellNode;
exports.$findTableNode = $findTableNode;
exports.$getElementForTableNode = $getElementForTableNode;
exports.$getNodeTriplet = $getNodeTriplet;
exports.$getTableCellNodeFromLexicalNode = $getTableCellNodeFromLexicalNode;
exports.$getTableCellNodeRect = $getTableCellNodeRect;
exports.$getTableColumnIndexFromTableCellNode = $getTableColumnIndexFromTableCellNode;
exports.$getTableNodeFromLexicalNodeOrThrow = $getTableNodeFromLexicalNodeOrThrow;
exports.$getTableRowIndexFromTableCellNode = $getTableRowIndexFromTableCellNode;
exports.$getTableRowNodeFromTableCellNodeOrThrow = $getTableRowNodeFromTableCellNodeOrThrow;
exports.$insertTableColumn = $insertTableColumn;
exports.$insertTableColumn__EXPERIMENTAL = $insertTableColumn__EXPERIMENTAL;
exports.$insertTableRow = $insertTableRow;
exports.$insertTableRow__EXPERIMENTAL = $insertTableRow__EXPERIMENTAL;
exports.$isTableCellNode = $isTableCellNode;
exports.$isTableNode = $isTableNode;
exports.$isTableRowNode = $isTableRowNode;
exports.$isTableSelection = $isTableSelection;
exports.$removeTableRowAtIndex = $removeTableRowAtIndex;
exports.$unmergeCell = $unmergeCell;
exports.INSERT_TABLE_COMMAND = INSERT_TABLE_COMMAND;
exports.TableCellHeaderStates = TableCellHeaderStates;
exports.TableCellNode = TableCellNode;
exports.TableNode = TableNode;
exports.TableObserver = TableObserver;
exports.TableRowNode = TableRowNode;
exports.applyTableHandlers = applyTableHandlers;
exports.getDOMCellFromTarget = getDOMCellFromTarget;
exports.getTableObserverFromTableElement = getTableObserverFromTableElement;
