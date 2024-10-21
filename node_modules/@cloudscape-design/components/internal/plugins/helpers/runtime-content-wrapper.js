// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useEffect, useRef } from 'react';
import { ActiveDrawersContext } from '../../../app-layout/utils/visibility-context';
export function RuntimeContentWrapper({ mountContent, unmountContent, id }) {
    const ref = useRef(null);
    const visibilityChangeCallback = useRef(null);
    const activeDrawersIds = useContext(ActiveDrawersContext);
    const isVisible = !!id && activeDrawersIds.includes(id);
    useEffect(() => {
        const container = ref.current;
        mountContent(container, {
            onVisibilityChange: cb => {
                visibilityChangeCallback.current = cb;
            },
        });
        return () => {
            unmountContent(container);
            visibilityChangeCallback.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        var _a;
        (_a = visibilityChangeCallback.current) === null || _a === void 0 ? void 0 : _a.call(visibilityChangeCallback, isVisible);
    }, [isVisible]);
    return React.createElement("div", { ref: ref });
}
//# sourceMappingURL=runtime-content-wrapper.js.map