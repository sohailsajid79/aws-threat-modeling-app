// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import InternalIcon from '../../../icon/internal';
import Handle from '../handle';
import handleStyles from '../handle/styles.css.js';
import styles from './styles.css.js';
export default function DragHandle({ attributes, hideFocus, listeners, disabled }) {
    return (React.createElement(Handle, Object.assign({ "aria-disabled": disabled, className: clsx(styles.handle, hideFocus && handleStyles['hide-focus'], disabled && styles['handle-disabled']) }, attributes, listeners),
        React.createElement(InternalIcon, { variant: disabled ? 'disabled' : undefined, name: "drag-indicator" })));
}
//# sourceMappingURL=index.js.map