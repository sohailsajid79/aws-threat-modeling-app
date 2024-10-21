// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __rest } from "tslib";
import React from 'react';
import clsx from 'clsx';
import { FormFieldError, FormFieldWarning } from '../form-field/internal';
import { getBaseProps } from '../internal/base-component';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import DismissButton from './dismiss-button';
import styles from './styles.css.js';
export function Token(_a) {
    var { ariaLabel, disabled, readOnly, dismissLabel, onDismiss, children, errorText, warningText, errorIconAriaLabel, warningIconAriaLabel } = _a, restProps = __rest(_a, ["ariaLabel", "disabled", "readOnly", "dismissLabel", "onDismiss", "children", "errorText", "warningText", "errorIconAriaLabel", "warningIconAriaLabel"]);
    const errorId = useUniqueId('error');
    const warningId = useUniqueId('warning');
    const baseProps = getBaseProps(restProps);
    const showWarning = warningText && !errorText;
    return (React.createElement("div", Object.assign({}, baseProps, { className: clsx(styles.token, baseProps.className), role: "group", "aria-label": ariaLabel, "aria-describedby": errorText ? errorId : warningText ? warningId : undefined, "aria-disabled": disabled }),
        React.createElement("div", { className: clsx(styles['token-box'], disabled && styles['token-box-disabled'], readOnly && styles['token-box-readonly'], errorText && styles['token-box-error'], showWarning && styles['token-box-warning']) },
            children,
            onDismiss && (React.createElement(DismissButton, { disabled: disabled, dismissLabel: dismissLabel, onDismiss: onDismiss, readOnly: readOnly }))),
        errorText && (React.createElement(FormFieldError, { id: errorId, errorIconAriaLabel: errorIconAriaLabel }, errorText)),
        showWarning && (React.createElement(FormFieldWarning, { id: warningId, warningIconAriaLabel: warningIconAriaLabel }, warningText))));
}
//# sourceMappingURL=token.js.map