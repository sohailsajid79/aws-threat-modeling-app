// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef } from 'react';
import DragHandle from '../../internal/components/drag-handle';
import { useUniqueId } from '../../internal/hooks/use-unique-id';
import InternalToggle from '../../toggle/internal';
import styles from '../styles.css.js';
const componentPrefix = 'content-display-option';
export const getClassName = (suffix) => styles[[componentPrefix, suffix].filter(Boolean).join('-')];
const ContentDisplayOption = forwardRef(({ dragHandleAriaLabel, listeners, onToggle, option, disabled }, ref) => {
    const idPrefix = useUniqueId(componentPrefix);
    const controlId = `${idPrefix}-control-${option.id}`;
    const dragHandleAttributes = {
        ['aria-label']: [dragHandleAriaLabel, option.label].join(', '),
    };
    return (React.createElement("div", { ref: ref, className: getClassName('content') },
        React.createElement(DragHandle, { disabled: disabled, attributes: dragHandleAttributes, listeners: listeners }),
        React.createElement("label", { className: getClassName('label'), htmlFor: controlId }, option.label),
        React.createElement("div", { className: getClassName('toggle') },
            React.createElement(InternalToggle, { checked: !!option.visible, onChange: () => onToggle && onToggle(option), disabled: option.alwaysVisible === true, controlId: controlId }))));
});
export default ContentDisplayOption;
//# sourceMappingURL=content-display-option.js.map