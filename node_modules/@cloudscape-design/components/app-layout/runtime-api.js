import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { fireNonCancelableEvent } from '../internal/events';
import { RuntimeContentWrapper } from '../internal/plugins/helpers';
import { sortByPriority } from '../internal/plugins/helpers/utils';
const mapRuntimeConfigToDrawer = (runtimeConfig) => {
    var _a;
    const { mountContent, unmountContent, trigger } = runtimeConfig, runtimeDrawer = __rest(runtimeConfig, ["mountContent", "unmountContent", "trigger"]);
    return Object.assign(Object.assign({}, runtimeDrawer), { ariaLabels: Object.assign({ drawerName: (_a = runtimeDrawer.ariaLabels.content) !== null && _a !== void 0 ? _a : '' }, runtimeDrawer.ariaLabels), trigger: trigger
            ? {
                iconSvg: (
                // eslint-disable-next-line react/no-danger
                React.createElement("span", { dangerouslySetInnerHTML: { __html: trigger.iconSvg } })),
            }
            : undefined, content: (React.createElement(RuntimeContentWrapper, { key: runtimeDrawer.id, mountContent: mountContent, unmountContent: unmountContent, id: runtimeDrawer.id })), onResize: event => {
            fireNonCancelableEvent(runtimeDrawer.onResize, { size: event.detail.size, id: runtimeDrawer.id });
        } });
};
export function convertRuntimeDrawers(localDrawers, globalDrawers) {
    const converted = localDrawers.map(mapRuntimeConfigToDrawer);
    const sorted = sortByPriority(converted);
    return {
        global: sortByPriority(globalDrawers.map(mapRuntimeConfigToDrawer)),
        localBefore: sorted.filter(item => { var _a; return ((_a = item.orderPriority) !== null && _a !== void 0 ? _a : 0) > 0; }),
        localAfter: sorted.filter(item => { var _a; return ((_a = item.orderPriority) !== null && _a !== void 0 ? _a : 0) <= 0; }),
    };
}
//# sourceMappingURL=runtime-api.js.map