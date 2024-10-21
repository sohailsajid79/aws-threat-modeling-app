// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export function getDataAttributes(props) {
    const result = {};
    Object.keys(props).forEach((prop) => {
        if (prop.startsWith("data-")) {
            result[prop] = props[prop];
        }
    });
    return result;
}
//# sourceMappingURL=get-data-attributes.js.map