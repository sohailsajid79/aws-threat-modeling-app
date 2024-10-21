import React from 'react';
import { InternalBaseComponentProps } from '../internal/hooks/use-base-component';
import { InternalVariant } from './interfaces';
export interface ExpandableSectionContainerProps extends InternalBaseComponentProps {
    className?: string;
    header: React.ReactNode;
    children?: React.ReactNode;
    variant: InternalVariant;
    expanded: boolean | undefined;
    disableContentPaddings: boolean | undefined;
    __injectAnalyticsComponentMetadata?: boolean;
}
export declare const ExpandableSectionContainer: ({ className, children, header, variant, expanded, disableContentPaddings, __internalRootRef, __injectAnalyticsComponentMetadata, ...rest }: ExpandableSectionContainerProps) => JSX.Element;
//# sourceMappingURL=expandable-section-container.d.ts.map