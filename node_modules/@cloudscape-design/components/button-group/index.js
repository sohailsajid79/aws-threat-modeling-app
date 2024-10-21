import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { getBaseProps } from '../internal/base-component';
import useBaseComponent from '../internal/hooks/use-base-component';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import { getExternalProps } from '../internal/utils/external-props';
import InternalButtonGroup from './internal';
const ButtonGroup = React.forwardRef((_a, ref) => {
    var { variant, dropdownExpandToViewport } = _a, rest = __rest(_a, ["variant", "dropdownExpandToViewport"]);
    const baseProps = getBaseProps(rest);
    const baseComponentProps = useBaseComponent('ButtonGroup', {
        props: {
            variant,
            dropdownExpandToViewport,
        },
    });
    const externalProps = getExternalProps(rest);
    return (React.createElement(InternalButtonGroup, Object.assign({}, baseProps, baseComponentProps, externalProps, { ref: ref, variant: variant, dropdownExpandToViewport: dropdownExpandToViewport })));
});
applyDisplayName(ButtonGroup, 'ButtonGroup');
export default ButtonGroup;
//# sourceMappingURL=index.js.map