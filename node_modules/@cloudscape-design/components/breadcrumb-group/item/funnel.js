// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { DATA_ATTR_FUNNEL_KEY, FUNNEL_KEY_FUNNEL_NAME } from '../../internal/analytics/selectors';
import analyticsSelectors from '../analytics-metadata/styles.css.js';
import styles from './styles.css.js';
export const FunnelBreadcrumbItem = React.forwardRef(({ text, hidden, last, ghost }, ref) => {
    const funnelAttributes = {};
    if (last && !ghost) {
        funnelAttributes[DATA_ATTR_FUNNEL_KEY] = FUNNEL_KEY_FUNNEL_NAME;
    }
    return (React.createElement("span", Object.assign({}, funnelAttributes, { className: clsx(styles.text, hidden && styles['text-hidden'], !ghost && analyticsSelectors['breadcrumb-item']), ref: ref }), text));
});
//# sourceMappingURL=funnel.js.map