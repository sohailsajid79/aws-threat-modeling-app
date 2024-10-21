import React from 'react';
interface TokenProps {
    children: React.ReactNode;
    ariaLabel?: string;
    dismissLabel?: string;
    onDismiss?: () => void;
    disabled?: boolean;
    readOnly?: boolean;
    errorText?: React.ReactNode;
    errorIconAriaLabel?: string;
    warningText?: React.ReactNode;
    warningIconAriaLabel?: string;
    className?: string;
}
export declare function Token({ ariaLabel, disabled, readOnly, dismissLabel, onDismiss, children, errorText, warningText, errorIconAriaLabel, warningIconAriaLabel, ...restProps }: TokenProps): JSX.Element;
export {};
//# sourceMappingURL=token.d.ts.map