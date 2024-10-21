import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { getBaseProps } from '../internal/base-component';
import useBaseComponent from '../internal/hooks/use-base-component';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import InternalKeyValuePairs from './internal';
export default function KeyValuePairs(_a) {
    var { columns = 1, items, ariaLabel, ariaLabelledby } = _a, rest = __rest(_a, ["columns", "items", "ariaLabel", "ariaLabelledby"]);
    const { __internalRootRef } = useBaseComponent('KeyValuePairs', {
        props: { columns },
    });
    const baseProps = getBaseProps(rest);
    return (React.createElement(InternalKeyValuePairs, Object.assign({ columns: columns, items: items, ariaLabel: ariaLabel, ariaLabelledby: ariaLabelledby }, baseProps, { ref: __internalRootRef })));
}
applyDisplayName(KeyValuePairs, 'KeyValuePairs');
//# sourceMappingURL=index.js.map