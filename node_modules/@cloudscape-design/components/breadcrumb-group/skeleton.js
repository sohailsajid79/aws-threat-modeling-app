// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { FunnelBreadcrumbItem } from './item/funnel';
export function BreadcrumbGroupSkeleton({ items, }) {
    const lastItem = items[items.length - 1];
    if (!lastItem) {
        return React.createElement(React.Fragment, null);
    }
    return React.createElement(FunnelBreadcrumbItem, { hidden: true, last: true, text: lastItem.text });
}
//# sourceMappingURL=skeleton.js.map