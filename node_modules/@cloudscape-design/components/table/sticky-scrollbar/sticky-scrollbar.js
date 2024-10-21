// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { useMergeRefs } from '../../internal/hooks/use-merge-refs';
import { useVisualRefresh } from '../../internal/hooks/use-visual-mode';
import { browserScrollbarSize } from '../../internal/utils/browser-scrollbar-size';
import { useStickyScrollbar } from './use-sticky-scrollbar';
import styles from './styles.css.js';
export default forwardRef(StickyScrollbar);
function StickyScrollbar({ wrapperRef, tableRef, onScroll, hasStickyColumns }, ref) {
    const isVisualRefresh = useVisualRefresh();
    const scrollbarRef = React.useRef(null);
    const scrollbarContentRef = React.useRef(null);
    const mergedRef = useMergeRefs(ref, scrollbarRef);
    /**
     * If the height of the scrollbar is 0, we're likely on a platform that uses
     * overlay scrollbars (e.g. Mac).
     */
    const offsetScrollbar = hasStickyColumns || browserScrollbarSize().height === 0;
    useStickyScrollbar(scrollbarRef, scrollbarContentRef, tableRef, wrapperRef, offsetScrollbar);
    return (React.createElement("div", { ref: mergedRef, className: clsx(styles['sticky-scrollbar'], offsetScrollbar && styles['sticky-scrollbar-offset'], isVisualRefresh && styles['is-visual-refresh']), onScroll: onScroll },
        React.createElement("div", { ref: scrollbarContentRef, className: styles['sticky-scrollbar-content'] })));
}
//# sourceMappingURL=sticky-scrollbar.js.map