import React from 'react';
import { InternalBaseComponentProps } from '../internal/hooks/use-base-component';
import { SomeRequired } from '../internal/types';
import { PropertyFilterProps } from './interfaces';
export type PropertyFilterInternalProps = SomeRequired<PropertyFilterProps, 'filteringOptions' | 'customGroupsText' | 'enableTokenGroups' | 'disableFreeTextFiltering' | 'hideOperations'> & InternalBaseComponentProps;
declare const PropertyFilterInternal: React.ForwardRefExoticComponent<PropertyFilterProps & {
    hideOperations: boolean;
    enableTokenGroups: boolean;
    filteringOptions: readonly import("@cloudscape-design/collection-hooks").PropertyFilterOption[];
    customGroupsText: PropertyFilterProps.GroupText[];
    disableFreeTextFiltering: boolean;
} & InternalBaseComponentProps<any> & React.RefAttributes<PropertyFilterProps.Ref>>;
export default PropertyFilterInternal;
//# sourceMappingURL=internal.d.ts.map