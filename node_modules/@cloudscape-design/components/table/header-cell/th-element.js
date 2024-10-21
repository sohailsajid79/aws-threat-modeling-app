import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import clsx from 'clsx';
import { copyAnalyticsMetadataAttribute } from '@cloudscape-design/component-toolkit/internal/analytics-metadata';
import { useSingleTabStopNavigation } from '../../internal/context/single-tab-stop-navigation-context';
import { useMergeRefs } from '../../internal/hooks/use-merge-refs';
import { useStickyCellStyles } from '../sticky-columns';
import { getTableColHeaderRoleProps } from '../table-role';
import { getStickyClassNames } from '../utils';
import styles from './styles.css.js';
export function TableThElement(_a) {
    var { className, style, sortingStatus, sortingDisabled, focusedComponent, hidden, colIndex, columnId, stickyState, cellRef, tableRole, children } = _a, props = __rest(_a, ["className", "style", "sortingStatus", "sortingDisabled", "focusedComponent", "hidden", "colIndex", "columnId", "stickyState", "cellRef", "tableRole", "children"]);
    const stickyStyles = useStickyCellStyles({
        stickyColumns: stickyState,
        columnId,
        getClassName: props => getStickyClassNames(styles, props),
    });
    const cellRefObject = useRef(null);
    const mergedRef = useMergeRefs(stickyStyles.ref, cellRef, cellRefObject);
    const { tabIndex: cellTabIndex } = useSingleTabStopNavigation(cellRefObject);
    return (React.createElement("th", Object.assign({ "data-focus-id": `header-${String(columnId)}`, className: clsx(className, {
            [styles['header-cell-fake-focus']]: focusedComponent === `header-${String(columnId)}`,
            [styles['header-cell-sortable']]: sortingStatus,
            [styles['header-cell-sorted']]: sortingStatus === 'ascending' || sortingStatus === 'descending',
            [styles['header-cell-disabled']]: sortingDisabled,
            [styles['header-cell-ascending']]: sortingStatus === 'ascending',
            [styles['header-cell-descending']]: sortingStatus === 'descending',
            [styles['header-cell-hidden']]: hidden,
        }, stickyStyles.className), style: Object.assign(Object.assign({}, style), stickyStyles.style), ref: mergedRef }, getTableColHeaderRoleProps({ tableRole, sortingStatus, colIndex }), { tabIndex: cellTabIndex === -1 ? undefined : cellTabIndex }, copyAnalyticsMetadataAttribute(props)), children));
}
//# sourceMappingURL=th-element.js.map