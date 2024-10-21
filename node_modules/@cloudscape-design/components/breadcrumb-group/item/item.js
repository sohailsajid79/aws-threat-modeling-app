import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import InternalIcon from '../../icon/internal';
import Tooltip from '../../internal/components/tooltip';
import { registerTooltip } from '../../internal/components/tooltip/registry';
import { fireCancelableEvent, isPlainLeftClick } from '../../internal/events';
import { getEventDetail } from '../utils';
import { FunnelBreadcrumbItem } from './funnel';
import styles from './styles.css.js';
const BreadcrumbItemWithPopover = ({ item, isLast, anchorAttributes, }) => {
    const [showPopover, setShowPopover] = useState(false);
    const textRef = useRef(null);
    const popoverContent = React.createElement(Tooltip, { trackRef: textRef, value: item.text, size: "medium" });
    useEffect(() => {
        if (showPopover) {
            return registerTooltip(() => {
                setShowPopover(false);
            });
        }
    }, [showPopover]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Item, Object.assign({ isLast: isLast, onFocus: () => {
                setShowPopover(true);
            }, onBlur: () => setShowPopover(false), onMouseEnter: () => {
                setShowPopover(true);
            }, onMouseLeave: () => setShowPopover(false), anchorAttributes: anchorAttributes }, (isLast ? { tabIndex: 0 } : {})),
            React.createElement(FunnelBreadcrumbItem, { ref: textRef, text: item.text, last: isLast })),
        showPopover && popoverContent));
};
const Item = (_a) => {
    var { anchorAttributes, children, isLast } = _a, itemAttributes = __rest(_a, ["anchorAttributes", "children", "isLast"]);
    return isLast ? (React.createElement("span", Object.assign({ className: styles.anchor }, itemAttributes), children)) : (React.createElement("a", Object.assign({ className: styles.anchor }, itemAttributes, anchorAttributes), children));
};
export function BreadcrumbItem({ item, onClick, onFollow, isLast = false, isGhost = false, isTruncated = false, }) {
    const preventDefault = (event) => event.preventDefault();
    const onClickHandler = (event) => {
        if (isPlainLeftClick(event)) {
            fireCancelableEvent(onFollow, getEventDetail(item), event);
        }
        fireCancelableEvent(onClick, getEventDetail(item), event);
    };
    const anchorAttributes = {
        href: item.href || '#',
        onClick: isLast ? preventDefault : onClickHandler,
    };
    if (isGhost) {
        anchorAttributes.tabIndex = -1;
    }
    return (React.createElement("div", { className: clsx(!isGhost && styles.breadcrumb, isGhost && styles['ghost-breadcrumb'], isLast && styles.last) },
        isTruncated && !isGhost ? (React.createElement(BreadcrumbItemWithPopover, { item: item, isLast: isLast, anchorAttributes: anchorAttributes })) : (React.createElement(Item, { isLast: isLast, anchorAttributes: anchorAttributes },
            React.createElement(FunnelBreadcrumbItem, { text: item.text, last: isLast, ghost: isGhost }))),
        !isLast ? (React.createElement("span", { className: styles.icon },
            React.createElement(InternalIcon, { name: "angle-right" }))) : null));
}
//# sourceMappingURL=item.js.map