// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { createWidgetizedComponent } from '../../../internal/widgets';
import { SplitPanelProvider } from '../../split-panel';
import styles from './styles.css.js';
export function AppLayoutSplitPanelDrawerSideImplementation({ children, appLayoutInternals, splitPanelInternals, }) {
    var _a;
    const { splitPanelControlId, placement, verticalOffsets } = appLayoutInternals;
    const drawerTopOffset = (_a = verticalOffsets.drawers) !== null && _a !== void 0 ? _a : placement.insetBlockStart;
    return (React.createElement(SplitPanelProvider, Object.assign({}, splitPanelInternals),
        React.createElement("section", { id: splitPanelControlId, className: styles['split-panel-side'], style: {
                blockSize: `calc(100vh - ${drawerTopOffset}px - ${placement.insetBlockEnd}px)`,
                insetBlockStart: drawerTopOffset,
            } }, children)));
}
export function AppLayoutSplitPanelDrawerBottomImplementation({ children, splitPanelInternals, }) {
    return React.createElement(SplitPanelProvider, Object.assign({}, splitPanelInternals), children);
}
export const createWidgetizedAppLayoutSplitPanelDrawerSide = createWidgetizedComponent(AppLayoutSplitPanelDrawerSideImplementation);
export const createWidgetizedAppLayoutSplitPanelDrawerBottom = createWidgetizedComponent(AppLayoutSplitPanelDrawerBottomImplementation);
//# sourceMappingURL=index.js.map