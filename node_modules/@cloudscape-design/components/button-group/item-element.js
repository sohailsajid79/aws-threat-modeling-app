// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { fireCancelableEvent } from '../internal/events';
import { nodeBelongs } from '../internal/utils/node-belongs';
import IconButtonItem from './icon-button-item';
import MenuDropdownItem from './menu-dropdown-item';
import styles from './styles.css.js';
const ItemElement = forwardRef(({ item, dropdownExpandToViewport, tooltip, setTooltip, onItemClick }, ref) => {
    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    useImperativeHandle(ref, () => ({
        focus: () => {
            var _a;
            (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
    }));
    useEffect(() => {
        if ((tooltip === null || tooltip === void 0 ? void 0 : tooltip.item) !== item.id) {
            return;
        }
        const close = () => {
            setTooltip(null);
        };
        const handlePointerDownEvent = (event) => {
            var _a;
            if (event.target && ((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
                return;
            }
            close();
        };
        const handleKeyDownEvent = (event) => {
            if (event.key === 'Escape') {
                close();
            }
        };
        window.addEventListener('pointerdown', handlePointerDownEvent);
        window.addEventListener('keydown', handleKeyDownEvent);
        return () => {
            window.removeEventListener('pointerdown', handlePointerDownEvent);
            window.removeEventListener('keydown', handleKeyDownEvent);
        };
    }, [item.id, tooltip, setTooltip]);
    const onShowTooltipSoft = (show) => {
        if (!(tooltip === null || tooltip === void 0 ? void 0 : tooltip.feedback)) {
            setTooltip(show ? { item: item.id, feedback: false } : null);
        }
    };
    const onShowTooltipHard = (show) => {
        if (!show && item.id !== (tooltip === null || tooltip === void 0 ? void 0 : tooltip.item)) {
            return;
        }
        setTooltip(show ? { item: item.id, feedback: false } : null);
    };
    const onClickHandler = (event) => {
        const hasPopoverFeedback = 'popoverFeedback' in item && item.popoverFeedback;
        if (hasPopoverFeedback) {
            setTooltip({ item: item.id, feedback: true });
        }
        fireCancelableEvent(onItemClick, { id: 'id' in event.detail ? event.detail.id : item.id }, event);
    };
    return (React.createElement("div", { key: item.id, className: styles['item-wrapper'], ref: containerRef, onPointerEnter: () => onShowTooltipSoft(true), onPointerLeave: () => onShowTooltipSoft(false), onFocus: event => {
            // Showing no tooltip when the focus comes from inside the container.
            // This is needed to prevent the tooltip after a menu closes with item selection or Escape.
            if (event && event.relatedTarget && nodeBelongs(containerRef.current, event.relatedTarget)) {
                return;
            }
            onShowTooltipHard(true);
        }, onBlur: () => onShowTooltipHard(false) },
        item.type === 'icon-button' && (React.createElement(IconButtonItem, { ref: buttonRef, item: item, onItemClick: onClickHandler, showTooltip: (tooltip === null || tooltip === void 0 ? void 0 : tooltip.item) === item.id, showFeedback: !!(tooltip === null || tooltip === void 0 ? void 0 : tooltip.feedback) })),
        item.type === 'menu-dropdown' && (React.createElement(MenuDropdownItem, { ref: buttonRef, item: item, showTooltip: (tooltip === null || tooltip === void 0 ? void 0 : tooltip.item) === item.id, onItemClick: onClickHandler, expandToViewport: dropdownExpandToViewport }))));
});
export default ItemElement;
//# sourceMappingURL=item-element.js.map