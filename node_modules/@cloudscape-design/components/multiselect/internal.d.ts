import React from 'react';
import { InternalBaseComponentProps } from '../internal/hooks/use-base-component/index.js';
import { MultiselectProps } from './interfaces';
declare const InternalMultiselect: React.ForwardRefExoticComponent<MultiselectProps & {
    statusType: import("../internal/components/dropdown-status").DropdownStatusProps.StatusType;
    options: import("..").SelectProps.Options;
    filteringType: import("../internal/components/dropdown/interfaces").OptionsFilteringType;
    selectedOptions: readonly import("../internal/components/option/interfaces").OptionDefinition[];
    keepOpen: boolean;
    hideTokens: boolean;
} & InternalBaseComponentProps<any> & {
    inlineTokens?: boolean | undefined;
} & React.RefAttributes<MultiselectProps.Ref>>;
export default InternalMultiselect;
//# sourceMappingURL=internal.d.ts.map